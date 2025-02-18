"use client"

import { useState } from "react"
import { initialNodes } from "@/data/coursesOnly"
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"
import { motion } from "framer-motion"
import { Search, Trash2, ArrowRight, BookOpen } from "lucide-react"
import Wavify from "react-wavify"

const DraggableCourse = ({ course }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: course.id,
  })

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "",
  }

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.05 }}
      className="p-3 border border-gray-300 cursor-grab bg-white rounded-lg shadow-sm flex flex-col transition duration-300 hover:shadow-md"
    >
      <span className="font-semibold text-gray-700">{course.data.label}</span>
      <span className="text-gray-500 text-sm mt-1">{course.data.title}</span>
    </motion.li>
  )
}

const DroppableArea = ({ selectedCourses, setSelectedCourses, setCourses }) => {
  const { setNodeRef } = useDroppable({ id: "drop-zone" })

  const handleRemove = (courseId) => {
    setSelectedCourses((prev) => prev.filter((c) => c.id !== courseId))
    const removedCourse = selectedCourses.find((c) => c.id === courseId)
    if (removedCourse) {
      setCourses((prev) => [...prev, removedCourse])
    }
  }

  return (
    <div
      ref={setNodeRef}
      className="h-full bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 min-h-[300px] flex flex-col gap-3 border border-blue-200 shadow-inner"
    >
      {selectedCourses.length > 0 ? (
        selectedCourses.map((course) => (
          <motion.div
            key={course.id}
            className="p-3 bg-white rounded-lg border border-blue-300 flex flex-col shadow-sm transition duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-gray-700">{course.data.label}</span>
                <p className="text-gray-500 text-sm mt-1">{course.data.title}</p>
              </div>
              <button
                onClick={() => handleRemove(course.id)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-full flex items-center hover:bg-red-600 transition duration-300"
              >
                <Trash2 size={16} className="mr-1" /> Remove
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <BookOpen className="h-12 w-12 mb-2 text-blue-400" />
          <p className="text-center">Drag courses here to build your curriculum</p>
        </div>
      )}
    </div>
  )
}

const CoursesDND = () => {
  const [courses, setCourses] = useState(initialNodes)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourses, setSelectedCourses] = useState([])

  const filteredCourses = courses.filter(
    (course) =>
      course.data.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.data.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && over.id === "drop-zone") {
      const draggedCourse = courses.find((c) => c.id === active.id)
      if (draggedCourse) {
        setSelectedCourses((prev) => [...prev, draggedCourse])
        setCourses((prev) => prev.filter((c) => c.id !== active.id))
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-20 overflow-hidden">
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
            {/* Course List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-h-[500px] overflow-y-auto"
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
                {filteredCourses.map((course) => (
                  <DraggableCourse key={course.id} course={course} />
                ))}
              </ul>
            </motion.div>

            {/* Drop Zone */}
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
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
              Calculate prospects <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </DndContext>
  )
}

export default CoursesDND

