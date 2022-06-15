



// ------------scroll------------------------

$('a[href^="#"').on('click', function () {

  let href = $(this).attr('href');

  $('html, body').animate({
    scrollTop: $(href).offset().top
  });
  return false;
});

// ---------slider------------------------------
$('.slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  Infinity: true,
  dots: true,
});

// -----------------modal------------------------

$('#modal').click(() => {
  $('.modal').addClass('visible');
  $('.overlay').addClass('visible');
  $('.modal__cross').addClass('visible');
})
$('.modal__cross').click(() => {
  $('.modal').removeClass('visible');
  $('.overlay').removeClass('visible');
  $('.modal__cross').removeClass('visible');
})

// $('.form__btn').click((e) => {
//   e.preventDefault();

//   if(firstName == '' || lastName == '' || amount == '' || phoneNumber == '' || phoneNumber.length < 9){
//     $('.inpt').addClass('inpt__false');
//     $('.false__desc').addClass('false__desc__active');
//   }
// })
let inputModal = document.querySelectorAll('.inpt');
let formModal = document.querySelector('.form');
let firstName = document.querySelector('.first__name');
let lastName = document.querySelector('.last__name');
let email = document.querySelector('.email');
let amount = document.querySelector('.amount');
let phoneNumber = document.querySelector('.phone');
let errorDesc = document.querySelectorAll('.false__desc');


function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phoneNumber) {

  let re = /^[8-9\s]*$/;
  return re.test(String(phoneNumber));

}

formModal.onsubmit = () => {
  let emailVal = email.value;
  let phoneVal = phoneNumber.value;
  let emptyInputs = Array.from(inputModal).filter(input => input.value === '');

  inputModal.forEach(input => {
    if (input.value === '') {
      input.classList.add('inpt__false');

    } else {
      input.classList.remove('inpt__false');
    }
  })


  if (emptyInputs.length !== 0) {
    return false
  }

  if(!validateEmail(emailVal)) {
    email.classList.add('inpt__false');
    return false
  }else{
    email.classList.remove('inpt__false');
  }

  if(amount.value.length > 1){
    amount.classList.add('inpt__false');
  }else{
    amount.classList.remove('inpt__false');
  }

  if(!validatePhone(phoneVal)) {
      phoneNumber.classList.add('inpt__false');
    }else{
      phoneNumber.classList.remove('inpt__false');
    }
    
  
  if(phoneVal.length < 10 || phoneVal.length > 13){
    phoneNumber.classList.add('inpt__false');
    return false
  }else{
    phoneNumber.classList.remove('inpt__false');
  }
}



// -----------------reservation-------------------

$('.reservation__description__btn').click(() => {
  $('.add__info').toggleClass('add__info_active')
})

// ----------------about-----------------------

$('.about__description__btn').click(() => {
  $('.about__add__info').toggleClass('about__add__info_active')
})

// -----------rooms--------------------------

$('.single__link').click((e) => {
  e.preventDefault();

  $('.room__single').toggleClass('room__active');
})

$('.dbl__link').click((e) => {
  e.preventDefault();

  $('.room__dbl').toggleClass('room__active');
})

$('.cootage__link').click((e) => {
  e.preventDefault();

  $('.room__cootage').toggleClass('room__active');
})

// ----------------get room---------------------------
let blockTitles = document.querySelectorAll('.get-room__info__block__title');

blockTitles.forEach(el => {
  el.addEventListener('click', () => {
    let content = el.nextElementSibling;

    if (content.style.maxHeight) {
      document.querySelectorAll('.get-room__info__block__description').forEach(el => el.style.maxHeight = null)
    } else {
      document.querySelectorAll('.get-room__info__block__description').forEach(el => el.style.maxHeight = null)
      content.style.maxHeight = content.scrollHeight + 'px';

    }
  })
})

// ---------burger menu----------------------------------------

$('.burger__menu__btn').click(() => {
  $('.burger__menu__nav').toggleClass('active');
  $('.burger__menu__btn').toggleClass('active');
})


