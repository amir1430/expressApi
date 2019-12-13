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
    const changeUser = { changeUser: req.body.changeUser };

    var x = await db.collection('users')
        .findOne(user);

    if (x) {
        await db.collection('users').updateOne(
            { '_id': x._id },
            { $set: { "username": changeUser.changeUser } }
            , function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
            }
        );
    }
    if (!x) return res.status(404).json({ result: 'not found' });

    res.status(200).json({ "result": `user \'${user.username}\' updated to \'${changeUser.changeUser}\'` });
});

route.delete('/user', async (req, res, next) => {
    const user = { username: req.body.username };

    var x = await db.collection('users')
        .findOne(user);
    if (x) {
        await db.collection('users').deleteOne(user,
            function (err, res) {
                if (err) throw err;
                console.log("1 document deleted");
            });
    }
    if (!x) return res.status(404).json({ result: 'not found' });

    res.status(200).json({ "result": `user \'${user.username}\'` });
});


module.exports = route;



 // var x = users.findIndex(c => c.name === req.body.name);
    // console.log(x);


       // const x = users.find(c => c.name === req.body.name);
    // const index = users.indexOf(x);
    // if (!x) return res.status(404).json({ result: 'not found' });

    // users.splice(index, 1);
    // console.log(x);
