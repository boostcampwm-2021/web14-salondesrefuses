const fs = require("fs");
const faker = require("faker");
const { randomInt } = require("crypto");

const MAX = 99999;

const schemaName = process.argv[2];
const includeId = process.argv.indexOf("id") !== -1;
const strategy = ["google", "kakao"];

const types = ["사진", "그림", "디지털 아트"];
// const status = ["NoBid", "InBid"];
const images = [
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359411799-test.jpg",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359420039-test2.png",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359435107-test3.png",
  "https://lh3.googleusercontent.com/CknurjMAi8EYA7NMHNuKhJM98V-9JssFMs9ashs_bZSWucMIdvmequwDy3bxX1UYrmVhdbBuMyue-7HDKBIB0KdPSINTy89n6TzR=w600",
  "https://lh3.googleusercontent.com/dPiqY8uf3EKAz-W3VPX_RxkARRyu1Rv7ZArd8HhyGfaaR1T87JJjnxRwey1RzCJ2PpJxCSl_2VpxloHIQOJi6ivQ2ghdzOD6bqEk-g=w600",
  "https://lh3.googleusercontent.com/_Cuo89ByWKcoPrjy-UUU5_oQMdc1_zv5J03BdYEAuTOxSssle3PKfDiOxrOQwxi0eQA3zIhwfoKt8XclFmHnhSkPV0IXtm_W1yQ_=w600",
  "https://lh3.googleusercontent.com/YMHy5itMRP82Ocy5E-FLT8Ns3brcwzNdSMdBE9CQNKDog1mwo1XRWGGs7mEVMZB_1LgNLJpZNwTHAIDJE-IwEGGt0b7y-4wC2hog=w600",
  "https://lh3.googleusercontent.com/nFVR564r9nzcdkXmZyKuWMrp6p_-mntcHqhETSTXbSARZuKkidQE-hzKMmcN2C0ybeDAnttACScN4XUpHJjNBNIWO0Dv4lwzjXPz=w600",
  "https://lh3.googleusercontent.com/oLd6Htbja1oFgjwyXy_YcKaVI3MFEbSVIB3Cas2B_GZvfKG2vTuUQiZLoUXD51ts3fpyPuHmZWOyiFKpk9XCZaEheZS3AnDiOkFU=w600",
  "https://lh3.googleusercontent.com/BjkYjPnOeUYYDNs2B3Qp7p4r4YxofZM7c5_iamfe6Tefr7JKsQqUZYTSfXzhOzAyE5TS3C4wWbuSUFFAL-vU2knFJ-h-OdeKC92gqA=w600",
  "https://lh3.googleusercontent.com/yE-EkqWirTo8NsETL1cbJHcTelbGn3Z8a0uZ1_YygCD7a8FgpiVI5IWPHBDNdKjh93QG18s0ZmSRgnABBqQKGplB6MLATvMN_IY8Qnw=w600",
  "https://lh3.googleusercontent.com/2FxD5q_3H8nVvaPnr7Z7YPvZgSzZqJc-3-MlbMi56OxG_2UAdrLuQ1hRPki9gokqZpKBETaptxQtqaSIr3a3yL5JQDtBKsQtT90TiQ=w600",
  "https://lh3.googleusercontent.com/eSB6xnAQFJ9LU8phOFgJInZH76cGhebh-X6aY8YLjtd43IPUYZEmbFGTthluIz_2S5Fq8QghEAwJqmhq0JDC2Li4A-_KLNxe2gV63pQ=w600",
  "https://lh3.googleusercontent.com/_hIxEcNclP2q6_YB7bnxtYnKj-FTJFVETZzyimqCGECvyPJBvcdIsGCfVgACMOcvSK-1ix_D9_kCOyTmdguQ3rfhmsvJ_8JsUs3v_CA=w600",
  "https://lh3.googleusercontent.com/1ZBRU05n26HD-WBr2nbcm16oSEFfC5y1lRz6pQRvUhq_uomzyKxXmTtRwpa2NPfipRlmcnVkCUXWLyVAlOmaCyabkZf-GkZM3FhWBrw=w600",
  "https://lh3.googleusercontent.com/Y89GwNi9TwS9uqFaqDD8bDTHGIcERGq5QkhQWxPcGjAteQ77ked5LPVpwkuUZ9zTV_vudH-hfMLMf3a3EVHXmZtVnMJhfH4lfEPsJw=w600",
];
const cropped_image = [
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359411801-test.jpg",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359420041-test2.png",
  "https://salon-bucket.kr.object.ncloudstorage.com/objects/1636359435110-test3.png",
  "https://lh3.googleusercontent.com/CknurjMAi8EYA7NMHNuKhJM98V-9JssFMs9ashs_bZSWucMIdvmequwDy3bxX1UYrmVhdbBuMyue-7HDKBIB0KdPSINTy89n6TzR=w600",
  "https://lh3.googleusercontent.com/dPiqY8uf3EKAz-W3VPX_RxkARRyu1Rv7ZArd8HhyGfaaR1T87JJjnxRwey1RzCJ2PpJxCSl_2VpxloHIQOJi6ivQ2ghdzOD6bqEk-g=w600",
  "https://lh3.googleusercontent.com/_Cuo89ByWKcoPrjy-UUU5_oQMdc1_zv5J03BdYEAuTOxSssle3PKfDiOxrOQwxi0eQA3zIhwfoKt8XclFmHnhSkPV0IXtm_W1yQ_=w600",
  "https://lh3.googleusercontent.com/YMHy5itMRP82Ocy5E-FLT8Ns3brcwzNdSMdBE9CQNKDog1mwo1XRWGGs7mEVMZB_1LgNLJpZNwTHAIDJE-IwEGGt0b7y-4wC2hog=w600",
  "https://lh3.googleusercontent.com/nFVR564r9nzcdkXmZyKuWMrp6p_-mntcHqhETSTXbSARZuKkidQE-hzKMmcN2C0ybeDAnttACScN4XUpHJjNBNIWO0Dv4lwzjXPz=w600",
  "https://lh3.googleusercontent.com/oLd6Htbja1oFgjwyXy_YcKaVI3MFEbSVIB3Cas2B_GZvfKG2vTuUQiZLoUXD51ts3fpyPuHmZWOyiFKpk9XCZaEheZS3AnDiOkFU=w600",
  "https://lh3.googleusercontent.com/BjkYjPnOeUYYDNs2B3Qp7p4r4YxofZM7c5_iamfe6Tefr7JKsQqUZYTSfXzhOzAyE5TS3C4wWbuSUFFAL-vU2knFJ-h-OdeKC92gqA=w600",
  "https://lh3.googleusercontent.com/yE-EkqWirTo8NsETL1cbJHcTelbGn3Z8a0uZ1_YygCD7a8FgpiVI5IWPHBDNdKjh93QG18s0ZmSRgnABBqQKGplB6MLATvMN_IY8Qnw=w600",
  "https://lh3.googleusercontent.com/2FxD5q_3H8nVvaPnr7Z7YPvZgSzZqJc-3-MlbMi56OxG_2UAdrLuQ1hRPki9gokqZpKBETaptxQtqaSIr3a3yL5JQDtBKsQtT90TiQ=w600",
  "https://lh3.googleusercontent.com/eSB6xnAQFJ9LU8phOFgJInZH76cGhebh-X6aY8YLjtd43IPUYZEmbFGTthluIz_2S5Fq8QghEAwJqmhq0JDC2Li4A-_KLNxe2gV63pQ=w600",
  "https://lh3.googleusercontent.com/_hIxEcNclP2q6_YB7bnxtYnKj-FTJFVETZzyimqCGECvyPJBvcdIsGCfVgACMOcvSK-1ix_D9_kCOyTmdguQ3rfhmsvJ_8JsUs3v_CA=w600",
  "https://lh3.googleusercontent.com/1ZBRU05n26HD-WBr2nbcm16oSEFfC5y1lRz6pQRvUhq_uomzyKxXmTtRwpa2NPfipRlmcnVkCUXWLyVAlOmaCyabkZf-GkZM3FhWBrw=w600",
  "https://lh3.googleusercontent.com/Y89GwNi9TwS9uqFaqDD8bDTHGIcERGq5QkhQWxPcGjAteQ77ked5LPVpwkuUZ9zTV_vudH-hfMLMf3a3EVHXmZtVnMJhfH4lfEPsJw=w600",
];

let isExhibitionSelect;
let isAuctionSelect;

let userCount;
let artworkCount;
let exhibitionCount;
let auctionCount;

function insertQeury(tableName, column, values) {
  return `INSERT INTO \`${schemaName}\`.\`${tableName}\` 
  	(${column.map((field) => `\`${field}\``).join(", ")})
    VALUES 
    (${values.join(", ")});
	`;
}

function user(number) {
  const tableName = "user";
  let result = Array(number + 1).fill(undefined);
  result[0] = "\n-- user sql";

  const column = [
    "user_id",
    "name",
    "sns_id",
    "description",
    "avatar",
    "refresh_token",
    "login_strategy",
  ];
  if (includeId) {
    column.splice(0, 0, "id");
  }

  result = result.map((_, index) => {
    if (index === 0) return;
    const values = [
      `'${faker.internet.email()}'`,
      `'${faker.internet.userName()}'`,
      `'${faker.lorem.sentence()}'`,
      `'${faker.lorem.sentence()}'`,
      `'${faker.internet.avatar()}'`,
      `'${faker.lorem.sentence()}'`,
      `'${strategy[randomInt(MAX) % strategy.length]}'`,
    ];
    if (includeId) {
      values.splice(0, 0, `'${index}'`);
    }

    return insertQeury(tableName, column, values);
  });

  return result.join("\n");
}

function exhibition(number) {
  const tableName = "exhibition";
  let result = Array(number + 1).fill(undefined);
  result[0] = "\n-- exhibition sql";
  let artworkIndex = 0;
  isExhibitionSelect = Array(artworkCount).fill(undefined);

  const column = [
    "collaborator",
    "title",
    "description",
    "thumbnail_image",
    "artist_id",
    "start_at",
    "end_at",
    "contents",
    "theme",
    "categories",
  ];
  if (includeId) {
    column.splice(0, 0, "id");
  }

  result = result.map((_, index) => {
    if (index === 0) return;
    const userIndex = randomInt(userCount) + 1;
    const selectCount = randomInt(5);

    const values = [
      `'${faker.internet.userName()}'`,
      `'${faker.lorem.sentence()}'`,
      `'${faker.lorem.sentence()}'`,
      `'${images[randomInt(cropped_image.length)]}'`,
      `'${userIndex}'`,
      `CURRENT_DATE`,
      `CURRENT_DATE + ${randomInt(10) + 1}`,
      `'[]'`,
      `'${faker.lorem.sentence()}'`,
      `'[${faker.lorem.words(3)}]'`,
    ];
    if (includeId) {
      values.splice(0, 0, `'${index}'`);
    }

    for (let j = 0; j < selectCount && artworkIndex < artworkCount; j++) {
      isExhibitionSelect[artworkIndex++] = index;
    }

    return insertQeury(tableName, column, values);
  });

  return result.join("\n");
}

function artwork(number) {
  const tableName = "artwork";
  let result = Array(number + 1).fill(undefined);
  result[0] = "\n-- artwork sql";

  const column = [
    "title",
    "type",
    "price",
    "description",
    "status",
    "nft_token",
    "exhibition_id",
    "artist_id",
    "owner_id",
    "original_image",
    "cropped_image",
  ];

  if (includeId) {
    column.splice(0, 0, "id");
  }

  result = result.map((_, index) => {
    if (index === 0) return;
    const userIndex = randomInt(userCount) + 1;
    const selectImage = randomInt(images.length);
    const values = [
      `'${faker.lorem.word()}'`,
      `'${types[randomInt(types.length)]}'`,
      `'${randomInt(100) / 100}'`,
      `'${faker.lorem.sentence()}'`,
      `'NoBid'`,
      `'${faker.lorem.sentence()}'`,
      `${
        isExhibitionSelect[index - 1]
          ? `'${isExhibitionSelect[index - 1]}'`
          : "null"
      }`,
      `'${userIndex}'`,
      `'${userIndex}'`,
      `'${images[selectImage]}'`,
      `'${cropped_image[selectImage]}'`,
    ];
    if (includeId) {
      values.splice(0, 0, `'${index}'`);
    }

    return insertQeury(tableName, column, values);
  });

  return result.join("\n");
}

function auction(number) {
  const tableName = "auction";
  let result = Array(number + 1).fill(undefined);
  result[0] = "\n-- auction sql";
  isAuctionSelect = new Set(Array(artworkCount).keys());

  const column = ["start_at", "end_at", "seller_id", "artwork_id"];

  if (includeId) {
    column.splice(0, 0, "id");
  }

  result = result.map((_, index) => {
    if (index === 0) return;
    const userIndex = randomInt(userCount) + 1;
    const artworkIndex = getRandomKey(isAuctionSelect) + 1;
    isAuctionSelect.delete(artworkIndex - 1);

    const values = [
      `CURRENT_DATE`,
      `CURRENT_DATE + ${randomInt(10) + 1}`,
      `'${userIndex}'`,
      `'${artworkIndex}'`,
    ];
    if (includeId) {
      values.splice(0, 0, `'${index}'`);
    }

    return (
      insertQeury(tableName, column, values) +
      "\n" +
      `UPDATE \`${schemaName}\`.\`artwork\` SET \`status\` = 'InBid' WHERE (\`id\` = '${artworkIndex}');`
    );
  });

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
      outputFile.write(auction(auctionCount));
    }

    outputFile.end();
  });
}

generate(process.argv);
