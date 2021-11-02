export class CreateArtworkDTO {
    title: string;
    type: string;
    description: string;
    isRegisterAuction?: boolean;
    startAt?: Date;
    endAt?: Date;
    startBid?: string;
}
