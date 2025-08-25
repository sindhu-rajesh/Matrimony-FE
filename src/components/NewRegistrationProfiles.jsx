import React, { useRef, useEffect } from "react";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import profile4 from "../assets/profile4.jpg";
import profile5 from "../assets/profile5.jpg";

import profilegirl1 from "../assets/profilegirl1.jpg";
import profilegirl2 from "../assets/profilegirl2.jpg";
import profilegirl3 from "../assets/profilegirl3.jpg";
// import profilegirl4 from "../assets/bride4.jpg";
// import profilegirl5 from "../assets/bride5.jpg";

const groomProfiles = [
  { id: 21, type: "Male", division: "Dhaka", age: 22, occupation: "Engineer", img: profile1 },
  { id: 22, type: "Male", division: "Chennai", age: 25, occupation: "Developer", img: profile2 },
  { id: 23, type: "Male", division: "Bangalore", age: 27, occupation: "Doctor", img: profile3 },
  { id: 24, type: "Male", division: "Mumbai", age: 26, occupation: "Architect", img: profile4 },
  { id: 25, type: "Male", division: "Kolkata", age: 28, occupation: "Accountant", img: profile5 },
  { id: 26, type: "Male", division: "Hyderabad", age: 29, occupation: "Lawyer", img: profile5 },
];

const brideProfiles = [
  { id: 101, type: "Female", division: "Dhaka", age: 21, occupation: "Designer", img: profilegirl1 },
  { id: 102, type: "Female", division: "Chennai", age: 24, occupation: "Teacher", img: profilegirl2 },
  { id: 103, type: "Female", division: "Bangalore", age: 26, occupation: "Doctor", img: profilegirl3 },
  { id: 104, type: "Female", division: "Mumbai", age: 25, occupation: "Architect", img: profilegirl2 },
  { id: 105, type: "Female", division: "Kolkata", age: 27, occupation: "Engineer", img: profilegirl1 },
  { id: 106, type: "Female", division: "Hyderabad", age: 28, occupation: "Lawyer", img: profilegirl3 }, // repeated image 4
];

function ProfileSlider({ profiles, title, genderIcon }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const scrollAmount = 320;
    const intervalTime = 3000;
    const intervalId = setInterval(() => {
      if (slider) {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, []);

  const scrollLeft = () => sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () => sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });

  return (
    <div className="py-10 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-8 text-block-600">{title}</h2>
      <div className="relative max-w-6xl mx-auto px-4">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-pink-700 transition"
          aria-label="Scroll Left"
          type="button"
        >
          &#8249;
        </button>

        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth p-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-md min-w-[20rem] p-6 flex flex-col items-center scroll-snap-align-start border border-pink-200 transition-transform hover:scale-105"
            >
              <img
                src={profile.img}
                alt="Profile"
                className="w-40 h-40 rounded-md object-cover border-4 border-white mb-5"
              />
              <div className="w-full text-left space-y-1">
                <p className="font-semibold mb-1 text-block-600">
                  <span className="mr-1">{genderIcon}</span> ID: <span className="font-bold">{profile.id}</span>
                </p>
                <p className="text-block-600">
                  Type: <span className="font-semibold">{profile.type}</span>
                </p>
                <p className="text-block-600">
                  Division: <span className="font-semibold">{profile.division}</span>
                </p>
                <p className="text-block-600">
                  Age: <span className="font-semibold">{profile.age}</span>
                </p>
                <p className="text-block-600">
                  Occupation: <span className="font-semibold">{profile.occupation}</span>
                </p>
              </div>
              <button className="mt-6 w-full py-2 bg-pink-600 text-white rounded font-semibold hover:bg-pink-700 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-pink-700 transition"
          aria-label="Scroll Right"
          type="button"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default function CombinedProfilesSlider() {
  return (
    <>
      {/* Bride first */}
      <ProfileSlider profiles={brideProfiles} title="New Bride Profiles"  />
      {/* Groom second */}
      <ProfileSlider profiles={groomProfiles} title="New Groom Profiles"  />
    </>
  );
}
