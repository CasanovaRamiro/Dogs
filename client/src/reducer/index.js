const initialState = {
  dogs: [],
  dogDetail: [],
  dogsStorage: [],
  temperaments: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_DOGS":
      return {
        ...state,
        recipes: payload,
        recipesStorage: payload,
      };
    default:
      return { ...state };
  }
}
