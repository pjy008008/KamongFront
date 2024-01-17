// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import styled from "styled-components";

// const StartContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 85vh;
// `;

// const Blackboard = styled.div`
//   width: 80%;
//   height: 100%;
//   background-color: #315c40;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const StartButton = styled.button`
//   padding: 10px 20px;
//   font-size: 16px;
//   background-color: white;
//   color: black;
//   border: none;
//   cursor: pointer;
//   margin-top: 20px;
// `;

// const GoBackButton = styled.button`
//   padding: 10px 20px;
//   font-size: 16px;
//   background-color: white;
//   color: black;
//   border: none;
//   cursor: pointer;
//   margin-top: 20px;
//   margin-right: auto;
// `;
// const StartExp = () => {
//   const location = useLocation();
//   const { steps, expId, expTitle, previeoulyStepIndex } = location.state || {};
//   const navigate = useNavigate();
//   const [experiences, setExperiences] = useState([]);
//   const [currentStepIndex, setCurrentStepIndex] = useState(previeoulyStepIndex || 0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (steps && steps[previeoulyStepIndex]) {
//           const response = await axios.get(`http://35.216.68.47:8080/api/experiences/pages/${steps[previeoulyStepIndex].stepId}`);
//           const contentArray = response.data.result;
//           setExperiences(contentArray);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();

//   }, [steps, previeoulyStepIndex, experiences.duration]);

//   const goBack = () => {
//     if (currentStepIndex > 0) {
//       setCurrentStepIndex(currentStepIndex - 1);
//       navigate(`/startexp/${steps[currentStepIndex - 1].stepId}`, { state: { steps, expId, expTitle, previeoulyStepIndex: currentStepIndex  } });
//     } else {
//       navigate("/start", { state: { steps, expId, expTitle } });
//     }
//   };

//   const goToNextStep = () => {
//     if (currentStepIndex < steps.length - 1) {
//       setCurrentStepIndex(currentStepIndex + 1);
//       navigate(`/startexp/${steps[currentStepIndex + 1].stepId}`, { state: { steps, expId, expTitle, previeoulyStepIndex: currentStepIndex  } });
//     } else {
//       navigate("/finish");
//     }
//   };

//   return (
//     <StartContainer>
//       <GoBackButton onClick={goBack}>뒤로가기</GoBackButton>
//       <Blackboard>
//         <h2>단계</h2>
//         <p>{experiences.line}</p>
//         <p>{experiences.sequence}</p>
//         <p><img src={experiences.imageUrl} alt="Experience Image" /></p>
//         <audio controls>
//           <source src={experiences.voiceUrl} type="audio/mpeg" />
//           Your browser does not support the audio tag.
//         </audio>
//         <StartButton onClick={goBack}>이전</StartButton>
//         <StartButton onClick={goToNextStep}>다음</StartButton>
//       </Blackboard>
//     </StartContainer>
//   );
// }

// export default StartExp;
