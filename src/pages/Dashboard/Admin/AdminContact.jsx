import React, { useState } from "react";

function AdminContactPanel({ initialData }) {
  const [contactInfo, setContactInfo] = useState(initialData);
  const [imagePreview, setImagePreview] = useState(initialData.image);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    // Upload imageFile if changed to server or cloud storage
    // Save updated contactInfo and image path/url to backend
  };

  const handleCancel = () => {
    setContactInfo(initialData);
    setImagePreview(initialData.image);
    setImageFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-semibold">Edit Contact Information</h2>

      <label className="block font-semibold">Phone Number</label>
      <input
        name="phone"
        value={contactInfo.phone}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2"
      />

      <label className="block font-semibold mt-4">Email Address</label>
      <input
        name="email"
        value={contactInfo.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2"
      />

      <label className="block font-semibold mt-4">Physical Address</label>
      <textarea
        name="address"
        value={contactInfo.address}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2"
        rows={4}
      />

      <label className="block font-semibold mt-4">Contact Image</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Contact Preview"
          className="w-64 h-64 object-cover rounded mt-3 border"
        />
      )}

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AdminContactPanel;
