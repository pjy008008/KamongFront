import Nav from "../Nav";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const InputContainer = styled.form`
  margin-top: 3vh;
  margin-left: 5vw;
`;
const DelBtn = styled.button`
  background-color: #e4e4e4;
  width: 10vw;
  margin-right: 1vw;
  height: 3vh;
  font-weight: bold;
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
  border: none;
  border-radius: 10px;
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
const MakeScript = () => {
  const [title, setTitle] = useState("");
  const [line, setLine] = useState("");
  const [selectedVoiceFile, setSelectedVoiceFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [duration, setDuration] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoToggle, setVideoToggle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [expVideoUrl, setExpVideoUrl] = useState("");
  //script Id출력
  const params = useParams();
  const location = useLocation();
  let expId = location.state.expId;
  // let stepId = location.state.stepId;
  // console.log(stepId);
  const navigate = useNavigate();

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
      setVideoToggle(false);
    }
  };

  const convertToEmbedUrl = () => {
    const match = videoUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );

    if (match) {
      const videoId = match[1]; // 동영상 ID 추출
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setVideoUrl(embedUrl);
      setExpVideoUrl(embedUrl);
    } else {
      // 유효한 동영상 ID가 없을 경우 처리
      console.error("유효한 동영상 ID가 없습니다.");
      // 또는 setVideoUrl(null) 또는 다른 적절한 처리를 수행할 수 있습니다.
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const totalDuration = 60 * parseInt(minute, 10) + parseInt(second, 10);
    if (
      !selectedImageFile ||
      !selectedVoiceFile ||
      !title ||
      !line ||
      !totalDuration
    ) {
      alert("모든 정보를 입력해 주세요");
      return; // Stop execution if validation fails
    }

    // const FormData = require(`form-data`);
    const requestData = {
      title: title,
      line: line,
      duration: totalDuration,
      isImage: true,
      // sequence: stepId + 1,
    };

    // FormData 인스턴스를 생성하고 요청 데이터를 추가합니다.
    const formData = new FormData();
    formData.append("request", JSON.stringify(requestData));
    formData.append("image", selectedImageFile, {
      filename: selectedImageFile.name,
      contentType: "image/jpeg",
    });
    formData.append("voice", selectedVoiceFile, {
      filename: selectedVoiceFile.name,
      contentType: "audio/mpeg",
    });

    // POST 요청을 보냅니다.
    axios
      .post(
        `http://35.216.68.47:8080/api/experiences/${expId}/pages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Content-Type 헤더 설정
            accept: "*/*",
          },
        }
      )
      .then((response) => {
        // 성공적인 응답 처리
        console.log("응답 데이터:", response.data);
        navigate(`/exp/${expId}`);
        alert("생성완료");
      })
      .catch((error) => {
        // 에러 처리
        console.error("에러:", error);
        alert("에러");
      });
  };
  const onLinkSubmit = (event) => {
    // FormData 인스턴스를 생성하고 요청 데이터를 추가합니다.
    event.preventDefault();
    if (!videoUrl || !title) {
      alert("모든 정보를 입력해 주세요");
      return; // Stop execution if validation fails
    }
    if (videoUrl !== expVideoUrl) {
      alert("비디오 체크 버튼을 눌러주세요");
      return;
    }
    const formData = new FormData();

    const url = `http://35.216.68.47:8080/api/experiences/${expId}/pages`;

    const form = new FormData();
    form.append(
      "request",
      JSON.stringify({
        title: title,
        isImage: false,
        videoUrl: expVideoUrl,
      })
    );

    form.append("image", ""); // 이미지는 빈 문자열 또는 원하는 이미지 데이터로 대체
    form.append("voice", ""); // 음성은 빈 문자열 또는 원하는 음성 파일 데이터로 대체

    axios
      .post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "*/*",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/exp/${expId}`);
        alert("생성완료");
      })
      .catch((error) => {
        console.error(error);
        alert("에러");
      });
  };

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
          onClick={() => navigate(`/exp/${expId}`)}
          style={{
            width: "8vw",
            height: "4vh",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            marginLeft: "5vw",
            borderRadius: "10px",
          }}
        >
          뒤로가기
        </button>
        <div>
          {/* <DelBtn onClick={handleDel}>삭제</DelBtn> */}
          <StoreBtn type="submit" form="form">
            생성
          </StoreBtn>
        </div>
      </div>
      <button
        style={{
          backgroundColor: "rgb(240, 240, 240)",
          border: "none",
          width: "130px",
          height: "30px",
          color: "black",
          fontWeight: "bold",
          fontSize: "15px",
          marginTop: "20px",
          marginLeft: "5vw",
        }}
        onClick={() => {
          setToggle((prev) => !prev);
          setTitle("");
          setLine("");
          setSelectedImageFile(null);
          setSelectedVoiceFile(null);
          setDuration(0);
          setMinute(0);
          setSecond(0);
        }}
      >
        {toggle ? "이미지 입력하기" : "링크 입력하기"}
      </button>
      {toggle ? (
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
                setVideoToggle(true);
                setIframeKey((prev) => prev + 1); // key 값을 변경하여 iframe을 새로 고침
                event.preventDefault();
              }}
            >
              비디오 체크
            </button>
          </InputContainer>
          {videoToggle ? (
            <iframe
              key={iframeKey} // key 값을 변경하여 iframe을 새로 고침
              style={{ marginTop: "30px", marginLeft: "5vw" }}
              width="560"
              height="315"
              src={expVideoUrl}
              frameBorder="0"
              allow="autoplay;"
              allowFullScreen
            ></iframe>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
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
          <ContextContainer>
            <Title>대사</Title>
            <input
              style={{
                backgroundColor: "#DDDDDD",
                border: "none",
                width: "80vw",
                height: "23vh",
                paddingLeft: "20px",
                fontSize: "17px",
                marginLeft: "1.8vw",
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
                width: "4vw",
                height: "5vh",
                paddingLeft: "20px",
                fontSize: "17px",
                marginLeft: "1.8vw",
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
                width: "4vw",
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
      )}
    </div>
  );
};
export default MakeScript;
