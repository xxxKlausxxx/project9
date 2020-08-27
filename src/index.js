
import './pages/index.css'
import Api from '../src/js/Api';
import Card from '../src/js/Card';
import CardList from '../src/js/CardList';
import FormValidator from '../src/js/FormValidator';
import Popup from '../src/js/Popup';
import UserInfo from '../src/js/UserInfo'

//const global  = (function() {

  // Переменные

const placesList = document.querySelector(".places-list");
const userInfoButton = document.querySelector(".user-info__button");
const popupInfo = document.querySelector(".popup__info");
const popupProfile = document.querySelector(".popup__profile")
const popupImageContainer = document.querySelector('.popup__image-container');
const popupButton = document.querySelector('.popup__button');
const profileButton = document.querySelector('#profile__button');
const form = popupInfo.querySelector('.popup__form');
const editButton = document.querySelector(".edit__button");
const popupCross = popupInfo.querySelector('.popup__close');
const popupProfileCross = popupProfile.querySelector('.popup__close');
const popupImageCross = popupImageContainer.querySelector('.popup__close');
const userInfoJob = document.querySelector('.user-info__job');
const profileLink = document.querySelector('#profile__link');
const userInfoName = document.querySelector('.user-info__name');
const profileName = document.querySelector('#profile__name');
const popup = Array.from(document.querySelectorAll('.popup'));
const API_URL = process.env.NODE_ENV === "production" ? "https://nomoreparties.co" : "http://nomoreparties.co";

//Классы

const createCardInstance = (...args) => new Card(...args);
const popupOpenImage = new Popup(popupImageContainer)
const cardList = new CardList(placesList, createCardInstance, popupOpenImage);
const popupAddImage = new Popup(popupInfo);
const popupChangeProfile = new Popup(popupProfile);
const userInfo = new UserInfo(userInfoName, userInfoJob);
popup.forEach((elem) => {
  const formValidator = new FormValidator(elem);
  formValidator.setEventListeners();
})

//Подключение к API
const api = new Api(
  {baseUrl: `${API_URL}/cohort12`,
   headers: {
     authorization:'f45a5cb1-aef6-4bd4-96ef-172cd588336a',
     'Content-type': 'application/json'
   }
})

//Массив карточек
api.getCards()
.then((res) => {
  res.forEach((elem => {
    cardList.addCard(createCardInstance(elem.name, elem.link, popupOpenImage).create())
  }))
})
.catch((err) => {
  console.log(`Ошибка: ${err}`)
})

//Изменение профиля
function getProfileApi() {
  api.getProfile()
.then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.updateUserInfo();
})
.catch((err) => {
  console.log(`Ошибка: ${err}`)
})
}

//Функции

//Очистка формы
function cleanPopup(popup) {
const inputsArr = Array.from(popup.querySelectorAll('.popup__input'));
const spansArr = Array.from(popup.querySelectorAll('.error-massage'));
const buttonsArr = Array.from(popup.querySelectorAll('.popup__button'));
form.reset();
spansArr.forEach(elem => {
    elem.classList.add("error-massage_hidden");
  });
inputsArr.forEach(elem => {
    elem.removeAttribute("style");
  });
buttonsArr.forEach(elem => {
    elem.classList.remove('popup__button_active');
  });
}




// Вызов слушателей
getProfileApi()

//Открытие попапов

userInfoButton.addEventListener('click', () => {popupAddImage.open()});
editButton.addEventListener('click', () => {
  popupChangeProfile.open();
    profileButton.classList.add('popup__button_active');
    profileName.value = userInfoName.textContent;
    profileLink.value = userInfoJob.textContent;
})

// Закрытие и очистка форм

popupInfo.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = popupInfo.querySelector('.popup__input_type_name').value;
    const image = popupInfo.querySelector('.popup__input_type_link-url').value;

    event.preventDefault();
    if (popupButton.classList.contains('popup__button_active')){
      cardList.addCard(createCardInstance(text, image, popupOpenImage).create());
      cleanPopup(popupInfo);
      popupAddImage.close();
    }
});
popupCross.addEventListener("click", () => {
  cleanPopup(popupInfo)
  popupAddImage.close()
});
popupProfileCross.addEventListener("click", () => {
  cleanPopup(popupProfile)
  popupChangeProfile.close()
});
popupImageCross.addEventListener("click", () => {
  popupOpenImage.close();
});

// Обновление профиля

popupProfile.addEventListener('submit', (event) => {
  event.preventDefault()
  if(profileButton.classList.contains('popup__button_active')) {
  api.patchApi(profileName.value, profileLink.value)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      userInfo.updateUserInfo();
      popupChangeProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    }) 
}


});
//})();

/*
  Класс Api создан и запросы на сервер описаны, это отлично, но по организации кода 
  есть несколько замечаний:

  Надо исправить:
  - у ссылок пропали двойные слеши после http: запросы не выполняются
  - не создавать экземпляр класса Api, для каждого запроса отдельно, а 
  использовать один экземпляр, для каждого ендпоинта сервера создать отдельный метод
  - не хватает обработки ошибок. В конце цепочки обработки промиса 
   должен быть блок catch обрабатывающий ошибку в случае если запрос на сервер выполнится 
   неудачно
  - все изменения на странице должны происходить, только после того, как
    сервер ответил подтверждением

  Можно лучше: 
  - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод

*/

/*
  Отлично, часть замечаний исправлена верно, но замечания по отправке данных пользователя
  на сервер так и остались:

  Надо исправить:
  - все изменения на странице должны происходить, только после того, как
    сервер ответил подтверждением, попап так де нужно закрывать в блоке then
  - при отправке данных пользователя не делать запрос ещё раз, а использовать данные которые вернул сервер
  - нет обработки ошибок при отправке данных пользователя


*/

/*
  Критические замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/