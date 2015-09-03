# Pub Buying Club

## Used in this project

- angular
- ui-router
- sass
- gulp
- karma
- protractor

## Setup

you'll need an environment with `node` and `npm` to get this running, latest stable release recommended (at time of writing: 0.12.7 and 2.11.3 respectively).

```
npm install
```

that *should* take care of everything, but you may also manually need to run:

```
npm run postinstall
```

to kickoff loading an injecting the project's `bower` dependencies.

## Usage

To build assets, start up a server, then watch for (and reload on) changes, all you need is:

```
gulp
```

although it may help to have it globally installed `npm install -g gulp`

## Testing

Teting is split into two parts for this project: unit tests, and end-to-end (e2e) tests.

With the exception of [linting](#linting), all the tests will require a selenium instance to be available. The selenium webdriver package is included with protractor in this project's dependencies, but it may require an update. To kick things off, leave the following running in a terminal window

```
npm run setuptest
```

To run the full test suite:

```
npm test
```

### Unit tests

For unit tests with angular we're using `karma`. The basic test in place checks for a single binding that's been set up in the `HomepageController`. Running it you have two options:

```
npm run karma
```

This launches a browser window, which stays open in the background and will run all the unit tests any itme a js file is changed. This is good for use while developing, each usually takes less than a second.

```
npm run karma-single-run
```

As the name suggest, just runs the tests once, and closes the browser window when it's done (this option is the one used in the main test function).

### End-to-end tests

For end-to-end tests we're using `protractor`. The basic test in plact just checks that the page has a non-empty title.

```
npm run protractor
```

### Linting

`eslint` is run both as part of the main test, and on the save of a js file as part of the default `gulp` command. The config used is quite particular, but can easily be change by modifying the `.eslintrc` file. A full list of configuration options is available on the eslint website. To run this test alone:

```
gulp eslint
```
