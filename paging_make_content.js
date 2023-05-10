//게시글 예제
export const makeContent = (element, i) => {
  element.innerHTML = `
  <div>${i}</div>
  <div>게시물 제목</div>
  <div>작성자</div>
  <div>2022.01.01</div>
`;
};

//레시피 리스트 이미지 스타일
export const recipeListImage = {
  width: "30%",
  height: "100%",
  margin: "2%",
};

//레시피 리스트 박스 스타일
export const recipeListBoxStyle = {
  display: "flex",
  flexDirection: "row",
  width: "70%",
  height: "25%",
  padding: "2%",
  backgroundColor: "#DAB988",
};
