import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "./firebase";

const SignInScreen = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // ✅ New

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        onNext(user);
      } else {
        setLoading(false); // ✅ Show screen only if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        onNext(userCredential.user);
      })
      .catch((error) => {
        console.error("Error during sign-up:", error);
        // optionally show error to user
      });
  };


  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User Info:", result.user);
        onNext(result.user); // 👈 Go to next screen after login
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
        <div className="text-3xl bg-[#426ED8] text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center shadow">
          &
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Sign up with email
        </h2>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4 text-left">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#426ED8]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#426ED8]"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <div></div>
            <button
              type="button"
              className="text-[#426ED8] hover:underline hover:cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-lg font-medium 
                       hover:scale-101 hover:cursor-pointer hover:bg-gray-900
                       transition-transform duration-300 ease-out shadow"
          >
            Get Started
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">or sign in with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleSignUp}
            className="p-2 bg-white border border-gray-300 rounded-full hover:shadow-md transition hover:cursor-pointer"
          >
            <img src="google.svg" alt="Google" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
