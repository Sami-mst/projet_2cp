const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const cookieParser = require('cookie-parser')


var gen_token = () => {
    var token = "";
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}
exports.Auth = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decodedjwt = jwt.verify(token, "123")
        req.auth = {
            userId: decodedjwt.userId
        }

        next()
    }
    catch (error) {
        console.log(error)
        res.status(401).json({ "erreur": "not authorized" })
    }
})

exports.Create = ((req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const token = gen_token()
            const user = new User({
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash,
                confirmation_code: token,
            })
            req.token = token
            user.save()
                .then(next())
                .catch(error => res.status(400).json({ "erreur": "email already in use" }))
        })

})
exports.Login = ((req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({ "erreur": "bad email or password" })
            }
            else {
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
                                verified: user.verified,

                            })

                        }
                    })
                    .catch(error => { res.status(200).json({ "erreur": "password is wrong" }) })
            }
        })
        .catch()
})


