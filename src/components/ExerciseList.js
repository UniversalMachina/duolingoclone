// src/components/ExerciseList.js
import React from 'react';
import ExerciseItem from './ExerciseItem';

function ExerciseList({ exercises, onComplete }) {
  return (
    <div className="exercise-list max-w-lg mx-auto">
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default ExerciseList;
