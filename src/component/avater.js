import React, { useEffect, useRef, useState } from 'react'
import avatorImage from "../Images/gk_image.png"
import { FiSend } from "react-icons/fi";
import { IoMicOutline } from "react-icons/io5";
import axios from 'axios';
import StreamingAvatar, {
    AvatarQuality,
    StreamingEvents,
    TaskMode,
    TaskType,
    VoiceEmotion,
} from "@heygen/streaming-avatar";

const Avater = ({ call_from }) => {
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



    // this code for getting access token from the server
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

    // this code for handle access token and start session
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



    // this code for handle timeout of not use the avator
    // useEffect(() => {
    //     if (interactionCount) {
    //         let timer;
    //         if (!isAvatarTalking && !isUserTalking) {
    //             timer = setInterval(() => {
    //                 setTimeElapsed(prevTime => prevTime + 1);
    //             }, 1000)

    //             return () => clearInterval(timer);
    //         }

    //         setTimeElapsed(0)
    //     }
    // }, [isAvatarTalking, isUserTalking])

    // useEffect(() => {
    //     if (timeElapsed >= 180) {
    //         (async () => {

    //             await endSession();
    //         })()
    //         window.location.reload()
    //     }
    // }, [timeElapsed])

    // useEffect(() => {
    //     if (textInteractionCount) {
    //         let timer;
    //         if (!isAvatarTalking && !text) {
    //             timer = setInterval(() => {
    //                 setTimeElapsedKeypress(prevTime => prevTime + 1);
    //             }, 1000)

    //             return () => clearInterval(timer);
    //         }

    //         setTimeElapsedKeypress(0)
    //     }
    // }, [isAvatarTalking, text])

    // useEffect(() => {
    //     if (timeElapsedKeypress >= 180) {
    //         (async () => {

    //             await endSession();
    //         })();
    //         window.location.reload()
    //     }
    // }, [timeElapsedKeypress])

useEffect(() => {
    if (!sessionStarted) return;

    const timeout = setTimeout(async () => {
        await endSession();
        // window.location.reload();
    }, 90000); // 20 seconds

    return () => clearTimeout(timeout); // clean up on unmount or restart
}, [sessionStarted]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
            {initialModal && <>
                <div className='absolute top-0  bg-opacity-100 flex items-center justify-center w-[100%] h-[100%]'>
                    <div class="bg-gradient-to-b from-[#0f1a17] to-[#063c2e] rounded-[20px] shadow-lg w-[100%] h-[100%] flex flex-col items-center justify-center">

                        <div className='border-[#046C59] border-[0.5px] mb-4 bg-gradient-to-b from-[#2c2c2c] to-[#003d2e] rounded-[20px]'>

                            <img
                                src={avatorImage}
                                alt="Chat Person"
                                class="rounded-[24px] h-[60vh] object-cover"
                            />
                        </div>

                        <button
                            onClick={async () => {
                                await startSession();
                                handlePlayVideo();
                                setInitialModal(false)

                            }}
                            disabled={accessTokenLoading}
                            class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full transition-colors w-full max-w-[200px]">
                            {accessTokenLoading && <svg aria-hidden="true" role="status" className="inline w-6 h-6 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path strokeWidth="2" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path strokeWidth="2" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>}
                            Chat Now
                        </button>
                    </div>
                </div>
            </>
            }

            {
                isLoadingSession && (
                    <div className="absolute top-0 left-0 w-full h-[75vh] bg-black z-50 flex items-center justify-center rounded-[20px]">
                        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-emerald-600 ml-2">Loading...</span>
                    </div>
                )
            }

            <div className="flex flex-col justify-between gap-2 h-[75vh] ">
                <div className="w-[30vw] h-[62vh] rounded-[20px] bg-black">
                    <video
                        ref={mediaStream}
                        autoPlay
                        playsInline
                        style={{

                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "20px",
                            // marginTop: "2rem"
                        }}
                    >
                        <track kind="captions" />
                    </video>
                </div>
                <div className="p-3 flex items-center justify-between bg-[#005443] m-2 md:m-0 rounded-[20px]">
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        disabled={isAvatarTalking}
                        className="flex-1 bg-[#018969] text-white placeholder-gray-200 text-[1.2rem] border border-gray-300 rounded-[50px] py-2 px-4 mr-2 focus:outline-none"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        value={text}

                    />
                    <button className="text-blue-500 text-2xl mr-3 h-10 w-10 bg-[#018969] rounded-full p-2 flex items-center justify-center"
                        disabled={isAvatarTalking} onClick={() => handleSpeak()}
                    >
                        <FiSend size={30} color={"white"} />
                    </button>
                    {<button className={`text-blue-500 text-2xl  mr-3 h-10 w-10 bg-[#018969] rounded-full p-2 flex items-center justify-center`}
                        onClick={() => {
                            handleChangeChatMode(chatMode === "text_mode" ? "voice_mode" : "text_mode");
                            setIsVoiceMode(!isVoiceMode);
                        }}
                    >
                        <IoMicOutline size={30} color={isVoiceMode ? "red" : "currentColor"} />
                    </button>}
                </div>
            </div>

        </>
    )
}

export default Avater