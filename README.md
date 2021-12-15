# Star Wars

## How to run

To run the application, please execute the following command:

```sh
cd src/
yarn dev
```

## Bugs

For some reason, swapi always returns `hasPreviousPage = false`, so our pagination just move forward. I couldn't find a solution for this, but the codebase is prepare to handle the right response for `hasPreviousPage`