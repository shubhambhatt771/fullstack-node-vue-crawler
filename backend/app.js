const express = require('express');
const cors = require('cors');
const app = express();
const { config } = require("dotenv");
const { elasticClient, updateMappings, checkTableExists, getTableDocs, addDataToDb, getDocById } = require('./utils/elasticClient.js');
const { myEmmiter } = require('./utils/eventEmitter.js');
const { setupCrawler } = require('./utils/crawler.js');
const {sequelize} = require('./models');
const { appRoutes } = require('./routes/index.js');

config();

app.use(cors());
app.use(express.json());
setupCrawler();


sequelize.sync({alter:true}).then(async ()=>{
    console.log('sequelize models synced with database');
    await elasticClient.ping();
    await checkTableExists();
    myEmmiter.emit('db-synced')
})


const PORT = process.env.PORT ?? 5000;

app.use('/', appRoutes);

app.listen(PORT, ()=>{
    console.log('server is listening on port ', PORT);
})