const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const makeDETRequest = (url) => fetch(url)
  .then((res) => res.json());

class GoodsItem {
  constructor(product_name = 'nothing', price = 0) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <h3>${this.product_name}</h3>
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
    return makeDETRequest(`${API_URL}/catalogData.json`)
      .then((goods) => {
        this.goods = goods;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  sum() {
    let sum = 0;
    this.goods.forEach(good => {
      sum += good.price;
    });
    console.log(`Total sum: ${sum}`);
  }
}

const list = new GoodsList();
list.fetchGoods().then(() => {
  list.render();
  list.sum();
});
