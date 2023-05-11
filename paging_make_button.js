import all_mighty_editor from "./module/all_mighty_editor.js";
import { mathCeil, whileRemoveChild } from "./paging_etc_module.js";
import renderContent from "./paging_render_content.js";

const { multiAndSingleTagMaker } = all_mighty_editor;

//! 이 함수는 버튼 클릭시 계속해서 생성하는 문제가 발생함 (일단 보류)

//* parent는 버튼을 만들고 싶은 부모태그를 입력하면 된다.
//* boardList는 게시판의 정보가 생성되는곳의 부모태그를 입력하면 된다.
//* 3번째 매개변수는 최소 2가지 최대 4가지의 프로퍼티를 가지고 있는 객체여야한다.
/* 앞에 물음표는 주석의 색을 입히기 위해 적었습니다
todo 3번째 매개변수는 객체를 넣으면 됩니다.
? {total: num , // 전체 페이지 숫자
?  currPage : num , // 현재 페이지 숫자(기본값 1)
?  pageNumCount : num, //중간 페이징 버튼 갯수(기본값 5)
?  pageContentCount : num} //한페이지에 보여질 게시글 갯수
*/
//* keyword는 총 4가지로 설정했다.
//* 'start', 'prev', 'next', 'end' 앞에서부터 각각 '맨앞 이전 다음 맨뒤' 버튼을 만들어준다.

function pagingMakeButton(
  parent,
  boardList,
  { total, currPage = 1, pageNumCount = 5, pageContentCount, img },
  keyword
) {
  const totalPageCount = mathCeil(total, pageContentCount);
  switch (keyword) {
    case "start":
      multiAndSingleTagMaker(parent, "div", "start", 1, (element) => {
        element.innerHTML = "<<맨앞";
        element.addEventListener("click", () => {
          currPage = 1;
          if (mathCeil(currPage) !== 1) {
            currPage = 1;
          }
          renderContent(boardList, { total, currPage, pageContentCount, img });
          pagingMakeButton(
            parent,
            boardList,
            { total, currPage, pageNumCount, pageContentCount, img },
            "start"
          );
        });
      });
      break;
    case "prev":
      multiAndSingleTagMaker(parent, "div", "prev", 1, (element) => {
        element.innerHTML = "<이전";
        element.addEventListener("click", () => {
          currPage = currPage - pageNumCount < 1 ? 1 : currPage - pageNumCount;
          if (mathCeil(currPage) !== 1) {
            currPage = mathCeil(currPage) * pageNumCount - (pageNumCount - 1);
          }
          renderContent(boardList, { total, currPage, pageContentCount, img });
          pagingMakeButton(
            parent,
            boardList,
            { total, currPage, pageNumCount, pageContentCount, img },
            "prev"
          );
        });
      });
      break;
    case "next":
      multiAndSingleTagMaker(parent, "div", "next", 1, (element) => {
        element.innerHTML = "다음>";
        element.addEventListener("click", () => {
          currPage = currPage + pageNumCount > total ? total : currPage;
          if (mathCeil(currPage) !== mathCeil(totalPageCount)) {
            currPage = mathCeil(currPage) * pageNumCount + 1;
          }
          whileRemoveChild(element);
          renderContent(boardList, { total, currPage, pageContentCount, img });
          pagingMakeButton(
            parent,
            boardList,
            { total, currPage, pageNumCount, pageContentCount, img },
            "next"
          );
        });
      });
      break;
    case "end":
      multiAndSingleTagMaker(parent, "div", "end", 1, (element) => {
        element.innerHTML = "맨뒤>>";
        element.addEventListener("click", () => {
          currPage = total;
          if (mathCeil(currPage) !== mathCeil(totalPageCount)) {
            currPage = totalPageCount;
          }
          renderContent(boardList, { total, currPage, pageContentCount, img });
          pagingMakeButton(
            parent,
            boardList,
            { total, currPage, pageNumCount, pageContentCount, img },
            "end"
          );
        });
      });
      break;
  } //switch 끝
}

export default pagingMakeButton;
