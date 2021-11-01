import { useRef, useState } from 'react';

const useInputArtwork = (image: File) => {
    const [modalInputData, setModalInputData] = useState<{
        [key: string]: string;
    }>({});

    const titleInputRef = useRef<HTMLInputElement | null>(null);
    const typeInputRef = useRef<HTMLInputElement | null>(null);

    const onClickDone = (e: React.MouseEvent) => {
        const formData = new FormData();
        formData.append('title', titleInputRef.current!.value);
        formData.append('type', typeInputRef.current!.value);
        formData.append('description', modalInputData['description']);
        formData.append('year', modalInputData['year']);
        formData.append('bidEnd', modalInputData['bidEnd']);
        formData.append('image', image);

        // TODO - post FormData to server //
    };

    return {
        setModalInputData,
        titleInputRef,
        typeInputRef,
        onClickDone,
    };
};

export default useInputArtwork;
