"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/providers/theme-provider";

export function Hero3DFigure() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get viewport dimensions
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position as percentage of viewport
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Dynamic rotations based on mouse position
  const rotateX = mousePosition.y * -10; // Invert for natural movement
  const rotateY = mousePosition.x * 10;

  // The layers of the 3D figure with appropriate colors for both themes
  const layers = [
    {
      color: isDark ? "#1e40af" : "#3b82f6", // dark blue / blue
      size: "100%",
      z: 0,
    },
    {
      color: isDark ? "#2563eb" : "#60a5fa", // blue / light blue
      size: "90%",
      z: 10,
    },
    {
      color: isDark ? "#3b82f6" : "#93c5fd", // light blue / lighter blue
      size: "80%",
      z: 20,
    },
    {
      color: isDark ? "#60a5fa" : "#bfdbfe", // lighter blue / very light blue
      size: "70%",
      z: 30,
    },
    {
      color: isDark ? "#93c5fd" : "#dbeafe", // very light blue / palest blue
      size: "60%",
      z: 40,
    },
  ];

  // Code blocks with coding syntax styling
  const codeBlocks = [
    { code: "const Portfolio = () => {\n  return <Awesome />;\n};", top: "10%", left: "15%", rotate: -8 },
    { code: "function createValue() {\n  return 'Hello World';\n}", top: "35%", left: "25%", rotate: 5 },
    { code: '<div className="dev">\n  <p>Coding...</p>\n</div>', top: "65%", left: "20%", rotate: -5 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]" style={{ perspective: "1000px" }}>
        {/* 3D Layered elements */}
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: layer.size,
              height: layer.size,
              backgroundColor: layer.color,
              left: `calc(50% - ${parseInt(layer.size) / 2}%)`,
              top: `calc(50% - ${parseInt(layer.size) / 2}%)`,
              zIndex: index,
              boxShadow: isDark ? "0 0 15px rgba(59, 130, 246, 0.5)" : "0 0 15px rgba(37, 99, 235, 0.3)",
            }}
            animate={{ rotateX, rotateY, z: layer.z }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
          />
        ))}

        {/* Floating code snippets */}
        {codeBlocks.map((block, index) => (
          <motion.div
            key={`code-${index}`}
            className={`absolute px-3 py-2 rounded-md text-xs code-block ${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
            style={{
              top: block.top,
              left: block.left,
              boxShadow: isDark ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
              transform: `rotate(${block.rotate}deg)`,
              maxWidth: "180px",
              overflow: "hidden",
              fontFamily: "monospace",
            }}
            animate={{ y: [0, -5, 0], opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 4 + index, ease: "easeInOut" }}
          >
            <pre className="whitespace-pre-wrap">{block.code}</pre>
          </motion.div>
        ))}

        {/* Developer figure silhouette */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10"
          style={{ width: "40%", height: "40%" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill={isDark ? "#f8fafc" : "#0f172a"}>
            <path d="M50,10 C60,10 70,20 70,35 C70,50 60,55 50,55 C40,55 30,50 30,35 C30,20 40,10 50,10 Z" />
            <path d="M30,55 L70,55 L75,100 L25,100 Z" />
            <path d="M25,60 L20,90 L10,70 Z" />
            <path d="M75,60 L80,90 L90,70 Z" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
