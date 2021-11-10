export class HoldExhibitionDTO {
    @IsNotEmpty()
    title: string;

    collaborator: string;

    @IsNotEmpty()
    startAt: Date;

    @IsNotEmpty()
    endAt: Date;

    description: string;

    artworks: number[];

    @IsNotEmpty()
    contents: string;

    categories: number[];
}
