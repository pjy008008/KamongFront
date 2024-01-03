import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  const params = useParams();
  const navigate = useNavigate();
  const [script, setScript] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newScript = [...script];
    const [removed] = newScript.splice(result.source.index, 1);
    newScript.splice(result.destination.index, 0, removed);
    // console.log(newScript)

    const adjustedScript = newScript.map((item, index) => ({
      stepId: item.stepId,
      updatedSequence: index + 1,
    }));
    console.log(adjustedScript);

    axios
      .patch(`http://35.216.68.47:8080/api/experiences/pages`, adjustedScript, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setScript(newScript);
  };

  useEffect(() => {
    axios
      .get(`http://35.216.68.47:8080/api/experiences/${params.expId}/pages`)
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        setScript(response.data.result);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  }, [params.expId]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {script.map((item, index) => (
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
                    #{index + 1} {item.title}
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
