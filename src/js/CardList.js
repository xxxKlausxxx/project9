export default class CardList {

    constructor(container, arr, createCardInstance, popupOpenImage) {
        this.container = container;
        this.arr = arr;
        this.createCardInstance = createCardInstance;
        this.popupOpenImage = popupOpenImage;
    }

    //Добавление карточек попапа

    addCard(card){
        this.container.appendChild(card);
    }

     //Отрисовка начальных карточек

    // render(){
        
    //       const placeCard = this.createCardInstance(elem.name, elem.link, this.popupOpenImage).create();
    //       this.addCard(placeCard);
        
    // }
}
