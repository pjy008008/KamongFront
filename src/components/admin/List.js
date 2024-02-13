import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const ItemContainer = styled.div`
  width: 90vw;
  margin-top: 3vh;
  padding-top: 0.1vh;
  padding-bottom: 1.5vh;
  height: auto;
  background-color: #e4e4e4;
  margin-left: 3vw;
  display: block;
  align-items: center;
  padding-left: 3vw;
`;

const Title = styled.h2`
  font-size: 16px;
  padding-right: 20px;
  margin-bottom: 0.3vh;

  @media screen and (max-width: 1199px) {
    font-size: 1.6vw;
  }

  @media screen and (max-width: 899px) {
    font-size: 2.2vw;
  }
`;

const Line = styled.span``;

const EmptyContainer = styled.div`
  width: 90vw;
  height: 60vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
`;

const List = ({ expId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [script, setScript] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newScript = [...script];
    const [removed] = newScript.splice(result.source.index, 1);
    newScript.splice(result.destination.index, 0, removed);

    const adjustedScript = newScript.map((item, index) => ({
      stepId: item.stepId,
      updatedSequence: index + 1,
    }));

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
            {script.length === 0 ? (
              <EmptyContainer>대사가 존재하지 않습니다</EmptyContainer>
            ) : (
              script.map((item, index) => (
                <Draggable 
                  key={index}
                  draggableId={`item-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <ItemContainer 
                      onClick={() =>
                        navigate(`/script/${item.stepId}`, {
                          state: {
                            expId: expId,
                          },
                        })
                      }
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Title style={{ whiteSpace: "pre-wrap" }}>
                        #{index + 1} {item.title}
                      </Title>
                      <Line style={{ paddingLeft: "0px", whiteSpace: "pre-wrap" }}>{item.line}</Line>
                    </ItemContainer>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
