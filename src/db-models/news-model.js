const mongoose = require('mongoose');

const NewsModelSchema = new mongoose.Schema({
    author: {
        type: String
    },
    title: {
        type: String
    },
    source: {
        type: String
    }
})

const NewsModel = mongoose.model('news', NewsModelSchema);

exports.NewsModel = NewsModel;