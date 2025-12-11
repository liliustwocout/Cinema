import PropType from "prop-types";
import { useState } from "react";

const Header = ({ onSearch }) => {
    const [textSearch, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    return (
        <div className="px-4 md:px-6 lg:px-10 py-3 fixed w-full top-0 z-50 shadow-md bg-black">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
                {/* Brand + toggle (mobile) */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <h1 className="text-2xl md:text-[32px] lg:text-[40px] uppercase font-bold text-red-700">Cinema Louis</h1>
                    <button
                        className="text-white md:hidden p-2"
                        aria-label="Toggle menu"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>
                </div>

                {/* Nav + search */}
                <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row md:items-center md:space-x-6 mt-3 md:mt-0 gap-3 md:flex-nowrap w-full md:w-auto`}>
                    <nav className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-lg md:text-xl">
                        <a href="#home" className="text-white whitespace-nowrap">Trang chủ</a>
                        <a href="#info" className="text-white whitespace-nowrap">Thông tin</a>
                        <a href="#contact" className="text-white whitespace-nowrap">Liên hệ</a>
                    </nav>
                    <div className="flex items-center space-x-3 w-full md:w-auto md:min-w-[320px] md:flex-nowrap">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="p-2 bg-white text-black rounded-md flex-1 md:flex-none"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    onSearch(textSearch);
                                }
                            }}
                            value={textSearch}
                        />
                        <button
                            className="p-2 text-white bg-red-600 rounded-md cursor-pointer whitespace-nowrap"
                            onClick={() => onSearch(textSearch)}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Header.prototype = {
    onSearch: PropType.func,
}

export default Header;