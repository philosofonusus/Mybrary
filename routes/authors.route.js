const express = require('express')
const router = express.Router()

const Author = require('../models/Authors')

// All authors
router.get('/:author', async (req, res) => {
    let searchOptions = {}

    if(req.query.name && req.query.name !== '') searchOptions.name = new RegExp(req.query.name, 'i')
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {authors: authors, searchOptions: res.query})
    } catch (e){
        res.redirect('/')
    }
})

// New author route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

// Create Author route
router.post('/', (req, res) => {
    try{
        const author = new Author({
            name: req.body.name
        })
        author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        return res.redirect('authors')
    } catch (e) {
        return res.render('authors/new', {author: req.body.name, errMsg: "Error while creating author"})
    }
})

module.exports = router
