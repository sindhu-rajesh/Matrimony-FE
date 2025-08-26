import React, { useState } from "react";

function AdminAboutUs() {
  // Initial editable data, fetch from backend or use default
  const [aboutData, setAboutData] = useState({
    title: "About Us",
    intro: "Welcome to Matrimony, a trusted platform...",
    services: [
      "Verified Profile Matching",
      "Personalized Recommendations",
      "Privacy & Security Protection",
      "24/7 Customer Support",
      "Success Story Guidance",
    ],
    missionHeading: "Our Mission",
    missionText: "Matrimony Match was created to bring together like-minded individuals...",
    images: {
      team: defaultTeamImageUrl,
      mission: defaultMissionImageUrl,
    },
  });

  // Handler functions for text and image changes
  // Upload handlers for images (optional: integrate file upload backend)
  // Functions to add/remove services in the list

  return (
    <div className="admin-aboutus max-w-6xl mx-auto p-6 space-y-6 bg-white rounded shadow-md">
      <h2>Edit About Us Page</h2>
      
      {/* Title input */}
      <input
        type="text"
        value={aboutData.title}
        onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
        className="border p-2 w-full"
      />

      {/* Editable intro paragraph */}
      <textarea
        value={aboutData.intro}
        onChange={(e) => setAboutData({ ...aboutData, intro: e.target.value })}
        className="border p-2 w-full h-24"
      />

      {/* Services list edit */}
      {aboutData.services.map((service, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={service}
            onChange={(e) => {
              const newServices = [...aboutData.services];
              newServices[i] = e.target.value;
              setAboutData({ ...aboutData, services: newServices });
            }}
            className="border p-1 flex-grow"
          />
          <button
            onClick={() => {
              const newServices = aboutData.services.filter((_, idx) => idx !== i);
              setAboutData({ ...aboutData, services: newServices });
            }}
            className="text-red-600 font-bold"
          >
            X
          </button>
        </div>
      ))}

      <button
        onClick={() => setAboutData({ ...aboutData, services: [...aboutData.services, ""] })}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Add Service
      </button>

      {/* Mission section */}
      <input
        type="text"
        value={aboutData.missionHeading}
        onChange={(e) => setAboutData({ ...aboutData, missionHeading: e.target.value })}
        className="border p-2 w-full mt-4"
      />
      <textarea
        value={aboutData.missionText}
        onChange={(e) => setAboutData({ ...aboutData, missionText: e.target.value })}
        className="border p-2 w-full h-24"
      />

      {/* Image upload & preview for team and mission */}
      {/* For example team image */}
      <div>
        <label>Team Image</label>
        <input type="file" onChange={handleTeamImageChange} />
        {aboutData.images.team && <img src={aboutData.images.team} alt="team" className="w-48 mt-2" />}
      </div>

      <div>
        <label>Mission Image</label>
        <input type="file" onChange={handleMissionImageChange} />
        {aboutData.images.mission && <img src={aboutData.images.mission} alt="mission" className="w-48 mt-2" />}
      </div>

      {/* Save / Cancel buttons */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-6">Save Changes</button>
      <button className="ml-4 bg-gray-300 px-4 py-2 rounded mt-6">Cancel</button>
    </div>
  );
}

export default AdminAboutUs;
