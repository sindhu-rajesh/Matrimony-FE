import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";
import {
  FaGooglePay,
  FaWhatsapp,
  FaUniversity,
  FaRegCreditCard,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import sbiQR from "../assets/QR Code.jpg";

const bankData = [
  {
    bank: "Canara Bank",
    accHolder: "Maheswaran",
    accNo: "110025589949",
    branch: "Surampatti",
    ifsc: "CNRB0005633",
  },
  {
    bank: "SBI",
    accHolder: "Maheswaran A",
    accNo: "11063531084",
    branch: "Palaniappa Street, Erode",
    ifsc: "SBIN0051407",
    qr: true,
    qrImage: sbiQR,
  },
];

export default function Payment() {
  const location = useLocation();
  const planName = location.state?.planName || "Gold";
  const planAmount = location.state?.planPrice || 1000;
  const phone = "9865765747";
  const email = "mahes007@yahoo.com";

  const [showQR, setShowQR] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-5xl mx-auto space-y-10">
        {/* Payment Summary Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
            Payment Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="flex items-center gap-2 font-semibold text-pink-500 mb-4 text-lg">
                <FiUser className="text-xl" />
                Contact Details
              </h3>
              <div className="flex flex-col gap-2 text-gray-700 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <FiPhone className="text-pink-400" />
                  <span className="font-semibold">{phone}</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <FiMail className="text-pink-400" />
                  <span className="font-semibold">{email}</span>
                </div>
              </div>
            </div>

            {/* Payment Overview */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="flex items-center gap-2 font-semibold text-pink-500 mb-4 text-lg">
                <FaMoneyCheckAlt className="text-xl" />
                Payment Info
              </h3>
              <div className="text-gray-700 text-center md:text-left space-y-2">
                <div>
                  Plan Name: <span className="font-semibold">{planName}</span>
                </div>
                <div>
                  Plan Amount:{" "}
                  <span className="font-semibold">
                    ₹{planAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPI & Bank Details Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* UPI Details */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-pink-500 flex flex-col justify-between">
            <h3 className="text-pink-600 font-semibold text-lg mb-4 text-center">
              UPI Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 justify-center">
                <FaGooglePay className="text-pink-500 text-xl" />
                G-Pay Number <span className="font-bold">8973040487</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800 justify-center">
                <SiPaytm className="text-pink-400 text-xl" />
                Paytm Number <span className="font-bold">8778626571</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800 justify-center">
                <FaWhatsapp className="text-green-500 text-xl" />
                Payment Screenshot Whatsapp Number{" "}
                <span className="font-bold">8973040487</span>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          {bankData.map((bank) => (
            <div
              key={bank.bank}
              className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-pink-500 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center rounded-t-lg mb-4 font-semibold">
                <span className="text-pink-600 text-lg">{bank.bank}</span>
                {bank.qr && (
                  <span className="text-xs bg-pink-600 text-white rounded px-2 py-1 ml-2">
                    QR Available
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <FiUser />
                  <span>
                    Account Holder <strong>{bank.accHolder}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegCreditCard />
                  <span>
                    Account Number <strong>{bank.accNo}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUniversity />
                  <span>
                    Branch <strong>{bank.branch}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">IFSC</span>
                  <span>
                    Code <strong>{bank.ifsc}</strong>
                  </span>
                </div>
              </div>
              {bank.qr && (
                <div className="mt-3 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedQR(bank.qrImage);
                      setShowQR(true);
                    }}
                    className="text-pink-600 text-sm font-semibold underline hover:text-pink-400 transition"
                  >
                    View QR
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note Section */}
        <div className="mt-8 text-center px-4">
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-lg text-gray-900 inline-block max-w-xl mx-auto">
            <strong>Note:</strong> After completing the payment, kindly send a
            screenshot of your transaction to our WhatsApp number{" "}
            <span className="font-semibold text-green-600">8973040487</span>.
            Your access will be activated only after payment verification.
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl max-w-xs w-full shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-pink-600 text-lg"
              onClick={() => setShowQR(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="mb-4 text-lg font-bold text-pink-600 text-center">
              Scan & Pay
            </h3>
            <img
              src={selectedQR}
              alt="QR Code"
              className="mx-auto w-48 h-48 object-contain"
            />
            <div className="text-center text-xs text-gray-500 mt-2">
              Use any UPI app to scan & pay
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
