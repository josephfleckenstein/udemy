// In terminal for entire folder add the following:
// 1. "npm init --yes" to install package.json.
// 2. "npm i express" to install express.
// 3. "npm i @hapi/joi" to install @hapi/joi.
// 4. add file ".gitignore" then add "node_modules/" in file so node_modules are not added to Github.

// Dependency Modules
const Joi = require('@hapi/joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use('/api/genres', genres);

// Port -If there is a port use that, otherwise use 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));