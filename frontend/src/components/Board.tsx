import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';

const Board: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const { boardId } = useParams<{ boardId: string }>();

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

    // set up websocket + handle drawing messages
    ws.current = new WebSocket(`ws://localhost:5000/ws?boardId=${boardId}`);
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "drawing") {
        drawCoords(ctx, data.coordinates);
      }
      else if (data.type === "startDrawing") {
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
      }
    };

    // set initial drawing properties
    ctx.strokeStyle = 'black'; // pen color
    ctx.lineWidth = 2; // pen width
    ctx.lineJoin = 'round'; // join style

    let isDrawing = false;

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;

      const { x, y } = getMousePos(e);

      ws.current?.send(
        JSON.stringify({
          type: "drawing",
          boardId: boardId,
          coordinates: { x, y },
        })
      );
    };

    // draw to canvas given coords
    const drawCoords = (ctx: CanvasRenderingContext2D | null, coordinates: { x: number; y: number }) => {
      if (!ctx) return;
      ctx.lineTo(coordinates.x, coordinates.y);
      ctx.stroke();
    };

    const startDrawing = (e: MouseEvent) => { // pen down
      isDrawing = true;
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      canvas.addEventListener("mousemove", draw);
      const { x, y } = getMousePos(e);

      ws.current?.send(
        JSON.stringify({
          type: "startDrawing",
          boardId: boardId,
          coordinates: { x, y },
        })
      );
    };

    const stopDrawing = () => { // pen up
      isDrawing = false;
      canvas.removeEventListener("mousemove", draw);
    };

    // add event listeners for pen up/down
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
  
  return <canvas ref={canvasRef} width={800} height={600} className="card overflow-hidden shadow rounded-4 border-0 mb-5"></canvas>;
};

export default Board;