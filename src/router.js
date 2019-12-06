const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const rowParser = bodyParser.json();

const router = express.Router();
const logger = require('./logger');

const passport = require('./auth/passport');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test-user:hellomongo@cluster0-gqkd1.azure.mongodb.net/nodejs_module?retryWrites=true&w=majority', { useUnifiedTopology: true });

const NewsModel = require('./db-models/news-model').NewsModel;

router.use(passport.initialize());

router.use(({ path }, res, next) => {
    logger.info(path);
    next();
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/templates/welcome.html'));
});

router.get('/news', (req, res) => {
    NewsModel.find(function (err, result) {
        if (err) {
            return next(err);
        }

        res.send(JSON.stringify(result));
    });
});

router.get('/news/:id', ({ params: { id } }, res) => {
    NewsModel.findById(id, function (err, result) {
        if (err) {
            return next(err);
        }

        res.send(JSON.stringify(result));
    });
});

router.post('/news', passport.authenticate('local', { failureRedirect: '/error' }), rowParser, (req, res, next) => {
    let news = new NewsModel(req.body);
    news.save(function (err) {
        if (err) {
            next(err);
        }

        res.status(201).send();
    })
});

router.put('/news/:id', rowParser, (req, res) => {
    NewsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result) {
            res.status(200).send();
        }
        else {
            res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `Can't find news with id - ${req.params.id}` }));
        }
    });
});

router.delete('/news/:id', ({ params: { id } }, res) => {
    NewsModel.findByIdAndDelete(id, function (err, result) {
        if (err) {
            return next(err);
        }

        if (result) {
            res.status(200).send();
        } else {
            res.status(404).send(errorCompiledFunction({ statusCode: "404", errorMessage: `No any news` }));
        }
    });
});

module.exports = router;