require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../swaggerOptions');
const filtersRouter = require('./routes/api/filtersRouters');
const eventsRouter = require('./routes/api/eventsRouters');
const eventTypesRouter = require('./routes/api/eventTypesRouter');
const imageRouter = require('./routes/api/imageRouters');
const usersRouters = require('./routes/api/usersRouters');
const contactsRouters = require('./routes/api/contactsRouters');
const partnersRouters = require('./routes/api/partnersRouters');
const documentsRouters = require('./routes/api/documentsRouters');
const { assertDatabaseConnectionOk } = require('./models');

const app = express();

const keys = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};

const PORT = process.env.PORT || 4000;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const specs = swaggerJsdoc(swaggerOptions);

app.use(logger(formatsLogger));
app.use(cookieParser());

const allowedOrigins = [process.env.CLIENT_URL1, process.env.CLIENT_URL2];

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
    credentials: true,
  })
);

app.use(express.json());

app.use(express.static('public'));

app.use('/api/filters', filtersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/event-types', eventTypesRouter);
app.use('/api/image', imageRouter);
app.use('/api/contacts', contactsRouters);
app.use('/api/partners', partnersRouters);
app.use('/api/documents', documentsRouters);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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
  const server = https.createServer(keys, app);
  server.listen(PORT, () => console.log(`Server started at port:${PORT}`));
}

init();
