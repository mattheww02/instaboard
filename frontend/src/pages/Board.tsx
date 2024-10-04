import { useEffect, useRef, useState } from "react";

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Check if the canvas is successfully referenced
    if (!canvas) {
      console.error("Canvas element not found");
      return; // Exit if canvas is not available
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context not available");
      return; // Exit if context is not available
    }

    // Set initial drawing properties
    ctx.strokeStyle = 'black'; // Set stroke color
    ctx.lineWidth = 2; // Set line width
    ctx.lineJoin = 'round'; // Set line join style

    let isDrawing = false; // Flag to check if drawing is active

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return; // If not drawing, exit early

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left; // Calculate x position relative to canvas
      const y = e.clientY - rect.top;  // Calculate y position relative to canvas
      
      ctx.lineTo(x, y); // Use the calculated x and y
      ctx.stroke();
    };

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true; // Set drawing flag to true
      ctx.beginPath(); // Start a new path
      const rect = canvas.getBoundingClientRect();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top); // Move to starting point
      canvas.addEventListener("mousemove", draw);
    };

    const stopDrawing = () => {
      isDrawing = false; // Set drawing flag to false
      ctx.closePath(); // Close the path when drawing stops
      canvas.removeEventListener("mousemove", draw);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing); // Stop drawing if mouse leaves the canvas

    // Cleanup event listeners on component unmount
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
      canvas.removeEventListener("mousemove", draw);
    };
  }, []);
  
  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default Whiteboard;
