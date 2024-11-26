const express = require('express');
const router = express.Router();

const formController = require('../controllers/formController');

router.get('/add-form', formController.newFormRender);

router.post('/forms',formController.addNewForm);

router.delete('/:id',formController.deleteFrom);

router.get('/forms/:id', formController.formEditRender);

router.put('/forms/:id',formController.editForm);

router.get('/forms', formController.formListRender);

module.exports = router;
