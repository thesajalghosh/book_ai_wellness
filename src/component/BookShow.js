// FlipBook.js
import React, { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import HTMLFlipBook from 'react-pageflip';
import { ALL_PDF_IMAGES } from '../Constant.others';

// Page Component
const Page = React.forwardRef(({ children }, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content shadow-xl rounded-md">
                <h2>{children}</h2>
            </div>
        </div>
    );
});


const BookShow = () => {
    const book = useRef();
    const audioRef = useRef(null); // Ref for flip sound

    const [page, setPage] = useState(0);
    const [isSubscribe, setISSubscribe] = useState(false);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.warn("Audio play failed:", err);
            });
        }
    };

    const goNext = () => {
        playSound();
        book.current?.pageFlip()?.flipNext();
    };

    const goPrev = () => {
        playSound();
        book.current?.pageFlip()?.flipPrev();
    };

    const handleFlip = () => {
        playSound();
    };

    return (
        <>
            {/* Audio Tag */}
            <audio ref={audioRef} src="https://res.cloudinary.com/dgkckcwxs/video/upload/v1754245905/pagesound_ewxha1.mp3" preload="auto" />

            <div className="relative w-full h-[75vh] flex justify-center bg-white rounded-xl border border-[#E2E2E2] overflow-hidden">

                {/* Previous Button */}
                <button
                    onClick={goPrev}
                    className="group absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:bg-emerald-600 hover:text-white transition duration-200 z-10"
                >
                    <IoIosArrowBack
                        size={24}
                        className="group-hover:scale-110 transition-transform duration-200"
                    />
                </button>

                {/* Flipbook */}
                <HTMLFlipBook
                    width={400}
                    height={650}
                    onFlip={handleFlip}
                    size="stretch"
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    ref={book}
                    className="flip-book mt-[20px]"
                >
                    {Object.entries(ALL_PDF_IMAGES)?.map(([key, value]) => (
                        <Page key={key}>
                            <img
                                src={value.url}
                                alt={`Page ${key}`}
                                className="h-full w-full object-contain"
                            />
                        </Page>
                    ))}
                </HTMLFlipBook>

                {/* Next Button */}
                <button
                    onClick={goNext}
                    className="group absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:bg-emerald-600 hover:text-white transition duration-200 z-10"
                >
                    <IoIosArrowForward
                        size={24}
                        className="group-hover:scale-110 transition-transform duration-200"
                    />
                </button>
            </div>
        </>
    );
};

export default BookShow;
