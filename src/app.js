require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const filtersRouter = require('./routes/api/filtersRouters');
const eventsRouter = require('./routes/api/eventsRouters');
const imageRouter = require('./routes/api/imageRouters');
const usersRouters = require('./routes/api/usersRouters');
const { assertDatabaseConnectionOk } = require('./models');

const app = express();

const PORT = process.env.PORT || 4000;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cookieParser());

const allowedOrigins = [process.env.CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

app.use(express.static('public'));

app.use('/api/filters', filtersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/image', imageRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', usersRouters);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

async function init() {
  await assertDatabaseConnectionOk();

  console.log(`Starting Sequelize on port ${PORT}...`);

  app.listen(PORT, () =>
    console.log(`Server started at: http://localhost:${PORT}`)
  );
}

init();
