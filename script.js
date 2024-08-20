function makeDETRequest(url) {
  return new Promise((resolve, reject) => {
    var xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(`Error: ${xhr.status}`);
        }
      } 
    }

    xhr.open('GET', url, true);
    xhr.send();
  });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
        this.goods = JSON.parse(goods);
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
