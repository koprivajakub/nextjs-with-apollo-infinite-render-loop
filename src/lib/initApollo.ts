import {
    ApolloClient,
    ApolloClientOptions,
    InMemoryCache,
    NormalizedCacheObject
} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import {ApolloLink} from "apollo-link";

declare const process: {
    browser: boolean;
};

declare const global: {
    fetch: Function;
};

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch;
}

function create(initialState) {
    const httpLink = createHttpLink({
        uri: "https://fakerql.com/graphql",
        credentials: "same-origin"
    });

    const link = ApolloLink.from([
        httpLink
    ]);

    const apolloOptions: ApolloClientOptions<NormalizedCacheObject> = {
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link,
        cache: new InMemoryCache().restore(initialState || {})
    };

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    const client = new ApolloClient(apolloOptions);

    return client;
}

export default function initApollo(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)

    if (!process.browser) {
        apolloClient = create(initialState);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState);
    }

    return apolloClient;
}
