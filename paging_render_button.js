import all_mighty_editor from "./module/all_mighty_editor.js";
import { mathCeil, whileRemoveChild } from "./paging_etc_module.js";

const { multiAndSingleTagMaker, kingGodFlexEditor, fontAndLayoutEditor } =
  all_mighty_editor;

//맨앞 버튼
const renderButtons = (
  parent,
  boardList,
  { total, currPage = 1, pageNumCount = 5, pageContentCount, img }
) => {
  const buttonList = multiAndSingleTagMaker(
    parent,
    "ul",
    "button-list",
    1,
    (element) => {
      element.style.listStyleType = "none";
      kingGodFlexEditor(element, "", "center", "space-evenly");
    }
  );

  const totalPageCount = mathCeil(total, pageContentCount);

  const startNumber = multiAndSingleTagMaker(buttonList, "li", "start-number");
  startNumber.innerHTML = "<<맨앞";
  startNumber.addEventListener("click", () => {
    currPage = 1;
    if (mathCeil(currPage) !== 1) {
      currPage = 1;
    }
    renderContent(boardList, page);
    renderButtons(parent, boardList, {
      total,
      currPage,
      pageNumCount,
      pageContentCount,
      img,
    });
  });

  //이전 버튼
  const beforeNumber = multiAndSingleTagMaker(
    buttonList,
    "li",
    "before-number"
  );
  beforeNumber.innerHTML = "<이전";
  beforeNumber.addEventListener("click", () => {
    currPage = currPage - pageNumCount < 1 ? 1 : currPage - pageNumCount;
    if (mathCeil(currPage) !== 1) {
      currPage = mathCeil(currPage) * pageNumCount - (pageNumCount - 1);
    }
    renderContent(boardList, page);
    renderButtons(parent, boardList, {
      total,
      currPage,
      pageNumCount,
      pageContentCount,
      img,
    });
  });

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
    const pageButton = multiAndSingleTagMaker(
      buttonList,
      "li",
      i,
      1,
      (element) => {
        fontAndLayoutEditor(element, "8%", "");
        kingGodFlexEditor(element, "", "center", "center");
      }
    );
    pageButton.innerHTML = i;
    if (i === currPage) {
      pageButton.style.fontWeight = "bold";
      pageButton.style.backgroundColor = "#9A6E44";
      pageButton.style.color = "white";
    } else {
      pageButton.addEventListener("click", () => {
        currPage = i;
        renderContent(boardList, page);
        renderButtons(parent, boardList, {
          total,
          currPage,
          pageNumCount,
          pageContentCount,
          img,
        });
      });
      pageButton.style.fontWeight = "normal";
      pageButton.style.backgroundColor = "";
      pageButton.style.color = "black";
    }
    buttonList.appendChild(pageButton);
  }

  //다음 버튼
  const nextNumber = multiAndSingleTagMaker(buttonList, "li", "next-number");
  nextNumber.innerHTML = "다음>";
  nextNumber.addEventListener("click", () => {
    currPage = currPage + pageNumCount > total ? total : currPage;
    if (mathCeil(currPage) !== mathCeil(totalPageCount)) {
      currPage = mathCeil(currPage) * pageNumCount + 1;
    }
    renderContent(boardList, page);
    renderButtons(parent, boardList, {
      total,
      currPage,
      pageNumCount,
      pageContentCount,
      img,
    });
  });

  //맨뒤 버튼
  const endNumber = multiAndSingleTagMaker(buttonList, "li", "end-number");
  endNumber.innerHTML = "맨뒤>>";
  endNumber.addEventListener("click", () => {
    currPage = total;
    if (mathCeil(currPage) !== mathCeil(totalPageCount)) {
      currPage = totalPageCount;
    }
    renderContent(boardList, page);
    renderButtons(parent, boardList, {
      total,
      currPage,
      pageNumCount,
      pageContentCount,
      img,
    });
  });

  //기존 버튼 삭제 로직
  whileRemoveChild(parent);
  parent.appendChild(buttonList);
};

export default renderButtons;
