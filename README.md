# 🦖 Dino Run

디노런은 인터넷 연결이 안 됐을 때 크롬에서 할 수 있는 구글 공룡 게임을 온라인화 해 친구들과 함께 즐길 수 있는 게임입니다.

키보드 조작도 가능하지만, 안면 인식으로 감정에 따라 공룡 캐릭터를 조작할 수도 있습니다.


## 📈Preview

https://user-images.githubusercontent.com/96522144/158065592-c8e80a69-4aaf-4ada-82d4-909f59805ad0.mov

### 📌배포 사이트 : http://dino-run.site/ (크롬 시크릿 모드에서 주소를 복사, 붙여넣기 해 실행해주세요.)

- Frontend: Netlify
- Backend: AWS EC2

## 🚀 ShortCut

- 💡 Motivation
- ✅ Features
- 🖥 Tech Stack
- 🕹 Getting Started
- 🤔 Why we used it
- 🔥 Challenge

## 💡 Motivation

쿠키런을 재밌게 했으며 이와 유사하지만 인터넷 연결이 안 될 때만 할 수 있는 구글 공룡 게임을 온라인으로 친구들과 함께 플레이하면 어떨까 하는 생각에 프로젝트를 기획했습니다.

유투브에서 눈썹으로 게임을 하는 것을 보고선 영감을 받아 모니터를 보며 키보드로 조작을 하는 게임은 많지만 내 얼굴을 보며 감정에 따라 캐릭터가 움직인다면 게임 몰입도를 향상시켜 재미를 더할 수 있지 않을까? 하는 생각에 안면인식 기능을 추가했습니다.

## ✅ Features

|                                          |                                          |
| ---------------------------------------- | ---------------------------------------- | 
|<div><p align="center"><img width="700" height="700" src="https://user-images.githubusercontent.com/96522144/221414117-a5b81e5c-b79b-4e15-98bf-5ef907b3b609.png"/></p><p align="center">👉 소셜 로그인(Kakao)로 로그인을 할 수 있습니다.</p></div>|<div><p align="center"><img width="700" height="700" src="https://user-images.githubusercontent.com/96522144/221416054-8a9c6ccc-308d-4318-9621-b38b72844d62.gif" /></p></div><div align="center">👉 플레어이어는 방을 만들고 입장하면 상대방 입장 여부가 나의 화면에 실시간으로 보여집니다.</div>
|<div><p align="center"><img width="700" height="700" src="https://user-images.githubusercontent.com/96522144/221416220-16fbf262-f23a-457b-8c00-afaa75232d76.gif" /></p><p align="center" fontsize="3">👉 Ready 상태가 나와 상대방 화면에 실시간으로 보여지며, 두 플레이어 모두 Ready이면 게임이 시작됩니다.</p></div>|<div><p align="center"><img width="700" height="700" src="https://user-images.githubusercontent.com/96522144/221416379-52e6289e-4d4c-4882-855b-6ccb878dbaec.gif" /></p><p align="center">👉 게임이 시작하면 카메라가 켜지며 안면 인식을 시작함과 동시에 웃는 얼굴(Happy)일 때 캐릭터가 점프를 합니다. 스페이스바로도 조작 할 수 있습니다.</p><p align="center">👉 실시간으로 상대방의 점수가 화면에 나타나며 그에 따른 승 패 여부도 실시간으로 확인 할 수 있습니다.</p><p align="center">👉 장애물에 부딪히면 게임이 종료되며 방을 나갈 수 있습니다.</p></div>|<div><p align="center"><img width="700" height="700" src="https://user-images.githubusercontent.com/96522144/221416455-6cdc3482-cf2a-418c-9e3a-1284fb358741.gif" /></p><p align="center" fontsize="3">👉 게임이 종료된 후, 나가기 버튼을 누르면 로비로 나가집니다.</p><p align="center" fontsize="3">👉 로그아웃 버튼을 누르면 계정은 로그아웃이 되며 로그인 화면으로 넘어갑니다.</p></div>


## 🖥 Tech Stack

### Frontend

- Javascript
- React
- Redux
- Redux-saga
- Redux-toolkit
- Redux-presist
- socket.io-client
- face-api
- Kakao OAuth
- styled-component

### Backend

- node.js
- mongoDB
- mongoose
- Express
- socket.io

### Convention
- prettier

## 🕹 Getting Started

### Installation

- Local 환경에서 실행하기 위해서 몇 가지 사전 준비가 필요합니다.
- 각 Repository를 Clone 한 후, .env 파일에 환경 변수를 입력해주세요.

- Frontend
```
git clone https://github.com/woongminKi/Client_New_Dino_Run.git
npm install
npm run start
```

```
REACT_APP_CLIENT_API_ID=YOUR KAKAO CLIENT ID
REACT_APP_CLIENT_URL=http://localhost:3000
REACT_APP_SERVER_URL=http://dino-run.site:8000
REACT_APP_DINO_URL=http://dino-run.site
```

- Backend
```
git clone https://github.com/woongminKi/Back_New_Dino_Run.git
npm install
npm run dev
```

```
PORT=8000
SECRET_KEY=YOUR SECRET KEY
NEW_MONGO_URL=YOUR MONGO DB URL
CLIENT_URL=http://dino-run.site
```

## 🔥 Challenge

### - 실시간 통신 Socket IO

1p, 2p의 상태를 각 플레이어에게 실시간으로 전달해야했기에 프로젝트의 기획 목표대로 온라인화를 시키기 위해 실시간 통신을 하는 Socket IO를 사용했습니다. 그리고 비동기 처리를 제어하기 위해 Redux-saga로 Redux state를 관리하고 있기 때문에 Event Channel을 사용해 관리했습니다.

방에 유저가 입장, 레디, 게임 시작과 같은 서로의 인터렉션이 있는 상황을 통신 시켜주며 상태 값을 관리해줘야했기 때문에 어떻게 관리해야 하는지에 대한 고민이 많았습니다. 실제로 개발을 하면서 socket을 통해 넘어오는 값들을 어떻게 처리해줘야하는지에 대한 고민으로 꽤 헤매었지만 이벤트들을 Event Channel로 관리할 수 있다는 것을 알고난 후로는 작업을 원활하게 할 수 있었습니다.

러닝 커브가 높은 Saga와 socket을 함께 처리한 작업한 경험을 토대로 새로운 도전을 해낼 수 있다는 용기를 얻은 경험이었습니다.

### - 안면 인식, 감정 분석 face-api

게임을 키보드로 하는 것은 많지만 안면 인식을 해 "감정을 분석해 게임 조작을 하면 어떨까?" 하는 생각이 들었습니다. 그러던 도중 유투브에서 눈썹으로 위치를 이동하며 점수를 올리는 게임을 보게 되면서 그것에 영감을 받아 디노런에 접목 시키면 게임의 재미를 향상시킬 수 있겠다고 생각했습니다.

안면 인식을 통해 유저의 감정을 인식해 점수로 환산하는 값을 Redux state로 관리를 해주며 일정 점수 이상이 되었을 때 점프가 되는 식으로 구현했습니다.

face-api는 라이브러리이기 때문에 구현하는데 큰 어려움은 없었지만 감정 점수를 통해 점프 이벤트를 발생시키는 부분이 챌린지였습니다. 키보드, 마우스 외에 이벤트를 발생시켜 액션을 주는 것은 예제로도 접해보지 못했기 때문입니다. 결국 new Event 함수를 사용해 여러 감정 중 웃었을 때 나오는 Happy 점수를 통해 jump 이벤트를 발생시켜 캐릭터를 점프 시킬 수 있게 구현했습니다.

"감정 분석을 통한 이벤트 발생"이라는 낯선 기능도 검색하고 시도해보면 다 할 수 있다 라는 자신감과 성취감을 얻을 수 있었던 순간이었습니다.

링크 : https://github.com/justadudewhohacks/face-api.js/

## 🎉프로젝트를 마치며

1년 전, 개발자로 커리어 전환을 하기 위해 부트 캠프로 공부를 했습니다. 이후 PM 직무 제안을 받아 커리어 전환을 한 뒤, 8개월간 일을 하면서 직접 만들고 싶다는 생각이 계속 들었습니다. 
 
많은 개발자분들과 협업을 하면서 부트 캠프 다닐 땐 몰랐던 프로덕트 최전선에서 유저의 문제를 직접적으로 해결하는 프론트엔드의 매력을 느끼게 되었습니다.

많은 길을 돌아온 만큼 빠르게 성장하고 현업에서 가치 있는 개발자가 되고 싶습니다.
