import React from 'react'
import Wavify from "react-wavify"

const Footer = () => {
  return (
    <Wavify
    className="absolute bottom-0 left-0 w-full"
    fill="#3B82F6"
    paused={false}
    options={{ height: 40, amplitude: 40, speed: 0.2, points: 3 }}
    />
  )
}

export default Footer
