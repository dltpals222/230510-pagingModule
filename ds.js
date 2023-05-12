const page = {
  total: 1151, //전체 게시글 갯수
  pageContentCount: 4, //한페이지에 보여질 게시글 갯수
  currPage: 1, //현재페이지
  pageNumCount: 5, //중간 페이징 버튼 갯수
  img: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
};

function objCreate(
  total,
  currPage = 1,
  pageNumCount = 5,
  pageContentCount = 4,
  img = void 0
) {
  return {
    total: total,
    currPage: currPage,
    pageNumCount: pageNumCount,
    pageContentCount: pageContentCount,
    img: img,
  };
}

function first(parent, secondParent, { a, b, c, d, e }) {
  const page = {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
  };
}
