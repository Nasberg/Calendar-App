const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://USERNAME:PASSWORD@CLUSTER/DATABASE?retryWrites=true&w=majority');

// mongodb schema for events
const eventsSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  allDay: Boolean,
  description: String,
  icon: String,
  eventFinished: Boolean,
  backgroundColor: String,
  borderColor: String
});

// mongodb model for events
const Events = mongoose.model('maxed_events', eventsSchema);

// initialize encoder parser
const urlEncoderParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
  // render view
  app.get('/', (req, res) => {
    res.render('index');
  });

  // get events from mongodb and pass it to the view
  app.get('/events', (req, res) => {
    Events.find({}, (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  });

  // get event data from the view and add it to mongodb
  app.post('/new-event', urlEncoderParser, (req, res) => {
    const newEvent = Events(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  // get updated event data and save it to mongodb event
  app.put('/update-event/:id', urlEncoderParser, (req, res) => {
    Events.findOneAndUpdate({_id: req.params.id}, req.body, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  // delete the requested event from mongodb
  app.delete('/delete-event/:id', (req, res) => {
    Events.find({_id: req.params.id}).remove((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.get('/todays-events/:date', (req, res) => {
    const dateRegex = new RegExp(req.params.date, 'g');
    Events.find({start: dateRegex}, (err, data) => {
      if (err) throw err;
      const events = data.map(item => item.icon);
      const finished = data.filter(item => item.eventFinished == true);
      const tasks = {
        typeOfEvents: events,
        finishedEvents: [finished.length, data.length]
      };
      res.send(tasks);
    });
  });
}
