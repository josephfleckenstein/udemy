// Require express
const express = require('express');
const router = express.Router();

//Array of courses
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// Read (Retrieve) / Get.  Using get http request to get the routes to the courses. 
router.get('/', (req, res) => {
    res.send(courses);
});

// Create/Post.  Using post http request to create a new course.
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.get('/:id', (req, res) => {
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

// Exporting the router.
module.exports = router;