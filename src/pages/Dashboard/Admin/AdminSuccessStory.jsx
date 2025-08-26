
import React, { useState } from "react";

const initialSuccessStories = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/680x220?text=Story+1",
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/680x220?text=Story+2",
  },
];

const AdminSuccessStoryPanel = () => {
  const [stories, setStories] = useState(initialSuccessStories);
  const [showModal, setShowModal] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const openAddModal = () => {
    setEditingStory(null);
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const openEditModal = (story) => {
    setEditingStory(story);
    setImagePreview(story.imageUrl);
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageFile(null);
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(preview);
  };

  const handleSave = () => {
    if (!imageFile && !imagePreview) {
      alert("Please select an image");
      return;
    }

    if (editingStory) {
      // Update existing story
      const updated = stories.map((story) =>
        story.id === editingStory.id
          ? { ...story, imageUrl: imagePreview }
          : story
      );
      setStories(updated);
    } else {
      // Add new story
      const newStory = {
        id: Date.now(),
        imageUrl: imagePreview,
      };
      setStories([...stories, newStory]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      setStories(stories.filter((story) => story.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Success Stories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="border rounded shadow-md overflow-hidden relative"
          >
            <img
              src={story.imageUrl}
              alt="Success Story"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 flex justify-between items-center bg-gray-100">
              <button
                onClick={() => openEditModal(story)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(story.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={openAddModal}
        className="mt-8 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Add New Story
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingStory ? "Edit Success Story" : "Add New Success Story"}
            </h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuccessStoryPanel;
