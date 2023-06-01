const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic: {type: String, required: true},
    descrption: {type: String, required: true},
    posted_at: {type: Date, required: true},
    posted_by: {type: String, required: true},
})

const Blog = mongooose.model('Blog', blogSchema);

module.exports = Blog;