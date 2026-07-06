let buttons = document.querySelectorAll(".btn-style");
let display = document.querySelector("#display");

buttons.forEach((val) => {
  val.addEventListener("click", (e) => {
    // console.dir(val);
    let content = e.target.textContent;
    console.dir(content);
    display.value += content;

    
  });
});
