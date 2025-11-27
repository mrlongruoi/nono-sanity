"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}

export default function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgString, setSvgString] = useState("");

  useEffect(() => {
    const map = new DottedMap({ height: 60, grid: "diagonal" });

    // Add dots for the lines
    dots.forEach((dot) => {
      map.addPin({
        lat: dot.start.lat,
        lng: dot.start.lng,
        svgOptions: { color: lineColor, radius: 0.4 },
      });
      map.addPin({
        lat: dot.end.lat,
        lng: dot.end.lng,
        svgOptions: { color: lineColor, radius: 0.4 },
      });
    });

    const svgMap = map.getSVG({
      radius: 0.22,
      color: "#cbd5e1",
      shape: "circle",
      backgroundColor: "transparent",
    });

    setSvgString(svgMap);
  }, [dots, lineColor]);

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white relative font-sans">
      <div
        className="absolute inset-0"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 1056 540"
        className="w-full h-full absolute inset-0 pointer-events-none"
      >
        {dots.map((dot, idx) => (
          <g key={`line-group-${idx}`}>
            <motion.line
              x1={convertLatLngToXY(dot.start.lat, dot.start.lng).x}
              y1={convertLatLngToXY(dot.start.lat, dot.start.lng).y}
              x2={convertLatLngToXY(dot.end.lat, dot.end.lng).x}
              y2={convertLatLngToXY(dot.end.lat, dot.end.lng).y}
              stroke={lineColor}
              strokeWidth="1"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.5 * idx,
                ease: "easeOut",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Converts latitude and longitude to x and y coordinates for a 1056x540 SVG
function convertLatLngToXY(lat: number, lng: number) {
  const mapWidth = 1056;
  const mapHeight = 540;
  const x = (lng + 180) * (mapWidth / 360);
  const y = (90 - lat) * (mapHeight / 180);
  return { x, y };
}
