import Header from './components/Header.jsx';
import Banner from './components/Banner.jsx';
import MovieList from './components/MovieList.jsx';
import { useState, useEffect } from 'react';
import MovieSearch from './components/MovieSearch.jsx';
import { MovieProvider } from './context/MovieProvider.jsx';
import Info from './components/Info.jsx';
import Contact from './components/Contact.jsx';

function App() {
  const [movie, setMovie] = useState([]);
  const [movieLoading, setMovieLoading] = useState(false);
  const [movieError, setMovieError] = useState(null);

  const [movieRate, setMovieRate] = useState([]);
  const [movieRateLoading, setMovieRateLoading] = useState(false);
  const [movieRateError, setMovieRateError] = useState(null);

  const [movieSearch, setMovieSearch] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const fetchPopular = async () => {
    setMovieLoading(true);
    setMovieError(null);
    try {
      const url = `https://api.themoviedb.org/3/movie/popular?language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setMovie(data.results || []);
    } catch (error) {
      setMovieError("Không tải được danh sách phim hot.");
    } finally {
      setMovieLoading(false);
    }
  };

  const fetchTopRated = async () => {
    setMovieRateLoading(true);
    setMovieRateError(null);
    try {
      const url = `https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setMovieRate(data.results || []);
    } catch (error) {
      setMovieRateError("Không tải được danh sách phim đề cử.");
    } finally {
      setMovieRateLoading(false);
    }
  };

  const handleSearch = async (searchValue) => {
    const query = (searchValue || "").trim();
    setMovieSearch([]);
    if (!query) return;

    setSearchLoading(true);
    setSearchError(null);

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      setMovieSearch(data.results || []);
    } catch (error) {
      setSearchError("Không tìm kiếm được phim.");
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
    fetchTopRated();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="min-h-screen w-full pb-10 bg-black text-white" id="home">
          <Header onSearch={handleSearch} />
          <Banner />
          {movieSearch.length > 0 || searchLoading || searchError ? (
            <MovieSearch
              title={"Kết quả tìm kiếm"}
              data={movieSearch}
              loading={searchLoading}
              error={searchError}
            />
          ) : (
            <>
              <MovieList
                title={"Phim Hot"}
                data={movie}
                loading={movieLoading}
                error={movieError}
              />
              <MovieList
                title={"Phim Đề cử"}
                data={movieRate}
                loading={movieRateLoading}
                error={movieRateError}
              />
            </>
          )}
          <Info />
          <Contact />
        </div >
      </MovieProvider>
    </>
  )
}

export default App;
