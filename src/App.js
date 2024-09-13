import { useRef, useEffect, useState } from 'react';
import {
  Flag,
  Flame,
  Gem,
  Heart,
  Home,
  Headphones,
  Dumbbell,
  Trophy,
  MoreHorizontal,
  Lock,
  Star,
  BookOpen,
} from 'lucide-react';

export default function DuolingoUI() {
  const pathRef = useRef(null);
  const [positions, setPositions] = useState([]);

  // Set the number of lessons dynamically
  const lessonCount = 12; // You can change this number to any value
  const svgWidth = 200;
  const svgHeight = 800;

  useEffect(() => {
    const positions = [];
    const path = pathRef.current;

    if (path) {
      const pathLength = path.getTotalLength();

      for (let i = 0; i < lessonCount; i++) {
        const t = i / (lessonCount - 1); // t from 0 to 1
        const length = t * pathLength;
        const point = path.getPointAtLength(length);

        positions.push({ x: point.x, y: point.y });
      }

      setPositions(positions);
    }
  }, [lessonCount]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-purple-500 text-white p-4 flex justify-between items-center">
        <Flag className="w-6 h-6" />
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Flame className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-sm font-bold">12</span>
          </div>
          <div className="flex items-center">
            <Gem className="w-5 h-5 text-blue-400 mr-1" />
            <span className="text-sm font-bold">500</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-red-400 mr-1" />
            <span className="text-sm font-bold">5</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Unit 3 */}
        <div className="bg-purple-500 text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Unit 3</h2>
            <p className="text-sm">Use the present tense, get around town</p>
          </div>
          <button className="bg-purple-600 p-2 rounded-full">
            <BookOpen className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Path */}
        <div className="relative p-4 pb-20" style={{ height: `${svgHeight}px` }}>
          {/* SVG path */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          >
            <path
              ref={pathRef}
              d={`M${svgWidth / 2},0 
                 C${-svgWidth / 2},${svgHeight / 2} 
                   ${svgWidth + svgWidth / 2},${svgHeight / 2} 
                   ${svgWidth / 2},${svgHeight}`}
              stroke="transparent"
              fill="none"
            />
          </svg>

          {/* Lessons */}
          {[...Array(lessonCount)].map((_, index) => {
            const position = positions[index] || { x: 0, y: 0 };

            // Example logic for lesson states
            const isCompleted = index < 3;
            const isStart = index === 3;
            const isCharacter = index === 4;
            const isLocked = index > 4 && index < lessonCount - 1;
            const isChest = index === lessonCount - 1;

            return (
              <div
                key={index}
                className="absolute flex items-center justify-center"
                style={{
                  left: `calc(${position.x}px - 32px)`,
                  top: `calc(${position.y}px - 32px)`,
                  width: '64px',
                  height: '64px',
                }}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-md
                    ${isCompleted ? 'bg-yellow-400' : ''}
                    ${isStart ? 'bg-purple-500' : ''}
                    ${isCharacter ? 'bg-purple-300' : ''}
                    ${isLocked ? 'bg-gray-300' : ''}
                    ${isChest ? 'bg-gray-300' : ''}
                  `}
                >
                  {isCompleted && (
                    <svg
                      className="w-8 h-8 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {isStart && <Star className="w-8 h-8 text-white" />}
                  {isCharacter && (
                    <svg
                      className="w-12 h-12 text-purple-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                    </svg>
                  )}
                  {isLocked && <Lock className="w-8 h-8 text-gray-500" />}
                  {isChest && (
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Unit 4 */}
        <div className="bg-green-500 text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Unit 4</h2>
            <p className="text-sm">Refer to family members</p>
          </div>
          <button className="bg-green-600 p-2 rounded-full">
            <BookOpen className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col items-center">
          <button className="bg-white text-green-500 px-4 py-2 rounded-full font-bold mb-4 shadow-md">
            JUMP HERE?
          </button>
          <button className="bg-green-500 text-white p-2 rounded-full shadow-md">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <Home className="w-6 h-6 text-gray-500" />
          <Headphones className="w-6 h-6 text-gray-500" />
          <Dumbbell className="w-6 h-6 text-gray-500" />
          <Trophy className="w-6 h-6 text-gray-500" />
          <MoreHorizontal className="w-6 h-6 text-gray-500" />
        </div>
      </footer>
    </div>
  );
}
