# Star Wars

## How to run

To run the application in production mode, please execute the following commands:

```sh
cd src/
yarn build
yarn start
```

It's possible to run in development mode too. `yarn dev`.

Access the URL prompted by the console (usually is http://localhost:3000) and voilá :)

## Bug

For some reason, swapi always returns `hasPreviousPage = false`, so our pagination just moves forward. I couldn't find a rapid solution for this. I've removed the logic to hide the `Go to previous page` button to the table to be usable.

There is a ongoing/open issue for this, looks like a old issue in graphql __i guess__: https://github.com/graphql/graphql-relay-js/issues/58