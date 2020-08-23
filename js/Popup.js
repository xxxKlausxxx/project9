class Popup {

    constructor(popup){
        this.popup = popup;
    }

    //Открытие попапа

    open() {
        this.popup.classList.add('popup_is-opened');
    }

    //Закрытие попапа

    close() {
        this.popup.classList.remove('popup_is-opened');
    }

    openImage(event) {
        this.popup.querySelector(".popup__bg-image").setAttribute('alt', 'Здесь должна быть картинка');
        this.popup.querySelector(".popup__bg-image").setAttribute('src', `${event.target.dataset.url}`);
        this.open()

    }

}