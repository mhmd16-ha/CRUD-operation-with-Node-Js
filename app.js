const http = require("http");
const fs = require("fs");
let Students = JSON.parse(fs.readFileSync("Students.json"));
let Courses = JSON.parse(fs.readFileSync("Courses.json"));
let Departments=JSON.parse(fs.readFileSync("Departments.json"));
let port = http.createServer((req, res) => {
  let { url, method } = req;
  function resMessage(code, Message) {
    res.statusCode = code;
    return res.end(JSON.stringify(Message));
  }
  //~ 1-get All Students ___________________________________________________________________
  if ((url == "/Students"&& method == "GET")) {
    res.end(JSON.stringify(Students));
  }
  //! 2-Add Student __________________________________________________________________________
  else if ((url == "/Students"&& method == "POST")) {
    req.on("data", (chunk) => {
      let student = JSON.parse(chunk);
      let index = Students.findIndex((x) => x.email == student.email);
      if(index==-1){
        student.Id = Students.length + 1;
      Students.push(student);
      fs.writeFileSync("Students.json", JSON.stringify(Students));
      resMessage(200, { Message: "Created" });
      }
      else{
        // return console.log("email Must be Unique");
        resMessage(400, { Message: "email Must be Unique" });
      }
      
    });

    
  }
  //^ 3- Get all students with their department and courses related to the department __________
  else if ((url == "/Students/Dept" && method == "GET")) {
    let Student=JSON.parse(JSON.stringify(Students))
    let Deptindex
    let CourseIndex
    for(let i=0;i<Students.length;i++){ 
        Deptindex = Departments.findIndex((x) => x.Id == Students[i].Department);
        Student[i].Department=Departments[Deptindex]
        CourseIndex=Courses.findIndex((x)=>x.DepartmentId==Students[i].Department)
        Student[i].Courses=Courses[CourseIndex]
    }

    res.end(JSON.stringify(Student));
  }
  //& 4-Delete Student __________________________________________________________________________
  else if ((url.startsWith("/Students/")&& method == "DELETE")) {
    let id = Number(url.split("/")[2]);
    let index = Students.findIndex((x) => x.Id == id);
    if (index == -1) {
      resMessage(404, { Message: "Not Found" });
    }
    Students.splice(index, 1);
    fs.writeFileSync("Students.json", JSON.stringify(Students));
    resMessage(200, { Message: "Deleted" });
  }
  //* 5-update student __________________________________________________________________________
  else if ((url.startsWith("/Students/")&& method == "PUT")) {
    let id = Number(url.split("/")[2]);
    let index = Students.findIndex((x) =>x.Id == id);
    if (index == -1) {
      resMessage(404, { Message: "Not Found" });
    }
    req.on("data", (chunk) => {
      let Student = JSON.parse(chunk);
      Students[index].name = Student.name;
      fs.writeFileSync("Students.json", JSON.stringify(Students));
      resMessage(200, { Message: "Updated" });
    });
  }
  //? 6- search for a student by ID ____________________________________________________________________
  else if ((url.startsWith("/Students/")&& method == "GET")) {
    let id = Number(url.split("/")[2]);
    let index = Students.findIndex((x) =>x.Id == id);
    if (index == -1) {
        resMessage(404, { Message: "Not Found" });
      }
    let student=Students[index]
   
    res.end(JSON.stringify(student))
  }
   //~ 1-get All Courses ___________________________________________________________________
   if ((url == "/Courses"&& method == "GET")) {
    res.end(JSON.stringify(Courses));
  }
  //! 2-Add Courses __________________________________________________________________________
  else if ((url == "/Courses"&& method == "POST")) {
    req.on("data", (chunk) => {
      let course = JSON.parse(chunk);
      course.Id = Courses.length + 1;
      Courses.push(course);
      fs.writeFileSync("Courses.json", JSON.stringify(Courses));
      resMessage(200, { Message: "Created" });
      }
      
      
    );

    
  }
 
  //& 3-Delete Courses __________________________________________________________________________
  else if ((url.startsWith("/Courses/")&& method == "DELETE")) {
    let id = Number(url.split("/")[2]);
    let index = Courses.findIndex((x) => x.Id == id);
    if (index == -1) {
      resMessage(404, { Message: "Not Found" });
    }
    Courses.splice(index, 1);
    fs.writeFileSync("Courses.json", JSON.stringify(Courses));
    resMessage(200, { Message: "Deleted" });
  }
  //* 4-update Courses __________________________________________________________________________
  else if ((url.startsWith("/Courses/")&& method == "PUT")) {
    let id = Number(url.split("/")[2]);
    let index = Courses.findIndex((x) =>x.Id == id);
    if (index == -1) {
      resMessage(404, { Message: "Not Found" });
    }
    req.on("data", (chunk) => {
      let course = JSON.parse(chunk);
      Courses[index].name = course.name;
      fs.writeFileSync("Courses.json", JSON.stringify(Courses));
      resMessage(200, { Message: "Updated" });
    });
  }
  //? 5- search for a Courses by ID ____________________________________________________________________
  else if ((url.startsWith("/Courses/")&& method == "GET")) {
    let id = Number(url.split("/")[2]);
    let index = Courses.findIndex((x) =>x.Id == id);
    if (index == -1) {
        resMessage(404, { Message: "Not Found" });
      }
    let course=Courses[index]
   
    res.end(JSON.stringify(course))
  }
  //~ 1-get All Departments ___________________________________________________________________
  if ((url == "/Departments"&& method == "GET")) {
    res.end(JSON.stringify(Departments));
  }
  //! 2-Add Departments __________________________________________________________________________
  else if ((url == "/Departments"&& method == "POST")) {
    req.on("data", (chunk) => {
      let dept = JSON.parse(chunk);
      dept.Id = Departments.length + 1;
      Departments.push(dept);
      fs.writeFileSync("Departments.json", JSON.stringify(Departments));
      resMessage(200, { Message: "Created" });
      }
      
      
    );

    
  }
 
  //& 3-Delete Departments __________________________________________________________________________
  else if ((url.startsWith("/Departments/")&& method == "DELETE")) {
    let id = Number(url.split("/")[2]);
    let index = Departments.findIndex((x) => x.Id == id);
    if (index == -1) {
      resMessage(404, { Message: "Not Found" });
    }
    Departments.splice(index, 1);
    fs.writeFileSync("Departments.json", JSON.stringify(Departments));
    resMessage(200, { Message: "Deleted" });
  }
  //* 4-update Departments __________________________________________________________________________
  else if ((url.startsWith("/Departments/")&& method == "PUT")) {
    let id = Number(url.split("/")[2]);
    let index = Departments.findIndex((x) =>x.Id == id);
    if (index == -1) {
      resMessage(404, { Message: "Not Found" });
    }
    req.on("data", (chunk) => {
      let dept = JSON.parse(chunk);
      Departments[index].name = dept.name;
      fs.writeFileSync("Departments.json", JSON.stringify(Departments));
      resMessage(200, { Message: "Updated" });
    });
  }
  //? 5- search for a Departments by ID ____________________________________________________________________
  else if ((url.startsWith("/Departments/")&& method == "GET")) {
    let id = Number(url.split("/")[2]);
    let index = Departments.findIndex((x) =>x.Id == id);
    if (index == -1) {
        resMessage(404, { Message: "Not Found" });
      }
    let dept=Departments[index]
   
    res.end(JSON.stringify(dept))
  }
});

port.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("Server is Conecting.....");
});
