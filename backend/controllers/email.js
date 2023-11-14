const { verify } = require('jsonwebtoken');
const { get } = require('mongoose');
const nodemailer = require('nodemailer');
const users = require('../models/users')
const Reset = require('../models/reset_token');
const reset_token = require('../models/reset_token');
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const bcrypt = require('bcrypt')

var gen_token = () => {
    var token = "";
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'samimestar123@gmail.com',
        pass: 'ztnlppaglpbqowcn',
    },
});



exports.Send_Confirmation_mail = (req, res, next) => {
    const token = req.token
    console.log(token)
    var mail_confirmation = {
        from: 'samimestar123@gmail.com',
        to: req.body.email,
        subject: 'confirmation mail ',
        text: 'confirm your account : http://' + process.env.backend + '/api/auth/verify_account?code=' + token + '&email=' + req.body.email
    };
    transporter.sendMail(mail_confirmation, function (error, info) {
        if (error) {
            res.status(400).json({ "message": "erreur" })
            console.log(error);
        } else {
            res.status(200).json({ "message": "done , check email" })
            console.log('Email sent: ' + info.response);
        }
    })
}
    ;

exports.validate_account = (req, res, next) => {
    console.log(req.query)
    users.findOne({ email: req.query.email })
        .then(user => {
            if (user.confirmation_code == req.query.code) {
                const verify = { ...user._doc }
                verify.verified = true
                console.log(verify)
                users.updateOne({ email: req.query.email }, { ...verify })
                    .then(() => res.redirect(301, 'http://127.0.0.1:5502/Client.html'))
                    .catch(error => res.status(400).json({ error }));
            }
            else {
                res.status(400).json({ "error": "validation incomplete" })
            }
        })
}

exports.password_reset_request = (req, res, next) => {
    users.findOne({ _id: req.auth.userId })
        .then(user => {
            const reset = gen_token()
            const reset_req = new reset_token({
                userId: user._doc._id,
                token: reset
            })
            //save 
            reset_req.save()
                .then(() => {
                    var mail_confirmation = {
                        from: 'samimestar123@gmail.com',
                        to: user._doc.email,
                        subject: 'password reset',
                        text: 'click here to reset password : ' + reset
                    };
                    transporter.sendMail(mail_confirmation, function (error, info) {
                        if (error) {
                            res.status(400).json({ "erreur": "erreur" })
                            console.log(error);
                        } else {
                            res.status(200).json({ "message": "account created , please check your email to verify it" })
                            console.log('Email sent: ' + info.response);
                        }
                    })
                }

                )
        }
        )
}

exports.change_pass = (req, res, next) => {
    Reset.findOne({ token: req.params.token }).then((reset) => {
        if (reset != null) {
            console.log(reset._doc.userId)
            users.findOne({ _id: reset._doc.userId })
                .then((user) => {
                    console.log(user)
                    if (user != null) {
                        if (req.body.password != null) {
                            bcrypt.hash(req.body.password, 10)
                                .then(hash => {
                                    user._doc.password = hash
                                    console.log(user._doc)
                                    users.updateOne({ _id: user._doc._id }, { ...user._doc })
                                        .then(() => res.status(400).json({ "message": "password changed" }))
                                        .catch(error => res.status(400).json({ "error": "can't save" }))
                                })
                        }
                        else {
                            res.status(200).json({ "message": "entrez votre nouveau mot de passe" })
                        }
                        users.updateOne({ userId: user._doc.userId })
                    }
                    else {
                        res.status(400).json({ "message": "user not found" })
                    }
                })
        }
        else {
            res.status(400).json({ "message": "token not found " })
        }
    })
}