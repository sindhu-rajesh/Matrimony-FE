import React from "react";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";
import SuccessStories from "../components/SucessStories";
import HowItWorks from "../components/HowItWorks";
import NewRegistrationProfiles from "../components/NewRegistrationProfiles"
import Plans from "../components/Plan";



const LandingPage = () => (
  <div>
    <HeroSection />
    <WhyChooseUs />
    <HowItWorks />
    <NewRegistrationProfiles />
    <SuccessStories />
    <Plans />
   
  </div>
);

export default LandingPage;
