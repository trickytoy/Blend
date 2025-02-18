"use client"

const Prospect = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Under Construction 🚧</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-md">
        Our team is currently working on this feature. Please check back soon for updates!
      </p>
      <a 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default Prospect;
