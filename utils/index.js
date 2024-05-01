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

export const categoryImage = {
    'atm': images.cash_withdrawal,
    'bills': images.bill,
    'education': images.education,
    'entertainment': images.entertainment,
    'food-&-drinks': images.food,
    'fuel': images.fuel,
    'gadgets': images.gadget,
    'groceries': images.cart_shopping,
    'shopping': images.shopping,
    'health': images.medicines,
    'household': images.shampoo,
    'house-rent': images.house,
    'insurance': images.insurance,
    'investment': images.investment,
    'payments': images.payments,
    'transfers': images.bank,
    'travel': images.travel,
}


export const userGoals = ['Win at work', 'Have more money', 'Be productive', 'Build strong family', 'Have a healthy body', 'Love & be loved', 'Be happy', 'Improve social life'];

export const pushNotificationOptions = [
    {
        title: 'Morning Learning',
        desc: 'Get the reminder to repeat your goals and to catch up with your daily insight'
    },
    {
        title: 'Stay on track',
        desc: 'Never miss your daily saving goal'
    },
    {
        title: 'Game on',
        desc: 'Stay tuned to roll the dice and cross tiles, discover new friends on the Leaderboard'
    },
]

export const moneyTextHelper = (money) => {
    let resMoney = "";
    let moneyStr = money.toString();
    let moneyArr = moneyStr.split('.');
    let moneyInt = moneyArr[0];
    let moneyDec = moneyArr[1];
    let moneyIntArr = moneyInt.split('');
    let count = 0;
    for (let i = moneyIntArr.length - 1; i >= 0; i--) {
        count++;
        resMoney = moneyIntArr[i] + resMoney;
        if (count % 3 === 0 && i !== 0) {
            resMoney = ',' + resMoney;
        }
    }
    if (moneyDec) {
        resMoney = resMoney + '.' + moneyDec;
    }
    return resMoney;

}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // give time in 12 hour format
    const time = hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`;
    const dayStr = day < 10 ? `0${day}` : day;

    return `${dayStr} ${months[month]} ${year} ${time}`;
}