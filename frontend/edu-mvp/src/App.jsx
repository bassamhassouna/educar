import React, { useState } from "react";
import Upload from "./components/Upload";
import Results from "./components/Results";
import SplashScreen from "./components/SplashScreen";
import SignUpScreen from "./components/SignUpScreen";
import LogInScreen from "./components/LogInScreen";

const App = () => {
  const [screen, setScreen] = useState('splash')

  const handleUploadComplete = (data) => {
  console.log("Lesson file:", data.files.lesson);
  console.log("Course file:", data.files.course);
  console.log("FormData object (for backend):", data.formData);

  setScreen("results");
};

  const FloatingIsland = ( {element}) => {
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl px-4">
        <div className="bg-white shadow-sm rounded-md border-2 border-gray-300 mb-6 p-6">
          {element}
        </div>
      </div>
    </div>
    )
  }

  return (
    <div>
      {screen === 'splash' && (
        <SplashScreen
          onNext={() => setScreen("sign_in")}
          onHasAccount={() => setScreen("log_in")}
        />
      )}
      {screen === "sign_in" && <SignUpScreen />}
      {screen === "log_in" && <LogInScreen />}
      {screen === "upload" && <FloatingIsland element={<Upload onUploadComplete={handleUploadComplete}/>} />}
      {screen === "results" && <FloatingIsland element={<Results />} />}
    </div>
  );
};

export default App;
