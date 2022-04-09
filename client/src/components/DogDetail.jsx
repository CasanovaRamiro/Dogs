import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsDetail } from "../actions";
import Nav from "./Nav";

import css from "../styles/DogDetail.module.css";

export default function DogDetail() {
  const dispatch = useDispatch();
  const dogDetail = useSelector((state) => state.dogDetail);

  const { id } = useParams();
  // console.log('el id es=' ,id)
  useEffect(() => {
    console.log("dog detail arrived");
    dispatch(getDogsDetail(id));
  }, [dispatch, id]);
  console.log(dogDetail);
  let temp = "";
  if (dogDetail.temperament) {
    temp = dogDetail.temperament;
  } else {
    dogDetail.temperaments?.map((e) => {
      if (temp !== "") {
        return (temp = temp + ", " + e.name);
      } else {
        return (temp = e.name);
      }
    });
  }
  return (
    <div className={css.back}>
      <Nav />

      <div className={css.container}>
        
          <img src={dogDetail.img} alt="dog img" />
        
        <div className={css.infoCont}>
          {" "}
          <h1>{dogDetail.name} </h1>

          <h4>
            {" "}
            Temperament :<br /> <br />
            {dogDetail.temperament ? dogDetail.temperament : temp}
          </h4>

          <div>
            <h5>Weight: {dogDetail.weight} Kg</h5>

            <h5>Height: {dogDetail.height} Kg</h5>
          </div>
          <h5>Life Expectancy: {dogDetail.lifeExpectancy}</h5>
        </div>
      </div>
    </div>
  );
}
