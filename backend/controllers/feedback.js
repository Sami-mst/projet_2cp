const Feedback = require("../models/feedback");
const users = require('../models/users')
exports.publish = ((req, res, next) => {

    var feedback = new Feedback(req.body);
    feedback.userId = req.auth.userId
    feedback.date = new Date()

    users.findOne({ _id: req.auth.userId })
        .then(user => {
            console.log(user._doc.email)
            feedback.name = user._doc.name + " " + user._doc.last_name
            feedback.save()
                .then(() => res.status(201).json({ "message": "done" }))

        })
        .catch(() => { res.status(500).json({ "error": "server error" }) })

})
exports.show = ((req, res, next) => {

    Feedback.find()
        .then((objet) => res.status(200).json(objet))
        .catch((error) => res.status(400).json(error));
})

