import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentId, setPaymentId] = useState(null);
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    const notifyBackend = async () => {
      const intentId = new URLSearchParams(window.location.search).get("payment_intent");
      if (!intentId) return;

      try {
        await axios.patch(`${process.env.REACT_APP_BACKEND_API}/avatar_book/user/subscription`, {
          token,
        });
      } catch (error) {
        console.error("Error notifying backend:", error);
      } finally {
        setLoading(false);
      }
    };

    notifyBackend();
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-xl p-8 sm:p-10 max-w-md w-full text-center transition-all">
        {loading ? (
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
            <p className="text-sm text-gray-500">Verifying your payment...</p>
          </div>
        ) : (
          <>
            <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your subscription is now active. Thank you for your payment!
            </p>

            {paymentId && (
              <p className="text-xs text-gray-400 mb-6">
                Transaction ID: <span className="font-medium">{paymentId}</span>
              </p>
            )}

            <button
              onClick={handleGoHome}
              className="inline-flex items-center justify-center gap-2 w-full bg-black text-white py-2 px-4 rounded hover:opacity-90 transition"
            >
              Go to Home <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
