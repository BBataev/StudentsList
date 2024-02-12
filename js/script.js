// Не влияет на работу

(() => {
  const addNewBtn = document.querySelector('.header__btn__addNew');
  const facultyBtn = document.querySelector('.header__btn__filter');

  // To prevent layout to break

  facultyBtn.tabIndex = -1;

  const addNewInput = document.querySelector('.main-inputPoles-filter');
  const facultyInput = document.querySelector('.main-inputPoles-addNew');

  // Filter elements

  const FIO = document.getElementById("filter-name");
  const faculty = document.getElementById("filter-faculty");
  const iYear = document.getElementById("filter-iYear");
  const oYear = document.getElementById("filter-oYear");

  // AddNew elements
  const inputSurname = document.getElementById("input-surname");
  const inputName = document.getElementById("input-name");
  const inputLastname = document.getElementById("input-lastname");
  const inputSYear = document.getElementById("input-sy");
  const inputBYear = document.getElementById("input-by");
  const inputFaculty = document.getElementById("input-faculty");

  // AddNew button

  const addBtn = document.querySelector(".main-inputPoles-addNew__btn");


  // Blocking tab possibilities

  inputSurname.tabIndex = -1;
  inputName.tabIndex = -1;
  inputLastname.tabIndex = -1;
  inputSYear.tabIndex = -1;
  inputBYear.tabIndex = -1;
  inputFaculty.tabIndex = -1;

  addBtn.tabIndex = -1;

  addNewBtn.addEventListener('click', () => {
    addNewBtn.classList.remove('active');
    addNewInput.classList.remove('inputPoles-active');
    facultyBtn.classList.add('active');
    facultyInput.classList.add('inputPoles-active');

    addNewBtn.tabIndex = -1;

    facultyBtn.tabIndex = 1;

    FIO.tabIndex = -1;
    faculty.tabIndex = -1;
    iYear.tabIndex = -1;
    oYear.tabIndex = -1;

    inputSurname.tabIndex = 1;
    inputName.tabIndex = 1;
    inputLastname.tabIndex = 1;
    inputSYear.tabIndex = 1;
    inputBYear.tabIndex = 1;
    inputFaculty.tabIndex = 1;

    addBtn.tabIndex = 1;
  });

  facultyBtn.addEventListener('click', () => {
    facultyBtn.classList.remove('active');
    facultyInput.classList.remove('inputPoles-active');
    addNewInput.classList.add('inputPoles-active');
    addNewBtn.classList.add('active');

    facultyBtn.tabIndex = -1;

    addNewBtn.tabIndex = 1;

    FIO.tabIndex = 1;
    faculty.tabIndex = 1;
    iYear.tabIndex = 1;
    oYear.tabIndex = 1;

    inputSurname.tabIndex = -1;
    inputName.tabIndex = -1;
    inputLastname.tabIndex = -1;
    inputSYear.tabIndex = -1;
    inputBYear.tabIndex = -1;
    inputFaculty.tabIndex = -1;

    addBtn.tabIndex = -1;
  });
})();
