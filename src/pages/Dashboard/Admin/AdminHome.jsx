import React from "react";

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 flex flex-col items-center justify-center p-8">
      {/* Hero Section */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-10 flex flex-col md:flex-row items-center md:space-x-10">
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
          alt="Matrimony Admin Hero"
          className="w-full md:w-1/2 rounded-lg object-cover"
        />

        {/* Text Content */}
        <div className="mt-6 md:mt-0 md:w-1/2">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            Welcome to Matrimony Admin Panel
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Manage users, subscriptions, success stories, and all platform data
            with ease. Keep your matrimonial community thriving and organized
            with an intuitive dashboard.
          </p>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md flex flex-col items-center">
          <span className="text-3xl font-semibold">1200+</span>
          <span className="mt-2 text-lg">Registered Users</span>
        </div>
        <div className="bg-pink-600 text-white rounded-lg p-6 shadow-md flex flex-col items-center">
          <span className="text-3xl font-semibold">350</span>
          <span className="mt-2 text-lg">Premium Members</span>
        </div>
        <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-md flex flex-col items-center">
          <span className="text-3xl font-semibold">85</span>
          <span className="mt-2 text-lg">Success Stories</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;




