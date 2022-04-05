import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs",{});
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}
export function getDogsByName (name) {
  return async function (dispatch){
    try{
      var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      return dispatch ({
        type : 'SEARCH_DOGS_BY_NAME',
        payload: json.data
      })
    }catch (error){
      console.log(error)
    }
  }
}

export function orderByAlphabet(payload){
  return({
    type:'ORDER_BY_ALPHABET',
    payload
  })
}

export function orderByWeight(payload){
  return({
    type:'ORDER_BY_WEIGHT',
    payload
  })
}
export function getDogsDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/dogs/${id}`,{});
    return dispatch({
      type: "GET_DOGS_DETAIL",
      payload: json.data,
    });
  };
}