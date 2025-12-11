import { createContext } from "react";
import { useMemo, useState } from "react";
import PropType from "prop-types";
import YouTube from "react-youtube";
import Modal from "react-modal";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [detailMovie, setDetailMovie] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState(null);
    const [trailerKey, setTrailerKey] = useState("");

    const handleOpenDetail = async (id) => {
        setDetailLoading(true);
        setDetailError(null);
        setDetailMovie(null);
        setTrailerKey("");

        try {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=vi&append_to_response=videos`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            };

            const res = await fetch(url, options);
            const data = await res.json();

            setDetailMovie(data);

            const ytTrailer = data?.videos?.results?.find(
                (v) => v.site === "YouTube" && v.type === "Trailer"
            );
            if (ytTrailer?.key) setTrailerKey(ytTrailer.key);

            setDetailModalOpen(true);
        } catch (error) {
            setDetailError("Không tải được thông tin phim.");
            setDetailModalOpen(true);
        } finally {
            setDetailLoading(false);
        }
    };

    const modalValue = useMemo(
        () => ({
            detailModalOpen,
            setDetailModalOpen,
            detailMovie,
            detailLoading,
            detailError,
            trailerKey,
            handleOpenDetail,
        }),
        [detailModalOpen, detailMovie, detailLoading, detailError, trailerKey]
    );

    return (
        <MovieContext.Provider value={modalValue}>
            {children}
            <Modal
                isOpen={detailModalOpen}
                onRequestClose={() => setDetailModalOpen(false)}
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
                contentLabel="Movie detail modal"
            >
                {detailLoading && <p>Đang tải...</p>}
                {detailError && <p className="text-red-500">{detailError}</p>}
                {!detailLoading && !detailError && detailMovie && (
                    <div className="flex flex-col md:flex-row gap-4 text-black max-w-[700px]">
                        <img
                            src={
                                detailMovie.poster_path
                                    ? `${import.meta.env.VITE_IMG_URL}${detailMovie.poster_path}`
                                    : ""
                            }
                            alt={detailMovie.title}
                            className="w-[200px] rounded-md object-cover"
                        />
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">{detailMovie.title}</h3>
                            <p className="text-sm text-gray-600">
                                Phát hành: {detailMovie.release_date || "N/A"} • Điểm:{" "}
                                {detailMovie.vote_average?.toFixed(1) ?? "N/A"}
                            </p>
                            <p className="text-sm text-gray-700">
                                Thời lượng: {detailMovie.runtime ? `${detailMovie.runtime} phút` : "N/A"}
                            </p>
                            <p className="text-gray-800 text-base">{detailMovie.overview || "Chưa có mô tả."}</p>
                            {trailerKey && (
                                <div className="pt-2">
                                    <YouTube
                                        videoId={trailerKey}
                                        opts={{ width: "100%", height: "300", playerVars: { autoplay: 0 } }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </MovieContext.Provider>
    )
}

MovieProvider.propTypes = {
    children: PropType.node,
}

export { MovieContext, MovieProvider };