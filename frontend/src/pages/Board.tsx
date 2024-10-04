import { useEffect, useRef, useState } from "react";

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) { // check for canvas
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) { // check for context
      console.error("2D context not available");
      return;
    }

    // set initial drawing properties
    ctx.strokeStyle = 'black'; // pen color
    ctx.lineWidth = 2; // pen width
    ctx.lineJoin = 'round'; // join style

    let isDrawing = false;

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position on canvas
      const y = e.clientY - rect.top;  // y position on canvas
      
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const startDrawing = (e: MouseEvent) => { // pen down
      isDrawing = true;
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      canvas.addEventListener("mousemove", draw);
    };

    const stopDrawing = () => { // pen up
      isDrawing = false;
      ctx.closePath();
      canvas.removeEventListener("mousemove", draw);
    };

    // pen down on mouse down, pen up on mouse up/out of canvas
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // clean up event listeners
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
