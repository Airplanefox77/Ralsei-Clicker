document.addEventListener("DOMContentLoaded", function() {
    const clickableBox = document.querySelector(".clickable-box");
    const moneyCounter = document.querySelector(".money-counter");
    const autoClickerButton = document.getElementById("auto-clicker-button");
    const autoClickerButton2 = document.getElementById("auto-clicker-button-2");
    const autoClickerButton3 = document.getElementById("auto-clicker-button-3");
    const autoClickerCount = document.getElementById("auto-clicker-count");
    const autoClickerImage = document.getElementById("auto-clicker-image");

    let money = parseInt(localStorage.getItem("money")) || 0;
    let autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
    let autoClickerCosts = JSON.parse(localStorage.getItem("autoClickerCosts")) || {
        button1: 50,
        button2: 200,
        button3: 800
    };

    // Update the UI with saved values
    moneyCounter.textContent = `Money: $${formatNumber(money)}`;
    autoClickerImage.style.display = autoClickers > 0 ? 'block' : 'none';
    autoClickerCount.style.display = autoClickers > 0 ? 'inline' : 'none';
    updateButtonCosts();

    clickableBox.addEventListener("click", function() {
        money += 1;
        updateMoneyDisplay();
        localStorage.setItem("money", money);
    });

    autoClickerButton.addEventListener("click", function() {
        buyAutoClicker("button1", autoClickerButton);
    });

    autoClickerButton2.addEventListener("click", function() {
        buyAutoClicker("button2", autoClickerButton2);
    });

    autoClickerButton3.addEventListener("click", function() {
        buyAutoClicker("button3", autoClickerButton3);
    });

    function buyAutoClicker(button, buttonElement) {
        const cost = autoClickerCosts[button];
        if (money >= cost) {
            money -= cost;
            autoClickers += 1;
            autoClickerCosts[button] *= 2;
            updateMoneyDisplay();
            autoClickerCount.textContent = `x${autoClickers}`;
            autoClickerImage.style.display = 'block';
            autoClickerCount.style.display = 'inline';
            buttonElement.textContent = buttonElement.textContent.replace(/\(\-\$\d+\)/, `(-$${formatNumber(autoClickerCosts[button])})`);
            localStorage.setItem("money", money);
            localStorage.setItem("autoClickers", autoClickers);
            localStorage.setItem("autoClickerCosts", JSON.stringify(autoClickerCosts));

            // Update the auto clicker interval to reflect the new auto clicker speed
            clearInterval(window.autoClickerIntervalId);
            autoClickerInterval = 500 / autoClickers;
            window.autoClickerIntervalId = setInterval(function() {
                money += autoClickers;
                updateMoneyDisplay();
                localStorage.setItem("money", money);
            }, autoClickerInterval);
        } else {
            alert(`Not enough money to buy this auto clicker! You need $${formatNumber(cost)}.`);
        }
    }

    function updateButtonCosts() {
        autoClickerButton.textContent = `Auto Clicker (-$${formatNumber(autoClickerCosts.button1)})`;
        autoClickerButton2.textContent = `Mercedes Lot (-$${formatNumber(autoClickerCosts.button2)})`;
        autoClickerButton3.textContent = `Mercedes Parking Garage (-$${formatNumber(autoClickerCosts.button3)})`;
    }

    function updateMoneyDisplay() {
        moneyCounter.textContent = `Money: $${formatNumber(money)}`;
        const clickerName = localStorage.getItem("clickerName") || "Your Clicker";
        document.title = `$${formatNumber(money)} - ${clickerName}'s Ralsei Clicker`;
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Auto clickers interval setup for saved auto clickers
    if (autoClickers > 0) {
        autoClickerInterval = 500 / autoClickers;
        window.autoClickerIntervalId = setInterval(function() {
            money += autoClickers;
            updateMoneyDisplay();
            localStorage.setItem("money", money);
        }, autoClickerInterval);
    }
});

