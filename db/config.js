//In a file .env in the root of the project 
// DB_USER=""
// DB_NAME=""
// DB_PASSWORD=""

// install dotenv    npm install dotenv
// use it: 
// require('dotenv').config() 
// process.env.DB_USER

require('dotenv').config()

module.exports = {
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  getUrl: function (){
    return `mongodb+srv://${this.user}:${this.password}@dasw.vlafr2x.mongodb.net/${this.dbName}?retryWrites=true&w=majority&appName=dasw`
  }
}