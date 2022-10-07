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
    return Recipe.create({title:'Spageti Pomodoro', level: 'Amateur Chef', ingredients:['spageti', 'pomodoro', 'parmesano'], image:"https://images.media-allrecipes.com/images/75131.jpg", duration:10, creator: '07/10/2022'})
  })
  .then ((resultat)=> {
    console.log(resultat.title);
  })
  .then(()=>{
    return Recipe.insertMany(data);
  })
  .then((resulta)=>{
    console.log(resulta.title);
  })
  .then(()=>{
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then((resulte)=>{
    console.log(resulte.duration);
  })
  .then(()=>{
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then((res)=>{
    console.log(res.title , ' eliminat')
  })
  

  //// Aqui tanquem
  process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log("close!");
        process.exit(0);
    })
  })

  /// No se com saber si la ultima iteració (la de tancar el programa) m'ha sortit be.


  







  // abans d'aqui
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

