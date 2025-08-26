import React, { useState } from "react";

const initialProfiles = [
  { id: 1, type: "Female", division: "Dhaka", age: 21, occupation: "Designer", img: "" },
  { id: 2, type: "Male", division: "Chennai", age: 25, occupation: "Developer", img: "" },
  // Add your initial profile data or fetch from API
];

const AdminProfilesPanel = () => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({
    type: "Female",
    division: "",
    age: "",
    occupation: "",
    imgFile: null,
    imgPreview: "",
  });

  const openAddModal = () => {
    setFormData({
      type: "Female",
      division: "",
      age: "",
      occupation: "",
      imgFile: null,
      imgPreview: "",
    });
    setEditingProfile(null);
    setShowModal(true);
  };

  const openEditModal = (profile) => {
    setFormData({
      type: profile.type,
      division: profile.division,
      age: profile.age,
      occupation: profile.occupation,
      imgFile: null,
      imgPreview: profile.img,
    });
    setEditingProfile(profile);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imgFile: file, imgPreview: url }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setProfiles(profiles.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.division || !formData.age || !formData.occupation || !formData.imgPreview) {
      alert("Please fill all fields and select an image");
      return;
    }

    if (editingProfile) {
      const updatedProfiles = profiles.map((p) =>
        p.id === editingProfile.id
          ? { ...p, ...formData, age: Number(formData.age), img: formData.imgPreview }
          : p
      );
      setProfiles(updatedProfiles);
    } else {
      const newProfile = {
        id: Date.now(),
        type: formData.type,
        division: formData.division,
        age: Number(formData.age),
        occupation: formData.occupation,
        img: formData.imgPreview,
      };
      setProfiles([...profiles, newProfile]);
    }
    setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Profiles</h1>
      <button
        onClick={openAddModal}
        className="mb-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add New Profile
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border rounded-md shadow p-4 flex flex-col items-center bg-white"
          >
            <img
              src={profile.imgPreview || profile.img || "https://via.placeholder.com/160"}
              alt={`${profile.type} profile`}
              className="w-40 h-40 object-cover rounded mb-4 border"
            />
            <p><strong>Type:</strong> {profile.type}</p>
            <p><strong>Division:</strong> {profile.division}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Occupation:</strong> {profile.occupation}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => openEditModal(profile)}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(profile.id)}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg overflow-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4">
              {editingProfile ? "Edit Profile" : "Add New Profile"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Division</label>
                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  min={18}
                  max={100}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
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
                {formData.imgPreview && (
                  <img
                    src={formData.imgPreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded border"
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded border border-gray-400 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

export default AdminProfilesPanel;
