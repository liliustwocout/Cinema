const Contact = () => {
    return (
        <section id="contact" className="w-full px-6 md:px-12 lg:px-24 py-16 bg-black text-white space-y-8 contact-section">
            <h2 className="text-3xl font-bold text-red-500">Liên hệ</h2>
            <p className="text-lg leading-7 text-gray-200">Bạn có câu hỏi hoặc cần hỗ trợ? Hãy để lại thông tin, chúng tôi sẽ phản hồi sớm nhất.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">Địa chỉ</h3>
                        <p className="text-gray-300">Hà Đông, Hà Nội</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Hotline</h3>
                        <p className="text-gray-300">1900 1234 (8:00 - 22:00)</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Email</h3>
                        <p className="text-gray-300">support@cinemalouis.vn</p>
                    </div>
                </div>
                <form className="space-y-4 bg-[#0f0f0f] p-6 rounded-lg border border-gray-800 contact-form">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-sm uppercase text-gray-700 contact-label">Họ và tên</label>
                        <input id="name" type="text" placeholder="Nhập tên" className="p-3 rounded-md border focus:outline-none focus:border-red-500 contact-input" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm uppercase text-gray-700 contact-label">Email</label>
                        <input id="email" type="email" placeholder="you@example.com" className="p-3 rounded-md border focus:outline-none focus:border-red-500 contact-input" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="message" className="text-sm uppercase text-gray-700 contact-label">Nội dung</label>
                        <textarea id="message" rows="4" placeholder="Bạn cần hỗ trợ điều gì?" className="p-3 rounded-md border focus:outline-none focus:border-red-500 contact-input"></textarea>
                    </div>
                    <button type="button" className="w-full p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition">Gửi yêu cầu</button>
                </form>
            </div>
        </section>
    )
}

export default Contact