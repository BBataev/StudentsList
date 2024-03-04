( async () => {

  // Numeric constants
  const MAXCOURSE = 4
  const MINBIRTHDAYYEAR = 1900;
  const MINSTARTYEAR = 2000;
  const TIMERTIME = 300;
  const STYLEADDTIMER = 100;

  // Students list

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:3000/api/students/');
    return await res.json();
  };

  const students = await fetchStudents();

  // Аdd student by input

  const addStudent = async (surname, name, lastname, birthday, studyStart, faculty) =>
  {
    await fetch('http://localhost:3000/api/students/', {
      method: 'POST',
      body: JSON.stringify({
        surname: surname,
        name: name,
        lastname: lastname,
        birthday: birthday,
        studyStart: studyStart,
        faculty: faculty,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    // Immediately out students to avoid an discrepancy with list
    const students = await fetchStudents();
    outStudents(students);
  }

  const outStudents = (students) =>
  {
    const studentsListContainer = document.querySelector('.main-list-students');

    studentsListContainer.textContent = '';

    if (students.length === 0)
    {
      const emptyListMessage = document.createElement('p');

      emptyListMessage.textContent = 'Список студентов пуст';
      emptyListMessage.classList.add('main-list-students__emptyMessage');

      studentsListContainer.append(emptyListMessage);
    }
    else
    {
      students.forEach((student, index) => {
        const studentInfo = document.createElement('div');
        studentInfo.classList.add('main-list-students-student');
        studentInfo.id = 'student_' + index;
        studentInfo.innerHTML =
        `
        <p class="main-list-students-student__index">${index+1}</p>
        <p class="main-list-students-student__name">${student.surname} ${student.name} ${student.lastname}</p>
        <p class="main-list-students-student__faculty">${student.faculty}</p>
        <p class="main-list-students-student__birthday">${formatAge(student.birthday)}</p>
        <p class="main-list-students-student__studyStart">${formatCourse(student.studyStart)}</p>
        <img class="main-list-students-student__delete" alt="delete button" src="img/deleteBtn.svg" id="deleteBtn_${index}"></img>
        `;

        studentsListContainer.append(studentInfo);

        const deleteBtn = document.getElementById('deleteBtn_' + index);

        studentInfo.addEventListener('mouseenter', () => {
          deleteBtn.classList.remove("unshowed");
          deleteBtn.classList.add("showed");
        })

        studentInfo.addEventListener('mouseleave', () => {
          deleteBtn.classList.remove("showed");
          deleteBtn.classList.add("unshowed");
        })

        deleteBtn.addEventListener('click', () => {
          deleteStudent(student.id);
        })
      })
    }
  }

  const deleteStudent = async (id) =>
  {
    await fetch('http://localhost:3000/api/students/' + id, {
      method: 'DELETE',
    })

    const students = await fetchStudents();

    // Обновляем отображение списка студентов
    outStudents(students);
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
    const inputbirthday = document.getElementById("input-by").value;
    const inputstudyStart = document.getElementById("input-sy").value;
    const inputFaculty = document.getElementById("input-faculty").value.trim();

    let changedSurname = inputSurname.charAt(0).toUpperCase() + inputSurname.slice(1).toLowerCase();
    let changedName = inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();
    let changedLastname = inputLastname.charAt(0).toUpperCase() + inputLastname.slice(1).toLowerCase();

    return {
      surname: changedSurname,
      name: changedName,
      lastname: changedLastname,
      birthday: inputbirthday,
      studyStart: inputstudyStart,
      faculty: inputFaculty
    };
  }

  const calculateAge = (date) =>
  {
    const nYear = new Date();
    const birthday = new Date(date);

    let age = nYear.getFullYear() - birthday.getFullYear();

    if ( (nYear.getMonth() < birthday.getMonth()) || (nYear.getMonth() === birthday.getMonth() && nYear.getDate() < birthday.getDate()) )
    {
      return --age;
    }

    return age;
  }

  // Formating Age
  const formatAge = (date) =>
  {
    const age = calculateAge(date);

    const birthday = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };


    if (age % 10 === 1)
    {
      return (`${birthday.toLocaleDateString('ru-RU', options)} (${age} год)`);
    }
    else if ([2, 3, 4].includes(age % 10))
    {
      return (`${birthday.toLocaleDateString('ru-RU', options)} (${age} года)`);
    }
    else
    {
      return (`${birthday.toLocaleDateString('ru-RU', options)} (${age} лет)`);
    }
  }

  // Formating Course
  const formatCourse = (studyStart) =>
  {
    studyStart = parseInt(studyStart);

    let course = new Date().getFullYear() - studyStart;

    if (new Date().getMonth() >= 8)
    {
      course++;
    }
    if (course > MAXCOURSE)
    {
      return `${studyStart} - ${studyStart + MAXCOURSE} (окончил)`;
    }
    return `${studyStart} - ${studyStart + MAXCOURSE} (${course} курс)`;
  }

  const addStyleError = (elem, error) =>
  {
    elem.classList.remove("agreed");
    elem.classList.add("error");

    setTimeout(() => {
      error.classList.add("errActive");
    }, STYLEADDTIMER);
  }

  const addStyleAgreed = (elem) =>
  {
    elem.classList.remove("error");
    elem.classList.add("agreed");
  }

  const addErrorMessage = (errorMessage, messageContainer, id) =>
  {
    const message = document.createElement("p");

    message.classList.add("main-inputPoles-addNew-errorWindow__errorMessage");

    message.id = id;

    message.innerHTML =
    `
        ${errorMessage}
    `;

    messageContainer.appendChild(message);
  }

  const removeError = (id) =>
  {
    if (document.getElementById(id))
    {
      const error = document.getElementById(id);

      error.remove()
    }
  }

  const validation = async () =>
  {
    const inputSurname = document.getElementById("input-surname");
    const inputName = document.getElementById("input-name");
    const inputLastname = document.getElementById("input-lastname");

    const inputstudyStart = document.getElementById("input-sy");

    const inputbirthday = document.getElementById("input-by");
    const inputBFullYear = new Date(inputbirthday.value);

    const inputFaculty = document.getElementById("input-faculty");

    const errorWindow = document.querySelector(".main-inputPoles-addNew-errorWindow");

    let checked = true;

    let errorMessage;

    const regex = /^[a-zA-Zа-яА-Яё\s-]+$/;

    const regexFaculty = /^[a-zA-Zа-яА-Яё\s]+$/;

    // surname
    if ((inputSurname.value.trim() === '') || (!regex.test(inputSurname.value.trim())))
    {
      addStyleError(inputSurname, errorWindow);
      checked = false;

      if (inputSurname.value.trim() === '')
      {
        errorMessage = "Введите фамилию студента";
      }
      else if (!regex.test(inputSurname.value.trim()))
      {
        errorMessage = "Недопустимые символы в фамилии";
      }
      removeError("surnameError");

      addErrorMessage(errorMessage, errorWindow, "surnameError");
    }
    else
    {
      addStyleAgreed(inputSurname);

      removeError("surnameError");
    }

    // name
    if ((inputName.value.trim() === '') || (!regex.test(inputName.value.trim())))
    {
      addStyleError(inputName, errorWindow);
      checked = false;


      if ((inputName.value.trim() === ''))
      {
        errorMessage = "Введите имя студента";
      }
      else if (!regex.test(inputName.value.trim()))
      {
        errorMessage = "Недопустимые символы в имени";
      }

      removeError("nameError");
      addErrorMessage(errorMessage, errorWindow, "nameError");
    }
    else
    {
      addStyleAgreed(inputName);

      removeError("nameError");
    }

    // lastname
    if ((inputLastname.value.trim() === '') || (!regex.test(inputLastname.value.trim())))
    {
      addStyleError(inputLastname, errorWindow);
      checked = false;

      if (inputLastname.value.trim() === '')
      {
        errorMessage = "Введите отчество студента";
      }
      else if (!regex.test(inputLastname.value.trim()))
      {
        errorMessage = "Недопустимые символы в отчестве";
      }

      removeError("lastnameError");
      addErrorMessage(errorMessage, errorWindow, "lastnameError");
    }
    else
    {
      addStyleAgreed(inputLastname);

      removeError("lastnameError");
    }

    //birthday
    if ((inputBFullYear.getFullYear() < MINBIRTHDAYYEAR) || (inputBFullYear > new Date()) || (isNaN(inputBFullYear.getFullYear())))
    {
      addStyleError(inputbirthday, errorWindow);
      checked = false;


      if (inputBFullYear.getFullYear() < MINBIRTHDAYYEAR)
      {
        errorMessage = "Дата рождения не может быть меньше 1900 года";
      }
      else if (inputBFullYear > new Date())
      {
        errorMessage = "Дата рождения не может быть больше текущей";
      }
      else if (isNaN(inputBFullYear.getFullYear()))
      {
        errorMessage = "Введите дату рождения";
      }

      removeError("errorShowedYDate");
      addErrorMessage(errorMessage, errorWindow, "errorShowedYDate");
    }
    else
    {
      addStyleAgreed(inputbirthday);

      removeError("errorShowedYDate");
    }

    //studyStart
    if ((inputstudyStart.value < MINSTARTYEAR) || (inputstudyStart.value >  new Date().getFullYear()) || (inputstudyStart.value === ""))
    {
      addStyleError(inputstudyStart, errorWindow);
      checked = false;

      if (inputstudyStart.value < MINSTARTYEAR)
      {
        errorMessage = "Год поступления не может быть меньше 2000 года";
      }
      else if (inputstudyStart.value > new Date().getFullYear())
      {
        errorMessage = "Год поступления не может быть больше текущего года";
      }
      if (inputstudyStart.value === "")
      {
        errorMessage = "Введите год поступления";
      }

      removeError("errorShowedBDate");
      addErrorMessage(errorMessage, errorWindow, "errorShowedBDate");
    }
    else
    {
      addStyleAgreed(inputstudyStart);

      removeError("errorShowedBDate");
    }

    // faculty
    if ((inputFaculty.value.trim() === '') || (!regexFaculty.test(inputFaculty.value.trim())))
    {
      addStyleError(inputFaculty, errorWindow);
      checked = false;


      if (inputFaculty.value.trim() === '')
      {
        errorMessage = "Введите факультет студента";
      }
      else if (!regexFaculty.test(inputFaculty.value.trim()))
      {
        errorMessage = "Недопустимые символы в факультете";
      }
      removeError("errorShowedFaculty");
      addErrorMessage(errorMessage, errorWindow, "errorShowedFaculty");
    }
    else
    {
      addStyleAgreed(inputFaculty);

      removeError("errorShowedFaculty");
    }

    if (checked === true)
    {
      const inputInfo = getInput();

      await addStudent(inputInfo.surname, inputInfo.name, inputInfo.lastname, inputInfo.birthday, inputInfo.studyStart, inputInfo.faculty);

      clearInput();

      inputSurname.classList.remove("agreed");
      inputName.classList.remove("agreed");
      inputLastname.classList.remove("agreed");
      inputbirthday.classList.remove("agreed");
      inputstudyStart.classList.remove("agreed");
      inputFaculty.classList.remove("agreed");

      errorWindow.classList.remove("errActive");
    }
  }

  const addBtn = document.querySelector(".main-inputPoles-addNew__btn");

  addBtn.addEventListener('click', async () =>
  {
    validation();
  })

  // Filtration by input

  const FIO = document.getElementById("filter-name");
  const faculty = document.getElementById("filter-faculty");
  const iYear = document.getElementById("filter-iYear");
  const oYear = document.getElementById("filter-oYear");

  FIO.addEventListener('input', () => TimerBetween());
  faculty.addEventListener('input', () => TimerBetween());
  iYear.addEventListener('input', () => TimerBetween());
  oYear.addEventListener('input', () => TimerBetween());

  const filter = (students) =>
  {
    const FIO = document.getElementById("filter-name").value.trim();
    const facultyElem = document.getElementById("filter-faculty").value.trim();
    const iYear = parseInt(document.getElementById("filter-iYear").value);
    const oYear = parseInt(document.getElementById("filter-oYear").value);

    const filteredList = students.filter((student) =>
    {
      const nameFilter = new RegExp(FIO, 'i');
      const facultyFilter = new RegExp(facultyElem, 'i');

      const matchesName = nameFilter.test(student.surname) || nameFilter.test(student.name) || nameFilter.test(student.lastname);
      const matchesFaculty = facultyFilter.test(student.faculty);
      const iFiltered = isNaN(iYear) || (iYear === parseInt(student.studyStart));
      const oFiltered = isNaN(oYear) || (oYear === parseInt(student.studyStart) + 4);

      return matchesName && matchesFaculty && iFiltered && oFiltered;
    })

    outStudents(filteredList);
  }

  const TimerBetween = () =>
  {
    clearTimeout(window.inputTimeout);
    window.inputTimeout = setTimeout(async () => {
      const students = await fetchStudents();

      filter(students)
    }, TIMERTIME);
  }

  // Filtration by click

  const FIOBtn = document.getElementById("list-FIO");
  const FacultyBtn = document.getElementById("list-faculty");
  const YearBtn = document.getElementById("list-age");
  const CourseBtn = document.getElementById("list-course");

  const filterByName = (students) =>
  {
    const filteredList = students.slice().sort((s1, s2) =>
    {
      const fullName1 = `${s1.surname} ${s1.name} ${s1.lastname}`.toLocaleLowerCase();
      const fullName2 = `${s2.surname} ${s2.name} ${s2.lastname}`.toLocaleLowerCase();

      if (fullName1 > fullName2) return 1;
      if (fullName1 < fullName2) return -1;
      return 0;
    })

    outStudents(filteredList);
  }

  const filterByFaculty = (students) =>
  {
    const filteredList = students.slice().sort((s1, s2) =>
    {
      if (s1.faculty.toLocaleLowerCase() > s2.faculty.toLocaleLowerCase()) return 1;
      if (s1.faculty.toLocaleLowerCase() < s2.faculty.toLocaleLowerCase()) return -1;
      return 0;
    })

    outStudents(filteredList);
  }


  const filterByYear = (students) =>
  {
    const filteredList = students.slice().sort((s1, s2) =>
    {
      if (s1.birthday < s2.birthday) return 1;
      if (s1.birthday > s2.birthday) return -1;
      return 0;
    })

    outStudents(filteredList);
  }

  const filterByCourse = (students) =>
  {
    const filteredList = students.slice().sort((s1, s2) =>
    {
      if (s1.studyStart > s2.studyStart) return 1;
      if (s1.studyStart < s2.studyStart) return -1;
      return 0;
    })

    outStudents(filteredList);
  }

  FIOBtn.addEventListener("click", async () =>
  {
    const students = await fetchStudents();

    filterByName(students);
  })

  FacultyBtn.addEventListener("click", async () =>
  {
    const students = await fetchStudents();

    filterByFaculty(students);
  })

  YearBtn.addEventListener("click", async () =>
  {
    const students = await fetchStudents();

    filterByYear(students);
  })

  CourseBtn.addEventListener("click", async () =>
  {
    const students = await fetchStudents();

    filterByCourse(students);
  })

  // Print list of students on the site
  outStudents(students);

})();
