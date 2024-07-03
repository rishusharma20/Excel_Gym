const express = require('express');
const router = express.Router();
const Trainers = require('../model/trainers.model');
router.get('/trainers', async (req, res) => {
    try {
        const trainers = await Trainers.find();
        res.json(trainers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
router.delete('/deltrainers/:id', async (req, res) => {
    try {
        const deletedTrainer = await Trainers.findByIdAndDelete(req.params.id);
        if (!deletedTrainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
module.exports = router;