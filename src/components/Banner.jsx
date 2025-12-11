import { useEffect, useState, useContext } from "react";
import IconRating from "../assets/rating.png";
import IconRatingHalf from "../assets/rating-half.png";
import ImgMovie from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";
import { MovieContext } from "../context/MovieProvider";

const Banner = () => {
    const [bannerMovie, setBannerMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { handleOpenDetail } = useContext(MovieContext);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const url = "https://api.themoviedb.org/3/movie/now_playing?language=vi&page=1";
                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                };
                const res = await fetch(url, options);
                const data = await res.json();
                if (Array.isArray(data.results) && data.results.length > 0) {
                    setBannerMovie(data.results[0]);
                }
                setError(null);
            } catch (error) {
                console.error("Error fetching now playing:", error);
                setError("Không tải được phim đang chiếu.");
            }
            setLoading(false);
        };

        fetchNowPlaying();
    }, []);

    const backdropUrl = bannerMovie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`
        : "/banner.png";

    const posterUrl = bannerMovie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${bannerMovie.poster_path}`
        : ImgMovie;

    const title = bannerMovie?.title || bannerMovie?.name || "Nghe nói em thích tôi";
    const overview = bannerMovie?.overview || "Câu chuyện xoay quanh mối quan hệ giữa một chàng trai giàu có và một cô gái bình thường, khi họ vô tình gặp nhau và bắt đầu một hành trình đầy cảm xúc...";
    const vote = bannerMovie?.vote_average ? bannerMovie.vote_average.toFixed(1) : null;

    return (
        <div
            className="w-full min-h-[600px] lg:h-[800px] bg-center bg-no-repeat bg-cover relative mt-10"
            style={{ backgroundImage: `url(${backdropUrl})` }}
        >
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50" />
            <div className="relative z-20 max-w-6xl mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 md:px-10 py-12 lg:py-0">
                <div className="flex flex-col space-y-5 items-start w-full lg:w-1/2 text-white">
                    <p className="bg-gradient-to-r from-red-600 to-red-400 text-sm md:text-md py-2 px-5 rounded-full">TV Show</p>
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
                        <div className="flex items-center space-x-2 md:space-x-3">
                            <img src={IconRating} alt="rating" className="w-6 h-6 md:w-8 md:h-8" />
                            <img src={IconRating} alt="rating" className="w-6 h-6 md:w-8 md:h-8" />
                            <img src={IconRating} alt="rating" className="w-6 h-6 md:w-8 md:h-8" />
                            <img src={IconRating} alt="rating" className="w-6 h-6 md:w-8 md:h-8" />
                            <img src={IconRatingHalf} alt="rating-half" className="w-6 h-6 md:w-8 md:h-8" />
                            {vote && <span className="text-sm md:text-base text-gray-200 ml-1">({vote}/10)</span>}
                        </div>
                        <p className="text-base md:text-lg lg:text-2xl text-gray-200">{overview}</p>
                    </div>
                    {loading && <p className="text-sm text-gray-200">Đang tải phim đang chiếu...</p>}
                    {error && <p className="text-sm text-red-300">{error}</p>}
                    <div className="flex items-center space-x-4">
                        <button
                            className="p-2 md:p-3 text-white bg-black/70 font-bold text-sm md:text-base rounded-md border border-white/20"
                            onClick={() => bannerMovie?.id && handleOpenDetail(bannerMovie.id)}
                        >
                            Chi Tiết
                        </button>
                        <button
                            className="p-2 md:p-3 text-white bg-red-600 font-bold text-sm md:text-base rounded-md"
                            onClick={() => bannerMovie?.id && handleOpenDetail(bannerMovie.id)}
                        >
                            Xem Trailer
                        </button>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <div
                        className="w-[260px] h-[420px] md:w-[340px] md:h-[520px] lg:w-[400px] lg:h-[700px] relative group cursor-pointer"
                        onClick={() => bannerMovie?.id && handleOpenDetail(bannerMovie.id)}
                    >
                        <img src={posterUrl} alt="movie" className="w-full h-full object-cover rounded-md shadow-2xl" />
                        <div className="w-full h-full flex absolute top-0 left-0 items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-md bg-black/20">
                            <img src={IconPlay} alt="play" className="w-12 h-12 md:w-14 md:h-14 relative z-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;