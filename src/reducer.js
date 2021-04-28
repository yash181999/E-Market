export const initailState = {
  user: null,
  userName : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        userName:action.userName,
      }  

    default:
      return state;
  }
};

export default reducer;
