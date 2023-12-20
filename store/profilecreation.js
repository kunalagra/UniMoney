import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'profilecreation',
  initialState: {
    ageGroup: '18-24',
    gender: 'Male',
    goals: [0, 0, 0, 0, 0, 0, 0, 0],
    goalsProgress: [0, 0, 0, 0, 0, 0, 0, 0],
    categories: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    categoriesLimits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  reducers: {
    setAgeGroupReducer: (state, action) => {
      state.ageGroup = action.payload.ageGroup;
    },
    setGenderReducer: (state, action) =>  {
      state.gender = action.payload.gender;
    },
    setGoalsReducer: (state, action) =>  {
      state.goals = [...action.payload.goals];
    },
    setGoalsProgressReducer: (state, action) =>  {
      state.goalsProgress = [...action.payload.goalsProgress];
    },
    setCategoriesReducer: (state, action) =>  {
      state.categories = [...action.payload.categories];
    },
    setCategoriesLimitsReducer: (state, action) =>  {
      state.categoriesLimits = [...action.payload.categoriesLimits];
    },
  },
});

export default slice.reducer;

// Actions
const { setAgeGroupReducer, setGenderReducer, setGoalsReducer, setGoalsProgressReducer, setCategoriesReducer, setCategoriesLimitsReducer } = slice.actions;

export const setAgeGroup = (ageGroup) => async dispatch => {
  try {
    dispatch(setAgeGroupReducer({ ageGroup }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setGender = (gender) => async dispatch => {
  try {
    return dispatch(setGenderReducer({ gender }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setGoals = (goals) => async dispatch => {
  try {
    return dispatch(setGoalsReducer({ goals }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setGoalsProgress = (goalsProgress) => async dispatch => {
  try {
    return dispatch(setGoalsProgressReducer({ goalsProgress }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setCategories = (categories) => async dispatch => {
  try {
    return dispatch(setCategoriesReducer({ categories }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setCategoriesLimits = (categoriesLimits) => async dispatch => {
  try {
    return dispatch(setCategoriesLimitsReducer({ categoriesLimits }));
  } catch (e) {
    return console.error(e.message);
  }
}