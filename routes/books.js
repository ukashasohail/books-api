const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");


// GET route
// get all books in response

router.get('/', (req, res) => {

    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
        if (err) throw err;

        data = JSON.parse(data)

        res.json(data)
    })
});


// GET route
// get a specific book in response
router.get('/:bookId', (req, res) => {

    let {
        bookId
    } = req.params;

    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
        if (err) throw err;

        data = JSON.parse(data)

        let book = data.filter((book) => {
            return book.bookId === bookId
        });

        res.json(book)
    })
});



// POST route
// add a book in array
router.post('/', (req, res) => {

    let {
        bookId,
        name,
        isRead
    } = req.body;

    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
        if (err) throw err;

        data = JSON.parse(data)

        data.push({
            bookId,
            name,
            isRead
        });

        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data), (err, data) => {
            if (err) throw err;

            console.log("saved");
        })

        res.json(data)
    })
});



// PUT route
// update name of a book 

router.put('/', (req, res) => {

    let {
        bookId,
        name
    } = req.body;

    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
        if (err) throw err;

        data = JSON.parse(data)

        data.map((book) => {
            if (book.bookId == bookId) {
                book.name = name;
            }
        })

        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data), (err, data) => {
            if (err) throw err;

            console.log("saved");
        })

        res.json(data);
    })
});


// DELETE route
// delete book by giving the id

router.delete('/:bookId', (req, res) => {

    let {
        bookId
    } = req.params;

    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
        if (err) throw err;

        data = JSON.parse(data)

        let filtered = data.filter((book) => {
            return book.bookId != bookId;


        });

        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(filtered), (err, data) => {
            if (err) throw err;
        });

        res.json(filtered);
    });
});

module.exports = router;