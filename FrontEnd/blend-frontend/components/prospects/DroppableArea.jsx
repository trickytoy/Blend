import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"
import { Search, Trash2, ArrowRight, BookOpen } from "lucide-react"

import { motion } from "framer-motion"
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
        className= "overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 h-[380px] pr-2 bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 min-h-[300px] flex flex-col gap-3 border border-blue-200 shadow-inner"
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

export default DroppableArea