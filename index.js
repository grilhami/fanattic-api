const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
const bearerToken = require('express-bearer-token');
// const config = require('./config.json');

const port = process.env.PORT || 4771;
const environment = process.env.NODE_ENV || 'development';

const app = express({ defaultErrorHandler: false });

const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

app.use(
  logger('dev', {
    skip: req => {
      return req.url.includes('images');
    },
  }),
);
app.use(bodyParser.json({ limit: '500mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(express.json({ limit: '500mb' }));
app.use(express.static('public'));
app.use(bearerToken());

app.set('etag', false);
app.use(cors());
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Accept-Version, Authorization, Content-Length, Cache-Control, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token',
  );
  next();
});

const models = require('./models');

models.sequelize
  .sync()
  .then(() => {
    console.log('Sequelize sync success. Database looks fine');
  })
  .catch(err => {
    console.log(err, 'Something wrong with database update');
  });

app.get('/', (req, res) => {
  res
    .status(200)
    .send(`Welcome to Fanattic API Running in ${environment} mode`);
});

const { userRoute, postRoute, merchandiseRoute } = require('./routes');

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/merchandise', merchandiseRoute);

app.listen(port, () =>
  console.log(
    `Fanattic API listening on port ${port}! Running in ${environment} mode`,
  ),
);
