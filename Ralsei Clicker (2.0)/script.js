document.addEventListener("DOMContentLoaded", function() {
    const clickableBox = document.querySelector(".clickable-box");
    const moneyCounter = document.querySelector(".money-counter");
    const autoClickerButton = document.getElementById("auto-clicker-button");
    const autoClickerCount = document.getElementById("auto-clicker-count");
    const autoClickerImage = document.getElementById("auto-clicker-image");

    let money = parseInt(localStorage.getItem("money")) || 0;
    let autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
    let autoClickerInterval = 1000;

    // Update the UI with saved values
    moneyCounter.textContent = `Money: $${money}`;
    autoClickerCount.textContent = `x${autoClickers}`;
    if (autoClickers > 0) {
        autoClickerImage.style.display = 'block';
    }

    clickableBox.addEventListener("click", function() {
        money += 1;
        moneyCounter.textContent = `Money: $${money}`;
        localStorage.setItem("money", money);
    });

    autoClickerButton.addEventListener("click", function() {
        if (money >= 50) {
            money -= 50;
            autoClickers += 1;
            moneyCounter.textContent = `Money: $${money}`;
            autoClickerCount.textContent = `x${autoClickers}`;
            autoClickerImage.style.display = 'block';
            localStorage.setItem("money", money);
            localStorage.setItem("autoClickers", autoClickers);

            // Update the auto clicker interval to double the speed for each auto clicker bought
            clearInterval(window.autoClickerIntervalId);
            autoClickerInterval = 1000 / autoClickers;
            window.autoClickerIntervalId = setInterval(function() {
                money += autoClickers;
                moneyCounter.textContent = `Money: $${money}`;
                localStorage.setItem("money", money);
            }, autoClickerInterval);
        } else {
            alert("Not enough money to buy an auto clicker!");
        }
    });

    // Auto clickers interval setup for saved auto clickers
    if (autoClickers > 0) {
        autoClickerInterval = 1000 / autoClickers;
        window.autoClickerIntervalId = setInterval(function() {
            money += autoClickers;
            moneyCounter.textContent = `Money: $${money}`;
            localStorage.setItem("money", money);
        }, autoClickerInterval);
    }
});

