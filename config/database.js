let demo = require("jm-ez-mysql");

// Init DB Connection
demo.init({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
});
