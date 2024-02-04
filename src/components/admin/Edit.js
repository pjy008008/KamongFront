import { useEffect, useState } from "react";
import Nav from "../Nav";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Toggle from "../Toggle";

const ExpContainer = styled.div`
  width: 80vw;
  height: 40vh;
  margin-top: 2vh;
  margin-left: 10vw;
  border-radius: 20px;
  background-color: #315c40;
  padding-top: 3vh;
  padding-bottom: 3vh;
  overflow: scroll;
  overflow-x: hidden;
`;

const Exp = styled.div`
  width: 70vw;
  height: 7vh;
  margin-left: 5vw;

  margin-top: 1vh;
  background-color: #e4e4e4;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const ExpTitle = styled.h2`
  color: #303030;
  margin: 0px;
  font-size: 18px;
  font-weight: bold;
  padding-left: 2vw;

  @media screen and (max-width:1199px) {
    font-size: 2vw;
  }

  @media screen and (max-width:899px) {
    font-size: 2.2vw;
  }  

  
`;

const EditBtn = styled.button`
  background-color: #2D2D2D;
  font-weight: bold;
  font-size: 16px;
  border: none;
  color: white;
  width: 5vw;
  height: 5vh;
  border-radius: 20px;
  margin-right: 10px;

  @media screen and (max-width:1199px) {
    width: 6vw;
    font-size: 1.5vw;
  }

  @media screen and (max-width:899px) {
    width: 8vw;
    font-size: 1.7vw;
  }  
`;

const DelBtn = styled.button`
  background-color: #2D2D2D;
  font-weight: bold;
  font-size: 16px;
  border: none;
  color: white;
  width: 5vw;
  height: 5vh;
  border-radius: 20px;
  margin-right: 2vw;

  @media screen and (max-width:1199px) {
    width: 6vw;
    font-size: 1.5vw;
  }

  @media screen and (max-width:899px) {
    width: 8vw;
    font-size: 1.7vw;
  }  
`;

const AddExpContainer = styled.form`
  margin-top: 3vh;
  width: 80vw;
  height: 30vh;
  margin-left: 10vw;
  border-radius: 20px;
  background-color: #d8d8d8;
`;

const AddExpTitle = styled.input`
  width: 52vw;
  height: 4vh;
  border: none;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2vh;

  @media screen and (max-width:1199px) {
    width: 51vw
  }

`;

const AddExpImage = styled.div`
  width: 53vw;
  height: 4vh;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  
  @media screen and (max-width:1199px) {
    width: 51vw
  }

`;
const AddBtn = styled.button`
  width: 10vw;
  background-color: #315c40;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.5vw;
  font-weight: bold;
  margin-right: 5vw;

  @media screen and (max-width:1199px) {
    width: 11vw;
    font-size: 2vw;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChangeExpTitle = styled.input`
  width: 20vw;
  height: 4vh;
  border: none;
  border-bottom: 2px solid #4b3327;
  padding-left: 10px;
  font-size: 1.7vw;
  font-weight: bold;
`;

const ChangeImage = styled.div`
  width: 170px;
  height: 30px;
  color: #4b3327;
  font-weight: bold;
  font-size: 22px;
  background-color: white;
  border: 1px solid #4b3327;
  border-radius: 5px;
  padding: 0.5vw 0.5vw;
  margin-bottom: 1vw;
  margin-right: 10px;
  align-items: center;
  cursor: pointer;
`;

const ChangeImageButton = styled.button`
  width: 170px;
  height: 49px;
  background-color: #315c40;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
`;

const ResponsiveFont = styled.span`
  color: #4B3327;
  font-weight: bold;
  padding-left: 3.5vw;
  padding-right: 1vw;
  font-size: 1.5vw;

  @media (max-width: 1050px) {
    font-size: 2vw;
  }
`;



const Edit = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [exp, setExp] = useState([]);
  const [title, setTitle] = useState("");
  const [expEditId, setExpEditId] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEditFile, setSelectedEditFile] = useState(null);
  const customStyles = {
    content: {
      width: "50%", // 원하는 크기로 조정
      height: "55%", // 원하는 크기로 조정
      margin: "auto",
      overflowY: "scroll",
      overflowX: "hidden",
    },
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedEditFile(file);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle((prev) => value);
    } else if (name === "editTitle") {
      setEditTitle((prev) => value);
    }
  };
  const handleDel = async (expId) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `http://35.216.68.47:8080/api/experiences/${expId}`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );
        console.log("Deletion successful:", response.data);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
      window.location.reload();
    } else {
    }
  };
  const handleEdit = (expId) => {
    setModalIsOpen(true);
    setExpEditId(expId);
    const foundExperience = exp.find((item) => item.experienceId === expId);
    // setTitle((prev) => foundExperience.title);
    if (foundExperience) {
      setEditTitle(foundExperience.title);
      setEditImage(foundExperience.imageUrl);
    } else {
      console.error(`Experience with ID ${expId} not found.`);
    }
  };
  const handleEditSubmit = (event) => {
    event.preventDefault();
    const apiUrl = `http://35.216.68.47:8080/api/experiences/${expEditId}`;

    const formData = new FormData();
    formData.append("request", JSON.stringify({ title: editTitle }));

    // Assume you have a file input in your HTML with id="imageInput"
    const imageInput = document.getElementById("imageInput");
    formData.append("image", selectedEditFile);

    // Make a PATCH request using axios
    axios
      .patch(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
      })
      .then((response) => {
        alert("변경완료");
        window.location.reload();
        console.log("Update successful:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // Create a FormData objecta
    const formData = new FormData();

    // Append title to formData
    formData.append("request", JSON.stringify({ title }));

    // Check if an image is selected
    if (selectedFile) {
      // Append the selected file to formData with the key 'image'
      formData.append("image", selectedFile, setSelectedFile.name);
    }

    try {
      // Make a POST request to submit the data
      const response = await axios.post(
        "http://35.216.68.47:8080/api/experiences",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success, e.g., show a success message
      console.log("Submission successful:", response.data);
      // Optionally, update the 'exp' state with the new data
      // setExp((prevExp) => [...prevExp, response.data]);
      // Reset the form values
      setTitle("");
      setSelectedFile(null);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting data:", error);
    }
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get("http://35.216.68.47:8080/api/experiences")
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        setExp(response.data.result.content);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  }, []);

  return (
    <div>
      <Nav fontcolor={"#315C40"} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <form onSubmit={handleEditSubmit}>
          <TitleContainer>
            <span
              style={{
                color: "#4B3327",
                fontWeight: "bold",
                paddingRight: "1vw",
                fontSize: "25px",
              }}
            >
              제목
            </span>
            <div></div>
            <ChangeExpTitle
              name="editTitle"
              onChange={onChange}
              value={editTitle}
            />
          </TitleContainer>
          <br />
          {editImage && !selectedEditFile && (
            <div>
              <span
                style={{
                  color: "#4B3327",
                  fontWeight: "bold",
                  paddingRight: "1vw",
                  marginTop: "10vw",
                  fontSize: "25px",
                }}
              >
                현재 이미지
              </span>
              <br />
              <img
                style={{
                  paddingTop: "5px",
                  paddingBottom: "10px",
                  width: "50vw",
                  height: "40vh",
                }}
                src={editImage}
              />
            </div>
          )}
          {selectedEditFile && (
            <div>
              <span
                style={{
                  color: "#4B3327",
                  fontWeight: "bold",
                  paddingRight: "1vw",
                  fontSize: "25px",
                }}
              >
                변경할 이미지
              </span>
              <br />
              <img
                style={{
                  paddingTop: "5px",
                  paddingBottom: "10px",
                  width: "50vw",
                  height: "40vh",
                }}
                src={URL.createObjectURL(selectedEditFile)}
                alt="Selected Image"
              />
            </div>
          )}
          <div style={{ display: "flex" }}>
            <label htmlFor="edit">
              <ChangeImage>이미지 변경하기</ChangeImage>
              <input
                style={{ display: "none" }}
                id="edit"
                name="file"
                type="file"
                onChange={handleEditFileChange}
              />
            </label>
            <div>
              <ChangeImageButton type="submit">변경 완료</ChangeImageButton>
            </div>
          </div>
        </form>
        <button
          style={{
            width: "5vw",
            height: "4vh",
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            fontWeight: "bold",
            borderRadius: "10px",
            fontSize: "18px",
          }}
          onClick={() => setModalIsOpen(false)}
        >
          닫기
        </button>
      </Modal>
      <ExpContainer>
        {exp.map((item, index) => (
          <Exp key={index}>
            <ExpTitle
              onClick={() => {
                navigate(`/exp/${item.experienceId}`);
              }}
            >
              {item.title}
            </ExpTitle>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Toggle
                expId={item.experienceId}
                status={item.isEnabled}
              ></Toggle>
              <EditBtn onClick={() => handleEdit(item.experienceId)}>
                편집
              </EditBtn>
              <DelBtn onClick={() => handleDel(item.experienceId)}>삭제</DelBtn>
            </div>
          </Exp>
        ))}
      </ExpContainer>
      <AddExpContainer onSubmit={onSubmit}>
        <h1
          style={{
            fontSize: "2vw",
            color: "#315C40",
            paddingLeft: "3vw",
            paddingTop: "3vh",
            fontWeight: "bold",
          }}
        >
          체험 추가
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4vh",
          }}
        >
          <div>
            <div>
            <ResponsiveFont>체험명</ResponsiveFont>
              <AddExpTitle
                onChange={onChange}
                name="title"
                placeholder="체험명을 입력하세요"
                value={title}
              ></AddExpTitle>
            </div>
            <div style={{ display: "flex" }}>
            <ResponsiveFont>이미지</ResponsiveFont>
              <label htmlFor="file">
                {selectedFile ? (
                  <AddExpImage>Selected file: {selectedFile.name}</AddExpImage>
                ) : (
                  <AddExpImage>이미지 불러오기</AddExpImage>
                )}
              </label>
              <input
                style={{ display: "none" }}
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <AddBtn>체험 추가</AddBtn>
        </div>
      </AddExpContainer>
    </div>
  );
};
export default Edit;
