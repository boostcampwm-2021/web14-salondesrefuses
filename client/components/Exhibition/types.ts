import { Artwork } from 'interfaces';

export interface SelectArtworkAction {
    type: string;
    payload: Artwork;
}

export interface HoldExhibition {
    title: string;
    startAt: string;
    endAt: string;
    theme: string;
    collaborator: string;
    description: string;
    thumbnailImage: File | null;
    onChangeTitleInput: (e: React.FormEvent) => void;
    onChangeStartAt: (e: React.FormEvent) => void;
    onChangeEndAt: (e: React.FormEvent) => void;
    onChangeTheme: (e: React.FormEvent) => void;
    onChangeCollaborator: (e: React.FormEvent) => void;
    onChangeDescription: (e: React.FormEvent) => void;
    onChangethumbnailImage: (current: HTMLInputElement | null) => void;
}
