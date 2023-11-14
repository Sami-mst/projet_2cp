const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const ArticleRouter = require('./routes/RouteArticles')
const UserRouter = require('./routes/RouteUsers')
const FeedbackRouter = require('./routes/RouteFeedbacks')
const RDVRouter = require('./routes/RouteRDV')
const ChangeRouter = require('./routes/RouteChange')
const AdminRouter = require('./routes/RouteAdmin')
const cors = require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', process.env.frontend); /*http://10.5.1.120:5500*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Cookies, Cookie');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth/', UserRouter)
app.use('/api/article/', ArticleRouter)
app.use('/api/feedback/', FeedbackRouter)
app.use('/api/RDV/', RDVRouter)
app.use('/api/change/', ChangeRouter)
app.use('/api/admin/', AdminRouter)


module.exports = app;