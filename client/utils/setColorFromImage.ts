interface rgbType {
    [key: string]: number;
}

const calculateL = (color: number) => {
    color /= 255;
    return color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4;
};
const isSelectBlack = (rgb: rgbType) => {
    let L = 0;
    for (const [key, color] of Object.entries(rgb)) {
        if (key === 'r') L += 0.2126 * calculateL(color);
        if (key === 'g') L += 0.7152 * calculateL(color);
        if (key === 'b') L += 0.0722 * calculateL(color);
    }
    return (L + 0.05) / (0.0 + 0.05) > (1.0 + 0.05) / (L + 0.05);
};
const getAvgColor = (imgSrc: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imgSrc;

    const blockSize = 5;
    const rgb: rgbType = { r: 0, g: 0, b: 0 };
    let count = 0;
    let i = 0;

    if (!context || !img) {
        return rgb;
    }
    img.onload = () => {
        const height = img.height || img.naturalHeight;
        const width = img.width || img.naturalWidth;
        context.canvas.height = height;
        context.canvas.width = width;
        context.drawImage(img, 0, 0);
        let data = context.getImageData(0, 0, width, height).data;
        if (data) {
            while ((i += blockSize * 4) < 70800) {
                ++count;
                rgb.r += data[i];
                rgb.g += data[i + 1];
                rgb.b += data[i + 2];
            }

            rgb.r = ~~(rgb.r / count);
            rgb.g = ~~(rgb.g / count);
            rgb.b = ~~(rgb.b / count);
            return rgb;
        }
    };
};

export const setColorFromImage = (imgSrc: string) => {
    const color = getAvgColor(imgSrc);
    return isSelectBlack(color ? color : { r: 0, g: 0, b: 0 });
};
