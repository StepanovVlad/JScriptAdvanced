const goods = [
    {title: 'Shirt',   price: 100, quantity: 10},
    {title: 'Shirt_1', price: 1000, quantity: 1},
    {title: 'Shirt_2', price: 10000, quantity: 0},
    {title: 'Shirt_3', price: 10, quantity: 100},
    {title: 'Shirt_4', price: 500, quantity: 15},
    {title: 'Shirt_5', price: 800, quantity: 0},
    {title: 'Shirt_6', price: 9000, quantity: 2},
    {title: 'Shirt_7', price: 8900, quantity: 7},
];

class ItemsList {
    constructor(id = 'catalog', items = goods) {
        this.id = id;
        this.items = items;
        this._render();
    }

    _renderList() {
        return this.items.map((item) => new Item(item.title, item.price).render()).join('');
    }
    _countPrice(){ // Подсчет стоимости товаров в каталоге
        return this.items.reduce((sum, item) => sum + item.price*item.quantity, 0);
    }
    _render() {
        let block = document.getElementById(this.id);
        block.innerHTML = this._renderList();
        console.log(`Общая стоимость товаров в каталоге ${this._countPrice()} у.е`);
    }
}

class Item {
    constructor(title, price) {
        this.price = price;
        this.title = title;
    }

    render() {
        return `<div class="item"><h3>${this.title}</h3><p>${this.price}</p></div>`
    }
}

class Cart {
    constructor(container = '.cart'){
        this.container = container;
        this.products = goods; // Состав корзины
        this.init();
    }
    init(){
        this._render();
    }
    _addProduct(){ // Добавить товар в корзину

    }
    _deleteProduct(){ // Удалить товар из корзины

    }
    _countQuantity(){ // Подсчет количества товаров в корзине
        return  this.products.reduce((sum, item) => sum + item.quantity, 0);
        // console.log(`Общая стоимость товаров в каталоге равна ${price} у.е`);
    }
    _countPrice(){ // Подсчет стоимости товаров в корзине
        return this.products.reduce((sum, item) => sum + item.totalPrice, 0);
        // console.log(`Общая стоимость товаров в корзине равна ${price} у.е`);
    }

    _render(){ // Прорисовка корзины
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML('beforeend',
            `<div class="product-item-cart">
                 <img src="" alt="Картинка товара">
                 <div class="desc-cart">
                     <h3>Наименование</h3>
                     <p>Стоимость</p>
                     <p>Количество</p>
                     <p>Стоимость всего</p>
                 </div>
             </div>`);
        for (let item of this.products){
            const product = new ProductItemCart(item);
            this.products[this.products.indexOf(item)] = product;
            block.insertAdjacentHTML('beforeend', product.render());
        }
        if (this.products == 0)
            block.innerHTML = 'Корзина пуста';
        else block.insertAdjacentHTML('beforeend', `<p>Вы выбрали ${this._countQuantity()} товаров на сумму ${this._countPrice()} у.е.`);
    }
}

class ProductItemCart {
    constructor(product, quantity = 1, img = `https://placehold.it/20x20`) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img; // Уменьшенное изображение товара
        this.quantity = quantity; // Количество этого товара в корзине
        this.totalPrice = this.price * this.quantity; // Общая стоимость товара в корзине с учетом количества
    }

    changeQuantity(){ // Изменяет количество товара
    }
    render(){
        return `<div class="product-item-cart">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc-cart">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <input type="number" class="" value="${this.quantity}">
                     <p>${this.totalPrice}</p>
                     <button class="del-btn">Удалить</button>
                 </div>
             </div>`
    }
}
let catalog = new ItemsList();

