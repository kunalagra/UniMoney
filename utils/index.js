import { images } from "../constants";

export const spendingCategories = [
    {
        name: 'ATM',
        image: images.cash_withdrawal
    },
    {
        name: 'Bills',
        image: images.bill
    },
    {
        name: 'Education',
        image: images.education
    },
    {
        name: 'Entertainment',
        image: images.entertainment
    },
    {
        name: 'Food & drinks',
        image: images.food
    },
    {
        name: 'Fuel',
        image: images.fuel
    },
    {
        name: 'Gadgets',
        image: images.gadget
    },
    {
        name: 'Groceries',
        image: images.cart_shopping
    },
    {
        name: 'Shopping',
        image: images.shopping
    },
    {
        name: 'Health',
        image: images.medicines
    },
    {
        name: 'Household',
        image: images.shampoo
    },
    {
        name: 'House rent',
        image: images.house
    },
    {
        name: 'Insurance',
        image: images.insurance
    },
    {
        name: 'Investment',
        image: images.investment
    },
    {
        name: 'Payments',
        image: images.payments
    },
    {
        name: 'Transfers',
        image: images.bank
    },
    {
        name: 'Travel',
        image: images.travel
    },
];


export const userGoals = ['Win at work', 'Have more money', 'Be productive', 'Build strong family', 'Have a healthy body', 'Love & be loved', 'Be happy', 'Improve social life'];

export const moneyTextHelper = (money) => {
    let resMoney = "";
    let i = 0;
    while (money > 0) {
        resMoney += (money%10).toString();
        i += 1;
        if (i===3) {
            i = 0;
            resMoney += ',';
        };
        money = Math.floor(money / 10);
    }

    let res = resMoney.split('');
    if (res[res.length - 1]===',') res.pop();

    return res.reverse().join('');
}