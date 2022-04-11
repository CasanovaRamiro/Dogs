const initialState = {
  dogs: [],
  dogDetail: [],
  dogsStorage: [],
  temperaments: [],
};

export default function reducer(state = initialState, { type, payload }) {
  // let dogsStorage = state.dogsStorage
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
      let prom = (w)=>{ 
        let p = w.split('-')
        let min = parseInt(p[0])
        let max = parseInt(p[1])
        return Math.round((min+max)/2)
      }
      let arr =
        payload === "high"
          ? state.dogs.sort(function (a, b) {
              if (prom(a.weight) < prom(b.weight)) {
                return 1;
              }
              if (prom(a.weight) > prom(b.weight)) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.dogs.sort(function (a, b) {
              if (prom(a.weight) > prom(b.weight)) {
                return 1;
              }
              if (prom(a.weight) < prom(b.weight)) {
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
      let dogsStorage = state.dogsStorage;
      let filteredTemperaments 
        payload === "All"
          ? filteredTemperaments = dogsStorage
          : filteredTemperaments = dogsStorage.filter((e) => e.temperament?.includes(payload)).concat(dogsStorage.filter(e=> e.temperaments?.map(e=> e.name).includes(payload)));
      return {
        ...state,
        dogs: filteredTemperaments,
      };
      case "FILTER_ORIGIN":
      let dogsStorageAux = state.dogsStorage;
      let filteredTemperamentsAux = dogsStorageAux
        if(payload === "Api"){
          filteredTemperamentsAux = dogsStorageAux.filter((e) => e.id.toString().length < 4)}
        if(payload === "Db"){
          filteredTemperamentsAux = dogsStorageAux.filter((e) => e.id.toString().length > 4)}
      return {
        ...state,
        dogs: filteredTemperamentsAux,
      };
      case 'POST_DOG':
        return{
          ...state,
        }
    default:
      return { ...state };
  }
}
