require('dotenv').config('./.env')
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const URI = process.env.MONGO_URI
console.log(URI);

const Student = require('./Models/Student');



app.use(express.json());

mongoose.connect(URI);
const db = mongoose.connection;
db.on("error", () => { console.log("connection error: " + error) });
db.once("open", () => {
    console.log("Connected successfully");
});
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});

const Save = async (Instance) => {
    await Instance.save();
    console.log(Instance + '\n Is Saved to database')

}
const X = new Student({ Name: "Dhyanesh", EnrollmentNo: 210170107020, PhoneNo: 9909912610 });
Save(X);

Student.create({ Name: "Karan" }).then((res) => {
    Save(res);
})
// console.log(X);