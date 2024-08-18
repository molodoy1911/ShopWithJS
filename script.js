const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    {}
  ];
  
class GoodsItem {
  constructor(title = 'nothing', price = 0) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
      </div>
    `;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = goods;
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  sum() {
    let sum = 0;
    this.goods.forEach(good => {
      sum += good.price;
      console.log(sum);
    });
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sum();
