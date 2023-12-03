const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


// DB
const DB_URL = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB_URL).then(() => {
    console.log('The database is connected successfully');
}).catch((error) => {
    console.error(`DATABASE_ERROR : ${error.message}`);
    process.exit();
});

// SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});