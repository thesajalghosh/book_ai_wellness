import React from 'react';
import Main_bg from "../Images/main_bg.png";
import BookRotation from '../component/BookRotaion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")
    return (
        <div
            className="relative bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(${Main_bg})` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white text-center">
                <h2 className="text-2xl md:text-4xl font-semibold mb-8">
                    Dr. Nathan Bryan’s Books
                </h2>

                {/* Book carousel */}
                <BookRotation />

                {/* Subtitle & button */}
                <div className="mt-10">
                    <p className="text-lg md:text-xl font-semibold mb-2">
                        The Secrets of Nitric Oxide
                    </p>
                    <button className="mt-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-sm"
                    onClick={()=> navigate("/book-page")}
                    >
                        Know More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
