export const getAvgColor = (imgElem: StaticImageData) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imgElem.src;

    const blockSize = 5;
    const rgb = { r: 0, g: 0, b: 0 };
    let count = 0;
    let i = 0;
    const height = imgElem.height;
    const width = imgElem.width;
    if (!context || !imgElem) {
        return rgb;
    }
    img.onload = () => {
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
