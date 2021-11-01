import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/Montserrat/Montserrat-Regular.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Montserrat/Montserrat-Bold.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Montserrat/NotoSansKR-Regular.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Montserrat/NotoSansKR-Bold.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <title>벽전 - Salon des Refusés</title>
                    <meta charSet="utf-8"></meta>
                    <body>
                        <Main />
                        <NextScript />
                    </body>
                </Head>
            </Html>
        );
    }
}
