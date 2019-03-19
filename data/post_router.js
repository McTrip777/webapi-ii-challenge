const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error getting posts'
        });

    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: 'Post not found'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error getting posts'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
            res.status(201).json(post);
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error posting posts'
        });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = await Posts.remove(req.params.id);
        if (id > 0) {
          res.status(200).json({ message: 'Post has been deleted' });
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error removing post',
        });
      }
});

router.put('/:id', async (req, res) => {
    try {
      const post = await Posts.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    }
  });


module.exports = router;