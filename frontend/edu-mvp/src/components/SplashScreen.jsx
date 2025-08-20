import React, { useState } from "react";

const SplashScreen = ({ onNext, onHasAccount }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("All steps complete! Ready to proceed.");
      onNext();
    }
  };

  const stepsContent = [
    {
      image: "hero.png",
      title: "Welcome to CBEReady",
      description:
        "Upload your lessons, course outlines, or learning materials. Our AI is ready to evaluate and help you teach with precision.",
      buttonText: "Get Started",
      style: ""
    },
    {
      image: "hero2.png",
      title: "AI-Powered Lesson Analysis",
      description:
        "Our system reviews course relevancy, checks competency-based learning integration, and gives you clear, actionable insights.",
      buttonText: "Continue",
      style: ""
    },
    {
      image: "hero3.png",
      title: "Smarter Teaching, Simplified",
      description:
        "Get holistic evaluations and targeted suggestions to enhance your lessons. EduReady is your teaching co-pilot.",
      buttonText: "Try Demo",
      style: ""
    },
  ];

  const { image, title, description, buttonText, style } = stepsContent[currentStep - 1];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between bg-gray-100 px-6 py-12">

      {/* Step Dots */}
      <div className="flex space-x-2 justify-center mt-4">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStep === step
                ? "bg-[#426ED8] scale-125 shadow"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Dynamic Hero Content */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-lg mx-auto">
          <div className="w-[480px] h-[288px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Step Visual"
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap overflow-ellipsis max-w-full">
            {title}
          </h1>

          <p className="text-gray-600">
            {description}
          </p>

          <button
            onClick={handleNext}
            className="mt-2 bg-[#426ED8] text-white px-6 py-3 rounded-md text-lg font-medium 
                      hover:bg-[#355bb3] hover:scale-105 hover:cursor-pointer 
                      transition-transform duration-300 ease-out shadow"
          >
            {buttonText}
          </button>
        </div>


      <div /> {/* Bottom spacer */}
    </div>
  );
};

export default SplashScreen;
