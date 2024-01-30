import Nav from "../Nav";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import eraser from "../../img/eraser.png";

const InputContainer = styled.form`
  margin-top: 3vh;
  margin-left: 5vw;
`;
const DelBtn = styled.button`
  background-color: #e4e4e4;
  width: 8vw;
  margin-right: 1vw;
  height: 4vh;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  color: #4b3327;
`;
const StoreBtn = styled.button`
  background-color: #315c40;
  margin-right: 5vw;
  width: 8vw;
  color: white;
  height: 4vh;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  border: none;
`;
const Title = styled.h2`
  color: #303030;
  font-size: 20px;
  margin-right: 1vw;
`;
const TitleContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
`;
const ContextContainer = styled.div`
  margin-top: 1vh;
  width: 90vw;
  display: flex;
  align-items: top;
`;
const TimeContainer = styled.div`
  margin-top: 1vh;
  width: 90vw;
  display: flex;
  align-items: center;
`;
const TimeTitle = styled.div`
  font-size: 17px;
  padding-left: 5px;
`;
const VoiceContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
`;
const SampleContainer = styled.div``;
const SampleVoiceContainer = styled.audio``;
const SampleVoice = styled.source``;
const SampleImageContainer = styled.img`
  //이미지 크기
  width: 50vw;
  height: 30vh;
`;
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
const EraserImage = styled.img`
  position: relative;
  width: 7vw;
  right: 30vw;
  top: 24vh;
`;

const Script = () => {
  const [selectedVoiceFile, setSelectedVoiceFile] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState("");
  const [title, setTitle] = useState("");
  const [line, setLine] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [duration, setDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [voiceUrl, setVoiceUrl] = useState("");
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [iframeKey, setIframeKey] = useState(0);
  const [expVideoUrl, setExpVideoUrl] = useState("");
  //script Id출력
  const params = useParams();
  // console.log(params);
  const navigate = useNavigate();
  const location = useLocation();
  let expId = location.state.expId;

  const handleDel = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://35.216.68.47:8080/api/experiences/pages/${params.scriptId}`,
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
    navigate(`/exp/${expId}`);
  };

  const convertToEmbedUrl = () => {
    const embedUrl = videoUrl.replace("watch?v=", "embed/");
    setVideoUrl(embedUrl);
    setExpVideoUrl(embedUrl);
  };

  const handleVoiceFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedVoiceFile(file);
    }
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageFile(file);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle((prev) => value);
    } else if (name === "line") {
      setLine((prev) => value);
    } else if (name === "minute") {
      setMinute((prev) => value);
    } else if (name === "second") {
      setSecond((prev) => value);
    } else if (name === "videoUrl") {
      setVideoUrl((prev) => value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const totalDuration = 60 * parseInt(minute, 10) + parseInt(second, 10);
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        title: title,
        line: line,
        duration: totalDuration,
      })
    );
    formData.append("image", selectedImageFile); // 이미지는 비어있는 문자열로 추가
    formData.append("voice", selectedVoiceFile); // 음성도 비어있는 문자열로 추가

    // PATCH 요청 보내기
    axios
      .patch(
        `http://35.216.68.47:8080/api/experiences/pages/${params.scriptId}`,
        formData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        // 성공 핸들링
        alert("저장되었습니다");
        navigate(`/exp/${expId}`);
        // console.log(response.data);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.error(error);
      });
  };

  const onLinkSubmit = (event) => {
    event.preventDefault();
    if (videoUrl !== expVideoUrl) {
      alert("비디오 체크 버튼을 눌러주세요");
      return;
    }
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        title: title,
        videoUrl: videoUrl,
      })
    );
    formData.append("image", selectedImageFile); // 이미지는 비어있는 문자열로 추가
    formData.append("voice", selectedVoiceFile); // 음성도 비어있는 문자열로 추가

    // PATCH 요청 보내기
    axios
      .patch(
        `http://35.216.68.47:8080/api/experiences/pages/${params.scriptId}`,
        formData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        // 성공 핸들링
        alert("저장되었습니다");
        navigate(`/exp/${expId}`);
        // console.log(response.data);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://35.216.68.47:8080/api/experiences/pages/${params.scriptId}`)
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        setTitle(response.data.result.title);
        setLine(response.data.result.line);
        setIsImage(response.data.result.isImage);
        setExpVideoUrl(response.data.result.videoUrl);
        setVideoUrl(response.data.result.videoUrl);
        setDuration(response.data.result.duration);
        setImageUrl(response.data.result.imageUrl);
        setVoiceUrl(response.data.result.voiceUrl);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  }, []);

  useEffect(() => {
    // duration 값이 변경될 때마다 minute 및 second를 업데이트
    setSecond(duration % 60);
    setMinute(Math.floor(duration / 60));
  }, [duration]);
  return (
    <div>
      <Nav bgcolor={"white"} fontcolor={"#315C40"} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "8vw",
            height: "4vh",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            marginLeft: "5vw",
          }}
        >
          뒤로가기
        </button>
        <div>
          <DelBtn onClick={handleDel}>삭제</DelBtn>
          <StoreBtn type="submit" form="form">
            저장
          </StoreBtn>
        </div>
      </div>
      {isImage ? (
        <div>
          <InputContainer onSubmit={onSubmit} id="form">
            <TitleContainer>
              <Title>제목</Title>
              <input
                style={{
                  backgroundColor: "#DDDDDD",
                  border: "none",
                  width: "80vw",
                  height: "5vh",
                  paddingLeft: "20px",
                  marginLeft: "1.8vw",
                  fontSize: "17px",
                }}
                onChange={onChange}
                value={title}
                name="title"
                type="text"
                placeholder="제목을 입력하세요"
              />
            </TitleContainer>
            <ContextContainer>
              <Title>대사</Title>
              <input
                style={{
                  backgroundColor: "#DDDDDD",
                  border: "none",
                  width: "80vw",
                  height: "23vh",
                  paddingLeft: "20px",
                  marginLeft: "1.8vw",
                  fontSize: "17px",
                }}
                onChange={onChange}
                name="line"
                value={line}
                type="text"
                placeholder="대사를 입력하세요"
              />
            </ContextContainer>
            <TimeContainer>
              <Title>시간</Title>
              <input
                style={{
                  backgroundColor: "#DDDDDD",
                  border: "none",
                  width: "3vw",
                  height: "5vh",
                  paddingLeft: "20px",
                  marginLeft: "1.8vw",
                  fontSize: "17px",
                }}
                onChange={onChange}
                value={minute}
                name="minute"
                type="number"
                placeholder="분"
              />
              <TimeTitle>분</TimeTitle>
              <input
                style={{
                  backgroundColor: "#DDDDDD",
                  marginLeft: "1vw",
                  border: "none",
                  width: "3vw",
                  height: "5vh",
                  paddingLeft: "20px",
                  fontSize: "17px",
                }}
                max="60"
                onChange={onChange}
                value={second}
                name="second"
                type="number"
                placeholder="초"
              />
              <TimeTitle>초</TimeTitle>
            </TimeContainer>
            <VoiceContainer>
              <Title>음성</Title>
              <label htmlFor="voiceFile">
                {selectedVoiceFile ? (
                  <div
                    style={{
                      border: "1px solid black",
                      width: "250px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    Selected file: {selectedVoiceFile.name}
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px solid black",
                      width: "250px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      marginLeft: "1.8vw",
                      marginRight: "1vw",
                    }}
                  >
                    파일에서 불러오기(mp3)
                  </div>
                )}
              </label>
              <input
                id="voiceFile"
                name="voiceFile"
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                onChange={handleVoiceFileChange}
              />
              {voiceUrl ? (
                <SampleVoiceContainer controls>
                  <SampleVoice src={voiceUrl} type="audio/mpeg" />
                </SampleVoiceContainer>
              ) : (
                <p>Loading audio</p>
              )}
            </VoiceContainer>
            <VoiceContainer>
              <Title>이미지</Title>
              <label htmlFor="imageFile">
                {selectedImageFile ? (
                  <div
                    style={{
                      border: "1px solid black",
                      width: "250px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    Selected file: {selectedImageFile.name}
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px solid black",
                      width: "250px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    파일에서 불러오기
                  </div>
                )}
              </label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageFileChange}
              />
            </VoiceContainer>
          </InputContainer>
          <SampleContainer>
            {imageUrl ? (
              <Blackboard>
                <SampleImageContainer src={imageUrl} />
                <EraserImage src={eraser} />
              </Blackboard>
            ) : (
              <p>Loading image</p>
            )}
          </SampleContainer>
        </div>
      ) : (
        <div>
          <InputContainer onSubmit={onLinkSubmit} id="form">
            <TitleContainer>
              <Title>제목</Title>
              <input
                style={{
                  backgroundColor: "#DDDDDD",
                  border: "none",
                  width: "80vw",
                  height: "5vh",
                  paddingLeft: "20px",
                  fontSize: "17px",
                  marginLeft: "1.8vw",
                }}
                onChange={onChange}
                value={title}
                name="title"
                type="text"
                placeholder="제목을 입력하세요"
              />
            </TitleContainer>
            <TitleContainer>
              <Title>링크</Title>
              <input
                style={{
                  backgroundColor: "#DDDDDD",
                  border: "none",
                  width: "80vw",
                  height: "5vh",
                  paddingLeft: "20px",
                  fontSize: "17px",
                  marginLeft: "1.8vw",
                }}
                onChange={onChange}
                value={videoUrl}
                name="videoUrl"
                type="text"
                placeholder="유튜브 링크를 입력하세요"
              />
            </TitleContainer>
            <button
              style={{
                marginTop: "20px",
                width: "120px",
                height: "32px",
                fontWeight: "bold",
                fontSize: "16px",
                border: "none",
              }}
              onClick={(event) => {
                convertToEmbedUrl();
                setIframeKey((prev) => prev + 1); // key 값을 변경하여 iframe을 새로 고침
                event.preventDefault();
              }}
            >
              비디오 체크
            </button>
          </InputContainer>
          <iframe
            style={{ marginTop: "30px", marginLeft: "5vw" }}
            key={iframeKey} // key 값을 변경하여 iframe을 새로 고침
            width="560"
            height="315"
            src={expVideoUrl}
            frameBorder="0"
            allow="autoplay;"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
export default Script;
