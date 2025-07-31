// FlipBook.js
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import HTMLFlipBook from 'react-pageflip';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Star from "../Images/star.svg"
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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [isSubscribe, setISSubscribe] = useState(false)

    const goNext = () => {
        book.current?.pageFlip()?.flipNext();
    };

    const goPrev = () => {
        book.current?.pageFlip()?.flipPrev();

    };

    useEffect(() => {
        if (page > 2) {
            if (call_from === "notLogin") {
                setIsModalOpen(true);
            } else if (call_from === "login" && isSubscribe === false) {
                setIsModalOpen(true);
            }
        }
    }, [page, call_from, isSubscribe]);

    const handleFlip = (e) => {
        const currentPage = e.data;

        // If user tries to manually drag beyond page 2
        if ((call_from === "notLogin" || !isSubscribe) && currentPage > 2) {
            book.current?.pageFlip()?.flip(2); // Force reset to page 2
            setIsModalOpen(true);
        } else {
            setPage(currentPage);
        }
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
                    onFlip={handleFlip}
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

            {isModalOpen &&
                <MembershipModal isOpen={isModalOpen} onClose={() => setIsModalOpen()} />

            }

        </>
    );
};

export default BookShow;


const MembershipModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-[25vw] w-full p-6 text-center relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
                >
                    ×
                </button>

                <div className='w-[94%]'>

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
                        <span>

                            $59
                        </span>

                        <span className="text-sm font-medium">per month</span>
                    </p>
                </div>

                <div className="flex justify-between items-center rounded-2xl py-2 px-2 bg-[linear-gradient(to_right,#DBC572,#FFECA3,#C1A950)] hover:shadow-md transition cursor-pointer">
                    <div>

                        <h3 className="text-lg font-semibold text-white">1 Year</h3>
                        <p className="text-xs text-white mb-1">Save 20%</p>
                    </div>
                    <p className="text-[1.4rem] font-semibold text-white flex flex-col">
                        <span>

                            $599
                        </span>
                        <span className="text-sm font-medium">per year</span>
                    </p>
                </div>

                <p className="text-xs text-gray-400 mt-4">* Terms and Condition Applied</p>
            </div>
        </div>
    );
};

export { MembershipModal };
