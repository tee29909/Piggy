const express = require('express');
const router = express.Router();
const piggyBankController = require('../controller/PiggyBankController');



/* GET users listing. */
router.get('/', piggyBankController.getPiggyBanks);
router.get('/:id',piggyBankController.getPiggyBank);
router.get('/PiggyBanksByUserID/:id',piggyBankController.getPiggyBanksByUserID);
router.post('/', piggyBankController.addPiggyBank);
router.put('/', piggyBankController.updatePiggyBank);
router.delete('/:id',piggyBankController.deletePiggyBank);
// eslint-disable-next-line no-undef
module.exports = router;
