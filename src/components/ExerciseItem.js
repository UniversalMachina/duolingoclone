// src/components/ExerciseItem.js
import React, { useState, useRef, useEffect } from 'react';

function ExerciseItem({ exercise, onComplete }) {
  const [animate, setAnimate] = useState(false);
  const itemRef = useRef(null);

  const handleClick = () => {
    if (exercise.locked || exercise.completed) return;

    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
      onComplete(exercise.id);
      scrollToNext();
    }, 500); // Duration of the animation
  };

  const scrollToNext = () => {
    if (itemRef.current && itemRef.current.nextSibling) {
      itemRef.current.nextSibling.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={itemRef}
      className={`exercise-item flex items-center justify-between p-4 my-2 rounded-lg cursor-pointer transition-all duration-500 transform ${
        animate ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
      } ${
        exercise.locked
          ? 'bg-gray-200 cursor-not-allowed'
          : exercise.completed
          ? 'bg-green-200'
          : 'bg-blue-100 hover:bg-blue-200'
      }`}
      onClick={handleClick}
    >
      <span className="text-lg font-medium">{exercise.title}</span>
      {exercise.completed && (
        <span className="text-green-600 font-bold">Completed</span>
      )}
      {exercise.locked && (
        <span className="text-gray-500 font-medium">Locked</span>
      )}
    </div>
  );
}

export default ExerciseItem;
