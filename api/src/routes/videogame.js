require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios');

// importando la tabla "Videogame" <== el nombre "Videogame" es porque se le declaro con ese nombre
// mirar /models/Videogame.js
const { Videogame } = require('../db');

//! -----> GET a "/Videogame" <--------

router.get('/:id', async (req, res) => {
    const { id } = req.params
    
    //verifico si es un juego creado y me trae el detalle de la DB
    if (id.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: id,
            },
            include: Genre
        })
        //Parseo el objeto
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        
        //dejo un array con los nombres de Videogame solamente
        videogameDb.genres = videogameDb.genres.map(g => g.name);
        res.json(videogameDb)
    } else {
        //else (si no es un juego creado, voy a buscar la info a la API)
        try {
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            let { id, name, background_image, genres, description, released: releaseDate, rating, platforms } = response.data;
            genres = genres.map(g => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del Videogame
            platforms = platforms.map(p => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
            return res.json({
                id,
                name,
                background_image,
                genres,
                description,
                releaseDate,
                rating,
                platforms
            })
        } catch (err) {
            return console.log(err)
        }
    }
    
})

module.exports = router;