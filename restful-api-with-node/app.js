const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json())


var courses = [
    {id:1, course:"Javascript"},
    {id:2, course:"Typescript"},
    {id:3, course:"Java"}
]

app.get('/',(req,res)=>{
    res.json(courses)
})

app.post("/course",(req,res)=>{
    console.log(typeof req.body);
    const course ={
        id:courses.length+1,
        course:req.body.course
    }
    courses.push(course)
     res.send(courses) 
})

app.get("/course/:id",(req,res)=>{
    const course = courses.find(course =>course.id === parseInt(req.params.id));
    if(!course){
        res.send(`course is not found by given id ${req.params.id}`)
    }
    else{
        res.send(course)
    }
})

app.put("/course/:id",(req,res)=>{
  const course = courses.find(course =>course.id ===parseInt(req.params.id));
  if(!course){
      res.send(`course is not found by given id ${req.params.id}`)
  } else{
      course.course = req.body.course
      res.send(courses)
  }
})

app.delete("/course/:id",(req,res)=>{
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course){
        res.send(`course is not found by given id ${req.params.id}`)
    }else{
        const index = courses.indexOf(course)
        courses.splice(index, 1)
        res.send(courses)
    }
})


app.listen(PORT , (_=>console.log(`Server is running on the PORT ${PORT}`)))