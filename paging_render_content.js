import all_mighty_editor from "./module/all_mighty_editor.js";
import makeContent from "./paging_make_content.js";
import { whileRemoveChild } from "./while_removeChild.js";

const { multiAndSingleTagMaker } = all_mighty_editor;

//게시글을 포함시킨 renderContent
const renderContent = (parent, { total, currPage, pageContentCount, img }) => {
  whileRemoveChild(parent);

  const first = total - (currPage - 1) * pageContentCount;
  const second = total - currPage * pageContentCount;

  for (let i = first; i >= 1 && second; i--) {
    multiAndSingleTagMaker(parent, "form", "", 1, (element) => {
      multiAndSingleTagMaker(element, "img", { src: img });
      multiAndSingleTagMaker(element, "div", "", 1, (ele1) => {
        makeContent(ele1);
      });
    });
  }
};

export default renderContent;
