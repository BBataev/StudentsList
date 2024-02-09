// Не влияет на работу

(() => {
  const addNewBtn = document.querySelector('.header__btn__addNew');
  const facultyBtn = document.querySelector('.header__btn__filter');

  const addNewInput = document.querySelector('.main-inputPoles-filter');
  const facultyInput = document.querySelector('.main-inputPoles-addNew');

  addNewBtn.addEventListener('click', () => {
    addNewBtn.classList.remove('active');
    addNewInput.classList.remove('inputPoles-active');
    facultyBtn.classList.add('active');
    facultyInput.classList.add('inputPoles-active');
  });

  facultyBtn.addEventListener('click', () => {
    facultyBtn.classList.remove('active');
    facultyInput.classList.remove('inputPoles-active');
    addNewInput.classList.add('inputPoles-active');
    addNewBtn.classList.add('active');
  });
})();
