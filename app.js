const express = require('express');
const bodyParser =  require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // * -- no matter which domain the app that sending the request is running
    // it's allowed to access resources
    res.setHeader('Access-Control-Allow-Origin','*');    
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');    
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    // response is required so that client won't timeout
    // everything is ok and new resource has been created
    res.status(201).json({
        message: 'Post added successfully'
    });
});

// all requests that targeting api/posts path
// will reach this middleware
app.get('/api/posts', (req, res, next) => {
    const posts = [
        {   
            id: 'edf123tr56',
            title: '1st post',
            content: '1st post from server'
        },
        {   
            id: 'edf123tw57',
            title: '2nd post',
            content: '2nd post from server!!!'
        }
    ];
    // there is no need for return
    // the last statement will return
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });
});

module.exports = app;