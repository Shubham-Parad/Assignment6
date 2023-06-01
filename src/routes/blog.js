const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

//get/blog
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const search = req.query.search || '';

        const query = search ? { topic: { $regex: search, $options: 'i' } } : {};
        const blogs = await Blog.find(query).sort({ posted_at: -1 }).skip((page - 1) * 5).limit(5);

        res.json({
            status: 'success',
            result: blogs
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            result: 'Internal server error'
        })
    }
});

//post/blog
router.post('/', async (req, res) => {
    try {
        const { topic, description, posted_at, posted_by } = req.body;

        const blog = new Blog({ topic, description, posted_at, posted_by });
        await blog.save();

        res.status(200).json({
            status: 'success',
            result: blog
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            result: 'Invalid request'
        })
    }
});

// PUT /blog/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { topic, description, posted_at, posted_by } = req.body;

        const blog = await Blog.findByIdAndUpdate(id, { topic, description, posted_at, posted_by }, { new: true });

        if (!blog) {
            return res.status(404).json({ status: 'error', error: 'Blog not found' });
        }

        res.json({ status: 'success', result: blog });
    } catch (error) {
        res.status(400).json({ status: 'error', error: 'Invalid request' });
    }
});

// DELETE /blog/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ status: 'error', error: 'Blog not found' });
        }

        res.json({ status: 'success', result: blog });
    } catch (error) {
        res.status(400).json({ status: 'error', error: 'Invalid request' });
    }
});

module.exports = router;