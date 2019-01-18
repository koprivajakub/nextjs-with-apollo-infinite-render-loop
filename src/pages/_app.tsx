import App, {Container} from "next/app";
import React from "react";
import {ApolloProvider} from "react-apollo";
import NProgress from "nprogress";
import Router from "next/router";


import withApolloClient from "lib/withApollo";
import Head from "next/head";

import "styles/app.scss";
import {ApolloProps} from "types/lib/apollo";

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App<ApolloProps> {
    render() {
        console.log("Starting rendering of the web.");
        const {
            Component,
            pageProps,
            apollo,
        } = this.props;

        return (
            <div>
                <Head>
                    <title key={"title"}>EMU</title>
                </Head>
                <Container>
                    <ApolloProvider client={apollo}>
                        <div>
                            <div className="wrapper">
                                <Component {...pageProps} />
                            </div>
                        </div>
                    </ApolloProvider>
                </Container>
            </div>
        );
    }
}

export default withApolloClient(MyApp);
