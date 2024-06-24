const express = require('express');
const { clientRoutes } = require('./client.routes');
const router = express.Router();

router.use('/clients', clientRoutes);
router.get('/', (req,res)=>{
    res.status(200).send('Server is up and running !!');
})

exports.appRoutes = router;