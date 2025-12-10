import Header from './components/Header.jsx';
import Banner from './components/Banner.jsx';
import MovieList from './components/MovieList.jsx';
import { useState, useEffect } from 'react';
import MovieSearch from './components/MovieSearch.jsx';

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchValue) => {
    setMovieSearch([]);

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      setMovieSearch(data.results);
    } catch (error) {
      console.log("Error searching movie:", error);
    }
  }

  useEffect(() => {
    const fecthMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options)
      ])

      const data1 = await res1.json();
      const data2 = await res2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fecthMovie();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-black pb-10">
        <Header onSearch={handleSearch} />
        <Banner />
        {movieSearch.length > 0 ? <MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch} /> : (
          <>
            <MovieList title={"Phim Hot"} data={movie} />
            <MovieList title={"Phim Đề cử"} data={movieRate} />
          </>
        )}
      </div >
    </>
  )
}

export default App;
