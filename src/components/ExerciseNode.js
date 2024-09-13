import React, { useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use';
import * as d3 from 'd3';
import { Star, Lock } from 'lucide-react';

const BSplineProgressPath = () => {
  const svgRef = useRef(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const createCurve = (startX, startY, endX, endY, curve) => {
      const line = d3.line().curve(curve);
      const points = [
        [startX, startY],
        [startX + (endX - startX) / 3, startY + (endY - startY) / 6],
        [startX + 2 * (endX - startX) / 3, endY - (endY - startY) / 6],
        [endX, endY]
      ];
      return line(points);
    };

    const curve1 = createCurve(margin.left, height / 4, width - margin.right, height / 2, d3.curveBasis);
    const curve2 = createCurve(margin.left, height / 2, width - margin.right, 3 * height / 4, d3.curveBasis);

    svg.append("path")
      .attr("d", curve1)
      .attr("fill", "none")
      .attr("stroke", "#D1D5DB")
      .attr("stroke-width", 3);

    svg.append("path")
      .attr("d", curve2)
      .attr("fill", "none")
      .attr("stroke", "#D1D5DB")
      .attr("stroke-width", 3);

    const addElementsAlongCurve = (curve, numElements, startIndex) => {
      const pathNode = svg.append("path").attr("d", curve).node();
      const pathLength = pathNode.getTotalLength();

      for (let i = 0; i < numElements; i++) {
        const t = i / (numElements - 1);
        const point = pathNode.getPointAtLength(t * pathLength);

        const isCompleted = i < 3;
        const isStart = i === 3;
        const isCharacter = i === 4;
        const isLocked = i > 4 && i < 11;
        const isChest = i === 11;

        const group = svg.append("g")
          .attr("transform", `translate(${point.x}, ${point.y})`);

        group.append("circle")
          .attr("r", 20)
          .attr("fill", isCompleted ? "#FBBF24" : isStart ? "#8B5CF6" : isCharacter ? "#A78BFA" : "#D1D5DB");

        if (isCompleted) {
          group.append("path")
            .attr("d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z")
            .attr("fill", "#92400E")
            .attr("transform", "scale(0.7) translate(-12, -12)");
        } else if (isStart) {
          group.append("g")
            .attr("transform", "scale(0.04) translate(-256, -256)")
            .append("path")
            .attr("d", "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z")
            .attr("fill", "white");
        } else if (isCharacter) {
          group.append("g")
            .attr("transform", "scale(0.03) translate(-256, -256)")
            .append("path")
            .attr("d", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z")
            .attr("fill", "#7C3AED");
        } else if (isLocked) {
          group.append("g")
            .attr("transform", "scale(0.03) translate(-256, -256)")
            .append("path")
            .attr("d", "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z")
            .attr("fill", "#6B7280");
        } else if (isChest) {
          group.append("g")
            .attr("transform", "scale(0.03) translate(-256, -256)")
            .append("path")
            .attr("d", "M0 256v192c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V256H0zm64-64c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v64h64v-64c0-70.7-57.3-128-128-128H128C57.3 0 0 57.3 0 128v64h64v-64z")
            .attr("fill", "#6B7280");
        }

        group.append("text")
          .text(startIndex + i + 1)
          .attr("text-anchor", "middle")
          .attr("dy", "0.3em")
          .attr("font-size", "12px")
          .attr("fill", "white");
      }
    };

    addElementsAlongCurve(curve1, 12, 0);
    addElementsAlongCurve(curve2, 12, 12);

  }, [width]);

  return (
    <div className="w-full h-full bg-gray-100">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BSplineProgressPath;