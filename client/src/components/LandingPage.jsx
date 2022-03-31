import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div >
      <div>
        <h2>Welcome to this Recipes Project!</h2>
      <Link to='/home'>
        <button>Start Now!</button>
      </Link></div>
        
    </div>
  );
}