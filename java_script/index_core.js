const mainContainer = document.querySelector('.main-container');
const moneyCounter = document.querySelector('.money-counter');
const footer = document.querySelector('.end');

const xml = new XMLHttpRequest();
xml.open('Get', 'render.json');
xml.addEventListener('load', () => {
    const result = JSON.parse(xml.responseText);
    result.forEach((item) => {
        const example = `<div class="block">
                            <div class="photo">
                                <img src="${item.picture}" >
                            </div>
                            <div class="names">
                                <div class="item-name">${item.name}</div>
                                <div class="item-price">
                                    ${item.price}$
                                    <p class="price" style="display: none">${item.codePrice}</p>
                                </div>
                            </div>
                            <div class="buttons">
                                <button class="sell_btn btn">SELL</button>
                                <div class="counter">0</div>
                                <button class="buy_btn btn">BUY</button>
                            </div>
                        </div>`;
        mainContainer.insertAdjacentHTML('beforeend', example);
    });
});
xml.addEventListener('error', () => { 
    console.log('Error 404');
});
xml.send();

let money = 150000000000, moneyDC = 150000000000;
setInterval(() => {
    if (money <= 0) {
        moneyCounter.textContent = 'You spent it all!';
        const allButtons = mainContainer.querySelectorAll('.buy_btn');
        allButtons.forEach((item) => {
            item.setAttribute('disabled', true);
        })
    }
    const moneyStr = String(money);
    const moneyArr = [...moneyStr];
    if (moneyStr.length === 12) {
        moneyArr.splice(3, 0, '.'); moneyArr.splice(7, 0, '.'); moneyArr.splice(11, 0, '.');
    } else if (moneyStr.length === 11) {
        moneyArr.splice(2, 0, '.'); moneyArr.splice(6, 0, '.'); moneyArr.splice(10, 0, '.');
    } else if (moneyStr.length === 10) {
        moneyArr.splice(1, 0, '.'); moneyArr.splice(5, 0, '.'); moneyArr.splice(9, 0, '.');
    } else if (moneyStr.length === 9) {
        moneyArr.splice(3, 0, '.'); moneyArr.splice(7, 0, '.');
    } else if (moneyStr.length === 8) {
        moneyArr.splice(2, 0, '.'); moneyArr.splice(6, 0, '.');
    } else if (moneyStr.length === 7) {
        moneyArr.splice(1, 0, '.'); moneyArr.splice(5, 0, '.');
    } else if (moneyStr.length === 6) {
        moneyArr.splice(3, 0, '.');
    } else if (moneyStr.length === 5) {
        moneyArr.splice(2, 0, '.');
    } else {}
    const vl = moneyArr.join('');
    if (money > 0) {
        moneyCounter.textContent = `${vl} $`;
        const allButtons = mainContainer.querySelectorAll('.buy_btn');
        allButtons.forEach((item) => {
            item.removeAttribute('disabled', true);
        })
    };

    let res = 0;
    const counterCount = mainContainer.querySelectorAll('.counter');
    counterCount.forEach((item) => {
        res += Number(item.textContent);
    });
    const leftMoney = moneyDC - money;
    footer.textContent = `You bought ${res} items, spent ${leftMoney}$`;
}, 100);

mainContainer.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;
    const key = event.target;
    const close = key.closest('.block');
    const price = close.querySelector('.price').textContent;
    const counter = close.querySelector('.counter');
    let counterNumber;
    if (key.classList.contains('buy_btn')) {
        money -= Number(price);
        counterNumber = counter.textContent;
        counter.textContent = ++counterNumber;
    };
    if (key.classList.contains('sell_btn')) {
        if (counter.textContent > 0) {
            money += Number(price);
            counterNumber = counter.textContent;
            counter.textContent = --counterNumber;
        }
    };
});
