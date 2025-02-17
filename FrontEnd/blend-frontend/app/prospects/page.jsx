"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSwapy } from "swapy";
import { initialNodes } from "@/data/coursesOnly";

const Prospect = () => {
  const swapy = useRef(null);
  const container = useRef(null);
  const [courses, setCourses] = useState(initialNodes)

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);
      swapy.current.onSwap((event) => {
        console.log("swap", event);
      });
    }
    return () => {
      swapy.current?.destroy();
    };
  }, []);

  return (
    <div ref={container} className="flex gap-4 p-4">
      <div data-swapy-slot="availableCourses" className="w-1/2 bg-gray-100 p-4 min-h-[300px] border">
        {courses.map((course) => {
            return (
            <div key={course.id} data-swapy-item={course.id} className="p-2 bg-white shadow-md rounded-md cursor-pointer">
                <div>{course.data.label}</div>
            </div>
            )
        })}
      </div>

      <div data-swapy-slot="selectedCourses" className="w-1/2 bg-blue-100 p-4 min-h-[300px] border">
        <div data-swapy-item="b"><div></div></div>
        <div data-swapy-item="c"><div></div></div>
      </div>
    </div>
  );
};

export default Prospect;
