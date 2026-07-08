let buttons = document.querySelectorAll(".btn-style");
let display = document.querySelector("#display");
let btnGrid = document.querySelector("#btnGrid");
let backspace = document.querySelector("#backspace");
buttons.forEach((btn) => {
  const operators = ["/", "*", "-", "+"];
  const dot = ".";

  btn.addEventListener("click", () => {
    const lastChar = display.value.slice(-1);
    const firstChar = display.value[0];
    if (btn.id === "backspace") return;
    if (btn.classList.contains("AC")) return (display.value = "");
    if (btn.classList.contains("equal")) {
      return (display.value = Number(eval(display.value).toFixed(9)));
    }
    if (dot.includes(btn.value)) {
      if (dot.includes(lastChar)) return;
    }
    if (operators.includes(btn.value)) {
      if (display.value === "" && operators.includes(btn.value)) {
        return;
      }
      if (operators.includes(lastChar)) return;
    }
    display.value += btn.value;
  });
});

backspace.addEventListener("click", (e) => {
  // console.dir(e.target);
  const CurrentText = display.value;
  display.value = CurrentText.slice(0, -1);
});
