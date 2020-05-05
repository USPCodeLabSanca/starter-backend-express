const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Routes = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

require('dotenv').config();

const { env } = process;

app.use(express.json());
app.use(cors());

app.use('/api', Routes);

// Local Url
// const backendUrl = `mongodb://${env.MONGO_LOCAL_USER}:${env.MONGO_LOCAL_PASSWORD}@${env.MONGO_LOCAL_URL}/${env.MONGO_LOCAL_DB}`;

// Docker Url
const backendUrl = `mongodb://${env.MONGO_DOCKER_URL}/${env.MONGO_DOCKER_DB}`;

// MongoAtlas Url
// const backendUrl = `mongodb+srv://${env.MONGO_ATLAS_USER}:${env.MONGO_ATLAS_PASSWORD}@${env.MONGO_ATLAS_URL}/${env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;

mongoose.connect(backendUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (e) => {
  console.error('Error connecting to MongoDB!');
  console.error(e);
});

mongoose.connection.on('open', () => {
  console.log('Connected successfuly to MongoDB!');
  app.listen(port, () => {
    console.log(`Now listening at port ${port} for requests!`);
  });
});
