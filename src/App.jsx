import React from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

let API_URL = 'http://www.omdbapi.com?apikey=d6395926'


export default function App(){
  let [movies,setMovies] = React.useState([])
  let [inputValue,setInputValue] = React.useState('')

  React.useEffect( () => {
    searchMovies('iron man')
  },[])

  let searchMovies = async (title) => {
    let res = await fetch(`${API_URL}&s=${title}`);
    let data = await res.json()

    setMovies(data.Search)

  }

  function inputChanged(e){
    setInputValue((e.target.value))
  }

  function startSearch(){
    searchMovies(inputValue)
  }


  return(
    <div className="app">

      <div className="header-container">
        <h1>Marvino Movies</h1>

        <div className="search">
           <input 
           type="text"
           placeholder='Search for movies'
           value={inputValue}
           onChange={inputChanged}
           />

           <img 
           src={SearchIcon}
           alt="SearchIcon"
           onClick={startSearch}
            />

        </div>

      </div>

      {
        movies?.length > 0 ?
        <div className="container">
        {movies.map( (movie) => {
            return (<MovieCard movie={movie} key={movie.imdbID} />)
        })}
      </div> : <div className="empty">
        <h3>No movies found</h3>
      </div>
      }



      

    </div>
  )
}
