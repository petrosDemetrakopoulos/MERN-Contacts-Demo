const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//adding some useful middlewares
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({ message: 'API is alive' });
});

require('./routes/routes.js')(app)
const port = 8080;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

module.exports = app