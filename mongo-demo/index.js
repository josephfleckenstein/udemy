// 1. npm init --yes to install package.json
// 2. npm i mongoose to install mongoose.

const Mongoose = require('mongoose');

//connection string to mongodb database.  The connect method returns a promise.
Mongoose.connect('mongodb+srv://joseph:kmtzs6mf@cluster0-k5los.mongodb.net/mongo-exercises?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => { console.log('Connected to MongoDB...') })
    .catch(err => { console.error('Could not connect to MongoDB..., ${err}'); });

// //Schema for course
// // const courseSchema = new Mongoose.Schema({
// //     name: String,
// //     author: String, 
// //     tags: [ String ],
// //     date: { type: Date, default: Date.now },
// //     isPublished: Boolean
// // });

// // // // Then compile schema into a Model, which gives you a class.  Is "schmema less" meaning is not a schema.  A schema is not needed for no SQL databases such as Mongodb.
// // // const Course = mongoose.model('Course', courseSchema) // Course is a class not an object, therefore use PascalCase, ie each word is capitalized.  'course' is for the collection of courses.

// // async function createCourse() {
// //     const course = new Course({//creating an object based on the above class.  This object maps to a document in the mongodb database.
// //         name: 'Angular Course',
// //         author: 'Mosh',
// //         tags: ['angular', 'front end'],
// //         isPublished: true
// //     }); // using camel case, ie lowercase c for first word, to name an object.

// //     const result = await course.save();
// //     console.log(result);
// // }

// // createCourse();

// // // Comparison Operators example.
// async function getCourses() {
//     // comparison operators:
//     // eq (equal)
//     // gt (greater than)
//     // gte (greater than or equal to)
//     // lt (less than)
//     // lte (less than or equal to)
//     // in
//     // nin (not in )

//     const courses = await Course
//     // .find({ author: 'Mosh', isPublished: true })// using the find method to filter documents.
//     // .find({ price: { $gt: 10, $lte: 20 }}) // find courses greater than 10 & less than 20 dollars.
//     .find({ price: { $in: [10, 15, 20] } }) // find courses that are equal to 10, 15 or 20 dollars.
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//     console.log(courses);
// }

// getCourses();

// // // // Logical Query Operator example
// // // async function getCourses() {
// // //     const courses = await Course
// // //     // .find({ author: 'Mosh', isPublished: true })
// // //     .find()
// // //     .or([ { author: 'Mosh' }, { isPublished: true } ]) // find courses published by Mosh.
// // //     .and([])
// // //     .limit(10)
// // //     .sort({ name: 1 })
// // //     .select({ name: 1, tags: 1 });
// // //     console.log(courses);
// // // }

// // // getCourses();


// // // Regular Expression example.
// // async function getCourses() {
// //     const courses = await Course
// //     // .find({ author: 'Mosh', isPublished: true })
    
// //     .find({ author: /^Mosh/ })// Means find author that starts with "Mosh".
    
// //     .find({ author: /Hamedani$/i })//Means ends with "Hamedani", adding "i" means case insensitive.

// //     .find({ author: /.*Mosh.*/i  })//Means contains "Mosh".  Case insensitive.
// //     .limit(10)
// //     .sort({ name: 1 })
// //     .select({ name: 1, tags: 1 });
// //     console.log(courses);
// // }

// // getCourses();

// // // Counting example.
// // async function getCourses() {
// //     const courses = await Course
// //     .find({ author: 'Mosh', isPublished: true })    
// //     .limit(10)
// //     .sort({ name: 1 })
// //     .count();// counts how many courses match the filter(instead of selecting them.)
// //     console.log(courses);
// // }

// // getCourses();

// // //Pagination example
// // async function getCourses() {
// //     const pageNumber = 2;
// //     const pageSize = 10;

// //     const courses = await Course
// //     .find({ author: 'Mosh', isPublished: true })
// //     .skip((pageNumber -1) *pageSize)//allows you to get the documents in a given page
// //     .limit(pageSize)//have to change the .limit value to "pageSize" as wwell.
// //     .sort({ name: 1 })
// //     .select({ name: 1, tags: 1 });
// //     console.log(courses);
// // }

// // getCourses();
