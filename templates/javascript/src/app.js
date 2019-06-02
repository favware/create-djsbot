const { config } = require('dotenv');
const path = require('path');
const DiscordBot = require('./DiscordBot');

config({
  path: path.join(__dirname, '..', '.env'),
  encoding: 'utf8',
  debug: false
});

new DiscordBot(process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_TOKEN : process.env.PRODUCTION_TOKEN).init();
