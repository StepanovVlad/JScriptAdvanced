const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartVisible: false,
        catalogItems: [],
        cartItems: [],
        userSearch: '',
        filtered: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        validInput(el) {
            const block = document.getElementById(el.id_product);
            if (block.value < 1) {
                block.value = 1;
            } el.quantity = +block.value;
        },

        addItem(item) {
            const el = this.cartItems.find(el => el.id_product === item.id_product)
            if (el) {
                el.quantity++;
            } else {
                this.cartItems.push({...item, quantity: 1});
            }
        },

        removeItem(item) {
            if (item.quantity === 1) {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }else item.quantity--;
        },
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.catalogItems.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(API+this.catalogUrl)
            .then(data => {
                for (let el of data) {
                    this.catalogItems.push(el);

                }
                this.filtered = [...this.catalogItems];
            })
        this.getJson(API+this.cartUrl)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            })
    }
})

// class List {
//     constructor(id, url) {
//         this.url = url;
//         this.id = id;
//         this.data = [];
//         this.items = [];
//         this.filtered = [];
//         this.classItem = Item;
//         this._init();
//     }
//     _init(){
//         this.getJson()
//             .then(data => {this.handleData(data)})
//             .then(() => this._createItems(this.data))
//             .then(() => this._addListeners())
//     }
//     handleData(data){ // Записать полученные данные в массив данных
//         this.data = [...data]; // Создаем копию массива
//     }
//     _createItems(data) { // Добавление товара в список товаров, если его еще нет
//         for (let el of data) {
//             if(!this.items.find(item => item.id_product === el.id_product)) {
//                 this.items.push(new this.classItem(el));
//             }
//         }
//         this._render();
//     }
//     getJson(url) {
//         return fetch( url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }
//     getItem(id){
//         return this.items.find(el => el.id_product === id);
//     }
//     _renderList() { // Получаем разметку списка товаров
//         return this.items.map((item) => item.render()).join('');
//     }
//     _render() {
//         let block = document.getElementById(this.id);
//         block.innerHTML = this._renderList();
//     }
//     _addListeners() {
//         return false
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.items.filter(el => regexp.test(el.product_name));
//         this.items.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
// }
//
// class Item {
//     constructor(el, img = 'https://placehold.it/200x150') {
//         this.id_product = el.id_product;
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.img = img;
//     }
//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                     <img src="${this.img}" alt="${this.product_name}">
//                     <div class="desc">
//                          <h3>${this.product_name}</h3>
//                          <p>${this.price}</p>
//                          <button class="buy-btn" data-id="${this.id_product}">Купить</button>
//                      </div>
//                 </div>`
//     }
// }
//
// class Catalog extends List {
//     constructor(cart, id = 'catalog', url = '/catalogData.json') {
//         super(id, url);
//         this.cart = cart;
//         this.classItem = CatalogItem;
//     }
//     _addListeners() {
//         document.getElementById(this.id).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 const id = +e.target.dataset['id'];
//                 this.cart._addItem(this.getItem(id));
//             }
//         });
//         document.querySelector(`.search-form`).addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector(`.search-field`).value);
//         })
//     }
// }
//
// class CatalogItem extends Item{}
//
// class Cart extends List{
//     constructor(id = 'cart', url='/getBasket.json') {
//         super(id, url);
//         this.classItem = CartItem;
//     }
//     handleData(data) {
//         super.handleData(data.contents);
//     }
//
//     _deleteItem(el){ // Удалить товар из корзины
//         if (el.quantity > 1) {
//             el._changeQuantity(false);
//         } else {
//             this.items.splice(this.items.indexOf(el), 1);
//         }
//         this._render();
//     }
//     _addItem(el) {
//         if(this.getItem(el.id_product)) {
//             this.getItem(el.id_product)._changeQuantity(true);
//         } else {
//             this._createItems([el]);
//         }
//         this._render();
//     }
//     _render() {
//         super._render();
//         let block = document.getElementById(this.id);
//         if (this.items.length === 0) {
//             block.innerHTML = 'Корзина пуста';
//         } else block.insertAdjacentHTML('beforeend',
//             `<p class="cart-total">Вы выбрали ${this._countQuantity()} товаров на сумму ${this._countPrice()} у.е.`);
//     }
//     _addListeners(){
//         document.getElementById(this.id).addEventListener('click', e => {
//             if(e.target.classList.contains('del-btn')){
//                 const id = +e.target.dataset['id'];
//                 this._deleteItem(this.getItem(id));
//             }
//         });
//         document.querySelector(`.btn-cart`).addEventListener('click', () => {
//             document.getElementById(this.id).classList.toggle(`invisible`);
//         })
//         document.getElementById(this.id).addEventListener('change', e => {
//             if (+e.target.value <1) {
//                 e.target.value = '1';
//             } else {
//                 const id = +e.target.dataset['id'];
//                 this.getItem(id)._changeQuantity(e.target.value);
//                 this._render();
//             }
//         });
//     }
//     _countQuantity(){ // Подсчет количества товаров в корзине
//         return  this.items.reduce((sum, item) => sum + item.quantity, 0);
//     }
//     _countPrice(){ // Подсчет стоимости товаров в корзине
//         return this.items.reduce((sum, item) => sum + item._totalPrice(), 0);
//     }
// }
//
// class CartItem extends Item{
//     constructor(el, img = `https://placehold.it/50x100`) {
//         super(el, img);
//         this.quantity = typeof el.quantity !== 'undefined' ? el.quantity : 1; // Количество этого товара в корзине, если новый то 1
//     }
//
//     _totalPrice() { // Общая стоимость товара в корзине с учетом количества
//             return this.price * this.quantity
//     }
//     _changeQuantity(change){ // Изменяет количество товара в корзине
//         if (typeof change !== 'boolean') {
//             this.quantity = +change;
//         } else if (change) {
//             this.quantity ++
//         } else this.quantity --
//     }
//     render(){
//         return `<div class="cart-item">
//                  <img src="${this.img}" alt="${this.product_name}">
//                  <div class="desc-cart">
//                      <h3>${this.product_name}</h3>
//                      <p>${this.price}</p>
//                      <input type="number" class="cart-item-count" min="1" data-id="${this.id_product}" value="${this.quantity}">
//                      <p>${this._totalPrice()}</p>
//                      <button class="del-btn" data-id="${this.id_product}">Удалить</button>
//                  </div>
//              </div>`
//     }
// }
//
// const cart = new Cart();
// const catalog = new Catalog(cart);
//
