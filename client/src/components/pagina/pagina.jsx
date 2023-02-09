import React, { useState } from 'react';
import pagina from "./pagina.module.css"

const Pagina = ({ games }) => {
// "games" son los 15 elementos(juegos) enviados desde "allGames"
    return (
        <div className={pagina.garden}>
            {games?.map((ele) => {
                return (
                    <div key={ele.id} className={pagina.div}>
                        <h5>{ele.name}</h5>
                        <img className={pagina.img} src={ele.background_image} alt="gameimage" />
                    </div>)

            })}
        </div>
    );
};

export default Pagina;