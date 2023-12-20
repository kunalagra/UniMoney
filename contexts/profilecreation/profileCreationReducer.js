const profileCreationReducer = (state, action) => {
    switch (action.type) {

        case "SET_AGE":
            return {
                ...state,
                ageGroup: action.payload.ageGroup
            };

        case "SET_GENDER":
            return {
                ...state,
                gender: action.payload.gender
            };

        case "SET_GOALS":
            return {
                ...state,
                goals: action.payload.goals
            };

        case "SET_GOALS_PROGRESS":
            return {
                ...state,
                goalsProgress: action.payload.goalsProgress
            };

        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload.categories
            };

        case "SET_CATEGORIES_LIMITS":
            return {
                ...state,
                categoriesLimits: action.payload.categoriesLimits
            };

        default:
            return state;
    }
};

export default profileCreationReducer;