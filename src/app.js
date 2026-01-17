const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const alertRoutes = require('./routes/alert.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/', alertRoutes);

module.exports = app;