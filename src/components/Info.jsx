const Info = () => {
    return (
        <section id="info" className="w-full px-6 md:px-12 lg:px-24 py-16 bg-[#0d0d0d] text-white space-y-6 info-section">
            <h2 className="text-3xl font-bold text-red-500">Thông tin</h2>
            <p className="text-lg leading-7 text-gray-200">
                Cinema Louis mang đến trải nghiệm điện ảnh sống động với phòng chiếu hiện đại,
                kho phim phong phú và dịch vụ đặt vé trực tuyến tiện lợi. Chúng tôi luôn cập nhật
                những bộ phim mới nhất, đảm bảo bạn không bỏ lỡ bất kỳ khoảnh khắc tuyệt vời nào.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 info-card">
                    <h3 className="text-xl font-semibold text-red-400">Rạp chiếu chuẩn 4K</h3>
                    <p className="text-gray-200 text-sm mt-2">Màn hình lớn, âm thanh Dolby Atmos mang lại cảm giác chân thực.</p>
                </div>
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 info-card">
                    <h3 className="text-xl font-semibold text-red-400">Đặt vé nhanh chóng</h3>
                    <p className="text-gray-200 text-sm mt-2">Chọn ghế, thanh toán online và nhận vé điện tử trong vài giây.</p>
                </div>
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 info-card">
                    <h3 className="text-xl font-semibold text-red-400">Ưu đãi thành viên</h3>
                    <p className="text-gray-200 text-sm mt-2">Tích điểm, nhận voucher giảm giá và quà tặng mỗi tuần.</p>
                </div>
            </div>
        </section>
    )
}

export default Info
