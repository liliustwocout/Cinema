import PropType from "prop-types"
import YouTube from "react-youtube";
import Modal from 'react-modal';
import { useState } from "react";

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

const MovieSearch = ({ title, data }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [trailerKey, setTrailerKey] = useState("");

    const handleTrailer = async (id) => {
        setTrailerKey("");

        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            };

            const movieKey = await fetch(url, options);
            const movieData = await movieKey.json();
            setTrailerKey(movieData.results[0].key);
            setModalIsOpen(true);
        } catch (error) {
            setModalIsOpen(false);
            console.log("Error fetching movie trailer:", error);
        }
    }

    return (
        <div className='text-white p-10 mb-10'>
            <h2 className="uppercase text-3xl font-bold mb-5">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data && data.map(item => (
                    <div
                        key={item.id}
                        className="w-[300px] h-[450px] relative object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
                        onClick={() => handleTrailer(item.id)}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-black/40 group-hover:opacity-0 transition-opacity duration-500 ease-in-out" />
                        <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                            alt={item.title}
                            className="w-full h-full " />
                        <div className="absolute bottom-4 left-4">
                            <p className="uppercase text-xl">{item.title || item.original_title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        position: 'fixed',
                        zIndex: 1000,
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: "translate(-50%, -50%)",
                    },
                }}
                contentLabel="Example Modal"
            >
                <YouTube videoId={trailerKey} opts={opts} />;
            </Modal>
        </div>
    )
}

MovieSearch.proTypes = {
    title: PropType.string,
    data: PropType.array
}

export default MovieSearch