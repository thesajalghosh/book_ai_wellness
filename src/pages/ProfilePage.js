import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access-token");

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const { data: response_data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/avatar_book/user/${token}`
      );

      if (response_data.success) {
        setUser(response_data.data);
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition mb-4"
      >
        <IoArrowBackSharp className="text-xl" />
        <span>Back</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <FaUserCircle className="text-6xl text-gray-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <Info label="Status">
            <span
              className={`px-2 py-0.5 rounded-full text-white text-xs font-medium ${
                user.status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {user.status}
            </span>
          </Info>

          <Info label="Subscription Plan">
            {user.plan === "none" ? "No active plan" : user.plan}
          </Info>

          <Info label="Subscription">
            {user.is_subscription ? "Yes" : "No"}
          </Info>

          <Info label="Plan Start Date">
            <DateBadge>{formatDate(user.plan_start_date)}</DateBadge>
          </Info>

          <Info label="Plan End Date">
            <DateBadge>{formatDate(user.plan_end_date)}</DateBadge>
          </Info>

          <Info label="Account Created">
            <DateBadge>{formatDate(user.createdAt)}</DateBadge>
          </Info>
        </div>

        <div className="mt-6 text-center">
          {user.plan === "none" && (
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
              Upgrade Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Info section
const Info = ({ label, children }) => (
  <div className="flex flex-col">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{children}</span>
  </div>
);

// Badge for dates
const DateBadge = ({ children }) => (
  <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
    {children}
  </span>
);

export default ProfilePage;
