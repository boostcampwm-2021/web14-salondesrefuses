import React, { useRef } from 'react';
import styled from '@emotion/styled';

import Tiles from '../Tiles';

interface UploaderProps {
    handleNewImage: (image: File) => void;
}

const Uploader = ({ handleNewImage }: UploaderProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onClickFileInput = (e: React.MouseEvent) => {
        e.stopPropagation();
        inputRef.current!.click();
    };

    const onChangeFile = (e: React.FormEvent) => {
        inputRef.current?.files && handleNewImage(inputRef.current?.files[0]);
    };

    return (
        <Container>
            <FileInput onClick={onClickFileInput}>
                <input
                    type="file"
                    name="newArtwork"
                    ref={inputRef}
                    onChange={onChangeFile}
                />
                <img src="/icons/add.png" alt="add" />
            </FileInput>
            <Tiles />
        </Container>
    );
};

const Container = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 45px;
`;

const FileInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    height: 100px;
    border: 1px dashed black;
    margin-bottom: 20px;
    cursor: pointer;

    & > input {
        position: absolute;
        visibility: hidden;
    }

    & img {
        width: 64px;
        height: 64px;
    }
`;

export default Uploader;
