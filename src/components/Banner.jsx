import IconRating from "../assets/rating.png";
import IconRatingHalf from "../assets/rating-half.png";
import ImgMovie from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
    return (
        <div className="w-full h-[800px] bg-[url('/banner.png')] bg-center bg-no-repeat bg-cover relative">
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40" />
            <div className="w-full h-full flex items-center justify-center space-x-[30px] p-12 relative z-20">
                <div className="flex flex-col space-y-5 items-baseline w-[50%]">
                    <p className="text-white bg-linear-to-r from-red-600 to-red-300 text-md py-2 px-5">TV Show</p>
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-white text-4xl font-bold">Nghe nói em thích tôi</h2>
                        <div className="flex items-center space-x-3">
                            <img src={IconRating} alt="rating" className="w-8 h-8" />
                            <img src={IconRating} alt="rating" className="w-8 h-8" />
                            <img src={IconRating} alt="rating" className="w-8 h-8" />
                            <img src={IconRating} alt="rating" className="w-8 h-8" />
                            <img src={IconRatingHalf} alt="rating-half" className="w-8 h-8" />
                        </div>
                        <p className="text-white text-2xl">Câu chuyện xoay quanh mối quan hệ giữa một chàng trai giàu có và một cô gái bình thường, khi họ vô tình gặp nhau và bắt đầu một hành trình đầy cảm xúc...</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-white bg-black font-bold text-sm">Chi Tiết</button>
                        <button className="p-2 text-white bg-red-600 font-bold text-sm">Xem Phim</button>
                    </div>
                </div>
                <div className="w-[50%] flex items-center justify-center">
                    <div className="w-[400px] h-[700px] relative group cursor-pointer">
                        <img src={ImgMovie} alt="movie" className="w-full h-full object-cover" />
                        <div className="w-full h-full flex absolute top-0 left-0 items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                            <img src={IconPlay} alt="play" className="w-16 h-16 relative z-20" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Banner;