import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("/dogs", {});
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}
export function getDogsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: "SEARCH_DOGS_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: "SEARCH_DOGS_BY_NAME",
        payload: 'No hay',
      });
    }
  };
}

export function orderByAlphabet(payload) {
  return {
    type: "ORDER_BY_ALPHABET",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}
export function getDogsDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`/dogs/${id}`, {});
    return dispatch({
      type: "GET_DOGS_DETAIL",
      payload: json.data,
    });
  };
}
export function cleanDogsDetail() {
  return async function (dispatch) {
    return dispatch({
      type: "CLEAN_DOGS_DETAIL",
    });
  };
}


export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("/temperament", {});
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}
export function filterByTemperament(temp) {
  return {
    type: "FILTER_TEMPERAMENTS",
    payload: temp,
  };
}
export function filterByOrigin(payload) {
  return {
    type: "FILTER_ORIGIN",
    payload: payload,
  };
}
export function postDog(payload) {
  return async function (dispatch) {
    const json = await axios.post("/dog", payload);
    return json;
  };
}
