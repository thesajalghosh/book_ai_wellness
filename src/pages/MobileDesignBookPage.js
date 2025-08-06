import React, { useRef, useState } from 'react';
import PersonImage from "../Images/person.png"
import BookShow from '../component/BookShow';
import Mainbook from "../Images/book_m.png"
import HTMLFlipBook from 'react-pageflip';
import { ALL_PDF_IMAGES } from '../Constant.others';
import { IoMicOutline } from "react-icons/io5";
import { ReactComponent as Send } from "../Images/send.svg";
import { ReactComponent as Mic } from "../Images/mic.svg";

const Page = React.forwardRef(({ children }, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content shadow-xl rounded-md">
                <h2>{children}</h2>
            </div>
        </div>
    );
});

const MobileDesignBookPage = () => {
    const [showDoctorBig, setShowDoctorBig] = useState(true);
    const audioRef = useRef()
    const book = useRef();

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.warn("Audio play failed:", err);
            });
        }
    };
    const handleFlip = () => {
        playSound();
    };
    return (
        <div className="bg-gray-100 flex justify-center bg-white w-[100vw] h-[100vh] p-4">
            <div className="bg-gradient-to-r from-[#F6F6F6] to-[#B8BBC2] w-[96vw] h-[85vh]  rounded-[30px] shadow-lg relative flex flex-col items-center overflow-hidden">
                <audio ref={audioRef} src="https://res.cloudinary.com/dgkckcwxs/video/upload/v1754245905/pagesound_ewxha1.mp3" preload="auto" />
                {/* Book Image */}
                <div
                    className={`transition-all duration-500 ease-in-out cursor-pointer
                         ${showDoctorBig ? "w-25 h-28 absolute top-4 right-4" : "w-full h-full mt-[20vh]"
                        }`}
                    onClick={() => setShowDoctorBig(false)}
                >
                    {showDoctorBig && <img src={Mainbook} className='h-[114px] w-[151px]' alt='main image'/>}
                    {!showDoctorBig && <HTMLFlipBook
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
                    </HTMLFlipBook>}
                </div>

                {/* Doctor Image */}
                <div
                    className={`transition-all duration-500 ease-in-out cursor-pointer
                         ${showDoctorBig ? "w-full h-full mt-[10vh]" : "w-40 h-32 absolute top-4 right-4"
                        }`}
                    onClick={() => setShowDoctorBig(true)}
                >
                    <img
                        src={PersonImage}
                        alt="Doctor"
                        className="rounded-xl object-cover w-full h-full shadow-md"
                    />
                </div>

                {/* Chat Footer */}
                <div className="mt-6 w-full flex items-center justify-center gap-4 px-4 py-2 rounded-full mb-3">
                    <button className="text-green-600">
                      <Mic/>
                    </button>
                    <input placeholder='Ask me Anything?' className='p-2 rounded-[20px]'/>
                    <button className="text-red-500">
                      <Send/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileDesignBookPage;