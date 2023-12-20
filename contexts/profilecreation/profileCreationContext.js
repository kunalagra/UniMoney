import React from 'react';
import { createContext, useReducer } from 'react';
import profileCreationReducer from './profileCreationReducer';

// Common-Context
const profileCreationContext = createContext();

// Initial State
const initialState = {
    ageGroup: '18-24',
    gender: 'Male',
    goals: [0, 0, 0, 0, 0, 0, 0, 0],
    goalsProgress: [0, 0, 0, 0, 0, 0, 0, 0],
    categories: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    categoriesLimits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

// Common-Provider Component
const ProfileCreationProvider = ({ children }) => {

    const [state, dispatch] = useReducer(profileCreationReducer, initialState);

    // Search actions
    const setAgeGroup = (ageGroup) => {
        return dispatch({
            type: 'SET_AGE',
            payload: { ageGroup }
        });
    };

    const setGender = (gender) => {
        return dispatch({
            type: 'SET_GENDER',
            payload: { gender }
        });
    };

    const setGoals = (goals) => {
        return dispatch({
            type: 'SET_GOALS',
            payload: { goals }
        });
    };

    const setGoalsProgress = (goalsProgress) => {
        return dispatch({
            type: 'SET_GOALS_PROGRESS',
            payload: { goalsProgress }
        });
    };

    const setCategories = (categories) => {
        return dispatch({
            type: 'SET_CATEGORIES',
            payload: { categories }
        });
    };

    const setCategoriesLimits = (categoriesLimits) => {
        return dispatch({
            type: 'SET_CATEGORIES_LIMITS',
            payload: { categoriesLimits }
        });
    };

    // Context values
    const values = {
        ...state,
        setAgeGroup,
        setGender,
        setGoals,
        setGoalsProgress,
        setCategories,
        setCategoriesLimits
    };

    return (
        <profileCreationContext.Provider value={values}>
            {children}
        </profileCreationContext.Provider>
    );
};

export default profileCreationContext;
export { ProfileCreationProvider };