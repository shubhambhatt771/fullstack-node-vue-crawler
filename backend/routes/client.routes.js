const express = require('express');
const { elasticClient } = require('../utils/elasticClient');
const { getClients, deleteClient, getClientById, getClientCategories, getClientSubCategories, getClientStatuses, getCompanyClass, getClientRocs, updateClient, addClient } = require('../controllers/company.controller');

const router = express.Router();

router.get('/', getClients);
router.post('/', addClient);
router.get('/categories', getClientCategories);
router.get('/sub-categories', getClientSubCategories);
router.get('/status', getClientStatuses),
router.get('/rocs', getClientRocs)
router.get('/class', getCompanyClass);

router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

exports.clientRoutes =router;