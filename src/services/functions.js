import stopwords from "stopwords-pt";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate() + 1),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

export function remove_stopwords(str) {
  const res = [];
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word_clean = words[i].split(".").join("");
    if (!stopwords.includes(word_clean)) {
      res.push(word_clean);
    }
  }
  return res.join(" ");
}

export function remove_accentuation(str) {
  const without_accentuation =
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";

  const with_accentuation =
    "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
  let newstr = "";
  for (let i = 0; i < str.length; i++) {
    let change = false;
    for (let a = 0; a < without_accentuation.length; a++) {
      if (str.substr(i, 1) === without_accentuation.substr(a, 1)) {
        newstr += with_accentuation.substr(a, 1);
        change = true;
        break;
      }
    }
    if (change === false) {
      newstr += str.substr(i, 1);
    }
  }
  return newstr;
}
