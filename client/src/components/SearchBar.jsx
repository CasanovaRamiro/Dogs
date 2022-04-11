import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getDogsByName } from '../actions'
import NavCss from "../styles/Nav.module.css";



export default function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleInput = (e)=>{
    e.preventDefault();
    setName(e.target.value)
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    dispatch(getDogsByName(name))
  }
  return (
    <div className="search-bar">
      <input  className={NavCss.btn} type="text" placeholder="Search Dogs.." onChange={e=> handleInput(e)} />
      
      <button className={NavCss.btn} type="submit" onClick={e=> handleSubmit(e)}>Search</button>
    </div>
  );
}