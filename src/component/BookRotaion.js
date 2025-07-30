import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainBook from "../Images/main_book.png";

// Define 7 slot positions for anti-clockwise rotation
const slotOrder = ["left3", "left2", "left1", "center", "right1", "right2", "right3"];

// Define style for each slot
const slotStyles = {
  left3: {
    x: -380,
    y: 120,
    rotate: -55,
    scale: 0.75,
    opacity: 0,
    zIndex: 0,
  },
  left2: {
    x: -280,
    y: 90,
    rotate: -40,
    scale: 0.82,
    opacity: 0.3,
    zIndex: 0,
  },
  left1: {
    x: -160,
    y: 40,
    rotate: -25,
    scale: 0.9,
    opacity: 0.6,
    zIndex: 1,
  },
  center: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    zIndex: 3,
  },
  right1: {
    x: 160,
    y: 40,
    rotate: 25,
    scale: 0.9,
    opacity: 0.6,
    zIndex: 1,
  },
  right2: {
    x: 280,
    y: 90,
    rotate: 40,
    scale: 0.82,
    opacity: 0.3,
    zIndex: 0,
  },
  right3: {
    x: 380,
    y: 120,
    rotate: 55,
    scale: 0.75,
    opacity: 0,
    zIndex: 0,
  },
};

const BookRotation = () => {
  // Initialize 7 books with unique IDs and slots
  const [books, setBooks] = useState([
    { id: 0, slot: "left3" },
    { id: 1, slot: "left2" },
    { id: 2, slot: "left1" },
    { id: 3, slot: "center" },
    { id: 4, slot: "right1" },
    { id: 5, slot: "right2" },
    { id: 6, slot: "right3" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBooks((prevBooks) =>
        prevBooks.map((book) => {
          const currentIndex = slotOrder.indexOf(book.slot);
          const nextIndex =
            (currentIndex - 1 + slotOrder.length) % slotOrder.length; // Anti-clockwise
          return { ...book, slot: slotOrder[nextIndex] };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-[400px] md:h-[500px] w-full max-w-7xl mx-auto overflow-hidden">
      {books.map((book) => {
        const style = slotStyles[book.slot];
        return (
          <motion.img
            key={book.id}
            src={MainBook}
            alt={`Book ${book.id}`}
            className="absolute w-[100px] md:w-[220px] rounded-xl drop-shadow-2xl"
            animate={{
              x: style.x,
              y: style.y,
              rotate: style.rotate,
              scale: style.scale,
              opacity: style.opacity,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ zIndex: style.zIndex }}
          />
        );
      })}
    </div>
  );
};

export default BookRotation;
