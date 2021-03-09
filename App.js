import Movie from  './Components/Movie';
import { useEffect, useState } from 'react';

const url = `https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort
_by=popularity.desc`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=3a94078fb34b772a31d9a1348035bed7&query`;

function App ()  {
  const [movies, setMovies] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => { 
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
          setMovies(data.results);
    });
  }, []);

  const handleOnSubmit =(e) => {
    e.preventDefault();
  if(searchVal){
    fetch(SEARCH_API + searchVal)
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
          setMovies(data.results);
    });
  setSearchVal('');
  }
  };

 const handleOnchange = (e) => {
    setSearchVal(e.target.value);
 }
  return ( 
    <>
    <header>
    <form onSubmit={handleOnSubmit}>
     <input className="search"
     type="search" placeholder= "search..."
       value={searchVal}
       onChange={handleOnchange}
     />
    </form>
   </header>
    <div className="movie-container">
      {movies.length >= 0 && 
      movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>
    </>
  );
}

export default App;