const { findById, findOne } = require("../models/appointement");
const RDV = require("../models/appointement");
const User = require("../models/users");


exports.prise = ((req, res, next) => {
    console.log(req.body)
    const rdv = new RDV(req.body);
    rdv.userId = req.auth.userId
    rdv.valid = false
    rdv.waiting = true
    User.findOne({ _id: req.auth.userId })
        .then((user) => {
            if (!user) {
                res.status(200).json({ "erreur": "authentication error" })
            }
            else {
                if (user._doc.rdv) {
                    user._doc.rdv = false
                    User.updateOne({ _id: req.auth.userId }, { ...user._doc })
                        .then(() => {
                            rdv.save()
                                .then(() => res.status(201).json({ "message": "done , your appointment will be reviewed and you'll soon be called" }))

                        })

                }
                else {
                    res.status(201).json({ "erreur": "you can only make one appointment" })
                }
            }
        })
})
exports.decision = ((req, res, next) => {
    const rdv_id = req.query.id
    const rdv_decision = req.query.decision
    RDV.findOne({ _id: rdv_id })
        .then((rdv) => {
            var rdv = rdv._doc
            if (rdv_decision == '1') {
                rdv.valid = true
            }
            else {
                if (rdv_decision == '0') {
                    rdv.valid = false
                }
                else {
                    res.status(500).json({ "error": "unknown decision" })
                }
            }
            rdv.waiting = false
            RDV.updateOne({ _id: rdv_id }, { ...rdv })
                .then(() => { res.status(200).json({ "message": "operation effectuer" }) })
        })
})

exports.show = ((req, res, next) => {
    RDV.find()
        .then((objet) => {
            res.status(200).json(objet)

        })
        .catch((error) => res.status(400).json(error));
})