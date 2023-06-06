import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
// Icones do react icons
import {BiCameraMovie, BiSearchAlt2} from 'react-icons/bi';
import { useState } from 'react';

import "./Navbar.css";

const Navbar = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()

        //validações do search
        if(!search) return
        //se tiver alguma coisa no search uso o navigate
        navigate(`/search?q=${search}`)
        setSearch("");
        console.log(search);
    }
    return (

        <nav id="navbar">
            <h2>
                <Link to='/'> <BiCameraMovie/> MoviesLib</Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Search a movie...' onChange={(e)=> setSearch(e.target.value)} value={search}/>
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
        </nav>

    )
}

export default Navbar