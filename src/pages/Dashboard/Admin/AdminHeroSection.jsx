import React, { useState } from "react";

const initialBanners = [
  {
    id: 1,
    title: "Find Your Perfect Life Partner",
    subtitle: "Join thousands of happy couples who met through FindMyMate.",
    imageUrl: "https://ibb.co/67JN9cwG=Banner+1",
  },
  {
    id: 2,
    title: "Your Journey to Love Starts Here",
    subtitle: "Connect with people who share your values and vision.",
    imageUrl: "https://ibb.co/67JN9cwG=Banner+2",
  },
];

const AdminBannerPanel = () => {
  const [banners, setBanners] = useState(initialBanners);
  const [editingBanner, setEditingBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageFile: null,
    imagePreview: "",
  });

  // Open modal to add a new banner
  const openAddModal = () => {
    setFormData({ title: "", subtitle: "", imageFile: null, imagePreview: "" });
    setEditingBanner(null);
    setShowModal(true);
  };

  // Open modal to edit an existing banner
  const openEditModal = (banner) => {
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      imageFile: null,
      imagePreview: banner.imageUrl,
    });
    setEditingBanner(banner);
    setShowModal(true);
  };

  // Close modal and reset form
  const closeModal = () => setShowModal(false);

  // Handle input changes for title and subtitle
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image file selection and preview generation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imageFile: file, imagePreview: url }));
  };

  // Save new or updated banner
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle || !formData.imagePreview) {
      alert("Please fill all fields and select an image");
      return;
    }

    if (editingBanner) {
      // Update existing banner details
      const updatedBanners = banners.map((b) =>
        b.id === editingBanner.id
          ? {
              ...b,
              title: formData.title,
              subtitle: formData.subtitle,
              imageUrl: formData.imagePreview,
            }
          : b
      );
      setBanners(updatedBanners);
    } else {
      // Add a new banner with a unique ID
      const newBanner = {
        id: Date.now(),
        title: formData.title,
        subtitle: formData.subtitle,
        imageUrl: formData.imagePreview,
      };
      setBanners([...banners, newBanner]);
    }

    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Hero Banners</h1>

      {/* Banner list */}
      <div className="space-y-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex items-center border rounded-md p-4 bg-gray-50 shadow-sm"
          >
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-32 h-16 object-cover rounded mr-4 border"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{banner.title}</h3>
              <p className="text-sm text-gray-600">{banner.subtitle}</p>
            </div>
            <button
              onClick={() => openEditModal(banner)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Add new banner button */}
      <button
        onClick={openAddModal}
        className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Add New Banner
      </button>

      {/* Modal for add/edit form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium" htmlFor="subtitle">
                  Subtitle
                </label>
                <input
                  id="subtitle"
                  name="subtitle"
                  type="text"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block mb-2"
                />
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded border"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBannerPanel;

