const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://admin:admin@198.143.183.248/';
const dbname = 'api';


const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect((err) => {
    assert.equal(null, err);
    console.log('connected');

});
// client.db('api').createCollection('users');
module.exports = client.db('api');

