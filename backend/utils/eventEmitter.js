const EventEmitter = require('events');

const myEmmiter = new EventEmitter();

myEmmiter.on('db-synced', ()=>{
    myEmmiter.emit('start-crawling');
})

exports.myEmmiter = myEmmiter;