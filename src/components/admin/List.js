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

    setScript(newScript);
  };

  // const onDragEnd = async (result) => {
  //   if (!result.destination) return;

  //   const newScriptOrder = [...script];
  //   const [removed] = newScriptOrder.splice(result.source.index, 1);
  //   newScriptOrder.splice(result.destination.index, 0, removed);

  //   try {
  //     // 서버에 순서를 업데이트하는 요청을 보냄
  //     await axios.put(
  //       `http://35.216.68.47:8080/api/experiences/${params.expId}/updatePageOrder`,
  //       {
  //         pageOrder: newScriptOrder.map((item) => item.id), // 각 항목에 'id' 속성이 있다고 가정
  //       }
  //     );

  //     // 서버가 순서를 업데이트하면 업데이트된 데이터를 가져와 상태를 업데이트
  //     const updatedScript = await axios.get(
  //       `http://35.216.68.47:8080/api/experiences/${params.expId}/pages`
  //     );
  //     setScript(updatedScript.data.result);
  //   } catch (error) {
  //     // 에러 핸들링, 예를 들어 에러 메시지 표시 등
  //     console.error("순서 업데이트 중 오류 발생:", error);
  //   }
  // };

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
