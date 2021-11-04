import Fake1 from '@assets/images/fake1.png';
import Fake2 from '@assets/images/fake2.jpeg';
import Fake3 from '@assets/images/fake3.png';
import Fake4 from '@assets/images/fake4.png';
import Fake5 from '@assets/images/fake5.png';

interface randomExhibitionType {
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
