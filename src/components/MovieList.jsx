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
            {loading && <p className="mb-4 text-gray-300">Đang tải...</p>}
            {!loading && (!data || data.length === 0) && <p className="mb-4 text-gray-300">Chưa có dữ liệu.</p>}

            <Carousel responsive={responsive} className="flex items-center space-x-4">
                {data && data.length > 0 && data.map((item) => (
                    <div
                        key={item.id}
                        className="w-[280px] sm:w-[300px] h-[420px] sm:h-[450px] relative group space-x-4"
                    >
                        <div
                            className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
                            onClick={() => handleOpenDetail(item.id)}
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-black/50 to-black/80 group-hover:from-black/10 group-hover:via-black/20 group-hover:to-black/50 transition-opacity duration-500 ease-in-out" />
                            <img
                                src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="uppercase text-lg md:text-xl movie-title line-clamp-2 drop-shadow-md">
                                    {item.title || item.original_title}
                                </p>
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