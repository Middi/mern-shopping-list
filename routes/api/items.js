const express = require('express');
const router = express.Router();

// Item Model

const Item = require('../../models/item');

// Route GET api/items
// desc get all items
// access public

router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// Route POST api/items
// desc Create Item
// access public

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// Route Delete api/items/:id
// desc Delete Item
// access public

router.delete('/:id', (req, res) => {
   Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({succes: true})))
    .catch(err => res.status(404).json({success: false}))
});

module.exports = router;