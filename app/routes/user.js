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

    var x = await db.collection('users')
        .findOne(name);
    if (!x) {
        await db.collection('users')
            .insertOne(name);
    } else {
        return res.status(404).json({ result: `user ${name.username} exist` });
    }

    if (x)

        res.status(201).json({ "result": 'user add :)' });

});

route.put('/user', async (req, res, next) => {
    const user = { username: req.body.username };
    const changeUser = { changeUser: req.body.changeUser };

    var x = await db.collection('users')
        .findOne(user);

    if (x) {
        db.collection('users').updateOne(
            { '_id': x._id },
            { $set: { "username": changeUser.changeUser } }
            , function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
            }
        );
    } else {
        return res.status(404).json({ result: `user \'${user.username}\' not exist` });
    }


    res.status(200).json({ "result": `user \'${user.username}\' changed to \'${changeUser.changeUser}\'` });
});

route.delete('/user', async (req, res, next) => {
    const user = { username: req.body.username };

    var x = await db.collection('users')
        .findOne(user);
    if (x) {
        db.collection('users').deleteOne(user,
            function (err, res) {
                if (err) throw err;
                console.log("1 document deleted");
            });
    } else {
        return res.status(404).json({ result: 'not found' });
    }


    res.status(200).json({ "result": `user \'${user.username}\'` });
});

module.exports = route;
