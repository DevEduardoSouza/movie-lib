import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; //Ele permite pegar o query string da url (q=)
import MovieCard from "../components/MovieCard";

//Vou precisar da URL
const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";

const Search = () => {
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);

    const query = searchParams.get("q"); //


    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
        console.log(movies.length)
    }

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
        getSearchedMovies(searchWithQueryURL);

        //posso colocar o query na dependencia então toda vez que mudar o query vai muda essa função aqui
    }, [query])



    return (
        <div className="conteiner">
            {/* Essa query é o texto que o usuário está buscando */}
                <h2 className="title">Resultado para: <span className="query-text">{query}</span></h2>
                <div className="movies-conteiner">
                    {movies.length === 0 && <p>Carregando.....</p>}
                    {/* Primeiro verifico se possui dados no topMovies */}
                    {movies.length > 0 ?
                        (movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}  />
                        ))) : (
                            <p>Sem filmes</p>
                        )
                    }
                </div>
            </div>
    )
}

export default Search