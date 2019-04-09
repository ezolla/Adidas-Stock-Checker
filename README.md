# Adidas Stock Checker

Monitor your favorite twitter accounts easily, with discord webhook integration!

## Getting Started

These instructions will get you a copy of the stock checker up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to have [nodejs](https://nodejs.org/en/) installed in order to run. You will also need npm but this is installed with nodejs.

### Installing

First you will clone or download this repository, then open your favorite text editor, mine is [vscode](https://code.visualstudio.com/). Then open up the console and do the following command.

```
npm install
```

Now you will need to add your discord application bot token which you can find [here](https://discordapp.com/developers/applications/) and either create a new application or use an existing one.

## Deployment

If you would like to run this 24/7 off your personal machine I would reccomend using the free credit given with google cloud, and create a server. You can make sure it runs all the time with a npm package named PM2 which will restart if errors or crashes happen.

## Built With

- [Request-Promise](https://www.npmjs.com/package/request-promise) - Request Library
- [Nodejs](https://nodejs.org/en/) - Javascript Runtime Environment
- [NPM](https://www.npmjs.com/) - Node Package Manager
- [Chalk](https://www.npmjs.com/package/chalk) - Console Colors
- [Moment](https://www.npmjs.com/package/moment) - Console Timestamps

## Authors

- **Ethan Zoller** - [Twitter](https://twitter.com/exhwn)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
