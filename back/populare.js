
const mongo = require('./mongo');
const client = mongo.getClient();


async function populate(){
    console.log("populate mongo");
}

populate();


// mongo = new Mongo();
// mongo.destructor();