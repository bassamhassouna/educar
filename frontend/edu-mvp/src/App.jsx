import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import SignUpScreen from "./components/SignUpScreen";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [screen, setScreen] = useState('splash')

  const handleUploadComplete = (data) => {
  console.log("Lesson file:", data.files.lesson);
  console.log("Course file:", data.files.course);
  console.log("FormData object (for backend):", data.formData);

  setScreen("results");
  };



  return (
    <div>
      {screen === 'splash' && (
        <SplashScreen
          onNext={() => setScreen("sign_up")}
        />
      )}
      {screen === "sign_up" && <SignUpScreen onNext={() => setScreen("dashboard")} />}
      {screen === "dashboard" && <Dashboard onUpload={() => setScreen("upload")}/>}
      {screen === "upload" && <UploadScreen goBack={() => setScreen("dashboard")} upload={() => setScreen("results")}/>}
      {screen === "results" && <Results />}
    </div>
  );
};

export default App;
