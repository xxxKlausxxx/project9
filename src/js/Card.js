export default class Card {

    constructor(text, image, popupOpenImage) {
        this.text = text;
        this.image = image;
        this.popupOpenImage = popupOpenImage;
        this.remove = this.remove.bind(this);
        this.openImage = this.openImage.bind(this);
    }

    //Лайки

    like() {
        this.classList.toggle('place-card__like-icon_liked');

    }


    //Удаление карточек

    remove(){
            this.cardElem.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
            this.cardElem.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
            this.cardElem.querySelector('.place-card__image').removeEventListener('click',this.openImage);

        this.cardElem.parentElement.removeChild(this.cardElem);
    }

    //Открытие изображения

    openImage(){ 
      if(event.target.classList.contains("place-card__image")) {
      this.popupOpenImage.openImage(event)
    }}



    //Создание карточек

    create() {

        const card = document.createElement("div");
        card.classList.add('place-card');

        const cardImage = document.createElement("div");
        cardImage.classList.add('place-card__image');
        cardImage.setAttribute('style', 'background-image');
        cardImage.style.backgroundImage = `url(${this.image})`;
        cardImage.setAttribute('data-url', `${this.image}`);

        const cardDeleteIcon = document.createElement("button");
        cardDeleteIcon.classList.add('place-card__delete-icon');

        const cardDescription = document.createElement("div");
        cardDescription.classList.add('place-card__description');

        const cardName = document.createElement("h3");
        cardName.classList.add('place-card__name');
        cardName.textContent = this.text;

        const cardLikeIcon = document.createElement("button");
        cardLikeIcon.classList.add('place-card__like-icon');

        card.appendChild(cardImage);
        cardImage.appendChild(cardDeleteIcon);
        card.appendChild(cardDescription);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(cardLikeIcon);

        this.cardElem = card;

        this.setEventListeners();

        return this.cardElem;

    }


      setEventListeners() {
        this.cardElem.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.cardElem.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        this.cardElem.querySelector('.place-card__image').addEventListener('click',this.openImage);

     }

}
