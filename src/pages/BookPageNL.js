import React, { useEffect, useState } from "react";
import BookShow from "../component/BookShow";
import Avater from "../component/avater";
import Star from "../Images/star.svg";

const BookPageNL = () => {
    const [timeLeft, setTimeLeft] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const updated = prev > 0 ? prev - 1 : 0;
                if (updated === 0) {
                    setIsModalOpen(true);
                }
                return updated;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${mins}:${secs}`;
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans relative">
            {/* Countdown Timer */}
            <div className="absolute top-4 right-0 bg-green-700 text-white px-4 py-2 rounded-tl-[20px] rounded-bl-[20px] shadow-lg text-sm md:text-base z-50">
                Free trial ends in {formatTime(timeLeft)} sec
            </div>

            {/* Container with relative for local overlay */}
            <div className="w-[90%] relative">

                {/* Black Overlay only inside container */}
                {isModalOpen && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 z-10 rounded-[40px]"></div>
                )}

                {/* Main Content */}
                    <h2 className="text-[1.1rem] w-full font-bold mb-4">The Secrets of Nitric Oxide</h2>
                <div className={`transition duration-300 ${isModalOpen ? "blur-sm pointer-events-none" : ""}`}>

                    <div className="bg-gradient-to-r from-[#F6F6F6] to-[#B8BBC2] shadow-xl rounded-[40px] p-6 flex flex-col justify-center items-center md:flex-row gap-[15px] w-full h-[90vh]">
                        <div className="relative flex flex-col items-center justify-center md:basis-[30%] w-full">
                            <Avater />
                        </div>
                        <div className="flex flex-col gap-4 md:basis-[70%] w-full">
                            <div className="flex justify-center">
                                <BookShow call_from={"notLogin"} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition">
                            <span>▶</span> Play My Journey
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition">
                            <span>▶</span> Play promo video
                        </button>
                    </div>
                </div>

                {/* Modal Positioned Inside Container */}
                {isModalOpen && (
                    <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-white rounded-3xl shadow-2xl p-6 text-center">
                        {/* Close Button */}
                        {/* <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            ×
                        </button> */}

                        <div className='w-full'>
                            <div className='flex justify-between items-center'>
                                <h2 className="text-[1.5rem] font-bold mb-1">Get Membership</h2>
                                <div className="flex justify-center mb-2">
                                    <img src={Star} alt="star" className="w-[60px] h-[60px]" />
                                </div>
                            </div>
                            <p className="text-gray-500 text-[0.8rem] mb-4 text-left">
                                Subscribe to Premium to get access to Dr Nathan Bryan <br /> AI Interactive Magazine
                            </p>
                        </div>

                        <div className=" flex justify-between items-center border rounded-2xl py-2 px-2 bg-[#EEEEEE] mb-3 hover:shadow-md transition cursor-pointer">
                            <div>
                                <h3 className="text-lg font-semibold">1 Month</h3>
                                <p className="text-xs text-gray-500 mb-1">3 Day Free Trial</p>
                            </div>
                            <p className="text-[1.4rem] font-semibold flex flex-col">
                                <span>$59</span>
                                <span className="text-sm font-medium">per month</span>
                            </p>
                        </div>

                        <div className="flex justify-between items-center rounded-2xl py-2 px-2 bg-[linear-gradient(to_right,#DBC572,#FFECA3,#C1A950)] hover:shadow-md transition cursor-pointer">
                            <div>
                                <h3 className="text-lg font-semibold text-white">1 Year</h3>
                                <p className="text-xs text-white mb-1">Save 20%</p>
                            </div>
                            <p className="text-[1.4rem] font-semibold text-white flex flex-col">
                                <span>$599</span>
                                <span className="text-sm font-medium">per year</span>
                            </p>
                        </div>

                        <p className="text-xs text-gray-400 mt-4">* Terms and Condition Applied</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookPageNL;
