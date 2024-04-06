const mongoose = require('mongoose');

const database = async() =>{
    try {
       const connect =  mongoose.connect(process.env.MONGO_URI)
       console.log((await connect).connection.name,"Mongo Success");

    } catch (error) {
        console.log(error);
    }
}

module.exports = database