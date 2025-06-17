//setup
const buttons = Array.from(document.querySelectorAll(".button-19"));
const inputBar = document.querySelector("#inputBar");
let nums = ["", "", ""];
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (nums[0] === "") {
      inputBar.value = "";
    }
    inputBar.value += button.textContent;
    append(button.textContent);
    console.log(nums);
    //if button is digit, add int; else add operation
  });
});

const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
  nums = ["", "", ""];
  inputBar.value = "";
});

function append(buttonVal) {
  if (!isNaN(buttonVal) || buttonVal === ".") {
    //is a number
    //if nums[1] is undefined => add to nums[0] else add to nums[2]
    if (nums[1] === "") {
      nums[0] += buttonVal; //add as string to concatenate
    } else {
      nums[2] += buttonVal;
    }
  } else {
    //not a number --> is an operation or negative
    if (buttonVal === "=") {
      if (nums[1] === "" || nums[2] === "") {
        //illegal operation ignored
        nums[1] = "";
        nums[2] = "";
      } else {
        operate();
      }
    } else if (buttonVal === "-" && nums[0] === "") {
      //negative "-" in first slot
      nums[0] += buttonVal;
    } else if (buttonVal === "-" && nums[1] !== "" && nums[2] === "") {
      //negative in second slot
      nums[2] += buttonVal;
    } else {
      if (nums[1] === "" || nums[2] === "") {
        if (nums[1] !== "" && nums[2] === "") {
          // is illegal operation, so operation is replaced
          inputBar.value = nums[0] + buttonVal;
          nums[1] = buttonVal;
        } else {
          nums[1] = buttonVal;
        }
      } else {
        operate();
        append(buttonVal);
      }
    }
  }
}

function operate() {
  let num1 = +nums[0];
  let num2 = +nums[2];
  let op = nums[1];
  let ans = 0;
  switch (op) {
    case "+":
      ans = num1 + num2;
      break;
    case "-":
      ans = num1 - num2;
      break;
    case "/":
      if (num2 === 0) {
        inputBar.value = "DIVIDE BY 0 ERROR";
        num[0] = "";
        num[1] = "";
        num[2] = "";
        return;
      }
      ans = num1 / num2;
      break;
    case "X":
      ans = num1 * num2;
      break;
    default:
      ans = nums1;
  }
  ans = Math.round(ans * 100) / 100;

  inputBar.value = ans;
  nums[0] = ans;
  nums[1] = "";
  nums[2] = "";
}
