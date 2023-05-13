import all_mighty_editor from "./module/all_mighty_editor.js";
import renderButtonContainer from "./paging_render_button_v3.js";

const { multiAndSingleTagMaker } = all_mighty_editor;

const page = {
  total: 1151, //전체 게시글 갯수
  pageContentCount: 4, //한페이지에 보여질 게시글 갯수
  currPage: 1, //현재페이지
  pageNumCount: 5, //중간 페이징 버튼 갯수
  img: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
};

const root = document.getElementById("root");

//root 자식
const boardList = multiAndSingleTagMaker(root, "div", "board-list");
const paginationCtn = multiAndSingleTagMaker(root, "div", "pagination-ctn");

renderButtonContainer(paginationCtn, boardList, page);
