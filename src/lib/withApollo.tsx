import React from "react";
import PropTypes from "prop-types";
import {getDataFromTree} from "react-apollo";
import Head from "next/head";

import initApollo from "lib/initApollo";
import {AppProps, default as NextApp, DefaultAppIProps, NextAppContext} from "next/app";
import getApplicationDisplayName from "lib/getApplicationDisplayName";
import {ApolloProps} from "types/lib/apollo";
import ApolloClient from "apollo-client/ApolloClient";
import {NormalizedCacheObject} from "apollo-boost";

export default (App: typeof NextApp) => {
    return class WithData extends React.Component<ApolloProps & AppProps & DefaultAppIProps> {
        static displayName = `WithData(${getApplicationDisplayName(App)})`;
        static propTypes = {
            apolloState: PropTypes.object.isRequired
        };
        apollo: ApolloClient<any>;

        static async getInitialProps(ctx: NextAppContext) {

            const apollo: ApolloClient<NormalizedCacheObject> = initApollo({});

            const appProps = {
                pageProps: {}
            };

            if (ctx.ctx.res && ctx.ctx.res.finished) {
                return {};
            }
            if (!process.browser) {
                try {
                    // this.working();
                    await this.notWorking(ctx, appProps, apollo);
                } catch (error) {
                    console.error(
                        "Server side rendering failed due to an error.",
                        error
                    );
                }

                Head.rewind();
            }

            const apolloState = apollo.cache.extract();

            return {
                ...appProps,
                apolloState
            };
        }

        static async working() {
        };

        static async notWorking(ctx, appProps, apollo) {
            await getDataFromTree(
                <App
                    // @ts-ignore // FIXME: will not resolve the possible null for now
                    {...appProps}
                    Component={ctx.Component}
                    router={ctx.router}
                    apollo={apollo}
                />
            );
        }


        constructor(props) {
            super(props);
            this.apollo = initApollo(props.apolloState);
        }

        render() {
            return <App {...this.props} apollo={this.apollo}/>;
        }
    }
};
