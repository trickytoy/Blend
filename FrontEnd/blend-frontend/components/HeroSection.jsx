"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Compass, Briefcase } from "lucide-react"
import Link from "next/link"
import Wavify from "react-wavify"

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 overflow-hidden">
      <div className="container mx-auto px-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            BLEND
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Blend is an interactive course visualization platform for UNSW COMP students to navigate their academic path
            with clarity.
          </p>
            <Link
            href="/mindmap"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 mr-4"
            >
            MindMap
            <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
            href="/prospects"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
            >
            Prospects
            <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<BookOpen className="h-8 w-8 text-blue-500" />}
            title="Explore Courses"
            description="Discover a wide variety of courses available and find the ones that suit your career aspirations."
          />
          <FeatureCard
            icon={<Compass className="h-8 w-8 text-blue-500" />}
            title="Plan Your Future"
            description="Use the tool to plan your academic path and visualize the connections between different courses."
          />
          <FeatureCard
            icon={<Briefcase className="h-8 w-8 text-blue-500" />}
            title="Career Prospects"
            description="Learn how your course choices can lead to different career paths and opportunities in the tech industry."
          />
        </motion.div>
      </div>
      
      <Wavify
            className="absolute top-0 left-0 w-full rotate-180"
            fill="#3B82F6"
            paused={false}
            options={{ height: 40, amplitude: 40, speed: 0.2, points: 3 }}
            />
        
    </section>
  )
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default Hero
