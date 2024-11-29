var express = require("express");
var cors = require("cors");
var { MongoClient } = require("mongodb");

var server = express()
server.use(cors())
server.use(express.json())

var MongoURL = "mongodb+srv://hienne:Hien123@clusterhehe.vjr23zx.mongodb.net/?retryWrites=true&w=majority&appName=Clusterhehe";
var MongoDB = new MongoClient(MongoURL);
var db = MongoDB.db("TeacherManager");

var accountCol = db.collection("Account");
var semesterCol = db.collection("Semester");
var classCol = db.collection("Class");
var studentCol = db.collection("Student");
var studentClassesCol = db.collection("StudentClasses");

//------------------Login--------------------//
server.post("/login", async (req, res) => {
    try
    {
        var { email, password } = req.body;
        var result = await accountCol.findOne({
            email: { $regex: email, $options: "i"},
            password,
        });
        // if (result.role != "Student")
        // {
        //     res.status(400).send({ message: "For student only"});
        //     return;
        // }
        if (result == null)
        {
            res.status(300).send({ message: "Invalid email, password"});
            console.log("Invalid login attempt from function LOGIN");
            return;
        }
        res.status(200).send(result);
    }
    catch
    {
        console.log("Error");
    }
})

server.get("/semesters", async (req, res) => {
    try
    {
        var listData = [];
       
        var semesters = await semesterCol.find({}).toArray();
        semesters.forEach((s) => {
            //console.log(s.semesterId);
            listData.push(s.semesterId);
        })
        res.status(200).send(listData);
    }
    catch(e)
    {
        console.log("Error: ", e);
    }
})

server.get("/classes/:semesterId", async (req, res) => {
    try
    {
        var listData = [];
        var result = classCol.find({ semesterId: req.params.semesterId }).toArray();
        res.status(200).send(result);
    }
    catch (e)
    {
        console.log("Error: ", e);
    }
})

server.get("/classes/:semesterId/:studentId", async (req, res) => {
    try {
        const classesOfStudent = await studentClassesCol.find({ MSSV: req.params.studentId }).toArray();
        const classesIdOfStudent = new Set(classesOfStudent.map(c => c.classId));

        const classesOnSemester = await classCol.find({ semesterId: req.params.semesterId }).toArray();
        //console.log(classesOnSemester);

        const result = classesOnSemester.filter(c => classesIdOfStudent.has(c.classId));
        //console.log(classesIdOfStudent);
        console.log(result);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

server.get("/stdclasses/:classId/:studentId", async (req, res) =>
{
    try
    {
        var result = await studentClassesCol.findOne({
            MSSV: req.params.studentId,
            classId: req.params.classId,
        })
        if (result == null)
        {
            res.status(300).send({ message: "Not found" });
            return;
        }
        console.log("stdclasses: ", result);
        res.status(200).send(result);
    }
    catch (e)
    {
        console.log(e);
    }
})

server.listen(8080, async () => {
    console.log("Server is online!");
    MongoDB.connect().then(() => {
        console.log("Connected to MongoDB!");
    })
})