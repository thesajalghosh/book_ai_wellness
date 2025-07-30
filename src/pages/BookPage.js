import React, { useState } from "react";
import PersonImage from "../Images/avataor.png";
import BookImage from "../Images/book_m.png";
import BookShow from "../component/BookShow";


const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

const BookPage = () => {
  const [activeChapter, setActiveChapter] = useState(1);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans">
      <div className="w-[90%]">

        <h2 className="text-[1.1rem] w-full font-bold mb-4">The Secrets of Nitric Oxide</h2>

        <div className="bg-gradient-to-r from-[#F6F6F6] to-[#B8BBC2]
  shadow-xl rounded-[40px] p-6 flex flex-col md:flex-row gap-[15px] w-full h-[90vh]">

          {/* Left side - 30% */}
          <div className="relative flex flex-col items-center justify-center md:basis-[30%] w-full">
            <img
              src={PersonImage}
              alt="Doctor"
              className="w-64 h-auto object-cover rounded-xl"
            />
            <button className="absolute bottom-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
              Chat Now
            </button>
          </div>

          {/* Right side - 70% */}
          <div className="flex flex-col gap-4 md:basis-[70%] w-full">
            <div className="flex justify-center">
              <BookShow />
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

export default BookPage;
