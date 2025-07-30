// FlipBook.js
import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import HTMLFlipBook from 'react-pageflip';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Page = React.forwardRef(({ children }, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <h2>{children}</h2>
            </div>
        </div>
    );
});

const BookShow = () => {
    const book = useRef();

    const goNext = () => {
        book.current?.pageFlip()?.flipNext();
    };

    const goPrev = () => {
        book.current?.pageFlip()?.flipPrev();
    };

    return (
        <div className="w-full flex justify-center mt-10 bg-white rounded-xl h-[75vh] p-3">

            <button
                onClick={goPrev}
                className=""
            >
                <IoIosArrowBack size={20} />
            </button>
            <HTMLFlipBook
                width={300}
                height={300}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1236}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                ref={book}
                className="flip-book"
            >
                <Page>
                    <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753897669/Screenshot_19_vnvn5t.png' className='h-[70vh]' />
                </Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753897669/Screenshot_19_vnvn5t.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>
                <Page> <img src='https://res.cloudinary.com/dgkckcwxs/image/upload/v1753896396/Screenshot_18_q2rtgt.png' className='h-[70vh]' /></Page>


            </HTMLFlipBook>



            <button
                onClick={goNext}
                className=""
            >
                <IoIosArrowForward size={20} />
            </button>
        </div>
    );
};

export default BookShow;
