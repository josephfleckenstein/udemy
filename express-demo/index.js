// Dependency Modules (1. joi & 2. express)
// since video was made in 2018 Joi has been deprecated.  @hapi/joi is its replacement.
// joi.validate does not work w/ @hapi/joi
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const logger = require('./logger');
const express = require('express');
const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(logger);

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];
// Read (Retrieve) / Get.
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// Read (Retrieve) / Get.  Using get http request to get the routes to the courses. 
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Create/Post.  Using post http request to create a new course.
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

// Update(Modify)/Put.
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');


    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body);
        if (error) return res.status(400).send(error.details[0].message);
            
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
});

// Delete (Destroy)
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course (1st line)
    // Not existing, return 404 (2nd line)
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

// Read (Retrieve) / Get.
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

// this code is different from what was in the video.  I had to check to comment section for the updated code.
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

// PORT -means if there is a port use that, otherwise use 3000.
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));