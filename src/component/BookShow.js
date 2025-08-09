// FlipBook.js
import React, { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import HTMLFlipBook from 'react-pageflip';
import { NATHAN_BRAYAN_BOOK } from '../Constant.others';

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


const BookShow = ({onFlipTimerStart}) => {
    const book = useRef();
    const audioRef = useRef(null); // Ref for flip sound
    const chapterPageMap = {
        "Chapter 1": 0,
        "Chapter 2": 5,
        "Chapter 3": 10,
        "Chapter 4": 15,
        "Chapter 5": 20,
        "Chapter 6": 25,
        "Chapter 7": 30,
        "Chapter 8": 35,
        "Chapter 9": 40,
        "Chapter 10": 45,
    };
    const [page, setPage] = useState(0);
    const [isSubscribe, setISSubscribe] = useState(false);


    const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);
    const [selected, setSelected] = useState("Chapter 1");

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
        onFlipTimerStart()
        playSound();
    };
    const handleChapterClick = (chapter) => {
        setSelected(chapter);
        const pageNo = chapterPageMap[chapter] || 0;
        if (book.current) {
            book.current.pageFlip().turnToPage(pageNo);
        }
        playSound();
    };

    return (
        <>
            {/* Audio Tag */}
            <audio ref={audioRef} src="https://res.cloudinary.com/dgkckcwxs/video/upload/v1754245905/pagesound_ewxha1.mp3" preload="auto" />
            <div className="w-full mx-auto p-4">
                <p className="mb-2 text-gray-700 font-medium">
                    Click any chapter to explain about the chapter
                </p>

                <div className="flex flex-wrap gap-2">
                    {chapters.map((chapter) => (
                        <button
                            key={chapter}
                            onClick={() => handleChapterClick(chapter)}
                            className={`px-3 py-[2px] rounded-full font-medium border transition-all ${selected === chapter
                                ? "bg-emerald-700 text-white border-emerald-700"
                                : "text-emerald-700 border-emerald-700 hover:bg-emerald-50"
                                }`}
                        >
                            {chapter}
                        </button>
                    ))}
                </div>
            </div>

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
                    {Object.entries(NATHAN_BRAYAN_BOOK)?.map(([key, value]) => (
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
