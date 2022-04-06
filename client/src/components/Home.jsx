import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  orderByAlphabet,
  orderByWeight,
  getTemperaments,
  filterByTemperament
} from "../actions";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import Paginado from "./Paginado";
import Nav from "./Nav";

import CardCss from '../styles/Card.module.css'

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state)=> state.temperaments)
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
  useEffect(()=>{
    console.log('temperaments arrived');
    dispatch(getTemperaments());
  }, [dispatch])

  function handleReload(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleTemperamentFilter(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
  }

  function handleOrderByAlphabet(e) {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    setActualPage(1);
    setOrder(`ordered by ${e.target.value}`);
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setActualPage(1);
    setOrder(`ordered by ${e.target.value}`);
  }

  return (
    <div>
      
      <Nav/>
      
       <div><h1>Your Dogs Page!</h1></div>
     
      
       <button className="select" onClick={(e) => handleReload(e)}>Reset Filters</button>
       {/* order by weight */}
       <select  onChange={(e) => handleOrderByWeight(e)}>
          <option   >Order By Weight!</option>
          <option  value="high">Highest Weight</option>
          <option  value="low">Lowest Weight</option>
        </select>

        {/* order by Alphabet */}
        <select className="select" onChange={(e) => handleOrderByAlphabet(e)}>
          <option  >Order Alphabetically!</option>
          <option  value="asc">From A to Z</option>
          <option  value="des">From Z to A</option>
        </select>
        <select onChange={(e)=>handleTemperamentFilter(e)}>
        <option value= 'All' >Order By Temperament!</option>
        <option value= 'All' >All</option>
        {allTemperaments?.map(e => {
          return (<option key={e.name} value={e.name} >{e.name}</option>)
        })}
        </select>


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