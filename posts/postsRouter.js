const express = require('express')

const db = require('../data/db')

const router = express.Router()

router.get(`/`,(req, res) => {
    db.find().then(dbres => {
        res.status(200).json(dbres)
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get(`/:id`, (req, res) => {
    const {id} = req.params

    db.findById(id).then(dbres => {
        if(dbres.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." }) 
            return
        }
        res.json(dbres)
    }).catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.post(`/`,(req, res) => {
    const {title, contents} = req.body
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        return
    }
    db.insert(req.body).then(dbres => {
        res.status(201).json(dbres)
    }).catch(err => {
        res.send(500).json({ error: "There was an error while saving the post to the database" })
    })
})

router.put(`/:id`, (req, res) => {
    const {title, contents} = req.body
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        return
    }

    db.update(req.params.id, req.body).then( async dbres => {
        await db.findById(req.params.id).then(post => {
            if(post.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
                return
            }
            res.status(200).json(post)
        })
    }).catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

router.delete(`/:id`, (req, res) => {
    db.remove(req.params.id).then(dbres => {
        if(dbres === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).end()
    }).catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})

module.exports = router