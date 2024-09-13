// src/components/ExerciseTree.js
import React from 'react';
import ExerciseNode from './ExerciseNode';

function ExerciseTree({ exercises, onCompletePart }) {
  return (
    <div className="exercise-tree flex flex-col items-center">
      {exercises.map((exercise, index) => (
        <div key={exercise.id} className="flex flex-col items-center">
          <ExerciseNode exercise={exercise} onCompletePart={onCompletePart} />

          {index < exercises.length - 1 && (
            // Line connecting to the next node
            <div className="h-12 flex flex-col items-center">
              <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExerciseTree;
