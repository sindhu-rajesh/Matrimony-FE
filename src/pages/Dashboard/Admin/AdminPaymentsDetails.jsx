import React, { useState } from "react";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";
import {
  FaGooglePay,
  FaWhatsapp,
  FaUniversity,
  FaRegCreditCard,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { SiPaytm } from "react-icons/si";

function AdminPaymentPanel() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "bank",
      bank: "Canara Bank",
      accHolder: "Maheswaran",
      accNo: "110025589949",
      branch: "Surampatti",
      ifsc: "CNRB0005633",
      qr: false,
      qrImage: null,
    },
    {
      id: 2,
      type: "bank",
      bank: "SBI",
      accHolder: "Maheswaran A",
      accNo: "11063531084",
      branch: "Palaniappa Street, Erode",
      ifsc: "SBIN0051407",
      qr: true,
      qrImage: "/assets/QR Code.jpg", // Adjust image import if needed
    },
    {
      id: 3,
      type: "upi",
      name: "GPay",
      number: "8973040487",
    },
    {
      id: 4,
      type: "upi",
      name: "Paytm",
      number: "8778626571",
    },
    {
      id: 5,
      type: "whatsapp",
      name: "Whatsapp",
      number: "8973040487",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "bank",
    bank: "",
    accHolder: "",
    accNo: "",
    branch: "",
    ifsc: "",
    qr: false,
    qrImage: null,
    name: "",
    number: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);

  const [note, setNote] = useState(
    "After completing the payment, kindly send a screenshot of your transaction to our WhatsApp number 8973040487. Your access will be activated only after payment verification."
  );

  const openAddForm = () => {
    setFormData({
      type: "bank",
      bank: "",
      accHolder: "",
      accNo: "",
      branch: "",
      ifsc: "",
      qr: false,
      qrImage: null,
      name: "",
      number: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (method) => {
    setFormData(method);
    setEditingId(method.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({});
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      if (files && files[0]) {
        setFormData((prev) => ({
          ...prev,
          qrImage: URL.createObjectURL(files[0]),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this payment method?")) {
      setPaymentMethods(paymentMethods.filter((m) => m.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.type === "bank") {
      if (
        !formData.bank ||
        !formData.accHolder ||
        !formData.accNo ||
        !formData.branch ||
        !formData.ifsc
      ) {
        alert("Please fill all bank fields");
        return;
      }
    } else {
      if (!formData.name || !formData.number) {
        alert("Please fill all UPI/Whatsapp fields");
        return;
      }
    }

    if (editingId) {
      setPaymentMethods((prev) =>
        prev.map((m) => (m.id === editingId ? { ...formData, id: editingId } : m))
      );
    } else {
      setPaymentMethods((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    closeForm();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-center text-pink-600">Manage Payment Methods</h1>

      <button
        onClick={openAddForm}
        className="bg-pink-600 text-white px-6 py-2 rounded shadow hover:bg-pink-700 transition"
      >
        Add Payment Method
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentMethods.map((m) => (
          <div
            key={m.id}
            className="bg-white border-t-4 border-pink-500 rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            {m.type === "bank" ? (
              <>
                <div className="flex justify-between items-center rounded-t-lg mb-4 font-semibold">
                  <span className="text-pink-600 text-lg">{m.bank}</span>
                  {m.qr && (
                    <span className="text-xs bg-pink-600 text-white rounded px-2 py-1 ml-2">
                      QR Available
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiUser />
                    <span>
                      Account Holder <strong>{m.accHolder}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegCreditCard />
                    <span>
                      Account Number <strong>{m.accNo}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUniversity />
                    <span>
                      Branch <strong>{m.branch}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">IFSC</span>
                    <span>
                      Code <strong>{m.ifsc}</strong>
                    </span>
                  </div>
                  {m.qr && m.qrImage && (
                    <div className="mt-3 text-right">
                      <button
                        className="text-pink-600 text-sm font-semibold underline hover:text-pink-400 transition"
                        onClick={() => {
                          setSelectedQR(m.qrImage);
                          setShowQR(true);
                        }}
                      >
                        View QR
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 justify-center text-gray-800">
                {m.name === "GPay" && <FaGooglePay className="text-pink-500 text-xl" />}
                {m.name === "Paytm" && <SiPaytm className="text-pink-400 text-xl" />}
                {m.name === "Whatsapp" && <FaWhatsapp className="text-green-500 text-xl" />}
                <span className="font-bold">
                  {m.name} Number: {m.number}
                </span>
              </div>
            )}

            <div className="flex mt-4 justify-center gap-4">
              <button
                onClick={() => openEditForm(m)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Note editing */}
      <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-lg max-w-xl mx-auto">
        <label className="font-bold mb-2 block text-center text-yellow-800">Payment Instructions Note (editable)</label>
        <textarea
          className="w-full p-3 rounded border border-yellow-300 resize-none"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg max-h-[90vh] overflow-auto space-y-4"
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              {editingId ? "Edit Payment Method" : "Add Payment Method"}
            </h2>

            <div>
              <label className="font-semibold mb-1 block">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="bank">Bank</option>
                <option value="upi">UPI</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            {formData.type === "bank" && (
              <>
                <input
                  name="bank"
                  placeholder="Bank Name"
                  value={formData.bank}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <input
                  name="accHolder"
                  placeholder="Account Holder"
                  value={formData.accHolder}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <input
                  name="accNo"
                  placeholder="Account Number"
                  value={formData.accNo}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <input
                  name="branch"
                  placeholder="Branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <input
                  name="ifsc"
                  placeholder="IFSC Code"
                  value={formData.ifsc}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <label className="inline-flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="qr"
                    checked={formData.qr}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  QR Code Available
                </label>
                {formData.qr && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    name="qrImage"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              </>
            )}

            {(formData.type === "upi" || formData.type === "whatsapp") && (
              <>
                <input
                  name="name"
                  placeholder="Payment Type Name (e.g. GPay, Whatsapp)"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <input
                  name="number"
                  placeholder="Number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </>
            )}

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={closeForm}
                className="px-5 py-2 rounded border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

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

export default AdminPaymentPanel;
