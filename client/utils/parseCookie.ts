const parseCookie = () => {
    let cookieObject: { [key: string]: string } = {};
    document.cookie.split(/;/gi).forEach((str: string) => {
        const [key, value] = str.split('=');
        cookieObject[key.trim()] = value.trim();
    });

    return (key: string): string | undefined => {
        console.log(cookieObject);
        return cookieObject[key];
    };
};

export default parseCookie;
