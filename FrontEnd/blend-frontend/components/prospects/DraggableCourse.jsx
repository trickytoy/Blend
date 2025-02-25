import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"
import { motion } from "framer-motion"

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

export default DraggableCourse