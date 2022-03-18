// DOM
const resultEL = document.getElementById("result");
const lengthEL = document.getElementById("length");
const upperEL = document.getElementById("upper");
const lowerEL = document.getElementById("lower");
const numbersEL = document.getElementById("numbers");
const symbolsEL = document.getElementById("symbols");
const generate = document.getElementById("generate");
const clipboardEl = document.getElementById("icondiv");

//  get rendom data 1
const getUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
};

const getLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
};

const getNumbers = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
};

const getSymbols = () => {
  const x = "@#$%^&*(){}!";
  return x[Math.floor(Math.random() * 12)];
};

const getRandomaArr = {
  upper: getUpper,
  lower: getLower,
  number: getNumbers,
  symbol: getSymbols,
};

// event on button click

generate.addEventListener("click", () => {
  const length = lengthEL.value;

  const hasUpper = upperEL.checked;
  const hasLower = lowerEL.checked;
  const hasNumbers = numbersEL.checked;
  const hasSymbols = symbolsEL.checked;

  resultEL.innerText = generatepassword(
    hasUpper,
    hasLower,
    hasNumbers,
    hasSymbols,
    length
  );
});

// generate password function

const generatepassword = (upper, lower, number, symbol, length) => {
  const typearr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (element) => Object.values(element)[0] === true
  );
  countarr = typearr.length;

  if (countarr === 0) {
    return "";
  }

  let result = "";

  for (let i = 0; i < length; i += countarr) {
    typearr.forEach((element) => {
      const x = Object.keys(element)[0];
      result += getRandomaArr[x]();
    });
  }
  const x = result.slice(0, length);
  return x;
};

// copy password to clipboard

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEL.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});
