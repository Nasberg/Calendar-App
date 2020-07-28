const express = require('express');
const eventsController = require('./controllers/eventsController');

const app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
eventsController(app);

// listen to port
app.listen(3000, () => {
  console.log('Server running on port 3000')
});
