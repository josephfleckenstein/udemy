// In terminal for entire folder add the following:
// 1. "npm init --yes" to install package.json.
// 2. "npm i express" to install express.
// 3. "npm i @hapi/joi" to install @hapi/joi.
// 4. touch ".gitignore" then add "node_modules/" in file so node_modules are not added to Github

// Dependency Modules
const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
];

// Read (Retrieve) / Get
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// Create/Post
app.post('/api/genres', (req, res) => {
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
app.put('/api/genres/:id', (req, res) => {
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
app.delete('/api/genres/:id', (req, res) => {
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
app.get('/api.genres/:id', (req, res) => {
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

// Port -If there is a port use that, otherwise use 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));