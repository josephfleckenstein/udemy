// Require express
const express = require('express');
const router = express.Router();

// Array of genres
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
];

// Read (Retrieve) / Get
router.get('/', (req, res) => {
    res.send(genres);
});

// Create/Post
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

// Update(Modify)/Put
router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    // Validate.  If invalid, return 400 - Bad request
    const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

    // Update genre
    genre.name = req.body.name;
    // Return the updated genre
    res.send(genre);
    });

// Delete (Destroy)
router.delete('/:id', (req, res) => {
    // Look up the genre (1st line)
    // If not existing, return 404 (2nd line)
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found');

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return the same genre
    res.send(genre);
});

// Read (Retrieve) / Get
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found');
    res.send(genre);
});

// Joi validation (different from notes in course since @hapi/joi is now used instead)
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(genre); 
}

// Exporting the router.
module.exports = router;