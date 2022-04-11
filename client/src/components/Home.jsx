import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  orderByAlphabet,
  orderByWeight,
  getTemperaments,
  filterByTemperament,
  filterByOrigin
} from "../actions";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import Paginado from "./Paginado";
import Nav from "./Nav";

import css from "../styles/Home.module.css";
import CardCss from "../styles/Card.module.css";



export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [actualPage, setActualPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(9);
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const [order, setOrder] = useState("");

  const paginado = (numPage) => {
    setActualPage(numPage);
  };
  console.log(order)
  

  useEffect(() => {
    console.log("dogs arrived");
    dispatch(getDogs());
  }, [dispatch]);
  useEffect(() => {
    console.log("temperaments arrived");
    dispatch(getTemperaments());
  }, [dispatch]);
  useEffect(() => {
    if(currentDogs.length === 0 ){
    paginado(1)}
  }, [currentDogs]);

  function handleReload(e) {
    e.preventDefault();
    dispatch(getDogs());
    paginado(1);

  }

  function handleTemperamentFilter(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    paginado(1);

  }
  function handleOriginFilter(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    paginado(1);

  }

  function handleOrderByAlphabet(e) {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    paginado(1);
    setOrder(`ordered by ${e.target.value}`);
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    paginado(1);
    setOrder(`ordered by ${e.target.value}`);
  }

  return (
    <div>
      <Nav/>

      <div className={css.title}>
        <h1>Your Dogs Page!</h1>
      </div>

      <div className={css.container}>
        <button className={css.btn} onClick={(e) => handleReload(e)}>
          Reset Filters
        </button>
        {/* order by weight */}
        <select className={css.btn} onChange={(e) => handleOrderByWeight(e)}>
          <option className={css.btn}>Order By Weight!</option>
          <option className={css.btn} value="high">Highest Weight</option>
          <option className={css.btn} value="low">Lowest Weight</option>
        </select>

        {/* order by Alphabet */}
        <select className={css.btn} onChange={(e) => handleOrderByAlphabet(e)}>
          <option className={css.btn} >Order Alphabetically!</option>
          <option className={css.btn} value="asc">From A to Z</option>
          <option className={css.btn} value="des">From Z to A</option>
        </select>
        <select className={css.btn}  onChange={(e) => handleOriginFilter(e)}>
          <option >Filter By Origin</option>
          <option value="All">All</option>
          <option value="Api">Existent</option>
          <option value="Db">Created</option>
        </select>
        <select className={css.btn} onChange={(e) => handleTemperamentFilter(e)}>
          <option className={css.btn} value="All">Filter By Temperament!</option>
          <option className={css.btn} value="All">All</option>
          {allTemperaments?.map((e) => {
            return (
              <option className={css.btn} key={e.id} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className={CardCss.container}>
        {currentDogs.length === 0 ? (
          <h1>The dogs you were looking for were not found, sorry!</h1>
        ) : (
          currentDogs?.map((dog) => {
            return (
              <div className={CardCss.card} key={dog.id}>
                <NavLink
                  to={"/dog/" + dog.id}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    name={dog.name}
                    img={dog.img}
                    weight={dog.weight}
                    temperament={dog.temperament}
                    temperaments={dog.temperaments?.map(e=>e.name)}
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
        actualPage = {actualPage}
      />
    </div>
  );
}
