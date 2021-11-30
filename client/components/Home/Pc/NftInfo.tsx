import React from 'react';
import { Contents, FlexWrapper, NFTContainer } from './styles';

const NftInfo = () => {
    return (
        <NFTContainer>
            <FlexWrapper>
                <img src="/icons/nft.png" />
                <Contents>
                    <h1>NFT를 사용한 이유</h1>
                    <p>
                        블록체인은 복제가 어렵기 때문에 희소성을 더 잘 보장할 수 있고, <br />
                        위조품으로 인해 가치가 무너지지 않도록 보장할 수 있습니다.
                    </p>
                    <p>
                        블록체인의 데이터는 공개적이고 투명하며 누구나 NFT의 출처, <br />
                        발행 시간 및 획수, 소유자 내역 및 기타 정보를 볼 수 있습니다.
                    </p>
                    <p>
                        ⇒ 이러한 NFT토큰 특성을 이용하면 이 작품의 소유자 내역 및 발행 일자를 통하여 진위여부가 가능한
                        인증서 역할을 할 수 있다고 생각했습니다.
                    </p>
                </Contents>
            </FlexWrapper>
        </NFTContainer>
    );
};

export default NftInfo;
