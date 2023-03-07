const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://test_dev:test_dev@cluster1.q8g4lhy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect()
const mediaCollection = client.db('fletnix').collection('appdata')
const usersCollection = client.db('fletnix').collection('users')
module.exports = {
    client, mediaCollection, usersCollection
}