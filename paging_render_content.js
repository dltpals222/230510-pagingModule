import all_mighty_editor from "./module/all_mighty_editor.js";
import {
  makeContent,
  recipeListBoxStyle,
  recipeListImage,
} from "./paging_make_content.js";
import { whileRemoveChild } from "./paging_etc_module.js";

const { multiAndSingleTagMaker, allMightyStyleEditor } = all_mighty_editor;

//게시글을 포함시킨 renderContent
const renderContent = (
  parent,
  { total, currPage = 1, pageContentCount = 4, img = void 0 }
) => {
  whileRemoveChild(parent);

  for (
    let i = total - (currPage - 1) * pageContentCount;
    i >= 1 && i > total - currPage * pageContentCount;
    i--
  ) {
    multiAndSingleTagMaker(parent, "form", "", 1, (element) => {
      multiAndSingleTagMaker(element, "img", { src: img }, 1, (ele1) => {
        allMightyStyleEditor(ele1, recipeListImage);
      });
      multiAndSingleTagMaker(element, "div", "", 1, (ele1) => {
        makeContent(ele1, i);
      });
      allMightyStyleEditor(element, recipeListBoxStyle);
    });
  }
};

export default renderContent;
