const menuOpenItem = document.querySelector('.menu-open');
const menu = document.querySelector('.show-menu');
const menuCloseItem = document.querySelector('.menu-close');
const menuWrap = document.querySelector('.burger-wrap');

menuOpenItem.addEventListener('click', () => {
    menu.classList.add ('show-menu_active');
});
menuWrap.addEventListener ('click', () => {
    menu.classList.remove ('show-menu_active');
});
menuCloseItem.addEventListener('click', () => {
    menu.classList.remove ('show-menu_active');
});

//

const dots = document.querySelectorAll('.slider-dot');
const next = document.querySelector('.arrow-right');
const prev = document.querySelector('.arrow-left');
const sliderContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.destination-item');
const item = document.querySelector('.destination-item');

let move = 0;
let index = 1;
function slider(move, index) {
    sliderContainer.style.left = -move + 'px';
    dots.forEach(el => el.classList.remove('active-dot'));
    dots[index].classList.add('active-dot');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slides.forEach(item => {
          move = (item.clientWidth + item.clientWidth * 0.045) * (index - 1);
        });
        slider(move, index)
    })
})

slides.forEach((item, index) => {
  item.addEventListener('click', () => {
      slides.forEach(item => {
        move = (item.clientWidth + item.clientWidth * 0.045) * (index - 1);
      });
      slider(move, index)
  })
})


next.addEventListener('click', () => {
  move += item.clientWidth + item.clientWidth * 0.045;
    if (move > item.clientWidth + item.clientWidth * 0.045) {
      move = -(item.clientWidth + item.clientWidth * 0.045);
    }
    dots.forEach((dot, ind) => {
        if (dot.classList.contains('active-dot')) {
            (ind === 2) ? index = 0 : index = ind + 1;
        };
    })
    slider(move, index);
})

prev.addEventListener('click', () => {
  move -= item.clientWidth + item.clientWidth * 0.045;
    if (move < -(item.clientWidth + item.clientWidth * 0.045)) {
        move = item.clientWidth + item.clientWidth * 0.045;
    }
    dots.forEach((dot, ind) => {
        if (dot.classList.contains('active-dot')) {
            (ind === 0) ? index = 2 : index = ind - 1;
        };
    })
    slider(move, index);
})

//

const modalOpenItem = document.querySelector('.header-button');
const mobileOpenItem = document.querySelector('.open-popup')
const modalItem = document.querySelector('.popup-bg');
const modalForm = document.querySelector('.popup');
const dotsBottom = document.querySelector('.slider-bottom')
const signButton = document.querySelector('.sign-button');
const registerButton = document.querySelector('.popup-register-link');
const popupTitle = document.querySelector('.popup-title');
const facebookButton = document.querySelector('.facebook-button');
const googleButton = document.querySelector('.google-button');
const liner = document.querySelector('.liner');
const popupRegister = document.querySelector('.popup-register');


modalOpenItem.addEventListener('click', () => {
    modalItem.classList.add ('popup_active');
    modalItem.style.background = "rgba(0,0,0,0.5)";
});
mobileOpenItem.addEventListener('click', () => {
    modalItem.classList.add ('popup_active');
    modalItem.style.background = 'rgba(0,0,0,0.5)';
    dotsBottom.style.display = 'none';
});
document.addEventListener ('click', (e) => {
    if (e.target === modalItem) {
        modalItem.classList.remove ('popup_active');
        dotsBottom.style.display = 'flex';
    }
});

signButton.addEventListener ('click', () => {
    let inputs = document.getElementsByTagName('input'); 
    for (let input of inputs) {
        alert(input.value) }
}); 

function signPopup () {
    popupTitle.innerHTML = 'Create account';
    facebookButton.style.display = 'none';
    googleButton.style.display = 'none';
    liner.style.display = 'none';
    signButton.innerHTML = 'Sign Up';
    popupRegister.innerHTML = 'Already have an account? <a href="#" class="popup-login-link">Log in</a>';
    modalForm.style.height = '460px';
    const loginButton = document.querySelector('.popup-login-link');
    loginButton.addEventListener('click', loginPopup);
};

function loginPopup () {
    popupTitle.innerHTML = 'Log in to your account';
    facebookButton.style.display = 'flex';
    googleButton.style.display = 'flex';
    liner.style.display = 'block';
    signButton.innerHTML = 'Sign In';
    popupRegister.innerHTML = 'Don’t have an account? <a href="#" class="popup-register-link">Register</a>';
    modalForm.style.height = '660px';
    const registerButton = document.querySelector('.popup-register-link');
    registerButton.addEventListener('click', signPopup);
};

registerButton.addEventListener('click', signPopup);


console.log ('Travel #1.\nВёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +10\nTotal Score: 100');
console.log ('Travel #2.\nВёрстка соответствует макету +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15\nНа ширине экрана 390рх и меньше реализовано адаптивное меню +22\nTotal Score: 85');
console.log ('Travel #3 \nСлайдер изображений в секции destinations +50\nНажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\nНажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение) +25\nTotal Score: 125');