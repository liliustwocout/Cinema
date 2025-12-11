import { useContext } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieProvider";



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 7
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const MovieList = ({ title, data, loading, error }) => {
    const { handleOpenDetail } = useContext(MovieContext);
    return (
        <div className='text-white p-10 mb-10 movie-section'>
            <h2 className="uppercase text-3xl font-bold mb-5">{title}</h2>

            {error && <p className="text-red-400 mb-4">{error}</p>}
            {loading && <p className="mb-4">Đang tải...</p>}

            <Carousel responsive={responsive} className="flex items-center space-x-4">
                {data && data.length > 0 && data.map((item) => (
                    <div key={item.id} className="w-[300px] h-[450px] relative group space-x-4">
                        <div
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
                            onClick={() => handleOpenDetail(item.id)}
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-black/40 group-hover:opacity-0 transition-opacity duration-500 ease-in-out" />
                            <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-full " />
                            <div className="absolute bottom-4 left-4">
                                <p className="uppercase text-xl movie-title">{item.title || item.original_title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

        </div>
    )
}

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
};

export default MovieList