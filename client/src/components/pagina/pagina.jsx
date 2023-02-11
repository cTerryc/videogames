import React from 'react';
import pagina from "./pagina.module.css"

const Pagina = ({ games }) => {
    // "games" son los 15 elementos(juegos) enviados desde "allGames"

    let index = 1;
    let index2 = 100;
    return (
        <>
            <div className={pagina.garden}>
                {games?.map((ele) => {
                    index2 = index2 + 1
                    return (
                        <div key={index2} className={pagina.div}>
                            <h5>{ele.name}</h5>
                            <img className={pagina.img} src={ele.background_image} alt="gameimage" />
                            {ele.genres?.map((gen, i) => {
                                index++
                                return (
                                    <div key={index}>{gen.name}</div>
                                )
                            })}
                        </div>)

                })}
            </div>
        </>
    );
};

export default Pagina;