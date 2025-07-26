const btn = document.querySelector(".btn");

const tbody = document.querySelector(".tbody")

btn.addEventListener("click", function() {   
    fetch("./students.json", {
    method: "GET"})
    .then((Response) => Response.json())
    .then((data) => {
        console.log(data);
        data.students.forEach(element => {
            tbody.innerHTML += ` <tr>
                <th class="id">${element.id}</th>
                <th class="name">${element.name}</th>
                <th class="age">${element.age}</th>
                <th class="course">${element.course}</th>
                <th class="skills">${element.skills}</th>
                <th class="email">${element.email}</th>
                <th class="status">${element.isEnrolled}</th>
            </tr>`; 
        });
    })
})

// const form = document.querySelector("[addStudentsForm]")

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const inputValue = e.target.value;
//     console.log(inputValue);
// })

const surname = document.querySelector("[surname]");
const age = document.querySelector("[age]");
const course = document.querySelector("[course]");
const skills = document.querySelector("[skills]");
const email = document.querySelector("[email]");
const record = document.querySelector("[record]");

const addStudentBtn = document.querySelector("[addStudent]");

addStudentBtn.addEventListener("click", () => {
    const studentsObj = {
      name: surname.value,
      age: age.value,
      course: course.value,
      skills: skills.value,
      email: email.value,
      record: record.value,
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json" ,
        },
        body: JSON.stringify(studentsObj)
    };
    fetch("http://localhost:3000/students", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
})

const changeStudent = document.querySelector("[changeStudent]");

changeStudent.addEventListener("click", () => {
  const studentIdToChange = prompt(
    "Введіть ID студента, дані якого хочете змінити:"
  );
  const studentsObj = {
    name: surname.value,
    age: age.value,
    course: course.value,
    skills: skills.value,
    email: email.value,
    isEnrolled: record.value,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentsObj),
  };

  fetch(`http://localhost:3000/students/${studentIdToChange}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

const deleteStudent = document.querySelector("[deleteStudent]");

deleteStudent.addEventListener("click", () => {
  const studentIdToDelete = prompt(
    "Введіть ID студента, якого хочете видалити:"
  );
    fetch(`http://localhost:3000/students/${studentIdToDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Студент з ID ${studentIdToDelete} видалений:`, data);
      })
      .catch((error) => {
        console.error(error);
      });
}); 
