import React from "react";
import Wavify from "react-wavify";

const Footer = () => {
  return (
    <div className="w-full mt-auto relative">
      {/* Second wave - lighter and positioned behind */}
      <Wavify
        fill="#3B82F6" // lighter shade of blue
        paused={false}
        options={{ height: 40, amplitude: 20, speed: 0.2, points: 3 }}
        className="absolute bottom-0 w-full opacity-80"
      />
      {/* First wave - Brighter and in front */}
      <Wavify
        fill="#3B82F6"
        paused={false}
        options={{ height: 40, amplitude: 40, speed: 0.2, points: 3 }}
        className="relative -mb-2"
      />
    </div>
  );
};

export default Footer;
