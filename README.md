# Watson Resume Checker

## Installation

Run `yarn` or `npm i` in the root project directory to install all dependencies
and build the project.

The project also requires a file in `config` called `credentials.json`
which should be a JSON document with the following keys:

 * **url** - The IBM Watson API endpoint to send requests to, for example
   `https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27`.
 * **username** - Your Watson Natural Language Understanding username.
 * **password** - Your Watson Natural Language Understanding password.

## Running

The app can be started with `yarn start` or `npm start` in the root project
directory. By default, the app will run on port 3000, but this can be customised
by setting the environment variable `$PORT`.

## Scripts

The following NPM scripts are provided; they can be run with `yarn run
$script_name` or `npm run $script_name`:

 * **build** - Rebuild the entire project.
 * **build:client** - Rebuild only the frontend.
 * **build:server** - Rebuild only the backend.
 * **clean** - Delete `node_modules` and all build output.
 * **doc** - Generate HTML source code documentation in the `doc` directory.
 * **lint** - Lint the entire project.
 * **lint:client** - Lint only the frontend sources.
 * **lint:server** - Lint only the backend sources.
 * **test** - Run the test suite.
