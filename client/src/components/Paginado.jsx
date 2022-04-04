import React from 'react';
// import '../css/Paginado.css'
import PaginadoCss from '../styles/Paginado.module.css'

export default function Paginado({ allDogs, dogsPerPage, paginado }) {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div className={PaginadoCss.container} >
            {pageNumber?.map(number => (
                    <button className={PaginadoCss.btn} key={number} onClick={() => paginado(number)}>{number}</button>
                ))}
            
        </div>
    )
}