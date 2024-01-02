import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ItemContainer = styled.div`
  width: 90vw;
  margin-top: 3vh;
  height: 7vh;
  background-color: #e4e4e4;
  margin-left: 3vw;
  display: flex;
  align-items: center;
  padding-left: 3vw;
`;

const List = () => {
  const [items, setItems] = useState([
    "손 씻기",
    "손 더럽히기",
    "손 씻기",
    "손 씻기",
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);
  };
  const navigate = useNavigate();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable
                key={index}
                draggableId={`item-${index}`}
                index={index}
              >
                {(provided) => (
                  <ItemContainer
                    onClick={() => navigate("/script")}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    #{index + 1} {item}
                  </ItemContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
