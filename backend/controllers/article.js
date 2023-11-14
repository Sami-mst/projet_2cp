const Article = require("../models/article");
const jwt = require('jsonwebtoken')


exports.publish = ((req, res, next) => {

    const article = new Article(req.body);
    article.date = new Date();
    article.save()
        .then(() => res.status(201).json({ "message": "done" }))
        .catch((error) => res.status(400).json({ "error": error }))
})
