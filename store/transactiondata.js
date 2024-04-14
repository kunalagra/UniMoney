import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
    name: 'transactiondata',
    initialState: {
        alltransactions: [],
        dailyincome: 0,
        monthlyincome: 0,
        yearlyincome: 0,
        dailyexpense: 0,
        monthlyexpense: 0,
        yearlyexpense: 0,
        Categories: []
    },
    reducers: {
        setAllTransactionsReducer: (state, action) => {
            state.alltransactions = action.payload.alltransactions;
        },
        setDailyIncomeReducer: (state, action) => {
            state.dailyincome = action.payload.dailyincome;
        },
        setMonthlyIncomeReducer: (state, action) => {
            state.monthlyincome = action.payload.monthlyincome;
        },
        setYearlyIncomeReducer: (state, action) => {
            state.yearlyincome = action.payload.yearlyincome;
        },
        setDailyExpenseReducer: (state, action) => {
            state.dailyexpense = action.payload.dailyexpense;
        },
        setMonthlyExpenseReducer: (state, action) => {
            state.monthlyexpense = action.payload.monthlyexpense;
        },
        setYearlyExpenseReducer: (state, action) => {
            state.yearlyexpense = action.payload.yearlyexpense;
        },
        setCategoriesReducer: (state, action) => {
            state.Categories = action.payload.Categories;
        },

    },
});

export default slice.reducer;

// Actions
const { setAllTransactionsReducer, setDailyIncomeReducer, setMonthlyIncomeReducer, setYearlyIncomeReducer, setDailyExpenseReducer, setMonthlyExpenseReducer, setYearlyExpenseReducer, setCategoriesReducer } = slice.actions;

export const setAllTransactions = (alltransactions) => async dispatch => {
    try {
        dispatch(setAllTransactionsReducer({ alltransactions }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const setDailyIncome = (dailyincome) => async dispatch => {
    try {
        dispatch(setDailyIncomeReducer({ dailyincome }));
    } catch (e) {
        return console.error(e.message);
    }
}
export const setMonthlyIncome = (monthlyincome) => async dispatch => {
    try {
        dispatch(setMonthlyIncomeReducer({ monthlyincome }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const setYearlyIncome = (yearlyincome) => async dispatch => {
    try {
        dispatch(setYearlyIncomeReducer({ yearlyincome }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const setDailyExpense = (dailyexpense) => async dispatch => {
    try {
        dispatch(setDailyExpenseReducer({ dailyexpense }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const setMonthlyExpense = (monthlyexpense) => async dispatch => {
    try {
        dispatch(setMonthlyExpenseReducer({ monthlyexpense }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const setYearlyExpense = (yearlyexpense) => async dispatch => {
    try {
        dispatch(setYearlyExpenseReducer({ yearlyexpense }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const setCategories = (Categories) => async dispatch => {
    try {
        dispatch(setCategoriesReducer({ Categories }));
    } catch (e) {
        return console.error(e.message);
    }
}

