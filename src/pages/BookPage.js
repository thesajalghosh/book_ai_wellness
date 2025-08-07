import React, { useEffect, useState } from "react";
import BookShow from "../component/BookShow";
import Avater from "../component/avater";
import Star from "../Images/star.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MobileDesignBookPage from "./MobileDesignBookPage";

const BookPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(90);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const token = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [timerStarted, setTimerStarted] = useState(false);


  // Open modal immediately for non-logged-in users
  // useEffect(() => {
  //   if (!token) {
  //     setIsModalOpen(true);
  //   }
  // }, []);
  useEffect(() => {
    const trialEnded = localStorage.getItem("end_free_trial") === "true";
    if (trialEnded) {
      setIsModalOpen(true);
      setTimerStarted(false); // Prevent timer from running again
      setTimeLeft(0);
    } else if (!token) {
      setTimeLeft(90);
    } else {
      getUserDetails();
    }
  }, [token]);

  useEffect(() => {
    if (!timerStarted || token || userDetails?.is_subscription) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = prev > 0 ? prev - 1 : 0;
        if (updated === 0) {
          setIsModalOpen(true);
          localStorage.setItem("end_free_trial", "true"); // <-- Set flag here
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStarted, token, userDetails]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleplan = async (plan_type) => {
    setSelectedPlan(plan_type);
    setLoading(true);
    const amount = plan_type === "monthly" ? 59 : 599;
    const payload = {
      plan: plan_type,
      amount: amount,
    };
    try {
      const { data: response_data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/avatar_book/user/transaction`,
        payload
      );
      if (response_data.success) {
        navigate(`/invoice-page/${response_data?.data?._id}`);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const { data: response_data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/avatar_book/user/${token}`
      );

      // console.log("response_data", response_data);
      if (response_data.success) {
        setUserDetails(response_data.data);

        if (!response_data.data.is_subscription) {
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center md:p-6  font-roboto relative">
      {(!token || !userDetails?.is_subscription) && timerStarted && (
        <div className="animate-slideIn absolute top-[70px] right-0 bg-[#FED7D7] border border-[#E53E3E] text-[#742A2A] px-2 md:px-5 py-3 rounded-l-2xl shadow-md flex items-center gap-3 z-50">
          <svg
            className="w-5 h-5 text-[#E53E3E]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m8-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
          <span className="text-sm md:text-base font-medium">
            Free trial ends in <span className="font-semibold">{formatTime(timeLeft)}</span>
          </span>
        </div>
      )}




      <div className="w-[90%] relative hidden md:block">
        {isModalOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-0 z-10 rounded-[40px]"></div>
        )}

        <h2 className="text-[1.1rem] w-full font-bold mb-4 font-roboto">
          The Secrets of Nitric Oxide
        </h2>

        <div
          className={`transition duration-300 ${isModalOpen ? "blur-sm pointer-events-none" : ""
            }`}
        >
          <div className="bg-[linear-gradient(to_right,_#F6F6F6_60%,_#B8BBC2_100%)] rounded-[40px] flex flex-col justify-center items-center md:flex-row gap-[25px] w-full h-[96vh] px-[30px]">
            <div className="relative flex flex-col items-center justify-center md:basis-[40%] w-full h-[100%]">
              <Avater timeLeft={timeLeft} onFlipTimerStart={() => setTimerStarted(true)} />

            </div>
            <div className="md:basis-[60%] w-full h-full">

              <BookShow onFlipTimerStart={() => setTimerStarted(true)} />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-white rounded-3xl shadow-2xl p-6 text-center">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-[1.5rem] font-bold mb-1">Get Membership</h2>
                <div className="flex justify-center mb-2">
                  <img src={Star} alt="star" className="w-[60px] h-[60px]" />
                </div>
              </div>
              <p className="text-gray-500 text-[0.8rem] mb-4 text-left">
                Subscribe to Premium to get access to Dr Nathan Bryan <br /> AI
                Interactive Magazine
              </p>
            </div>

            {/* Monthly Plan */}
            <div
              onClick={() => handleplan("monthly")}
              className={`flex justify-between items-center border rounded-2xl py-2 px-2 bg-[#EEEEEE] mb-3 hover:shadow-md transition cursor-pointer ${selectedPlan === "monthly" && loading
                ? "opacity-70 pointer-events-none"
                : ""
                }`}
            >
              <div>
                <h3 className="text-lg font-semibold">1 Month</h3>
                <p className="text-xs text-gray-500 mb-1">3 Day Free Trial</p>
              </div>
              <p className="text-[1.4rem] font-semibold flex flex-col">
                {selectedPlan === "monthly" && loading ? (
                  <span className="text-sm animate-pulse">Processing...</span>
                ) : (
                  <>
                    <span>$59</span>
                    <span className="text-sm font-medium">per month</span>
                  </>
                )}
              </p>
            </div>

            {/* Yearly Plan */}
            <div
              onClick={() => handleplan("yearly")}
              className={`flex justify-between items-center rounded-2xl py-2 px-2 bg-[linear-gradient(to_right,#DBC572,#FFECA3,#C1A950)] hover:shadow-md transition cursor-pointer ${selectedPlan === "yearly" && loading
                ? "opacity-70 pointer-events-none"
                : ""
                }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-white">1 Year</h3>
                <p className="text-xs text-white mb-1">Save 20%</p>
              </div>
              <p className="text-[1.4rem] font-semibold text-white flex flex-col">
                {selectedPlan === "yearly" && loading ? (
                  <span className="text-sm animate-pulse">Processing...</span>
                ) : (
                  <>
                    <span>$599</span>
                    <span className="text-sm font-medium">per year</span>
                  </>
                )}
              </p>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              * Terms and Condition Applied
            </p>
          </div>
        )}
      </div>
      <div className="md:hidden">
        <MobileDesignBookPage />
      </div>
    </div>
  );
};

export default BookPage;
