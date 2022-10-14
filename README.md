## Introduction

This app provides instant word definitions for any youtube video (*in portuguese).
This was created as a satire to comments about 'obscene' language in recent videos.

## Stack

Mongo, Nestjs, VueJs, Nodejs 

## Installation

```bash
$ npm install
```

## Running the app

To run the app you should first setup the vocabulary with 'npm run preload'

```bash

$ npm run preload  

```

Which will load all necessary data for the for the correct execution of the app 

this could take up to 4 hours!

After loading the data (preferrably), use the following to start in watch mode.

```bash

$ npm run start:dev

```

The app is served locally on port 3000.

## Running Tests

```bash
    $ npm run test

    # test coverage
    $ npm run test:cov
```
