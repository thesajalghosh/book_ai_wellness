import React, { useState } from "react";
import PersonImage from "../Images/avataor.png";
import BookImage from "../Images/book_m.png";
import BookShow from "../component/BookShow";
import Avater from "../component/avater";


const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

const BookPageNL = () => {
    const [activeChapter, setActiveChapter] = useState(1);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans">
            <div className="w-[90%]">

                <h2 className="text-[1.1rem] w-full font-bold mb-4">The Secrets of Nitric Oxide</h2>

                <div className="bg-gradient-to-r from-[#F6F6F6] to-[#B8BBC2] shadow-xl rounded-[40px] p-6 flex flex-col justigy-center items-center md:flex-row gap-[15px] w-full h-[90vh]">

                    <div className="relative flex flex-col items-center justify-center md:basis-[30%] w-full">
                        <Avater />
                    </div>
                    <div className="flex flex-col gap-4 md:basis-[70%] w-full">
                        <div className="flex justify-center">
                            <BookShow call_from={"notLogin"}/>
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
        </div>
    );
};

export default BookPageNL;
