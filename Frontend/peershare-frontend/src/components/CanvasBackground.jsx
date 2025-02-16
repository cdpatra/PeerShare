/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

function CanvasBackground({ isMouseLine }) {
   const canvasRef = useRef();
   useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const noOfBoxes = 20;

      const mouse = {
         x: innerWidth / 2,
         y: innerHeight / 2,
      };

      window.addEventListener("resize", () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         drawBoard(window.innerWidth, window.innerHeight, window.innerHeight / noOfBoxes);
      });

      const context = canvas.getContext("2d");
      // board
      function drawBoard(width, height, size) {
         context.beginPath();
         for (let x = 0; x <= width; x += size) {
            context.moveTo(0 + x, 0);
            context.lineTo(0 + x, height);
         }
         -0.5;
         for (let x = 0; x <= height; x += size) {
            context.moveTo(0, x);
            context.lineTo(width, x);
         }
         context.setLineDash([0, 0]);
         context.strokeStyle = "#64748b88";
         context.lineWidth = 1;
         context.stroke();
      }

      // lines
      const drawLines = () => {
         context.beginPath();
         context.moveTo(mouse.x, 0);
         context.lineTo(mouse.x, innerHeight);

         context.moveTo(0, mouse.y);
         context.lineTo(innerWidth, mouse.y);

         context.setLineDash([10, 2]);
         context.strokeStyle = "#e4f57d";
         context.lineWidth = 1;
         context.stroke();
      };

      window.addEventListener("mousemove", (event) => {
         mouse.x = event.x;
         mouse.y = event.y;
      });
      if (isMouseLine) {
         const animate = () => {
            requestAnimationFrame(animate);
            context.clearRect(0, 0, innerWidth, innerHeight);
            drawBoard(window.innerWidth, window.innerHeight, window.innerHeight / noOfBoxes);
            drawLines();
         };
         animate();
      } else {
         drawBoard(window.innerWidth, window.innerHeight, window.innerHeight / noOfBoxes);
      }
   });
   return <canvas ref={canvasRef} className="block  bg-primaryDark" />;
}

export default CanvasBackground;
