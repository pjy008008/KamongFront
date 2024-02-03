import Nav from "../components/Nav";
import Slide from "../components/select/Slide";
import { useState, useEffect } from "react";
import axios from "axios";

const API_ENDPOINT = "http://35.216.68.47:8080/api/experiences";

const Select = () => {
  const [experiences, setExperiences] = useState([]);
  // const [contentArray1, setContentArray1] = useState([]);
  // const [contentArray2, setContentArray2] = useState([]);
  const handleList = () => {
    // if (experiences.length <= 1) {
    // return (
    //     <div>
    //       {/* list개수 컨트롤 코드 작성 */}
    //       {/* <p
    //         style={{
    //           width: "100vw",
    //           height: "75vh",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           fontSize: "25px",
    //           fontWeight: "bold",
    //         }}
    //       >
    //         체험의 갯수가 부족합니다.
    //       </p> */}
    //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
    //       <Slide experiences={experiences} size={1} initialSlide={1} />
    //       </div>
    //     </div>
    //   );
    // } else {
      return (
        <div>
          <div style={{ display: "flex", alignItems: "center", height: "75vh" }}>
          <Slide experiences={experiences} size={experiences.length} />
          </div>
        </div>
      );
    // }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Accept: "*/*",
          },
        });
        const filteredExperiences = response.data.result.content.filter(
          (item) => item.isEnabled === true
        );
        setExperiences(filteredExperiences);
        // const middleIndex = Math.ceil(contentArray.length / 2);
        // const newArray1 = contentArray.slice(0, middleIndex);
        // const newArray2 = contentArray.slice(middleIndex);
        // setContentArray1(newArray1);
        // setContentArray2(newArray2);
      } catch (error) {
        console.error("에러:", error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Nav bgcolor={"white"} fontcolor={"#315C40"} />
      {/* api 호출 후 메뉴 호출하는 함수 구현 */}
      {handleList()}
    </div>
  );
};
export default Select;
