interface rgbType {
    [key: string]: number;
}

const isSelectBlack = (rgb: rgbType) => {
    let L = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return L > 128;
};
const getAvgColor = (imgSrc: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imgSrc;
    const blockSize = 5;
    const rgb: rgbType = { r: 0, g: 0, b: 0 };
    let i = 0;

    if (!context || !img) {
        return rgb;
    }
    return new Promise((resolve, reject) => {
        img.onload = () => {
            let count = 0;
            const height = img.height || img.naturalHeight;
            const width = img.width || img.naturalWidth;
            context.canvas.height = height;
            context.canvas.width = width;
            context.drawImage(img, 0, 0);
            let data = context.getImageData(0, 0, width, height).data;
            if (data) {
                while ((i += blockSize * 4) < data.length) {
                    count++;
                    rgb.r += data[i];
                    rgb.g += data[i + 1];
                    rgb.b += data[i + 2];
                }
                rgb.r = ~~(rgb.r / count);
                rgb.g = ~~(rgb.g / count);
                rgb.b = ~~(rgb.b / count);
                resolve(rgb);
            }
        };
    });
};

export const setColorFromImage = async (imgSrc: string) => {
    const color = (await getAvgColor(imgSrc)) as rgbType;
    return isSelectBlack(color ? color : { r: 0, g: 0, b: 0 });
};
