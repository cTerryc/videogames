import { React, useEffect, useState } from 'react'
import axios from 'axios'

function CreateVideogame(props) {

    const [errors, setErrors] = useState({ form: 'Must complete the form' });

    const [form, setForm] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        genres: [],
        platforms: []
    });

    console.log(errors)

    const onChange = e => {
        //! Recordar que solo los "checkbox" contienen la propiedad parentNode.id
        // de exister la propiedad "parentNode.id" y es igual a "genres"
        if (e.target.parentNode.parentNode.id === 'genres') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.concat(e.target.value)
                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.filter(x => e.target.value !== x)
                }))
            }
        }
        // de exister la propiedad "parentNode.id" y es igual a "platforms"
        if (e.target.parentNode.parentNode.id === 'platforms') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.concat(e.target.name)
                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.filter(x => e.target.name !== x)
                }))
            }
        }
        // capturamos los input text y date("fecha")
        if (e.target.type !== 'checkbox') {
            setForm(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
        // enviamos el state("form") a setErrors, para ir verificando los errores
        setErrors(validateErrors({
            ...form,
            [e.target.name]: e.target.value
        }))
    }
    const validateErrors = form => {
        let errors = {};
        if (!form.name) {
            errors.name = 'Game Name is required';
        } else if (form.name.length < 4) {
            errors.name = 'Game Name must have at least 4 characters';
        }
        if (!form.description) {
            errors.description = 'Description is required';
        } else if (form.description.length < 8) {
            errors.description = 'Description must have at least 8 characters'
        }
        if (!form.rating) {
            errors.rating = 'Rating is required';
        } else if (!/^[1-5]$/.test(form.rating)) {
            errors.rating = 'Rating must be between 1 and 5';
        }
        return errors;
    }

    const onSubmit = e => {
        e.preventDefault()

        //validamos el state form para ver si hay errores
        // validateErrors(form);
        let checkboxsErrors = []
        if (form.genres.length < 1) checkboxsErrors.push('Genres is required');
        if (form.platforms.length < 1) checkboxsErrors.push('Platforms is required');
        
        // Object.values --> retorno un array con los values
        if (Object.values(errors).length || checkboxsErrors.length) {
            return alert(Object.values(errors).concat(checkboxsErrors).join('\n'));
        }
        axios.post('http://localhost:3001/videogames', form)
            .then(res => console.log(res.data));
        alert(`${form.name} Creado Correctamente`)
        props.history.push('/videogames')
    }

    return (
        <div className="main-add">
            <div className="container-add">
                <h2>CREATE GAME - DETAILS -</h2>
                <div className="div-cont">
                    <form onSubmit={onSubmit} onChange={onChange} id="123">
                        <label htmlFor='name' className="title-name">Name: </label>
                        <input className="name" placeholder='Name' type="text" id='name' name='name' autoComplete="off" />
                        <br />
                        <label htmlFor="description" className="title-name">Description: </label>
                        <textarea className="name" name='description' placeholder='Description...' id="description" cols="30" rows="3" />
                        <br />
                        <label htmlFor="date" className="title-name">Release Date: </label>
                        <input name='released' className="dt" type="date" id="date" required />
                        <br />
                        <label htmlFor="rating" className="title-name">Rating: </label>
                        <input name='rating' className="dt" placeholder='Rate from 1 to 5' type="tel" id="rating" maxLength='1' autoComplete="on" />
                        <br />
                        <label className="title-name">Genres: </label>
                        <div id='genres' className="genres-div">
                            <div className="Action">
                                <input name='Action' value='Action' type="checkbox" id="Action" />
                                <label >Action.</label>
                            </div>
                            <div className="indie">
                                <input name='Indie' value='Indie' type="checkbox" id="Indie" />
                                <label htmlFor="Indie">Indie.</label>
                            </div>
                            <div className="Adventure">
                                <input name='Adventure' value='Adventure' type="checkbox" id="Adventure" />
                                <label htmlFor="Adventure">Adventure.</label>
                            </div>
                            <div>
                                <input name='RPG' value='RPG' type="checkbox" id="RPG" />
                                <label htmlFor="RPG">RPG.</label>
                            </div>
                            <div>
                                <input name='Strategy' value='Strategy' type="checkbox" id="Strategy" />
                                <label htmlFor="Strategy">Strategy.</label>
                            </div>
                            <div>
                                <input name='Shooter' value='Shooter' type="checkbox" id="Shooter" />
                                <label htmlFor="Shooter">Shooter.</label>
                            </div>
                            <div>
                                <input name='Casual' value='7Casual' type="checkbox" id="Casual" />
                                <label htmlFor="Casual">Casual.</label>
                            </div>
                            <div>
                                <input name='Simulation' value='Simulation' type="checkbox" id="Simulation" />
                                <label htmlFor="Simulation">Simulation.</label>
                            </div>
                            <div>
                                <input name='Puzzle' value='Puzzle' type="checkbox" id="Puzzle" />
                                <label htmlFor="Puzzle">Puzzle.</label>
                            </div>
                            <div>
                                <input name='Arcade' value='Arcade' type="checkbox" id="Arcade" />
                                <label htmlFor="Arcade">Arcade.</label>
                            </div>
                            <div>
                                <input name='Platformer' value='Platformer' type="checkbox" id="Platformer" />
                                <label htmlFor="Platformer">Platformer.</label>
                            </div>
                            <div>
                                <input name='Racing' value='Racing' type="checkbox" id="Racing" />
                                <label htmlFor="Racing">Racing.</label>
                            </div>
                            <div>
                                <input name='Massively-Multiplayer' value='Massively-Multiplayer' type="checkbox" id="Massively-Multiplayer" />
                                <label htmlFor="Massively-Multiplayer">Massively-Multiplayer.</label>
                            </div>
                            <div>
                                <input name='Sports' value='Sports' type="checkbox" id="Sports" />
                                <label htmlFor="Sports">Sports.</label>
                            </div>
                            <div>
                                <input name='Fighting' value='1Fighting5' type="checkbox" id="Fighting" />
                                <label htmlFor="Fighting">Fighting.</label>
                            </div>
                            <div>
                                <input name='Family' value='Family' type="checkbox" id="Family" />
                                <label htmlFor="Family">Family.</label>
                            </div>
                            <div>
                                <input name='Board Games' value='Board Games' type="checkbox" id="Board Games" />
                                <label htmlFor="Board Games">Board Games.</label>
                            </div>
                            <div>
                                <input name='Educational' value='Educational' type="checkbox" id="Educational" />
                                <label htmlFor="Educational">Educational.</label>
                            </div>
                            <div>
                                <input name='Card' value='Card' type="checkbox" id="Card" />
                                <label htmlFor="Card">Card.</label>
                            </div>
                        </div>
                        <label className="title-name">Platforms: </label>
                        <div id='platforms' className="plat-div">
                            <div>
                                <input name='PC' type="checkbox" id="PC" value={"PC"} />
                                <label htmlFor="PC">PC.</label>
                            </div>
                            <div>
                                <input name='iOS' type="checkbox" id="iOS" />
                                <label htmlFor="iOS">iOS.</label>
                            </div>
                            <div>
                                <input name='Android' type="checkbox" id="Android" />
                                <label htmlFor="Android">Android.</label>
                            </div>
                            <div>
                                <input name='macOS' type="checkbox" id="macOS" />
                                <label htmlFor="macOS">macOS.</label>
                            </div>
                            <div>
                                <input name='PlayStation 4' type="checkbox" id="PlayStation 4" />
                                <label htmlFor="PlayStation 4">PlayStation 4.</label>
                            </div>
                            <div>
                                <input name='PlayStation 5' type="checkbox" id="PlayStation 5" />
                                <label htmlFor="PlayStation 5">PlayStation 5.</label>
                            </div>
                            <div>
                                <input name='XBOX' type="checkbox" id="XBOX" />
                                <label htmlFor="XBOX">XBOX.</label>
                            </div>
                            <div>
                                <input name='PS Vita' type="checkbox" id="PS Vita" />
                                <label htmlFor="PS Vita">PS Vita.</label>
                            </div>
                        </div>
                        <br />
                        <div className="div-but-form">
                            <button type='submit'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default CreateVideogame