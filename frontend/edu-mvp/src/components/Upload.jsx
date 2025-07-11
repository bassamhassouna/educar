import React, { useRef } from "react";

const Upload = ({ onUploadComplete }) => {
  const lessonRef = useRef();
  const courseRef = useRef();

  const handleUpload = () => {
  const lessonFile = lessonRef.current?.files[0];
  const courseFile = courseRef.current?.files[0];

  if (!lessonFile || !courseFile) {
    alert("Please select both a lesson and a course file.");
    return;
  }

  const formData = new FormData();
  formData.append("lesson", lessonFile);
  formData.append("course", courseFile);

  // Pass raw file objects and names to parent (App.jsx)
  onUploadComplete({
    files: {
      lesson: lessonFile,
      course: courseFile,
    },
    names: {
      lesson: lessonFile.name,
      course: courseFile.name,
    },
    formData, // optional: pass this if App.jsx wants to send it directly
  });
};


  return (
    <div className="space-y-6">
      <div className="relative border-2 border-gray-300 rounded-md p-6 bg-white shadow-sm">
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-bold text-sm">
          1
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Lessons</h2>

        <div className="space-y-4">
          {/* Lesson File Input */}
          <div className="border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">

              <input
                type="file"
                ref={lessonRef}
                className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100
                           cursor-pointer"
              />

          </div>

          {/* Course File Input */}
          <div className="border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">

              <input
                type="file"
                ref={courseRef}
                className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100
                           cursor-pointer"
              />

          </div>

          <button
            className="bg-[#426ED8] text-white px-4 py-2 rounded-md shadow w-full 
                      hover:bg-[#355bb3] hover:cursor-pointer"
            onClick={handleUpload}
          >
            Upload
          </button>

        </div>
      </div>
    </div>
  );
};

export default Upload;
