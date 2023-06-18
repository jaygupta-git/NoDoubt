const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoURI = "mongodb+srv://jay_gajera:Happy108@cluster0.pv37rdy.mongodb.net/Doubtout";

const connectToMongo = () =>{
    mongoose.connect(process.env.mongoURI || mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
