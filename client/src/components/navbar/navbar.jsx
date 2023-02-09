import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../Search/search";
import "./navbar.css"

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="navbar-div">
                <NavLink to="/" ><button>Intro</button></NavLink>
                <NavLink to="/videogames" ><button>Videogames</button></NavLink>
                <NavLink to="/createVideogame" ><button>Create Game</button></NavLink>
                <NavLink to="/about" ><button>About</button></NavLink>
                    <SearchBar />
            </div>
        )
    }
}

export default NavBar;