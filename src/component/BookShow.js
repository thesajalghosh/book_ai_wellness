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

const BookShow = ({ call_from }) => {
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
    }

    return (
        <>
            {/* Audio Tag */}
            <audio ref={audioRef} src="/sound/pagesound.mp3" preload="auto" />

            <div className="w-full h-[75vh] flex justify-center bg-white rounded-xl border border-[#E2E2E2] border-[1px] overflow-hidden">

                <button onClick={goPrev} className="p-2">
                    <IoIosArrowBack size={30} />
                </button>

                <HTMLFlipBook
                    width={400}
                    height={650}
                    onFlip={handleFlip}
                    size="stretch"
                    // minWidth={300}
                    // maxWidth={1000}
                    // minHeight={500}
                    // maxHeight={700}
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

                <button onClick={goNext} className="p-2">
                    <IoIosArrowForward size={30} />
                </button>
            </div>
        </>
    );
};

export default BookShow;
