//게시글 예제
const makeContent = (element, i) => {
  element.innerHTML = `
  <span>${i}</span>
  <span>게시물 제목</span>
  <span>작성자</span>
  <span>2022.01.01</span>
`;
};

export default makeContent;
