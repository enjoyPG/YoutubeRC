# YoutubeRC
# 📺 중년 유튜브 추천 영상 수집 웹앱

> 40~50대 남녀가 관심 가질만한 키워드를 기반으로  
> 최근 7일 이내 조회수 10만 이상 유튜브 영상을 수집하여  
> Google Sheets에 저장하고 웹에서 미리보기를 제공하는 Google Apps Script 기반 웹앱입니다.

---

## ✨ 기능 개요

| 기능 | 설명 |
|------|------|
| 🔍 영상 수집 | 키워드 기반 인기 유튜브 영상 검색 (조회수 10만 이상, 7일 이내) |
| 📄 Google Sheet 저장 | 영상 제목, URL, 썸네일, 조회수, 키워드를 스프레드시트에 저장 |
| 🖼 웹 인터페이스 | HTML로 영상 썸네일 + 정보 리스트 출력 |
| 🔁 자동화 (선택) | 시간 기반 트리거로 매일 수집 가능 |

---

## 🛠️ 사용 기술

- Google Apps Script (백엔드)
- HTML / JavaScript (프론트엔드)
- Google Sheets API
- YouTube Data API v3

---

## 📦 프로젝트 구조
📁 MyProject/
│
├── Code.gs # GAS 백엔드 코드
├── index.html # 사용자 인터페이스
└── README.md # 설명 문서
