import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Ri84701p7FxgOtpBxpv64EfYhi58lK55vqRosvx1iHDbMu5S5zzrp1RSfcEiBmyQ28ka4xd5CyNDklMD8Xhx6bm00tAidJKA6");

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert(result.error.message);
    }

    setSubmitLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <PaymentElement />
      <button
        disabled={!stripe || submitLoading}
        className="mt-4 w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
      >
        {submitLoading ? (
          <span className="flex justify-center items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </span>
        ) : (
          "Pay"
        )}
      </button>
    </form>
  );
};

const InvoicePage = () => {
  const today = new Date();
  const { id } = useParams();

  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [amount, setAmount] = useState();
  const [payNowLoading, setPayNowLoading] = useState(false);

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      startDate: formatDate(today),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())),
      price: 100,
    },
    yearly: {
      name: 'Yearly Plan',
      startDate: formatDate(today),
      endDate: formatDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())),
      price: 1000,
    },
  };

  const sub = plans[selectedPlan];
  const taxRate = 0.18;
  const tax = sub.price * taxRate;
  const total = sub.price + tax;

  const getDataLoad = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/avatar_book/user/transaction/${id}`
      );
      if (data?.success) {
        setSelectedPlan(data?.data?.plan);
        setAmount(data?.data?.amount);
      }
    } catch (error) {
      console.error("Failed to fetch transaction", error);
    } finally {
      setLoading(false);
    }
  };

  const createPaymentIntent = async () => {
    setPayNowLoading(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/avatar_book/create-payment-intent`, {
        amount: amount * 100, // Convert to smallest currency unit
        currency: 'usd',
        plan: selectedPlan,
        token : localStorage.getItem('access-token'),
      });
      setClientSecret(data.clientSecret);
      setShowPaymentForm(true);
    } catch (error) {
      console.error("Failed to create payment intent:", error);
    } finally {
      setPayNowLoading(false);
    }
  };

  useEffect(() => {
    getDataLoad();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black text-sm font-medium">Loading Invoice...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black flex justify-center items-start">
      <div className="w-full max-w-5xl border border-gray-300 rounded-xl flex flex-col md:flex-row shadow-sm">

        {/* Left Side - Subscription Details */}
        <div className="w-full md:w-2/3 p-8 border-r border-gray-300">
          {/* Plan Toggle Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-4 py-2 rounded border ${selectedPlan === 'monthly'
                ? 'bg-black text-white'
                : 'bg-white text-black border-gray-400'
                }`}
            >
              Monthly Plan
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-4 py-2 rounded border ${selectedPlan === 'yearly'
                ? 'bg-black text-white'
                : 'bg-white text-black border-gray-400'
                }`}
            >
              Yearly Plan
            </button>
          </div>

          {/* Subscription Details */}
          <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
          <div className="border border-gray-200 rounded-lg divide-y text-sm">
            <div className="flex justify-between px-4 py-3">
              <span className="text-gray-500">Plan</span>
              <span className="font-medium">{sub.name}</span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-gray-500">Start Date</span>
              <span className="font-medium">{sub.startDate}</span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-gray-500">End Date</span>
              <span className="font-medium">{sub.endDate}</span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-gray-500">Price</span>
              <span className="font-semibold">₹{sub.price}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Invoice Summary */}
        <div className="w-full md:w-1/3 p-8">
          <h2 className="text-xl font-semibold mb-4">Invoice Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{sub.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="mt-6 w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
            onClick={createPaymentIntent}
            disabled={payNowLoading}
          >
            {payNowLoading ? (
              <span className="flex justify-center items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </span>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="absolute top-3 right-4 text-black text-2xl font-bold hover:opacity-70"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
