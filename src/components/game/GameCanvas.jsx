import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as faceApi from "face-api.js";
import { getCookie } from "../../utils/cookies";

import { socketAction } from "../../modules/useSocket";
import {
  getFaceEmotion,
  getMyScore,
  gameFinished,
} from "../features/game/gameSlice";
import { clearRoom } from "../features/room/roomSlice";

import Cactus from "./character/Cactus";
import Ground from "./background/Ground";
import Dino from "./character/Dino";
import DinoPlayer from "./character/DinoPlayer";
import {
  dinoCharacterImage,
  cactusCharacterImage,
  groundImage,
} from "./gameImages/CharacterImage";

export default function GameCanvas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { faceEmotionHappyScore } = useSelector((state) => state.game);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const detectRef = useRef(null);
  const gameResource = useRef(null);

  const [score, setScore] = useState(0);
  const [isCollision, setIsCollision] = useState(false);

  const videoHeight = 50;
  const videoWidth = 50;

  const dinoImage = new Image();
  dinoImage.src = dinoCharacterImage;

  const cactusImage = new Image();
  cactusImage.src = cactusCharacterImage;

  const backGroundImage = new Image();
  backGroundImage.src = groundImage;

  if (!getCookie("accessToken")) {
    navigate("/");
  }

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
        width: videoWidth,
        height: videoHeight,
      });
      const video = videoRef.current;

      video.srcObject = stream;
      video.play();
    } catch (err) {
      console.error(err);
    }
  };

  const handleVideoOnPlay = async () => {
    canvasRef.current.innerHTML = faceApi.createCanvasFromMedia(
      videoRef.current
    );
    const displaySize = {
      width: 200,
      height: 200,
    };
    faceApi.matchDimensions(detectRef.current, displaySize);

    const detections = await faceApi
      .detectAllFaces(videoRef.current, new faceApi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetection = faceApi.resizeResults(detections, displaySize);
    detectRef.current.getContext("2d").clearRect(0, 0, 200, 200);
    faceApi.draw.drawDetections(detectRef.current, resizedDetection);
    faceApi.draw.drawFaceLandmarks(detectRef.current, resizedDetection);
    faceApi.draw.drawFaceExpressions(detectRef.current, resizedDetection);

    dispatch(getFaceEmotion(detections));
  };

  const handleGoToMain = () => {
    dispatch(clearRoom());
    navigate("/main");
  };

  useEffect(() => {
    const openCamera = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = window.innerWidth - 200;
      canvas.height = window.innerHeight - 300;

      const obstacleArray = [];
      let animationFrameId = null;
      let timer = 0;
      let gameSpeed = 3;

      const collisionCheck = (currentScore, differenceX, differenceY) => {
        if (differenceX < 0 && differenceY < 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          cancelAnimationFrame(animationFrameId);
          setIsCollision(true);
        }

        setScore(currentScore);
      };

      const dino = new Dino(context, dinoImage);
      const cactus = new Cactus(context, cactusImage);
      const ground = new Ground(context, backGroundImage, canvas.width);

      gameResource.current = new DinoPlayer(
        context,
        10,
        200,
        50,
        50,
        dino,
        cactus,
        canvas.width,
        canvas.height
      );
      const dinoPlayer = gameResource.current;
      const drawGame = async () => {
        animationFrameId = requestAnimationFrame(drawGame);
        context.clearRect(0, 0, canvas.width, canvas.height);

        timer++;

        if (timer % 144 === 0) {
          const cactusElement = new Cactus(context, cactusImage);
          obstacleArray.push(cactusElement);
        }

        obstacleArray.forEach((obstacleItem, index, array) => {
          if (obstacleItem.x < 0) {
            array.splice(index, 1);
          }

          if (timer % 500 === 0) {
            gameSpeed += 1;
          }

          obstacleItem.x -= gameSpeed;

          obstacleItem.draw();

          const { differenceX, differenceY } =
            dino.collisionCheck(obstacleItem);
          collisionCheck(timer, differenceX, differenceY);
        });
        collisionCheck(timer);
        dino.draw();
        ground.draw();

        handleVideoOnPlay();
      };
      drawGame();
      await startVideo();
      dinoPlayer.start();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    };

    openCamera();
  }, [canvasRef]);

  useEffect(() => {
    if (faceEmotionHappyScore >= 0.999999) {
      // 딱 처음 또는 마지막 스코어만 캐치하는게 관건
      const event = new Event("jump");
      document.dispatchEvent(event);
    }
  }, [faceEmotionHappyScore]);

  useEffect(() => {
    dispatch(gameFinished());
  }, [isCollision]);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceApi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceApi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceApi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceApi.nets.faceExpressionNet.loadFromUri("/models");
      } catch (err) {
        console.error(err);
      }
    };
    loadModels();
  }, [videoRef]);

  useEffect(() => {
    dispatch(getMyScore(score));
    socketAction.gameScore(score);
  }, [score]);

  return (
    <>
      <FaceDetectorWrapper>
        <VideoWrapper>
          <video ref={videoRef} autoPlay muted onPlay={handleVideoOnPlay} />
        </VideoWrapper>
        <DetectWrapper>
          <canvas ref={detectRef} />
        </DetectWrapper>
      </FaceDetectorWrapper>
      <Div>
        {isCollision && (
          <button className="action-button" onClick={handleGoToMain}>
            나가기
          </button>
        )}
        <canvas className="canvas" ref={canvasRef} />
      </Div>
    </>
  );
}

const FaceDetectorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  width: 250px;
  height: 250px;
  video {
    width: 100%;
    height: 100%;
  }
`;

const DetectWrapper = styled.div`
  position: absolute;
  canvas {
    width: 250px;
    height: 250px;
  }
`;

const Div = styled.div`
  canvas {
    width: 100%;
    height: 500px;
  }

  .action-button {
    cursor: pointer;
    margin-top: 5px;
    padding: 12px 15px 12px 15px;
    border-radius: 10px;
    transition: 0.3s;
    font-size: 8px;
    font-weight: 10;
  }

  .action-button:hover {
    padding: 15px 19px 15px 19px;
    transition: all 0.2s linear 0s;
  }
`;
