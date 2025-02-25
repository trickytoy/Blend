"use client"

import { useState, useEffect } from "react"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { motion } from "framer-motion"
import { Search, ArrowRight, Loader } from "lucide-react"
import DroppableArea from "./DroppableArea"
import DraggableCourse from "./DraggableCourse"
import Prospect from "./Prospect"

const CoursesDND = () => {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourses, setSelectedCourses] = useState([])
  const [prospect, setProspect] = useState({})
  const [temp, setTemp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeCourse, setActiveCourse] = useState(null) // State for DragOverlay

  useEffect(() => {
    fetch("https://blend-451807.ts.r.appspot.com/mindmap/api/graph")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.initialNodes || [])
      })
      .catch((error) => console.error("Error fetching graph data:", error))
  }, [])

  const handleDragStart = (event) => {
    const { active } = event
    const draggedCourse = courses.find((c) => c.id === active.id)
    if (draggedCourse) {
      setActiveCourse(draggedCourse)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveCourse(null) // Clear overlay state after drop
    if (over && over.id === "drop-zone") {
      const draggedCourse = courses.find((c) => c.id === active.id)
      if (draggedCourse) {
        setSelectedCourses((prev) => [...prev, draggedCourse])
        setCourses((prev) => prev.filter((c) => c.id !== active.id))
      }
    }
  }

  const calculateProspects = () => {
    setLoading(true)
    const formattedCourses = selectedCourses.map(course => `${course.data.label}.${course.data.title}`)
    
    fetch("https://blend-451807.ts.r.appspot.com/mindmap/api/prospect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formattedCourses }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProspect(data)
        setTemp(true)
      })
      .catch((error) => console.error("Error fetching prospect data:", error))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <section className="relative bg-gradient-to-b from-blue-50 to-white pt-10 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-800 text-center mb-6"
            >
              Design Your Curriculum
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            >
              Drag and drop courses to create your personalized academic journey
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-h-[380px] overflow-y-auto"
              >
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  />
                </div>
                <ul className="space-y-2">
                  {courses.filter(
                    (course) =>
                      course.data.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      course.data.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((course) => (
                    <DraggableCourse key={course.id} course={course} />
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="lg:col-span-3"
              >
                <DroppableArea
                  selectedCourses={selectedCourses}
                  setSelectedCourses={setSelectedCourses}
                  setCourses={setCourses}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <button
                onClick={calculateProspects}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Calculate prospects <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </section>
        <DragOverlay>
          {activeCourse && <DraggableCourse course={activeCourse} />}
        </DragOverlay>
      </DndContext>
      {prospect?.Career_Prospect && <Prospect data={prospect} />}
    </div>
  )
}

export default CoursesDND
