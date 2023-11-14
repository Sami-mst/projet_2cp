const Feedback = require("../models/feedback");
const users = require('../models/users')
const bcrypt = require('bcrypt')

exports.change = ((req, res, next) => {
    if (req.body.new != req.body.new_c) {
        res.status(200).json({ "erreur": "password not the same" })
    }
    else {
        users.findOne({
            _id: req.auth.userId
        })
            .then((user) => {
                bcrypt.compare(req.body.old, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ "erreur": "incorrect password" })
                        }
                        else {
                            bcrypt.hash(req.body.new, 10)
                                .then(hash => {
                                    user._doc.password = hash
                                    users.updateOne({ _id: req.auth.userId }, { ...user._doc })
                                        .then(() => res.status(400).json({ "message": "password changed" }))
                                        .catch(error => res.status(400).json({ "error": "can't save" }))
                                })


                        }
                    })
            })

            .catch((e) => { res.status(500).json({ ...e }) })
    }
})
exports.show = ((req, res, next) => {

    Feedback.find()
        .then((objet) => res.status(200).json(objet))
        .catch((error) => res.status(400).json(error))
})

