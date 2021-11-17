const MINUTE = 60000;

export const getRemainingTime = (currentTime: number, deadline: number) => {
    const gap = (deadline - currentTime) / 1000;

    if (gap <= 0) {
        return '00:00:00';
    }

    const days = Math.floor(gap / (60 * 60 * 24));
    const hours = Math.floor((gap % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((gap % (60 * 60)) / 60);
    const seconds = Math.floor(gap % 60);

    const remainingHour =
        days > 0 ? days * 24 + hours : hours > 9 ? hours : `0${hours}`;
    const remainingMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const remainingSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${remainingHour}:${remainingMinutes}:${remainingSeconds}`;
};

export const calcBidDate = (bidDate: number) => {
    const now = Date.now();
    const gap = (now - bidDate) / 1000;

    const days = Math.floor(gap / (60 * 60 * 24));
    if (days > 0) {
        return `${days}일 전`;
    }

    const hours = Math.floor(gap / (60 * 60));
    if (hours > 0) {
        return `${hours}시간 전`;
    }

    const minutes = Math.floor(gap / 60);
    if (minutes > 0) {
        return `${minutes}분 전`;
    }

    const seconds = Math.floor(gap % 60);
    if (seconds > 0) {
        return `${seconds}초 전`;
    }

    return '방금 전';
};

export const checkTimeDeltaUnderOneMinute = (endDate: Date, bid: number) => {
    const endTimestamp = new Date(endDate).valueOf();
    if (endTimestamp - bid < MINUTE) return true;
    return false;
};
