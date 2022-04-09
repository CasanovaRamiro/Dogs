import React from "react";
import { Link } from "react-router-dom";
import css from '../styles/LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={css.container}>
      <div className={css.cont}>
        
        <h2 className={css.title} >Welcome to this Dogs Project!</h2>
      <Link to='/home'>
        <button className={css.btn}>Start Now!</button>
      </Link>
      </div>
        
    </div>
  );
}