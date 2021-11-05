import Fake1 from '@assets/images/fake1.png';
import Fake2 from '@assets/images/fake2.jpeg';
import Fake3 from '@assets/images/fake3.png';
import Fake4 from '@assets/images/fake4.png';
import Fake5 from '@assets/images/fake5.png';
import { AUCTION_STATE } from './auction-state';

export interface randomExhibitionType {
    id: number;
    title: string;
    artist: {
        id: number;
        name: string;
        nickname: string;
    };
    description: string;
    startedAt: Date;
    endAt: Date;
    thumbnail: string;
}

export const fakeRandomExhibitions: randomExhibitionType[] = [
    {
        id: 1,
        title: '족두리봉의 정기',
        artist: { id: 2332, name: '족두리', nickname: 'JDRBoooong' },
        description:
            '족두리봉이 왜 족두리봉이냐하면, 처음엔 관악산의 정기였어요. 그런데 관악산이 너무 재미가 없잖아요 그래서 더 찾아봤지요. 족두리봉! 바로 눈에 들어왔어요. 북한산의 족두리봉..... 세상은 그 이름을 기억해야 할 것입니다...',
        startedAt: new Date(),
        endAt: new Date(),
        thumbnail: Fake1.src,
    },
    {
        id: 2,
        title: "Antonio Conte's perfect game",
        artist: { id: 2233, name: 'Conte', nickname: 'ConteIsBack' },
        description:
            'Arsenal were last relegated in 1913 after finishing bottom of the table with 18 points from 38 games. They won just three games all season and lost 23 leaving them five points adrift of 19th-placed Notts County',
        startedAt: new Date(),
        endAt: new Date(),
        thumbnail: Fake2.src,
    },
    {
        id: 3,
        title: 'Boostcamp last mission',
        artist: { id: 2233, name: 'JK', nickname: 'JKCrongHonux' },
        description:
            'Arsenal were last relegated in 1913 after finishing bottom of the table with 18 points from 38 games. They won just three games all season and lost 23 leaving them five points adrift of 19th-placed Notts County',
        startedAt: new Date(),
        endAt: new Date(),
        thumbnail: Fake3.src,
    },
    {
        id: 4,
        title: 'Tei - 같은 베개',
        artist: { id: 2233, name: 'Tei', nickname: 'same?' },
        description:
            'Arsenal were last relegated in 1913 after finishing bottom of the table with 18 points from 38 games. They won just three games all season and lost 23 leaving them five points adrift of 19th-placed Notts County',
        startedAt: new Date(),
        endAt: new Date(),
        thumbnail: Fake4.src,
    },
    {
        id: 5,
        title: '우당탕탕 안테나',
        artist: { id: 2233, name: '유희열', nickname: 'YouHappy' },
        description:
            'Arsenal were last relegated in 1913 after finishing bottom of the table with 18 points from 38 games. They won just three games all season and lost 23 leaving them five points adrift of 19th-placed Notts County',
        startedAt: new Date(),
        endAt: new Date(),
        thumbnail: Fake5.src,
    },
];

export interface randomAuctionType {
    id: number;
    title: string;
    artist: {
        id: number;
        name: string;
        nickname: string;
    };
    type: string;
    price: string;
    description: string;
    status: AUCTION_STATE;
    nftToken?: string;
    cropedImagePath: string;
}
export const fakeRandomAuctions: randomAuctionType[] = [
    {
        id: 1,
        title: 'Tei - 같은 베개',
        artist: { id: 2233, name: 'Tei', nickname: 'same?' },
        type: '사진',
        price: '1.2',
        description:
            'Arsenal were last relegated in 1913 after finishing bottom of the table with 18 points from 38 games. They won just three games all season and lost 23 leaving them five points adrift of 19th-placed Notts County',
        status: AUCTION_STATE.OnSale,
        nftToken: 'tokenfake123',
        cropedImagePath: Fake4.src,
    },
    {
        id: 2,
        title: 'Tei - 같은 베개',
        artist: { id: 2233, name: 'Tei', nickname: 'same?' },
        type: '사진',
        price: '1.2',
        description:
            'Arsenal were last relegated in 1913 after finishing bottom of the table with 18 points from 38 games. They won just three games all season and lost 23 leaving them five points adrift of 19th-placed Notts County',
        status: AUCTION_STATE.OnSale,
        nftToken: 'tokenfake123',
        cropedImagePath: Fake5.src,
    },
    {
        id: 3,
        title: 'Tei - 같은 베개',
        artist: { id: 2233, name: 'Tei', nickname: 'same?' },
        type: '사진',
        price: '1.2',
        description:
            'Arsenal were last relegated in 1913 after finishing bottom of the table with 18 points from 38 games. They won just three games all season and lost 23 leaving them five points adrift of 19th-placed Notts County 이력서에 대해 고민 많을거 같아요 ㅎㅎ 내용도 내용이지만 기업에서는 200개가 넘는 이력서를 봐야한다는 점도 고려해보면 좋을거 같아요. 내용을 잘 구성하는 만큼 내용이 상대방에게 잘 전달 되는 것도 중요할수 있어요! 어쨌든 금요일 저녁입니다. 주말 작업이 예정되어 있더라도 조금은 쉬어갈수 있길 바라겠습니다 이력서에 대해 고민 많을거 같아요 ㅎㅎ 내용도 내용이지만 기업에서는 200개가 넘는 이력서를 봐야한다는 점도 고려해보면 좋을거 같아요. 내용을 잘 구성하는 만큼 내용이 상대방에게 잘 전달 되는 것도 중요할수 있어요! 어쨌든 금요일 저녁입니다. 주말 작업이 예정되어 있더라도 조금은 쉬어갈수 있길 바라겠습니다',
        status: AUCTION_STATE.OnSale,
        nftToken: 'tokenfake123',
        cropedImagePath: Fake2.src,
    },
];
