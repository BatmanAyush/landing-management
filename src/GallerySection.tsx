
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import jpg2 from './2.jpg'
import jp5 from './5.jpg'
import jpg1 from './image00001.jpeg'
import jpg3 from './image00002.jpeg'

const images = [jpg1, jpg2, jpg3, jp5]
const GallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    hiddenRight: {
      x: '100%',
      opacity: 0,
    },
    hiddenLeft: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    )
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="py-20 px-4 md:px-0 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">GALLERY</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              custom={direction}
              variants={slideVariants}
              initial={direction > 0 ? 'hiddenRight' : 'hiddenLeft'}
              animate="visible"
              exit="exit"
              className="w-full h-[400px] object-cover"
              alt={`Gallery image ${currentIndex + 1}`}
            />
          </AnimatePresence>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection