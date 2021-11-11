const getRemainingTime = (currentTime: number, deadline: number) => {
    const gap = (deadline - currentTime) / 1000;

    if(gap <= 0) {
        return '00:00:00';
    }

    const days = Math.floor(gap / (60 * 60 * 24));
    const hours = Math.floor(gap % (60 * 60 * 24) / (60 * 60));
    const minutes = Math.floor(gap % (60 * 60) / 60);
    const seconds = Math.floor(gap % 60);

    const remainingHour = days > 0 ? days * 24 + hours : (hours > 9 ? hours : `0${hours}`);
    const remainingMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const remainingSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${remainingHour}:${remainingMinutes}:${remainingSeconds}`;
};

export default getRemainingTime;
