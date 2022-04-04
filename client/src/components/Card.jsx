import React from "react";
import CardCss from '../styles/Card.module.css'


export default function Card({name, img, weight, temperament }) {


  return (
    <div >
      <img className={CardCss.img}  src={img} alt=" dog img"/>
        
      <h3 className={CardCss.name}>{name}</h3>
      <h3 className={CardCss.section}>Weight:</h3>
     <h3 className={CardCss.weight}>{weight}  (Kg)</h3>
     <h3 className={CardCss.section}>Temperament:</h3>
      <h3 className={CardCss.temperament}>{temperament}</h3>
    </div>
  );
}
