let mongoose = require("mongoose")
let express = require("express")
let router = express.Router()

//import the model
let noteSchema = require("../models/note")

router.route("/").get((req, res) => {
    noteSchema.find(req.params, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route("/create").post((req,res,next) => {
    noteSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route("/note/:id").get((req, res, next) => {
    noteSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route("/delete/:id").delete((req, res, next) => {
    noteSchema.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                deleted_data: data
            })
        }
    })
})


router.route("/edit/:id").put((req, res, next) => {
    noteSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('Successfully Updated')
            res.json(data)
        }
    })
})

module.exports = router;