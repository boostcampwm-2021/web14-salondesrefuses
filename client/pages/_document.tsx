import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { cache } from '@emotion/css';

const renderStatic = async (html: any) => {
    if (!html) throw new Error('Must retrn html from renderToString');
    const { extractCritical } = createEmotionServer(cache);
    const { ids, css } = extractCritical(html);

    return { html, ids, css };
};

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const page = await ctx.renderPage();
        const { css, ids } = await renderStatic(page.html);
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style data-emotion={`css ${ids.join('  ')}`} dangerouslySetInnerHTML={{ __html: css }} />
                </>
            ),
        };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preload" href="/fonts/Montserrat/Montserrat-Regular.woff2" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/Montserrat/Montserrat-Bold.woff2" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/NanumGothic/NanumGothic.woff2" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/NanumGothic/NanumGothic-Bold.woff2" as="font" crossOrigin="" />
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
