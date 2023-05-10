//부모태그에 자식노드가 있으면 전부 삭제하는 함수
export function whileRemoveChild(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
}

//화면에 보여질 페이지 그룹 함수
export function mathCeil(currPage, pageNumCount = 5) {
  return Math.ceil(currPage / pageNumCount);
}
