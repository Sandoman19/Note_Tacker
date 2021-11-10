const express = require('express');
// Routes 
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// set up express App
const app = express();
// Sets an dafault port.
const PORT = process.env.PORT || 3000;

// set up express app for parsing 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// points to "route" files
app.use("/api",apiRoute);
app.use("/",htmlRoute);

// App listener to start server
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`)
});