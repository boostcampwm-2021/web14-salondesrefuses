const fs = require("fs");
const faker = require("faker");
const { randomInt } = require("crypto");

const MAX = 99999;

const schemaName = "salon";
const strategy = ["google", "kakao"];

const types = ["사진", "그림", "디지털 아트"];
// const status = ["NoBid", "InBid"];
const images = [
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359411799-test.jpg",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359420039-test2.png",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359435107-test3.png",
];
const cropped_image = [
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359411801-test.jpg",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359420041-test2.png",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359435110-test3.png",
];

let isExhibitionSelect;
let isAuctionSelect;

let userCount;
let artworkCount;
let exhibitionCount;
let auctionCount;

function user(number) {
  let result = ["\n-- user sql"];
  for (let i = 0; i < number; i++) {
    result.push(`INSERT INTO \`${schemaName}\`.\`user\` 
        (\`id\`, \`user_id\`, \`nickname\`, \`sns_id\`, \`description\`, \`avatar\`, \`refresh_token\`, \`login_strategy\`) 
        VALUES ('${
          i + 1
        }', '${faker.internet.email()}', '${faker.internet.userName()}', '${faker.lorem.sentence()}', '${faker.lorem.sentence()}', '${faker.internet.avatar()}', '${faker.lorem.sentence()}', '${
      strategy[randomInt(MAX) % strategy.length]
    }');`);
  }
  return result.join("\n");
}

function exhibition(number) {
  let result = ["\n-- exhibition sql"];

  let artworkIndex = 0;
  isExhibitionSelect = Array(artworkCount).fill(undefined);

  for (let i = 0; i < number; i++) {
    const userIndex = randomInt(userCount) + 1;
    const selectCount = randomInt(5);
    result.push(`INSERT INTO \`${schemaName}\`.\`exhibition\` 
      (\`id\`, \`collaborator\`, \`title\`, \`description\`, \`thumbnail_image\`, \`artist_id\`, \`start_at\`, \`end_at\`)
      VALUES ('${
        i + 1
      }', '${faker.internet.userName()}', '${faker.lorem.sentence()}', '${faker.lorem.sentence()}', '${
      images[randomInt(cropped_image.length)]
    }', '${userIndex}', CURRENT_DATE, CURRENT_DATE + ${randomInt(10) + 1});`);

    for (let j = 0; j < selectCount && artworkIndex < artworkCount; j++) {
      isExhibitionSelect[artworkIndex++] = i + 1;
    }
  }
  return result.join("\n");
}

function artwork(number) {
  let result = ["\n-- artwork sql"];
  for (let i = 0; i < number; i++) {
    const userIndex = randomInt(userCount) + 1;
    const selectImage = randomInt(images.length);
    result.push(`INSERT INTO \`${schemaName}\`.\`artwork\` 
    (\`id\`, \`title\`, \`type\`, \`price\`, \`description\`, \`status\`, \`nft_token\`, \`exhibition_id\`,\`artist_id\`, \`owner_id\`, \`original_image\`, \`cropped_image\`)
    VALUES ('${i + 1}', '${faker.lorem.word()}', '${
      types[randomInt(types.length)]
    }', '${
      randomInt(100) / 100
    }', '${faker.lorem.sentence()}', 'NoBid', '${faker.lorem.sentence()}', ${
      isExhibitionSelect[i] ? `'${isExhibitionSelect[i]}'` : "null"
    },'${userIndex}', '${userIndex}', '${images[selectImage]}', '${
      cropped_image[selectImage]
    }');`);
  }
  return result.join("\n");
}

function acution(number) {
  let result = ["\n-- auction sql"];
  isAuctionSelect = new Set(Array(artworkCount).keys());

  for (let i = 0; i < number; i++) {
    const userIndex = randomInt(userCount) + 1;
    const artworkIndex = getRandomKey(isAuctionSelect) + 1;
    isAuctionSelect.delete(artworkIndex - 1);

    result.push(`INSERT INTO \`${schemaName}\`.\`auction\`  
        (\`id\`, \`start_at\`, \`seller_id\`, \`artwork_id\`) 
        VALUES ('${i + 1}', CURRENT_DATE, CURRENT_DATE + ${
      randomInt(10) + 1
    }, '${userIndex}');
        `);
    result.push(
      `UPDATE \`${schemaName}\`.\`artwork\` SET \`status\` = 'InBid' WHERE (\`id\` = '${artworkIndex}');`
    );
  }
  return result.join("\n");
}

function getRandomKey(collection) {
  let keys = Array.from(collection.keys());
  return keys[randomInt(keys.length)];
}

function generate(argv) {
  const outputFile = fs.createWriteStream("output.sql");

  outputFile.once("open", function (fd) {
    const userIndex = argv.indexOf("user");
    const artworkIndex = argv.indexOf("artwork");
    const exhibitionIndex = argv.indexOf("exhibition");
    const auctionIndex = argv.indexOf("auction");
    userCount = Number(argv[userIndex + 1]);
    exhibitionCount = Number(argv[exhibitionIndex + 1]);
    artworkCount = Number(argv[artworkIndex + 1]);
    auctionCount = Number(argv[auctionIndex + 1]);

    if (userIndex !== -1) {
      outputFile.write(user(userCount));
    }
    if (exhibitionIndex !== -1) {
      outputFile.write("\n\n");
      outputFile.write(exhibition(exhibitionCount));
    }

    if (artworkIndex !== -1) {
      outputFile.write("\n\n");
      outputFile.write(artwork(artworkCount));
    }

    if (auctionIndex !== -1) {
      outputFile.write("\n\n");
      outputFile.write(acution(auctionCount));
    }

    outputFile.end();
  });
}

generate(process.argv);
