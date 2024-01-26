import React, { useState } from "react";
import coffee from "../img/coffee.jpg";
import styled from "styled-components";

const Blackboard = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: #315c40;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 35px solid #4b3327;
  border-radius: 50px;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const DraggableImage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.3);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - initialPosition.x,
        y: e.clientY - initialPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY || e.detail || e.wheelDelta;
    const newScale = scale + (delta > 0 ? -0.1 : 0.1);

    // Limit the scale factor to a reasonable range (e.g., between 0.5 and 3)
    setScale(Math.min(Math.max(newScale, 0.1), 1));
  };
  const preventWheel = (e) => {
    e.preventDefault();
  };
  return (
    <Blackboard
      onWheel={preventWheel}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={coffee}
        alt="Draggable Image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: isDragging ? "grabbing" : "grab",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
    </Blackboard>
  );
};

export default DraggableImage;
