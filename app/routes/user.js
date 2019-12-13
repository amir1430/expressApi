const express = require('express');
const assert = require('assert');
const route = express();
const db = require('../../models/database');


var users = [];


route.get('/user', async (req, res, next) => {
    var items = [];
    var x = await db.collection('users')
        .find({})
        .forEach((docs, err) => {
            assert.equal(null, err);
            items.push(docs);

        });

    res.status(200).json({ res: items });
});

route.post('/user', async (req, res, next) => {
    const name = { username: req.body.name }
    console.log(name);

    var x = await db.collection('users')
        .insertOne(name);
    console.log(x);
    if (!x) return res.status(404).json({ result: 'not found' });

    res.status(201).json({ "result": 'user add :)' });

});

route.put('/user', async (req, res, next) => {
    const user = { username: req.body.username };


    var x = await db.collection('users')
        .findOne(user);

    console.log(x);
    if (!x) return res.status(404).json({ result: 'not found' });

    res.status(200).json({ "method": x });
});

route.delete('/user', (req, res, next) => {
    res.status(200).json({ "method": req.method });
});


module.exports = route;



 // var x = users.findIndex(c => c.name === req.body.name);
    // console.log(x);


       // const x = users.find(c => c.name === req.body.name);
    // const index = users.indexOf(x);
    // if (!x) return res.status(404).json({ result: 'not found' });

    // users.splice(index, 1);
    // console.log(x);
