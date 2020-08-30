export default class Api {

    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
        this.body = config.body;

    }

    getProfile() {
        return fetch(`${this.baseUrl}/users/me`,
        {
           headers: this.headers
        })
        /*
            Можно лучше: проверка ответа сервера и преобразование из json
            дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                _getResponseData(res) {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`); 
                    }
                    return res.json();
                }
            Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
            не используется вне класса Api   
         */
        .then((res) => {
            if(res.ok){
                return res.json();
                
            }
            else {
                Promise.reject(`Ошибка: ${res.status}`);
            }
        })

    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`,
           
             {
           headers: this.headers
        })
        .then((res) => {
            if(res.ok){
                return res.json();
                
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
    }

    patchApi(name, about) {
        return fetch(`${this.baseUrl}/users/me`, { 
            method: 'PATCH',
            headers: this.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })})
        .then((res) => {
            if(res.ok){
                return res.json();
                
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })

    }
    

}