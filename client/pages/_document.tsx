import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preload" href="/fonts/Montserrat/Montserrat-Regular.ttf" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/Montserrat/Montserrat-Bold.ttf" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/NotoSansKR/NotoSansKR-Regular.otf" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/NotoSansKR/NotoSansKR-Bold.otf" as="font" crossOrigin="" />
                    <meta charSet="utf-8"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
