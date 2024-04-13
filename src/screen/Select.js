import Nav from "../components/Nav";
import Slide from "../components/select/Slide";
import { useState, useEffect } from "react";
import axios from "axios";

const API_ENDPOINT = "https://camong.p-e.kr/api/experiences";

const Select = () => {
  const [experiences, setExperiences] = useState([]);
  const handleList = () => {
    return (
      <div>
        <Slide experiences={experiences} size={experiences.length} />
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
