const response = {
    "data": [
        {
            "id": 1,
            "price": 500,
            "currency": "USDT"
        },
        {
            "id": 2,
            "price": 700,
            "currency": "BTC"
        },
        {
            "id": 3,
            "price": 900,
            "currency": "ETH"
        },
        {
            "id": 4,
            "price": 1000,
            "currency": "BTC"
        },
        {
            "id": 5,
            "price": 1200,
            "currency": "USDT"
        }
    ],
    "currencies-pairs": {
        "USDT-BTC": 0.000035,
        "USDT-ETH": 0.00053,
        "BTC-USDT": 28894.19,
        "BTC-ETH": 15.31,
        "ETH-USDT": 1884.68,
        "ETH-BTC": 0.065
    }
};

const { data, ['currencies-pairs']: currenciesPairs } = response;

const dataByIds = arrayToObject(data, 'id');

function calcItemPriceByCurrency(currency, id) {
    try {
        const item = dataByIds[id];
        const currencyPairToGet = `${currency}-${item.currency}`.toUpperCase();

        if (currency === item.currency) {
            return item.price;
        }

        return item.price / currenciesPairs[currencyPairToGet];
    } catch (e) {
        handleError(e);
    }
}

function calcItemsPriceSumByCurrency(currency, itemsIds) {
    let sum = 0;

    itemsIds.forEach(id => {
        sum = sum + calcItemPriceByCurrency(currency, id);
    });

    return sum;
}

function calcTotalSumByCurrency(currency) {
    return calcItemsPriceSumByCurrency(currency, Object.keys(dataByIds));
}

function arrayToObject (array, keyField) {
    return array.reduce((obj, item) => {
        obj[item[keyField]] = item
        return obj
    }, {})
}

function handleError (err) {
    alert(err.message);
}

console.log(calcItemPriceByCurrency('BTC', '1'));
console.log(calcItemsPriceSumByCurrency('BTC', ['1', '2', '3']));
console.log(calcTotalSumByCurrency('BTC'));
