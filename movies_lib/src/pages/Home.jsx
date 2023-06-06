import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard";
import './MovieGrid.css'
/*
    useState -> para gerenciar o estado dos filmes
    useEffect -> para fazer a chamada da API
*/

// chave de api e url, que vou pegar do meu .env
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Home = () => {
    // Gerenciar o estado dos filmes

    const [topMovies, setTopMovies] = useState([]);

    //Agora preciso pegar os filmes da API
    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();


        //Agora vou gerenciar 
        // Esse results é pq api retorna vários dados mais só queremos o results
        setTopMovies(data.results);
       
    }

    //com useEffect tem a possibilidade de executar uma função em algum estagio
    // nesse exemplo preciso carregar os filmes toda vez que a página é carregada
    //Quando deixo o [] vazio siginica que vai ser baseado no carragamento da página

    useEffect(() => {

        //Agora preciso montar a url acessar os top filmes
        /*
            preciso cobinar -> url da API, key e filtro de top avaliados
        */
        const topRatedURL = `${moviesURL}top_rated?${apiKey}`;

        //agora posso chamar minha getTopRatedMovies
        getTopRatedMovies(topRatedURL);

    }, [])

    return (

        <div>

            <div className="conteiner">
                <h2 className="title">Melhores filmes:</h2>
                <div className="movies-conteiner">
                    {topMovies.length === 0 && <p>Carregando.....</p>}
                    {/* Primeiro verifico se possui dados no topMovies */}
                    {topMovies.length > 0 ?
                        (topMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}  />
                        ))) : (
                            <p>Sem filmes</p>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Home