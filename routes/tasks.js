const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.post('/create', async (req, res) => {
    try{
        const task = await Task.create({...req.body, completed: false})
        res.status(201).send(task)
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async(req, res) => {
    try {
        const task = await Task.find();
        res.send(task)
    } catch (error) {
        console.log(error)
    }
})

router.get('/id/:_id', async (req, res) => {
    try {
        const id = req.params;
        const task = await Task.findById(id)
        res.json(task);
    } catch (error) {
        console.log(error)
    }
})

router.put('/markascompleted:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const updatedTask = await Task.findByIdAndUpdate(
        id, {
            completed: true
        }, {new: true}
    )
    if(!updatedTask) {
        return res.status(404).json({message: "Task id not found"})
    }
    res.json(updatedTask)
    } catch (error) { 
        console.log(error)
    }
})

router.put('/id/:_id', async (req, res) => {
    try{
        const id = req.params._id
        const title = req.body.title
        const updateTitleTask = await Task.findByIdAndUpdate(id, {
            title
        }, {new: true})
        res.json(updateTitleTask)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/id/:_id', async (req, res) => {
    try {
      const id = req.params._id
      const deletedTask = await Task.findByIdAndDelete(id)
      if (!deletedTask) {
        return res.status(404).json({message: "Task with that id not found"})
      }  
      res.json({message: 'Task deleted successfully'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router