import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { IoColorPalette } from "react-icons/io5";
import { RiEraserFill } from "react-icons/ri";

const Board: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const { boardId } = useParams<{ boardId: string }>();
  const [chosenColor, setChosenColor] = useState<string>("#000");
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [eraserOn, setEraserOn] = useState<boolean>(false);

  const handleColorChange = (color: any) => { setChosenColor(color.hex); }

  const toggleColorPicker = () => { setPickerVisible(!pickerVisible); }

  const toggleEraserOn = () => { setEraserOn(!eraserOn); }

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
        ctx.strokeStyle = data.color;
        ctx.lineWidth = data.width;
        drawCoords(ctx, data.coordinates);
      }
      else if (data.type === "startDrawing") {
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
      }
    };

    // set initial drawing properties
    //ctx.strokeStyle = 'black'; // pen color
    //ctx.strokeStyle = chosenColor; //TODO: move this to websocket send
    //ctx.lineWidth = 2; // pen width
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

      ctx.strokeStyle = chosenColor; //TODO: move this to websocket send

      ws.current?.send(
        JSON.stringify({
          type: "drawing",
          boardId: boardId,
          coordinates: { x, y },
          color: eraserOn ? "white" : chosenColor,
          width: eraserOn ? 14 : 2
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
  }, [chosenColor, eraserOn]);
  
  return (
    <div className="relative flex">
      <div style={{ position: "relative" }}>
        <canvas ref={canvasRef} width={800} height={600} className="card overflow-hidden shadow rounded-4 border-0 mb-5"></canvas>

        {/* color picker on canvas */}
        {pickerVisible && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 10,
              borderRadius: "8px",
              padding: "10px"
            }}
          >
            <SketchPicker color={chosenColor} onChangeComplete={handleColorChange} />
          </div>
        )}

        {/* draw option buttons */}
        <div className="col-1" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 15 }}>
          <button
            style={{ padding: "0", lineHeight: '1' }}
            onClick={toggleColorPicker}
            className={`btn btn-sm fs-6 fw-bolder me-1 mt-2 ${pickerVisible ? "btn-dark" : "btn-light"}`}
          >
            <IoColorPalette style={{ fontSize: '1.8rem' }}/>
          </button>
          <button
            style={{ zIndex: 15, padding: "0", lineHeight: '1' }}
            onClick={toggleEraserOn}
            className={`btn btn-sm fs-6 fw-bolder me-1 mt-2 ${eraserOn ? "btn-dark" : "btn-light"}`}
          >
            <RiEraserFill style={{ fontSize: '1.8rem' }}/>
          </button>
        </div>
      </div>
    </div>


  );
};

export default Board;