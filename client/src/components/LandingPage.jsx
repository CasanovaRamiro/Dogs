import React from "react";
import { Link } from "react-router-dom";
import css from '../styles/LandingPage.module.css';

export default function LandingPage() {
  return (
    <div >
      <div className={css.container}>
        <h2>Welcome to this Recipes Project!</h2>
      <Link to='/home'>
        <button>Start Now!</button>
      </Link></div>
        
    </div>
  );
}