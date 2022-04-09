import React from "react";
// import '../css/Paginado.css'
import PaginadoCss from "../styles/Paginado.module.css";

export default function Paginado({
  allDogs,
  dogsPerPage,
  paginado,
  actualPage,
}) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className={PaginadoCss.container}>
      <button
        className={PaginadoCss.btn}
        onClick={() => paginado(actualPage > 1 ? actualPage - 1 : actualPage)}
      >
        menos
      </button>
      {pageNumber?.map((number) => (
        <button
        style={actualPage === number ? {fontWeight: 'bold', transform: 'scale(1.1)', backgroundColor: '#e9ecef'} : {fontWeight: '100'}}
          className={PaginadoCss.btn}
          key={number}
          onClick={() => paginado(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={PaginadoCss.btn}
        onClick={() =>
          paginado(actualPage < pageNumber.length ? actualPage + 1 : actualPage)
        }
      >
        mas
      </button>
    </div>
  );
}
