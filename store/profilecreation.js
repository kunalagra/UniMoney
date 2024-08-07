import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'profilecreation',
  initialState: {
    username: '',
    email: '',
    password: '',
    ageGroup: '18-24',
    gender: 'Male',
    goals: [0, 0, 0, 0, 0, 0, 0, 0],
    goalsProgress: [0, 0, 0, 0, 0, 0, 0, 0],
    categories: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    categoriesLimits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    token: '',
    image: '',
  },
  reducers: {
    setUsernameReducer: (state, action) => {
      state.username = action.payload.username;
    },
    setEmailReducer: (state, action) => {
      state.email = action.payload.email;
    },
    setPasswordReducer: (state, action) => {
      state.password = action.payload.password;
    },
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
    setTokenReducer: (state, action) => {
      state.token = action.payload.token;
    },
    setImageReducer: (state, action) => {
      state.image = action.payload.image;
    },
  },
});

export default slice.reducer;

// Actions
const { setUsernameReducer, setEmailReducer, setPasswordReducer, setAgeGroupReducer, setGenderReducer, setGoalsReducer, setGoalsProgressReducer, setCategoriesReducer, setCategoriesLimitsReducer, setTokenReducer, setImageReducer } = slice.actions;

export const setUsername = (username) => async dispatch => {
  try {
    dispatch(setUsernameReducer({ username }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setEmail = (email) => async dispatch => {
  try {
    dispatch(setEmailReducer({ email }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setPassword = (password) => async dispatch => {
  try {
    dispatch(setPasswordReducer({ password }));
  } catch (e) {
    return console.error(e.message);
  }
}

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

export const setToken = (token) => async dispatch => {
  try {
    return dispatch(setTokenReducer({ token }));
  } catch (e) {
    return console.error(e.message);
  }
}

export const setImage = (image) => async dispatch => {
  try {
    return dispatch(setImageReducer({ image }));
  } catch (e) {
    return console.error(e.message);
  }
}