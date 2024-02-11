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

    students.push({
      surname,
      name,
      lastname,
      bYear: new Date(bYear),
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
      <p class="main-list-students-student__bYear">${formatAge(student.bYear)}</p>
      <p class="main-list-students-student__sYear">${formatCourse(student.sYear)}</p>
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

  const calculateAge = (date) =>
  {
    const nYear = new Date();
    const bYear = new Date(date);

    let age = nYear.getFullYear() - bYear.getFullYear();

    if ( (nYear.getMonth() < bYear.getMonth()) || (nYear.getMonth() === bYear.getMonth() && nYear.getDate() < bYear.getDate()) )
    {
      return --age;
    }

    return age;
  }

  const formatAge = (date) =>
  {
    const age = calculateAge(date);

    const bYear = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };


    if (age % 10 === 1)
    {
      return (`${age} год (${bYear.toLocaleDateString('ru-RU', options)})`);
    }
    else if ([2, 3, 4].includes(age % 10))
    {
      return (`${age} года (${bYear.toLocaleDateString('ru-RU', options)})`);
    }
    else
    {
      return (`${age} лет (${bYear.toLocaleDateString('ru-RU', options)})`);
    }
  }

  const formatCourse = (sYear) =>
  {
    let course = new Date().getFullYear() - parseInt(sYear);

    if (new Date().getMonth() >= 8)
    {
      course++;
    }
    if (course > 4)
    {
      return `${sYear} - ${sYear + 4} (окончил)`;
    }
    return `${sYear} - ${sYear + 4} (${course} курс)`;
  }

  const addStyleError = (elem) =>
  {
    elem.classList.remove("agreed");
    elem.classList.add("error");
  }

  const addStyleAgreed = (elem) =>
  {
    elem.classList.remove("error");
    elem.classList.add("agreed");
  }

  const validation = () =>
  {
    const inputSurname = document.getElementById("input-surname");
    const inputName = document.getElementById("input-name");
    const inputLastname = document.getElementById("input-lastname");

    const inputSYear = document.getElementById("input-sy");

    const inputBYear = document.getElementById("input-by");
    const inputBFullYear = new Date(inputBYear.value);

    const inputFaculty = document.getElementById("input-faculty");

    let checked = true;

    // surname
    if ((inputSurname.value.trim() === '') || ((inputSurname.value.trim()).length > 15))
    {
      addStyleError(inputSurname);
      checked = false;
    }
    else
    {
      addStyleAgreed(inputSurname);
    }

    // name
    if ((inputName.value.trim() === '') || ((inputName.value.trim()).length > 15))
    {
      addStyleError(inputName);
      checked = false;
    }
    else
    {
      addStyleAgreed(inputName);
    }

    // lastname
    if ((inputLastname.value.trim() === '') || ((inputLastname.value.trim()).length > 15))
    {
      addStyleError(inputLastname);
      checked = false;
    }
    else
    {
      addStyleAgreed(inputLastname);
    }

    //sYear
    if ((inputSYear.value < 2000) || (inputSYear.value >  new Date().getFullYear()))
    {
      addStyleError(inputSYear);
      checked = false;
    }
    else
    {
      addStyleAgreed(inputSYear);
    }

    //bYear
    if ((inputBFullYear.getFullYear() < 1900) || (inputBFullYear > new Date()) || (isNaN(inputBFullYear.getFullYear())))
    {
      addStyleError(inputBYear);
      checked = false;
    }
    else
    {
      addStyleAgreed(inputBYear);
    }

    // faculty
    if ((inputFaculty.value.trim() === '') || ((inputFaculty.value.trim()).length > 15))
    {
      addStyleError(inputFaculty);
      checked = false;
    }
    else
    {
      addStyleAgreed(inputFaculty);
    }

    if (checked === true)
    {
      const inputInfo = getInput();
      clearInput();
      addStudent(inputInfo.surname, inputInfo.name, inputInfo.lastname, inputInfo.bYear, inputInfo.sYear, inputInfo.faculty);

      inputSurname.classList.remove("agreed");
      inputName.classList.remove("agreed");
      inputLastname.classList.remove("agreed");
      inputBYear.classList.remove("agreed");
      inputSYear.classList.remove("agreed");
      inputFaculty.classList.remove("agreed");
    }
  }

  const addBtn = document.querySelector(".main-inputPoles-addNew__btn");

  addBtn.addEventListener('click', () =>
  {
    const inputInfo = getInput();

    validation();
    formatCourse(inputInfo.sYear);
    outStudents();
  })


  // Filtration

  const FIO = document.getElementById("filter-name");
  const faculty = document.getElementById("filter-faculty");
  const iYear = document.getElementById("filter-iYear");
  const oYear = document.getElementById("filter-oYear");

  FIO.addEventListener('input', () => TimerBetween(FIOFilter));
  faculty.addEventListener('input', () => TimerBetween(facultyFilter));
  iYear.addEventListener('input', () => TimerBetween(iYearFilter));
  oYear.addEventListener('input', () => TimerBetween(oYearFilter));

  const FIOFilter = () =>
  {
    console.log("ФИО");
  }

  const facultyFilter = () =>
  {
    console.log("факультет");
  }

  const iYearFilter = () =>
  {
    console.log("поступил");
  }

  const oYearFilter = () =>
  {
    console.log("пошел нахуй даун ебаный");
  }

  const TimerBetween = (func) =>
  {
    clearTimeout(window.inputTimeout);
    window.inputTimeout = setTimeout(function() {
      func()
    }, 300);
  }

  outStudents();

})();
