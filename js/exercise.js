(() => {

  const students =
  [
    {
      surname: 'Канафиев',
      name: 'Илья',
      lastname: 'Ильнурович',
      bYear: '2004-08-16',
      sYear: 2022,
      faculty: 'ИВТИ'
    },
    {
      surname: 'Антонова',
      name: 'Алиса',
      lastname: 'Сергеевна',
      bYear: '2002-03-06',
      sYear: 2020,
      faculty: 'ИВТИ'
    },
    {
      surname: 'Нурланова',
      name: 'Александра',
      lastname: 'Евгеньева',
      bYear: '2005-03-28',
      sYear: 2023,
      faculty: 'ГПИ'
    },
  ];

  const addStudent = (surname, name, lastname, bYear, sYear, faculty) =>
  {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    students.push({
      surname,
      name,
      lastname,
      bYear: new Date(bYear).toLocaleDateString('ru-RU', options),
      sYear: parseInt(sYear),
      faculty
    })
  }

  const outStudents = () =>
  {
    const studentsListContainer = document.querySelector('.main-list-students');

    studentsListContainer.textContent = '';

    students.forEach((student, index) => {
      const studentInfo = document.createElement('div');
      studentInfo.classList.add('main-list-students-student');
      studentInfo.innerHTML =
      `
      <p class="main-list-students-student__index">${index+1}</p>
      <p class="main-list-students-student__name">${student.surname} ${student.name} ${student.lastname}</p>
      <p class="main-list-students-student__faculty">${student.faculty}</p>
      <p class="main-list-students-student__bYear">${student.bYear}</p>
      <p class="main-list-students-student__sYear">${student.sYear}</p>
      `;
      studentsListContainer.append(studentInfo);
    })
  }

  const clearInput = () =>
  {
    document.getElementById("input-surname").value = '';
    document.getElementById("input-name").value = '';
    document.getElementById("input-lastname").value = '';
    document.getElementById("input-by").value = '';
    document.getElementById("input-sy").value = '';
    document.getElementById("input-faculty").value = '';
  }

  const getInput = () =>
  {
    const inputSurname = document.getElementById("input-surname").value.trim();
    const inputName = document.getElementById("input-name").value.trim();
    const inputLastname = document.getElementById("input-lastname").value.trim();
    const inputBYear = document.getElementById("input-by").value;
    const inputSYear = document.getElementById("input-sy").value;
    const inputFaculty = document.getElementById("input-faculty").value.trim();

    let changedName = inputSurname.charAt(0).toUpperCase() + inputSurname.slice(1).toLowerCase();
    let changedSurname = inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();
    let changedLastname = inputLastname.charAt(0).toUpperCase() + inputLastname.slice(1).toLowerCase();

    return {
      surname: changedSurname,
      name: changedName,
      lastname: changedLastname,
      bYear: inputBYear,
      sYear: inputSYear,
      faculty: inputFaculty
    };
  }

  // const validation = () =>
  // {
  //   const inputSYear = document.getElementById("input-sy").value;
  //   const inputBYear = document.getElementById("input-by").value;

  //   if (inputSYear < 2000)
  //   {
  //     return false;
  //   }
  //   else
  //   {
  //     return true;
  //   }
  // }

  const addBtn = document.querySelector(".main-inputPoles-addNew__btn");

  addBtn.addEventListener('click', () =>
  {
    const inputInfo = getInput();

    addStudent(inputInfo.surname, inputInfo.name, inputInfo.lastname, inputInfo.bYear, inputInfo.sYear, inputInfo.faculty);
    clearInput();
    outStudents();
  })

  outStudents();

})();
