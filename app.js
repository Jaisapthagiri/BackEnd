const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6867f7a02a52f398c3c0161e')
    .then(user => {
      if (user) {
        req.user = user;
      }
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect
  ('mongodb+srv://jai652k4:JAIJAI654@cluster0.r6rabuo.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'jai',
          email: 'imjai@gmail.com',
          cart: {
            items: []
          }
        });
        user.save(); 
      }
    });
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
