const express = require('express');

const postRouter = require('./data/post_router.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send(`
    <h2>Web API Posts<h2>
    `)
})

server.use('/api/posts', postRouter);

module.exports = server;