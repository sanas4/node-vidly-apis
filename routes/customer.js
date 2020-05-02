const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Customer} = require('../models/customer');
const express = require('express');
const router = express.Router();

// get customer list
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// add customer
router.post('/', auth, async (req, res) => {
    /*const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);*/

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();

    res.send(customer);
});

// update customer
router.put('/:id', auth, async (req, res) => {
    /*const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
*/
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, {new: true});

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

// delete customer
router.delete('/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

// get customer by ID
router.get('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

module.exports = router;
