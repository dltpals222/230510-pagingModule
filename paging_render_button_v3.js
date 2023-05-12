import all_mighty_editor from "./module/all_mighty_editor.js";
import { mathCeil, objCreate, whileRemoveChild } from "./paging_etc_module.js";
import renderContent from "./paging_render_content.js";

const { multiAndSingleTagMaker, kingGodFlexEditor, fontAndLayoutEditor } =
  all_mighty_editor;

function renderButtonContainer(
  parent,
  boardListParent,
  { total, pageContentCount, currPage, pageNumCount, img }
) {
  const totalPageCount = mathCeil(total, pageContentCount);
  const pageWrap = {
    total: total,
    pageContentCount: pageContentCount,
    currPage: currPage,
    pageNumCount: pageNumCount,
    img: img,
  };
  const renderButtons = () => {
    const buttonList = multiAndSingleTagMaker(
      parent,
      "ul",
      "button-list",
      1,
      (element) => {
        element.style.listStyleType = "none";
        kingGodFlexEditor(element, "", "center", "space-evenly");

        //맨앞 버튼
        multiAndSingleTagMaker(element, "li", "start-number", 1, (eleHome) => {
          eleHome.innerHTML = "<<맨앞";
          eleHome.addEventListener("click", () => {
            currPage = 1;
            if (mathCeil(currPage) !== 1) {
              currPage = 1;
            }

            renderContent(boardListParent, pageWrap);
            renderButtons();
          });
        }); //맨앞 버튼 끝

        //이전 버튼
        multiAndSingleTagMaker(element, "li", "before-number", 1, (elePrev) => {
          elePrev.innerHTML = "<이전";
          elePrev.addEventListener("click", () => {
            currPage =
              currPage - pageNumCount < 1 ? 1 : currPage - pageNumCount;
            if (mathCeil(currPage) !== 1) {
              currPage = mathCeil(currPage) * pageNumCount - (pageNumCount - 1);
            }

            renderContent(boardListParent, pageWrap);
            renderButtons();
          });
        }); //이전 버튼 끝

        // 중간 페이지 버튼 처리
        let startPage = mathCeil(currPage) * pageNumCount - (pageNumCount - 1);
        let endPage = mathCeil(currPage) * pageNumCount;

        if (startPage < 1) {
          startPage = 1;
          endPage = mathCeil(currPage) * pageNumCount - 1;
        }
        if (endPage > total) {
          endPage = total;
          startPage = endPage - pageNumCount + 1;
          if (startPage < 1) {
            startPage = 1;
          }
        }

        //중간 페이지 버튼 반복문
        for (let i = startPage; i <= endPage && i <= totalPageCount; i++) {
          //페이지 숫자 버튼 CSS포함시킴
          multiAndSingleTagMaker(element, "li", i, 1, (eleNum) => {
            fontAndLayoutEditor(eleNum, "8%", "");
            kingGodFlexEditor(eleNum, "", "center", "center");
            eleNum.innerHTML = i;
            if (i === currPage) {
              eleNum.style.fontWeight = "bold";
              eleNum.style.backgroundColor = "#9A6E44";
              eleNum.style.color = "white";
            } else {
              eleNum.addEventListener("click", () => {
                currPage = i;
                let pageWrap = {
                  total: total,
                  currPage: currPage,
                  pageContentCount: pageContentCount,
                  pageNumCount: pageNumCount,
                  img: img,
                };
                renderContent(boardListParent, pageWrap);
                renderButtons();
              });
              eleNum.style.fontWeight = "normal";
              eleNum.style.backgroundColor = "";
              eleNum.style.color = "black";
            }
            element.appendChild(eleNum);
          });
        } //중간 페이지 버튼 반복문 끝

        //다음 버튼
        multiAndSingleTagMaker(element, "li", "next-number", 1, (eleNext) => {
          eleNext.innerHTML = "다음>";
          eleNext.addEventListener("click", () => {
            currPage = currPage + pageNumCount > total ? total : currPage;
            if (mathCeil(currPage) !== mathCeil(totalPageCount)) {
              currPage = mathCeil(currPage) * pageNumCount + 1;
            }

            renderContent(boardListParent, pageWrap);
            renderButtons();
          });
        }); //다음 버튼 끝

        //맨뒤 버튼
        multiAndSingleTagMaker(element, "li", "end-number", 1, (eleEnd) => {
          eleEnd.innerHTML = "맨뒤>>";
          eleEnd.addEventListener("click", () => {
            currPage = total;
            if (mathCeil(currPage) !== mathCeil(totalPageCount)) {
              currPage = totalPageCount;
            }

            renderContent(boardListParent, pageWrap);
            renderButtons();
          });
        });
      } //buttonList의 콜백 끝
    ); //*buttonList 끝

    //*기존 버튼 삭제 로직
    whileRemoveChild(parent);
    parent.appendChild(buttonList);
  };

  //마지막부분 다시 객체로 싸주고 전달할 준비 후 renderContent와 renderButtons을 실행시켜준다.

  renderContent(boardListParent, pageWrap);
  renderButtons();
} //? renderButtonContainer 끝

export default renderButtonContainer;
