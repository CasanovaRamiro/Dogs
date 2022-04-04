import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  
} from "../actions";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import Paginado from "./Paginado";
import Nav from "./Nav";

import CardCss from '../styles/Card.module.css'

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [actualPage, setActualPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(9); 
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(
    indexOfFirstDog,
    indexOfLastDog
  );
  const [order, setOrder] = useState("");

  const paginado = (numPage) => {
    setActualPage(numPage);
  };

  useEffect(() => {
    console.log("dogs arrived");
    dispatch(getDogs());
  }, [dispatch]);

  function handleReload(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  // function handleDietFilter(e) {
  //   e.preventDefault();
  //   dispatch(filterByDiet(e.target.value));
  // }

  // function handleOrderByAlphabet(e) {
  //   e.preventDefault();
  //   dispatch(orderByAlphabet(e.target.value));
  //   setActualPage(1);
  //   setOrder(`ordered by ${e.target.value}`);
  // }

  // function handleOrderByScore(e) {
  //   e.preventDefault();
  //   dispatch(orderByScore(e.target.value));
  //   setActualPage(1);
  //   setOrder(`ordered by ${e.target.value}`);
  // }

  return (
    <div>
      
      <Nav/>
      
       <div><h1>Your Dogs Page!</h1></div>
     
      
       <button className="select" onClick={(e) => handleReload(e)}>Reset Filters</button>
      <div className={CardCss.container}>
        {currentDogs.length === 0 ? (
          <h1>The dogs you were looking for were not found, sorry!</h1>
        ) : (
          currentDogs?.map((dog) => {
            return (
              <div className={CardCss.card}key={dog.id}>
                <NavLink
                  to={"/dog/" + dog.id}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    name={dog.name}
                    img={dog.img}
                    weight={dog.weight}
                    temperament={dog.temperament}
                    id={dog.id}
                  />
                </NavLink>
              </div>
            );
          })
        )}
      </div>
      <Paginado
        allDogs={allDogs.length}
        dogsPerPage={dogsPerPage}
        paginado={paginado}
      />
    </div>
  );
}