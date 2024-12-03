document.addEventListener("DOMContentLoaded", function() {
    const clickableBox = document.querySelector(".clickable-box");
    const moneyCounter = document.querySelector(".money-counter");
    let money = 0;

    clickableBox.addEventListener("click", function() {
        money += 1;
        moneyCounter.textContent = `Money: $${money}`;
    });
});
