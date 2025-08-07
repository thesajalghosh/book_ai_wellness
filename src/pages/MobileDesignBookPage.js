import React, { useEffect, useRef, useState } from 'react';
import PersonImage from "../Images/person.png"
import BookShow from '../component/BookShow';
import Mainbook from "../Images/book_m.png"
import HTMLFlipBook from 'react-pageflip';
import { ALL_PDF_IMAGES } from '../Constant.others';
import { IoMicOutline } from "react-icons/io5";
import { ReactComponent as Send } from "../Images/send.svg";
import { ReactComponent as Mic } from "../Images/mic.svg";
import axios from 'axios';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import StreamingAvatar, {
    AvatarQuality,
    StreamingEvents,
    TaskMode,
    TaskType,
    VoiceEmotion,
} from "@heygen/streaming-avatar";

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
    const [messageSectionShow, setMessageSectionshow] = useState(false)
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


    ////-------------------- Avatar work start ------------------------///
    const [accessToken, setAccessToken] = useState('')
    const [initialModal, setInitialModal] = useState(true)
    const [accessTokenLoading, setAccessTokenLoading] = useState(false)
    const avatar = useRef(null);
    const mediaStream = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isLoadingSession, setIsLoadingSession] = useState(false)
    const [isVoiceMode, setIsVoiceMode] = useState(true)
    const [isUserTalking, setIsUserTalking] = useState(false)
    const [isAvatarTalking, setIsAvatarTalking] = useState(false)
    const [interactionCount, setInteractionCount] = useState(0)
    const [messages, setMessages] = useState([
        { text: "", sender: "" },
        { text: "", sender: "" },
    ])
    const [currentAiMessage, setCurrentAiMessage] = useState('')
    const [currentUserMessage, setCurrentUserMessage] = useState('')
    const currentUserMessageRef = useRef('')
    const currentAiMessageRef = useRef('')
    const [stream, setStream] = useState(null)
    const [data, setData] = useState(null)
    const [knowledgeId, setKnowledgeId] = useState('0e800f7e10d54564b97013af158c38e2')
    const [language, setLanguage] = useState('en')
    const [chatMode, setChatMode] = useState('text_mode')
    const [debug, setDebug] = useState('')
    const messagesEndRef = useRef(null)
    const [timeElapsedKeypress, setTimeElapsedKeypress] = useState(0);
    const [textInteractionCount, setTextInteractionCount] = useState(0);
    const [text, setText] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
    const [firstRender, setFirstRender] = useState(false);
    const [sessionStarted, setSessionStarted] = useState(false);

    const handleAccessToken = async () => {
        setAccessTokenLoading(true)
        try {
            const { data } = await axios.get("https://api.aiwellness.ai/api/v1/get_access_token/ABY2VmODFhZmVjYWRkNGMwZDliOWEyMWVmMDE4YWVmM2MtMTc0Mzg3MTA0NQ==")
            // const { data } = await axios.get("https://api.aiwellness.ai/api/v1/get_access_token/ABOWQ4YzkxOTNhNmFmNGU1Yzk3MWJjMGI4NDE4MDQ5ZDUtMTc0NzA0NTEwNg==")
            if (data?.success) {
                setAccessToken(data?.data?.token)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setAccessTokenLoading(false)
        }
    }

    useEffect(() => {
        handleAccessToken();

        return () => {
            // console.log("calll.. sajal")
            if (firstRender) {
                (async () => {

                    await endSession();
                })();

            }
            setFirstRender(true)
        }
    }, [])

    async function endSession() {

        try {
            const res = await avatar.current?.stopAvatar();

        } catch (error) {
            console.log("error", error

            )
        }
        avatar.current = null;
        mediaStream.current = null;
        setStream(undefined);
        setIsAvatarTalking(false);
        setIsUserTalking(false);
        localStorage.setItem("isAvatarTalking", false);
        setData(null);

    }

    async function startSession() {
        setIsLoadingSession(true);
        setInitialModal(false)
        setSessionStarted(true);
        setMessageSectionshow(true)

        avatar.current = new StreamingAvatar({
            token: accessToken,
            basePath: process.env.REACT_APP_BASE_URL,
        });

        avatar.current?.on(StreamingEvents.USER_START, (event) => {
            setIsVoiceMode(true);
            setIsUserTalking(true);
            setInteractionCount(interactionCount + 1);
        });

        avatar.current?.on(StreamingEvents.USER_TALKING_MESSAGE, (event) => {
            // console.log(">>>>> User started talking:", event?.detail?.message);
            if (event?.detail?.message) {
                setMessages((prev) => [
                    ...prev,
                    { text: event?.detail?.message, sender: "user" },
                ]);
                currentUserMessageRef.current = "";
            }
        });

        avatar.current?.on(StreamingEvents.USER_STOP, (event) => {
            setIsVoiceMode(false);
            setIsUserTalking(false);
            // console.log("USER-STOPPED-TALKING");

            if (currentUserMessageRef.current) {
                setMessages((prev) => [
                    ...prev,
                    { text: currentUserMessageRef.current, sender: "user" },
                ]);
                currentUserMessageRef.current = "";
            }
        });

        avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
            setIsAvatarTalking(true);
            setIsLoadingSession(false);
        });

        avatar.current.on(StreamingEvents.AVATAR_TALKING_MESSAGE, (e) => {
            if (e.detail?.message) {
                const newMessage = currentAiMessageRef.current
                    ? `${currentAiMessageRef.current} ${e.detail.message}`
                    : e.detail.message;

                currentAiMessageRef.current = newMessage;

                setMessages((prev) => {
                    const updatedMessages = [...prev];
                    if (
                        updatedMessages.length > 0 &&
                        updatedMessages[updatedMessages.length - 1].sender === "ai"
                    ) {
                        updatedMessages[updatedMessages.length - 1].text = newMessage;
                    } else {
                        updatedMessages.push({ text: newMessage, sender: "ai" });
                    }
                    return updatedMessages;
                });

                setCurrentAiMessage(newMessage);
            }
        });

        avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
            // console.log("Avatar stopped talking", e);
            setIsAvatarTalking(false);
            currentAiMessageRef.current = ""
        });

        avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, async () => {
            // console.log("Stream disconnected");
            await endSession();
        });

        avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
            setStream(event.detail);
        });

        try {
            const res = await avatar.current.createStartAvatar({
                quality: AvatarQuality.Low,
                avatarName: "b6e3f03bb4534c3bbd454b169050a351",
                // avatarName: "Marianne_CasualLook_public",
                knowledgeId: knowledgeId,
                // knowledgeId: "536de02daba64403afcf882530957e67",
                voice: {
                    rate: 1.5,
                    emotion: VoiceEmotion.EXCITED,
                },
                language: language,
                disableIdleTimeout: true,
            });
            setData(res);
            // console.log("res", res)
            setMessages((prev) => [
                ...prev,
                { text: "How can I help you?", sender: "ai" },
            ]);
            await avatar.current?.startVoiceChat({
                useSilencePrompt: false,
            });
            await avatar.current.speak({
                text: "Please talk about the secrets of nitric oxide?",
                taskType: TaskType.TALK,
                taskMode: TaskMode.SYNC
            });
            setChatMode("voice_mode");
            setIsLoadingSession(false);
        } catch (error) {
            console.error("Error starting avatar session:", error);
        } finally {
            setIsLoadingSession(false);
        }
    }

    useEffect(() => {
        if (stream && mediaStream.current) {
            mediaStream.current.srcObject = stream;
            mediaStream.current.onloadedmetadata = () => {
                mediaStream.current?.play();
                setDebug("Playing");
            };
        }
    }, [mediaStream, stream]);

    const handlePlayVideo = () => {
        if (mediaStream.current) {
            mediaStream.current
                .play()
                .then(() => {
                    setDebug("Playing");
                    setIsVideoPlaying(true);
                })
                .catch((error) => {
                    console.error("Error playing video:", error);
                    setDebug("Error playing video");
                });
        }
    };

    // this code for handle user input
    const handleInputChange = (e) => {
        setText(e.target.value); // Updates the text state with input value
        setTimeout(() => {
            handleChangeChatMode("text_mode"); // Switches to text mode after 1 second
        }, 1000);
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isAvatarTalking) {
            handleSpeak(); // Triggers the speak function
        }
    };

    // Handles sending the text input to the avatar
    async function handleSpeak() {
        // console.log("calll....")
        setIsLoadingRepeat(true); // Shows loading state
        if (!avatar.current) {
            setDebug("Avatar API not initialized");
            return;
        }

        await avatar.current
            .speak({
                text: text, // Uses the text state value
                taskType: TaskType.TALK,
                taskMode: TaskMode.SYNC
            })
            .catch((e) => {
                setDebug(e.message); // Error handling
            });

        setTextInteractionCount(textInteractionCount + 1); // Tracks interactions
        setIsLoadingRepeat(false); // Hides loading state
        setText("");
    }

    // Handles switching between text and voice modes
    const handleChangeChatMode = async (mode) => {
        if (mode === chatMode) return; // No change if same mode

        if (mode === "text_mode") {
            avatar.current?.closeVoiceChat(); // Closes voice chat
            setIsVoiceMode(false);
        } else {
            await avatar.current?.startVoiceChat(); // Starts voice chat
        }
        setChatMode(mode); // Updates the mode state
    };
    ////-------------------- Avatar work end ------------------------///
    return (
        <div className="bg-gray-100 flex justify-center bg-white w-[100vw] h-[100vh] p-4">
            <div className="bg-gradient-to-r from-[#F6F6F6] to-[#B8BBC2] w-[96vw] h-[85vh]  rounded-[30px] shadow-lg relative flex flex-col items-center overflow-hidden">
                <audio ref={audioRef} src="https://res.cloudinary.com/dgkckcwxs/video/upload/v1754245905/pagesound_ewxha1.mp3" preload="auto" />
                {/* Book Image */}
                <div
                    className={`transition-all duration-500 ease-in-out cursor-pointer
                         ${showDoctorBig ? "w-25 h-28 absolute top-4 right-4 z-20" : "w-full h-full mt-[20vh]"
                        }`}
                    onClick={() => setShowDoctorBig(false)}
                >
                    {showDoctorBig && <img src={Mainbook} className='h-[114px] w-[151px]' alt='main image' />}
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
                         ${showDoctorBig ? "w-full h-full mt-[10vh]" : "w-40 h-32 absolute top-4 right-4 z-20"
                        }`}
                    onClick={() => setShowDoctorBig(true)}
                >
                 {initialModal &&   <img
                        src={PersonImage}
                        alt="Doctor"
                        className="rounded-xl object-cover w-full h-full shadow-md"
                    />}
                    {
                        isLoadingSession && (
                            <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#F6F6F6] z-50 flex items-center justify-center rounded-[20px]">
                                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm text-emerald-600 ml-2">Loading...</span>
                            </div>
                        )
                    }
                    <div className={`rounded-[20px] bg-black ${!showDoctorBig ? `${initialModal ? "h-[0vh]" : "h-[15vh]"}` : "h-[55vh] mt-[10vh]"}`}>
                        <video
                            ref={mediaStream}
                            autoPlay
                            playsInline
                            style={{

                                width: `${!showDoctorBig ? "20vw" : "100%"}`,
                                height: `${!showDoctorBig ? "15vh" : "55vh"}`,
                                objectFit: "contain",
                                borderRadius: "20px",
                                // marginTop: "2rem"
                            }}
                        >
                            <track kind="captions" />
                        </video>
                    </div>
                </div>

                {/* Chat Footer */}
                {!messageSectionShow ?
                    <>
                        <button className="bg-emerald-600 absolute bottom-[50px] left-[120px] bg-[#047857] hover:bg-[#047857] text-white font-semibold py-2 px-6
                             rounded-full transition-colors flex gap-2"
                            onClick={async () => {
                                await startSession();
                                handlePlayVideo();
                                setInitialModal(false)

                            }}

                            disabled={accessTokenLoading}>

                            {accessTokenLoading &&
                                <div className="absolute inset-0 flex items-center justify-center bg-[#047857]/70 rounded-full">


                                    <svg aria-hidden="true" role="status" className="inline w-6 h-6 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeWidth="2" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path strokeWidth="2" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                </div>

                            }
                            <HiOutlineChatAlt2 size={25} /> Chat now
                        </button>


                    </>
                    :
                    <div className="mt-6 w-full flex items-center justify-center gap-4 px-4 py-2 rounded-full mb-3">
                        <button className="text-green-600">
                            <Mic />
                        </button>
                        <input placeholder='Ask me Anything?' className='p-2 rounded-[20px]' />
                        <button className="text-red-500">
                            <Send />
                        </button>
                    </div>}
            </div>
        </div>
    );
};

export default MobileDesignBookPage;