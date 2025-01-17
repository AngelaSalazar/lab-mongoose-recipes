const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe.create({
      title: "Arepa", 
      cuisine: "Venezuelan"
    })

      .then(createdRecipe => {
        console.log(createdRecipe)
        return Recipe.insertMany(data) 
      })


      .then (createdRecipes => {
        console.log(createdRecipes)
        return Recipe.findOneAndUpdate(
          {title: "Rigatoni alla Genovese"}, 
          {duration: 100})
      })


        .then(updateRecipe=> {
          console.log(updateRecipe)
          return Recipe.deleteOne({title: "Carrot Cake"})
        })


          .then(deletedMsg => {
            console.log("delete made!")
            })


            .then(disconnecting => {
              mongoose.connection.close()
              .then(() => console.log("disconnected!"))
            })
            
            .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
