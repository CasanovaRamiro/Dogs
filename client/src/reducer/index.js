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
        dogs: payload,
        dogsStorage: payload,
      };
    case "SEARCH_DOGS_BY_NAME":
      return {
        ...state,
        dogs: payload,
      };
    default:
      return { ...state };
  }
}
