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
    case "ORDER_BY_ALPHABET":
      let alphabetArr =
        payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.dogs.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        dogs: alphabetArr,
      };
    case "ORDER_BY_WEIGHT":
      let arr =
        payload === "high"
          ? state.dogs.sort(function (a, b) {
              if (parseInt(a.weight) < parseInt(b.weight)) {
                return 1;
              }
              if (parseInt(a.weight) > parseInt(b.weight)) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.dogs.sort(function (a, b) {
              if (parseInt(a.weight) > parseInt(b.weight)) {
                return 1;
              }
              if (parseInt(a.weight) < parseInt(b.weight)) {
                return -1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        dogs: arr,
      };
      case "GET_DOGS_DETAIL":
      // console.log(payload)
      return {
        ...state,
        dogDetail: payload,
      };
      case "GET_TEMPERAMENTS":
      // console.log(payload)
      return {
        ...state,
        temperaments: payload,
      };
      case "FILTER_TEMPERAMENTS":
      const dogsStorage = state.dogsStorage;
      const filteredTemperaments =
        payload === "All"
          ? dogsStorage
          : dogsStorage.filter((e) => e.temperament?.includes(payload));
      return {
        ...state,
        dogs: filteredTemperaments,
      };
    default:
      return { ...state };
  }
}
