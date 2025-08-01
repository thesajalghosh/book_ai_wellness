// FlipBook.js
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import HTMLFlipBook from 'react-pageflip';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { ALL_PDF_IMAGES } from '../Constant.others';

const Page = React.forwardRef(({ children }, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content shadow-xl rounded-md overflow-hidden">
                <h2>{children}</h2>
            </div>
        </div>
    );
});

const BookShow = ({ call_from }) => {
    const book = useRef();
    
    const [page, setPage] = useState(0)
    const [isSubscribe, setISSubscribe] = useState(false)

    const goNext = () => {
        book.current?.pageFlip()?.flipNext();
    };

    const goPrev = () => {
        book.current?.pageFlip()?.flipPrev();

    };


    console.log("page", page)

    return (
        <>
            <div className="w-full flex justify-center bg-white rounded-xl h-[75vh] border border-[#E2E2E2] border-[1px]">

                <button
                    onClick={goPrev}
                    className=""
                >
                    <IoIosArrowBack size={30} />
                </button>
                <HTMLFlipBook
                    width={400}
                    height={600}
                    // onFlip={handleFlip}
                    size="stretch"
                    minWidth={300}
                    maxWidth={1000}
                    minHeight={400}
                    maxHeight={1236}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    ref={book}
                    className="flip-book"
                >

                    {Object.entries(ALL_PDF_IMAGES)?.map(([key, value]) => (
                        <Page> <img src={value.url} className='h-full w-full object-contain' /></Page>
                    ))}

                </HTMLFlipBook>

                <button
                    onClick={goNext}
                    className=""
                >
                    <IoIosArrowForward size={30} />
                </button>
            </div>


        </>
    );
};

export default BookShow;



