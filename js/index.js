console.log("index.js is fired...");

document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector("h1");
  if (heading) {
    heading.textContent = "JS detected title!";
  }
});

