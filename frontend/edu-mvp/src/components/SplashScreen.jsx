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
      title: "Welcome to the Lesson Analysis Portal",
      description:
        "Upload your course materials, analyze results, and grow your library. Everything starts here.",
      buttonText: "Get Started",
    },
    {
      image: "analyze.png",
      title: "Analyze and Gain Insights",
      description:
        "Get instant feedback, identify gaps, and enhance your lesson plans using AI-powered analysis.",
      buttonText: "Continue",
    },
    {
      image: "complete.png",
      title: "You're All Set",
      description:
        "Your teaching journey just got smarter. Let’s get to work!",
      buttonText: "Try Demo",
    },
  ];

  const { image, title, description, buttonText } = stepsContent[currentStep - 1];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between bg-gray-100 px-6 py-12">
      
      {/* Top Right Link */}
      <div className="absolute top-4 right-6">
        <a
          onClick={onHasAccount}
          className="text-[#426ED8] font-medium hover:underline hover:cursor-pointer"
        >
          I already have an account.
        </a>
      </div>

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
      <div className="flex flex-col items-center text-center space-y-6 mt-8">
        <img
          src={image}
          alt="Step Visual"
          className="w-full max-w-xl"
        />
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 max-w-md">{description}</p>
        <button
          onClick={handleNext}
          className="mt-6 bg-[#426ED8] text-white px-6 py-3 rounded-md text-lg font-medium 
                    hover:bg-[#355bb3] hover:scale-102 hover:cursor-pointer 
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
