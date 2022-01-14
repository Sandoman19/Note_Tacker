const express = require('express');
// set up express App
const app = express();
// Routes 
const apiRouter = require('./routes/apiRoutes');
const htmlRouter = require('./routes/htmlRoutes');

// Sets an dafault port.
const PORT = process.env.PORT || 3000;

// set up express app for parsing 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// points to "route" files
app.use("/api",apiRouter);
app.use("/",htmlRouter);

// App listener to start server
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`)
});