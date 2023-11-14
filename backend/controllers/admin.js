const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.Auth = ((req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decodedjwt = jwt.verify(token, "123")
        if ("6458adeaf43f5036fe76f5b3" === decodedjwt.userId.toString()) {
            next()
        }
        else {
            res.status(401).json({ "erreur": "unauthorized" })
        }
    }
    catch {
        res.status(401).json({ "erreur": "unauthorized" })
    }

})
exports.Login = ((req, res, next) => {

    User.findOne({ _id: "6458adeaf43f5036fe76f5b3" })
        .then(user => {
            if (!user) {
                res.status(401).json({ "erreur": "no admin" })
            }
            else {
                if (user._doc.email == req.body.email) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({ "erreur": "bad email or password" })
                            }
                            else {
                                res.status(200).json({
                                    token: jwt.sign(
                                        {
                                            userId: user._id,

                                        },
                                        "123",
                                        { expiresIn: "24h" }),
                                    userId: user._id,

                                })

                            }
                        })
                        .catch(error => { res.status(200).json({ "erreur": "bad email or password" }) })
                }
                else { res.status(200).json({ "erreur": "bad email or password" }) }
            }
        })
        .catch()
})

