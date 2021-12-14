function createSlugFromText(string) {
  return string
    .split(" ")
    .map(
      (word) =>
        word.replace(" ", "") &&
        word.replace(/^\s+|\s+$/g, "") &&
        word.toLowerCase()
    )
    .join("-");
}

export { createSlugFromText };
