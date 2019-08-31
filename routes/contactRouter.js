const express = require('express')
const contactRouter = express.Router()
const Contact = require('../models/contact.js')


contactRouter.get("/", (req, res, next) => {
    Contact.find((err, contacts) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
      return res.status(200).send(contacts)  
    })
})

contactRouter.get("/:_id", (req, res, next) => {
    Contact.findOne({_id: req.params._id}, (err, foundContact) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundContact)
    } )
})


contactRouter.post("/", (req, res, next) => {
    const newContact = new Contact (req.body)
    newContact.save((err, savedContact) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedContact)
    })
})

contactRouter.get("/search/:search", (req, res, next) => {
    const { search } = req.params
    const pattern = new RegExp(search)
    Contact.find(
        {
            firstName: {$regex: pattern, $options: 'i'},
            lastName:  {$regex: pattern, $options: 'i'}
        }, (err, contacts) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(contacts === null){
                Contact.find({firstName: req.params.search}, (err, contacts) => {
                    if(err){
                        res.status(500)
                        return next(err)
                    }
                    if(contacts){
                        return res.status(200).send(contacts)
                    } else {
                        return res.send("Nothing found!")
                    }
                })
            } else {
                return res.status(200).send(contacts)
            }
        })
})



module.exports = contactRouter