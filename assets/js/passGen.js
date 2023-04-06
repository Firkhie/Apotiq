function changeVocals(str) {
  let newStr = "";
  const asciiVocals = ["a", "i", "u", "e", "o", "A", "I", "U", "E", "O"];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    let nextCharCode = str.charCodeAt(i);
    if (asciiVocals.indexOf(char) !== -1) nextCharCode++;
    newStr += String.fromCharCode(nextCharCode);
  }
  return newStr;
}

function reverseWord(str) {
  //code di sini
  return str.split("").reverse().join("");
}

function setLowerUpperCase(str) {
  //code di sini
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    newStr +=
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
  }
  return newStr;
}

function removeSpaces(str) {
  return str.replace(" ", "");
}

export function passwordGenerator(name) {
  return removeSpaces(setLowerUpperCase(reverseWord(changeVocals(name))));
}

// export default passwordGenerator
