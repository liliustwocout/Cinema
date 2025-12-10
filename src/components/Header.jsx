import PropType from "prop-types";
import { useState } from "react";

const Header = ({ onSearch }) => {
    const [textSearch, setSearch] = useState('');

    return (
        <div className="px-15 py-3 bg-black flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-[40px] uppercase font-bold text-red-700">Cinema Louis</h1>
            </div>
            <nav className="flex items-center space-x-20 text-2xl">
                <a href="#" className="text-white">Trang chủ</a>
                <a href="#" className="text-white">Thông tin</a>
                <a href="#" className="text-white">Liên hệ</a>
            </nav>
            <div className="flex items-center space-x-4">
                <input type="text" placeholder="Search" className="p-2 text-black bg-white rounded-md"
                    onChange={(e) => setSearch(e.target.value)}
                    value={textSearch}
                />
                <button className="p-2 text-white bg-red-600 rounded-md cursor-pointer" onClick={() => onSearch(textSearch)}>Search</button>
            </div>
        </div>
    )
}

Header.prototype = {
    onSearch: PropType.func,
}

export default Header;