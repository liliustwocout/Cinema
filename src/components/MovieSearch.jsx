import { useContext } from "react";
import PropType from "prop-types";
import { MovieContext } from "../context/MovieProvider";


const MovieSearch = ({ title, data, loading, error }) => {
    const { handleOpenDetail } = useContext(MovieContext);


    return (
        <div className='text-white p-10 mb-10 movie-section'>
            <h2 className="uppercase text-3xl font-bold mb-5">{title}</h2>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            {loading && <p className="mb-4">Đang tải...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data && data.map(item => (
                    <div
                        key={item.id}
                        className="w-[300px] h-[450px] relative object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
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
                ))}
            </div>
        </div>
    )
}

MovieSearch.proTypes = {
    title: PropType.string,
    data: PropType.array,
    loading: PropType.bool,
    error: PropType.string,
}

export default MovieSearch