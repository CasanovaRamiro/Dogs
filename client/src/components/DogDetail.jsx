import React from "react";
import { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsDetail } from "../actions";
import Nav from "./Nav";

export default function DogDetail() {
  const dispatch = useDispatch();
  const dogDetail = useSelector((state) => state.dogDetail);

  const { id } = useParams();
  // console.log('el id es=' ,id)
  useEffect(() => {
    console.log("dog detail arrived");
    dispatch(getDogsDetail(id));
  }, [dispatch, id]);
  // console.log(dogDetail);

  return (
    <div>
      <Nav />

      <div>
        <h1>{dogDetail.name}</h1>

        <img src={dogDetail.img} alt="dog img" />

        <h4> temperament : {dogDetail.temperament}</h4>

        <h4>weight: {dogDetail.weight}</h4>

        <h4>height: {dogDetail.height}</h4>

        <h4>life expectancy: {dogDetail.lifeExpectancy}</h4>
      </div>
    </div>
  );
}