// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, {Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <html>
            <Head>
                <title>TEST</title>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        );
    }
}
