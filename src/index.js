let count = 0;
const counterElement = document.getElementById("counter");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");


increaseButton.addEventListener("click", function () {
  count = increaseCount(count); 
  counterElement.innerText = count;
});

decreaseButton.addEventListener("click", function () {
  count = decreaseCount(count); 
  counterElement.innerText = count;
});

function increaseCount(currentCount) {
  return currentCount + 1;
}
function decreaseCount(currentCount) {
  return currentCount - 1;
}