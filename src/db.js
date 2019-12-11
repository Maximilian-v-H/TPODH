const express = require('express');

function createRouter(db) {
    const router = express.Router();
    // the routes are defined here

    router.post('/post/:uid', (req, res, next) => {
        const owner = req.params.id;
        db.query(
            'INSERT INTO posts (uid, name, description, date) VALUES (?,?,?,?)',
            [req.body.uid, req.body.name, req.body.description, new Date(req.body.date)],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.get('/post', function (req, res, next) {
        db.query(
            'SELECT * FROM posts ORDER BY date LIMIT 10 OFFSET ?',
            [10*(req.params.page || 0)],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.put('/post/:id/:pid', function (req, res, next) {
        const owner = req.params.id;
        db.query(
            'UPDATE posts SET name=?, description=?, date=? WHERE id=? AND uid=?',
            [req.body.name, req.body.description, new Date(req.body.date), req.params.pid, owner],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.delete('/post/:id/:pid', function (req, res, next) {
        const owner = req.params.id;
        db.query(
            'DELETE FROM posts WHERE id=? AND uid=?',
            [req.params.pid, owner],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.post('/user', function (req, res, next) {
        db.query(
            'INSERT INTO users (uusername, upassword) VALUES (?, ?)',
            [req.body.uusername, req.body.upassword],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.get('/users', function (req, res, next) {
        db.query(
            'SELECT * FROM users ORDER BY uusername LIMIT 10 OFFSET ?',
            [10*(req.params.page || 0)],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.get('/user', function (req, res, next) {
        db.query(
            'SELECT * FROM users WHERE uusername=? AND upassword=?',
            [req.body.uusername, req.body.upassword],
            (error, results) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.put('/user/:id', function (req, res, next) {
        db.query(
            'UPDATE users SET uusername=?, upassword=? WHERE uid=?',
            [req.body.uusername, req.body.upassword, req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.delete('/user/:id', function (req, res, next) {
        db.query(
            'DELETE FROM users WHERE uid=?',
            [req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;