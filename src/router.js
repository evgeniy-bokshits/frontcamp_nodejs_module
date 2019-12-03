const express = require('express');
const path = require('path');

const router = express.Router();
const newsDataResponse = require('./data/news');
const logger = require('./logger');

router.use(({ path }, res, next) => {
    logger.info(path);
    next();
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/templates/welcome.html'));
});

router.get('/news', (req, res) => {
    res.send(JSON.stringify(newsDataResponse));
});

router.get('/news/:id', ({ params: { id } }, res) => {
    const itemByID = newsDataResponse.find(({ id }) => id === id);
    res.send(JSON.stringify(itemByID));
});

router.post('/news', (req, res) => {
    res.send('Post req has been completed!');
});

router.put('/news/:id', ({ params: { id } }, res) => {
    newsDataResponse.push(JSON.parse(`
        {
            "id": "${id}",
            "author": "Katie Engelhart",
            "content": "Thousands of Americans are discharged against their wishes or evicted from nursing homes each year. “Most people don’t even know they have rights,” a vice president at the AARP Foundation said.",
            "publishedAt": "2019-11-25T09:30:00Z",
            "source": {
                "id": "nbc-news",
                "name": "NBC News"
            },
            "title": "Some nursing homes are illegally evicting elderly and disabled residents who can't afford to pay - NBC News"
        }`));
    res.status(200).send(newsDataResponse);
});

router.delete('/news/:id', ({ params: { id } }, res) => {
    let itemsWithoutRemoved = newsDataResponse.filter((el) => {
        return el.id !== id;
      });
    res.json(itemsWithoutRemoved);
});

module.exports = router;