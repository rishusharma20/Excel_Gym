const express = require('express');
const router = express.Router();
const ClassModel = require('../model/class.model'); 
const Trainers = require('../model/trainers.model'); 
router.get('/classes', async (req, res) => {
    try {
        const classes = await ClassModel.find()
            .populate('trainersId', 'trainersName')
            .exec();

        res.json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/delclasses/:id', async (req, res) => {
    try {
        const deletedclass = await ClassModel.findByIdAndDelete(req.params.id);
        if (!deletedclass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
