import images from "./images";
import { COLORS } from "./theme";

export const transactionsData = [
    {
        id: 1,
        name: 'Airtel Recharge',
        image: images.airtelicon,
        time: '23 Oct 2023, 9:03 am',
        amount: 239,
        isExpense: true
    },
    {
        id: 2,
        name: 'Elon Musk',
        image: images.payments,
        time: '20 Oct 2023, 7:49 pm',
        amount: 2289,
        isExpense: false
    },
    {
        id: 3,
        name: 'Netflix Premium',
        image: images.netflixicon,
        time: '20 Oct 2023, 11:56 pm',
        amount: 649,
        isExpense: true
    },
    {
        id: 4,
        name: 'Narendra Modi',
        image: images.payments,
        time: '20 Oct 2023, 7:49 pm',
        amount: 2200,
        isExpense: false
    },
    {
        id: 5,
        name: 'Mark Zuckerburg',
        image: images.payments,
        time: '19 Oct 2023, 6:36 am',
        amount: 2000,
        isExpense: true
    },
    {
        id: 6,
        name: 'Dream 11',
        image: images.dream11,
        time: '19 Oct 2023, 10:23 am',
        amount: 59,
        isExpense: true
    },
    {
        id: 7,
        name: 'Xi Jinping',
        image: images.payments,
        time: '18 Oct 2023, 2:15 pm',
        amount: 10000,
        isExpense: true
    },
    {
        id: 8,
        name: 'Tim Cook',
        image: images.payments,
        time: '16 Oct 2023, 2:56 pm',
        amount: 2866,
        isExpense: false
    },
    {
        id: 9,
        name: 'Joe Root',
        image: images.payments,
        time: '15 Oct 2023, 4:45 pm',
        amount: 5000,
        isExpense: false
    },
];

export const spendsData = [
    {
        id: 1,
        name: 'Payments',
        image: images.payments,
        amount: 8926
    },
    {
        id: 2,
        name: 'ATM',
        image: images.cash_withdrawal,
        amount: 5000
    },
    {
        id: 3,
        name: 'Entertainment',
        image: images.entertainment,
        amount: 4626
    },
    {
        id: 4,
        name: 'Bills',
        image: images.bill,
        amount: 3799
    },
    {
        id: 5,
        name: 'Food & drinks',
        image: images.food,
        amount: 2020
    },
    {
        id: 6,
        name: 'Miscellaneous',
        image: images.miscellaneous,
        amount: 2000
    },
];

export const incomeData = [
    {
        id: 1,
        name: 'Payments',
        image: images.payments,
        amount: 25000
    },
    {
        id: 2,
        name: 'Transfers',
        image: images.bank,
        amount: 5000
    },
    {
        id: 3,
        name: 'Miscellaneous',
        image: images.miscellaneous,
        amount: 1270
    },
];

export const monthlyExpense = [
    { label: 'Jun', value: 21.300, dataPointText: '21.3K' },
    { label: 'Jul', value: 24.300, dataPointText: '24.3K' },
    { label: 'Aug', value: 22.300, dataPointText: '22.3K' },
    { label: 'Sep', value: 23.000, dataPointText: '23.0K' },
    { label: 'Oct', value: 26.371, dataPointText: '26.3K' },
    { label: 'Nov', value: 21.000, dataPointText: '21.0K' },
    { label: 'Dec', value: 27.000, dataPointText: '27.0K' },
];

export const monthlyIncome = [
    { label: 'Jun', value: 26.402, dataPointText: '26.4K'},
    { label: 'Jul', value: 29.402, dataPointText: '29.4K'},
    { label: 'Aug', value: 28.402, dataPointText: '28.4K'},
    { label: 'Sep', value: 30.313, dataPointText: '30.3K'},
    { label: 'Oct', value: 31.270, dataPointText: '31.2K'},
    { label: 'Nov', value: 29.300, dataPointText: '29.3K'},
    { label: 'Dec', value: 32.000, dataPointText: '32.0K'},
];

export const budgetModeCategories = [
    {
        title: 'Shopping',
        image: images.shopping,
        currentSpend: 1000,
        budgetSet: 5000
    },
    {
        title: 'Entertainment',
        image: images.entertainment,
        currentSpend: 4000,
        budgetSet: 5000
    },
    {
        title: 'Food & drinks',
        image: images.food,
        currentSpend: 2000,
        budgetSet: 5000
    },
    {
        title: 'Groceries',
        image: images.cart_shopping,
        currentSpend: 3000,
        budgetSet: 5000
    },
    {
        title: 'Gadgets',
        image: images.gadget,
        currentSpend: 2500,
        budgetSet: 5000
    },
    {
        title: 'Bills',
        image: images.bill,
        currentSpend: 1500,
        budgetSet: 5000
    },
    {
        title: 'Fuel',
        image: images.fuel,
        currentSpend: 800,
        budgetSet: 5000
    },
];

export const chartColors = [
    COLORS.main1,
    COLORS.main3,
    COLORS.purple1,
    COLORS.lightblue1,
    COLORS.gray1,
    COLORS.orange1,
    COLORS.lightGold1,
    COLORS.lightGold2,
    COLORS.green1,
    COLORS.gold1,
    COLORS.gold2,
    COLORS.gray2,
    COLORS.gray3,
    COLORS.white4,
    COLORS.white5,
];