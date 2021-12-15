# Star Wars

## How to run

To run the application, please execute the following command:

```sh
cd src/
yarn dev
```

## Bugs

For some reason, swapi always returns `hasPreviousPage = false`, so our pagination just moves forward. I couldn't find a rapid solution for this. I've removed the logic to hide the `Go to previous page` button to the table to be usable.