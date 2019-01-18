# nextjs-with-apollo-infinite-render-loop
Example repo with purpose to share a code with an issue causing a App.render to loop during server side rendering

## How to reproduce
```sh

# clone the repo
git clone git@github.com:koprivajakub/nextjs-with-apollo-infinite-render-loop.git

# install the dependencies
yarn install

# run the nextjs
yarn dev
```

You will end up with infinite loop rendering the App

To fix it there are two options:
```txt

1. comment out line 34 in src/lib/withApollo.tsx
  //  await this.notWorking(ctx, appProps, apollo);

2. in file src/pages/index.tsx comment out line no. 10 and uncomment line no. 11
  // const id = new Date().getMilliseconds();
  const id = "some fixed string";

```

I am having this problem at different project which requires that the client of an graphQL endpoint send the current time in milliseconds and this behave exactly the same like here. I have tested this and it does not need to be an milliseconds timestamp but also a random string using `uuid v4`
