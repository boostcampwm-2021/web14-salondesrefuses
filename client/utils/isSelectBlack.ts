interface rgbType {
    [key: string]: number;
}

const calculateL = (color: number) => {
    color /= 255;
    return color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4;
};
export const isSelectBlack = (rgb: rgbType) => {
    let L = 0;
    for (const [key, color] of Object.entries(rgb)) {
        if (key === 'r') L += 0.2126 * calculateL(color);
        if (key === 'g') L += 0.7152 * calculateL(color);
        if (key === 'b') L += 0.0722 * calculateL(color);
        console.log('L:', L);
    }
    return (L + 0.05) / (0.0 + 0.05) > (1.0 + 0.05) / (L + 0.05);
};
