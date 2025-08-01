const btn = document.querySelector(".btn");
const tbody = document.querySelector(".tbody");

const surname = document.getElementById("name");
const age = document.getElementById("age");
const course = document.getElementById("course");
const skills = document.getElementById("skills");
const email = document.getElementById("email");
const record = document.getElementById("isEnrolled");

const addStudentBtn = document.querySelector("[addStudent]");
const changeStudentBtn = document.querySelector("[changeStudent]");
const deleteStudentBtn = document.querySelector("[deleteStudent]");

function fetchAndRenderStudents() {
  fetch("./students.json", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      tbody.innerHTML = "";
      data.students.forEach((element) => {
        tbody.innerHTML += `
          <tr>
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
    .catch((error) => {
      console.error(error);
    });
}

btn.addEventListener("click", fetchAndRenderStudents);

addStudentBtn.addEventListener("click", () => {
  const studentObj = {
    name: surname.value,
    age: age.value,
    course: course.value,
    skills: skills.value,
    email: email.value,
    isEnrolled: record.checked,
  };

  fetch("http://localhost:3000/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchAndRenderStudents();
    })
    .catch((error) => {
      console.error(error);
    });
});

changeStudentBtn.addEventListener("click", () => {
  const studentIdToChange = prompt("Введіть ID студента, дані якого хочете змінити:");

  const studentObj = {
    name: surname.value,
    age: age.value,
    course: course.value,
    skills: skills.value,
    email: email.value,
    isEnrolled: record.checked,
  };

  fetch(`http://localhost:3000/students/${studentIdToChange}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchAndRenderStudents();
    })
    .catch((error) => {
      console.error(error);
    });
});

deleteStudentBtn.addEventListener("click", () => {
  const studentIdToDelete = prompt("Введіть ID студента, якого хочете видалити:");

  fetch(`http://localhost:3000/students/${studentIdToDelete}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchAndRenderStudents();
    })
    .catch((error) => {
      console.error(error);
    });
});

