import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Blend: Plan Your Academic Journey with Confidence</h1>
          <p className="text-gray-600 mb-6">
          Blend is an interactive course visualization platform designed to help students navigate their academic journey with clarity. By mapping all UNSW COMP courses into structured categories like Software Fundamentals, AI, and Infrastructure, Blend enables users to explore connections between courses, uncover prerequisites, and understand how different subjects align with career paths.
          </p>
          <div className="space-x-4">
            <Link href="/mindmap" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Mind Map</Link>
            <Link href="/Prospects" className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100">Prospects</Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Explore Courses</h2>
            <p className="text-gray-600">Discover a wide variety of courses available and find the ones that suit your career aspirations.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Plan Your Future</h2>
            <p className="text-gray-600">Use the tool to plan your academic path and visualize the connections between different courses.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Career Prospects</h2>
            <p className="text-gray-600">Learn how your course choices can lead to different career paths and opportunities in the tech industry.</p>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center mt-8">
          <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
          <p className="text-gray-500">This space can be used to highlight new features, updates, or instructions for users.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
