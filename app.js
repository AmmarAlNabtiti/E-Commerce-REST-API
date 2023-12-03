const categoryRoutes = require("./routes/categoryRoutes");
const express = require('express');
const app = express();
const globalErrorHandler = require('./controllers/errorControllers');

// LOGGER MIDDLEWARE
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
    console.log(`The env mode now is ${process.env.NODE_ENV}`);
}


// body parser middleware
app.use(express.json());


// MOUNTING  ROUTES
app.use('/api/v1/categories', categoryRoutes);

// THE URL DOES NOT MATCH THE PROVIDED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


// Global error handler
app.use(globalErrorHandler);



module.exports = app; 