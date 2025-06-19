const KEYWORDS = ["혈압", "관절", "갱년기", "당뇨", "건강식", "퇴직", "은퇴", "중년 재테크", "귀촌", "여행", "트로트", "황혼", "고혈압", "고지혈증", "치매", "명상"];
const API_KEY = "구글클라우드 APIKEY를 넣으세요";
const SHEET_NAME = "Youtube_중년추천목록";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index").setTitle("중년 유튜브 추천");
}

function fetchAndStoreVideos() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sheet.clearContents();
  sheet.appendRow(["제목", "영상URL", "썸네일", "업로드일", "조회수", "키워드"]);

  const publishedAfter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  KEYWORDS.forEach(keyword => {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=10&order=viewCount&publishedAfter=${publishedAfter}&q=${encodeURIComponent(keyword)}&regionCode=KR`;
    const searchRes = UrlFetchApp.fetch(searchUrl);
    const searchItems = JSON.parse(searchRes).items || [];

    const videoIds = searchItems.map(item => item.id.videoId).join(",");
    if (!videoIds) return;

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics`;
    const detailRes = UrlFetchApp.fetch(detailsUrl);
    const detailItems = JSON.parse(detailRes).items || [];

    detailItems.forEach(video => {
      const views = parseInt(video.statistics.viewCount);
      if (views >= 100000) {
        sheet.appendRow([
          video.snippet.title,
          `https://www.youtube.com/watch?v=${video.id}`,
          video.snippet.thumbnails.medium.url,
          video.snippet.publishedAt,
          views,
          keyword
        ]);
      }
    });
  });

  return "업데이트 완료!";
}

function getVideoList() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  return rows.slice(1); // 헤더 제외
}
