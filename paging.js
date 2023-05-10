import all_mighty_editor from "./module/all_mighty_editor.js";
import renderButtons from "./paging_render_button.js";
import renderContent from "./paging_render_content.js";

const { multiAndSingleTagMaker, kingGodFlexEditor, fontAndLayoutEditor } =
  all_mighty_editor;

const page = {
  total: 1151, //전체 게시글 갯수
  pageContentCount: 4, //한페이지에 보여질 게시글 갯수
  currPage: 1, //현재페이지
  pageNumCount: 5, //중간 페이징 버튼 갯수
  img: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
};

//전체 페이지 갯수(밑에 숫자 부분)
const totalPageCount = Math.ceil(page.total / page.pageContentCount);

//화면에 보여질 페이지 그룹 함수
function currPageGroup(currPage, pageNumCount = 5) {
  return Math.ceil(currPage / pageNumCount);
}

const root = document.getElementById("root");

//root 자식
const boardList = multiAndSingleTagMaker(root, "div", "board-list");
const paginationCtn = multiAndSingleTagMaker(root, "div", "pagination-ctn");

// //게시글 예제
// const makeContent = (i) => {
//   const content = document.createElement("div");
//   content.innerHTML = `
//       <span>${i}</span>
//       <span>게시물 제목</span>
//       <span>작성자</span>
//       <span>2022.01.01</span>
//     `;
//   return content;
// };

// //게시글을 포함시킨 renderContent
// const renderContent = (page, parent) => {
//   while (parent.hasChildNodes()) {
//     parent.removeChild(parent.lastChild);
//   }

//   for (
//     let i = total - (page - 1) * pageContentCount;
//     i >= 1 && i > total - page * pageContentCount;
//     i--
//   ) {
//     parent.appendChild(makeContent(i));
//   }
// };

// //맨앞 버튼
// const renderButtons = () => {
//   const buttonList = multiAndSingleTagMaker(
//     paginationCtn,
//     "ul",
//     "button-list",
//     1,
//     (element) => {
//       element.style.listStyleType = "none";
//       kingGodFlexEditor(element, "", "center", "space-evenly");
//     }
//   );

//   const startNumber = multiAndSingleTagMaker(buttonList, "li", "start-number");
//   startNumber.innerHTML = "<<맨앞";
//   startNumber.addEventListener("click", () => {
//     page.currPage = 1;
//     if (currPageGroup(page.currPage) === 1) {
//       startNumber.visibility = "hidden";
//     } else {
//       startNumber.style.visibility = "visible";
//       page.currPage = 1;
//     }
//     renderContent(boardList, page);
//     renderButtons();
//   });

//   //이전 버튼
//   const beforeNumber = multiAndSingleTagMaker(
//     buttonList,
//     "li",
//     "before-number"
//   );
//   beforeNumber.innerHTML = "<이전";
//   beforeNumber.addEventListener("click", () => {
//     page.currPage =
//       page.currPage - page.pageNumCount < 1
//         ? 1
//         : page.currPage - page.pageNumCount;
//     if (currPageGroup(page.currPage) === 1) {
//       beforeNumber.style.visibility = "hidden";
//     } else {
//       beforeNumber.style.visibility = "visible";
//       page.currPage =
//         currPageGroup(page.currPage) * page.pageNumCount -
//         (page.pageNumCount - 1);
//     }
//     renderContent(boardList, page);
//     renderButtons();
//   });

//   // 중간 페이지 버튼 처리
//   let startPage =
//     currPageGroup(page.currPage) * page.pageNumCount - (page.pageNumCount - 1);
//   let endPage = currPageGroup(page.currPage) * page.pageNumCount;

//   if (startPage < 1) {
//     startPage = 1;
//     endPage = currPageGroup(page.currPage) * page.pageNumCount - 1;
//   }
//   if (endPage > page.total) {
//     endPage = page.total;
//     startPage = endPage - page.pageNumCount + 1;
//     if (startPage < 1) {
//       startPage = 1;
//     }
//   }

//   //중간 페이지 버튼 반복문
//   for (let i = startPage; i <= endPage && i <= totalPageCount; i++) {
//     //페이지 숫자 버튼 CSS포함시킴
//     const pageButton = multiAndSingleTagMaker(
//       buttonList,
//       "li",
//       i,
//       1,
//       (element) => {
//         fontAndLayoutEditor(element, "8%", "");
//         kingGodFlexEditor(element, "", "center", "center");
//       }
//     );
//     pageButton.innerHTML = i;
//     if (i === page.currPage) {
//       pageButton.style.fontWeight = "bold";
//       pageButton.style.backgroundColor = "#9A6E44";
//       pageButton.style.color = "white";
//     } else {
//       pageButton.addEventListener("click", () => {
//         page.currPage = i;
//         renderContent(boardList, page);
//         renderButtons();
//       });
//       pageButton.style.fontWeight = "normal";
//       pageButton.style.backgroundColor = "";
//       pageButton.style.color = "black";
//     }
//     buttonList.appendChild(pageButton);
//   }

//   //다음 버튼
//   const nextNumber = multiAndSingleTagMaker(buttonList, "li", "next-number");
//   nextNumber.innerHTML = "다음>";
//   nextNumber.addEventListener("click", () => {
//     page.currPage =
//       page.currPage + page.pageNumCount > page.total
//         ? page.total
//         : page.currPage;
//     if (currPageGroup(page.currPage) === currPageGroup(totalPageCount)) {
//       nextNumber.style.visibility = "hidden";
//     } else {
//       nextNumber.style.visibility = "visible";
//       page.currPage = currPageGroup(page.currPage) * page.pageNumCount + 1;
//     }
//     renderContent(boardList, page);
//     renderButtons();
//   });

//   //맨뒤 버튼
//   const endNumber = multiAndSingleTagMaker(buttonList, "li", "end-number");
//   endNumber.innerHTML = "맨뒤>>";
//   endNumber.addEventListener("click", () => {
//     page.currPage = page.total;
//     if (currPageGroup(page.currPage) === currPageGroup(totalPageCount)) {
//       endNumber.style.visibility = "hidden";
//     } else {
//       endNumber.style.visibility = "visible";
//       page.currPage = totalPageCount;
//     }
//     renderContent(boardList, page);
//     renderButtons();
//   });

//   //기존 버튼 삭제 로직
//   while (paginationCtn.hasChildNodes()) {
//     paginationCtn.removeChild(paginationCtn.lastChild);
//   }
//   paginationCtn.appendChild(buttonList);
// };

renderContent(boardList, page);
renderButtons(paginationCtn, boardList, page);
