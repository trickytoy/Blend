"use client"
import CoursesDND from '@/components/prospects/Coursesdnd'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const Prospect = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <CoursesDND />
      </div>
      <Footer />
    </div>
  )
}

export default Prospect
