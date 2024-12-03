document.addEventListener("DOMContentLoaded", function() {
    const clickableBox = document.querySelector(".clickable-box");
    const moneyCounter = document.querySelector(".money-counter");
    const autoClickerButton = document.getElementById("auto-clicker-button");
    const autoClickerButton2 = document.getElementById("auto-clicker-button-2");
    const autoClickerButton3 = document.getElementById("auto-clicker-button-3");
    const autoClickerCount = document.getElementById("auto-clicker-count");
    const autoClickerImage = document.getElementById("auto-clicker-image");
    const settingsButton = document.getElementById("settings-button");
    const settingsTab = document.getElementById("settings-tab");
    const resetButton = document.getElementById("reset-button");
    const closeSettingsButton = document.getElementById("close-settings-button");

    let money = parseInt(localStorage.getItem("money")) || 0;
    let autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
    const originalAutoClickerCosts = {
        button1: 50,
        button2: 200,
        button3: 800
    };
    let autoClickerCosts = {...originalAutoClickerCosts}; // Clone the original costs
    let autoClickerInterval = 1000;

    // Update the UI with saved values
    moneyCounter.textContent = `Money: $${money}`;
    autoClickerCount.textContent = `x${autoClickers}`;
    autoClickerImage.style.display = autoClickers > 0 ? 'block' : 'none';
    autoClickerCount.style.display = autoClickers > 0 ? 'inline' : 'none';
    updateButtonCosts();

    clickableBox.addEventListener("click", function() {
        money += 1;
        moneyCounter.textContent = `Money: $${money}`;
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

    settingsButton.addEventListener("click", function() {
        settingsTab.style.display = 'block';
    });

    closeSettingsButton.addEventListener("click", function() {
        settingsTab.style.display = 'none';
    });

    resetButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to reset your game?")) {
            money = 0;
            autoClickers = 0;
            autoClickerCosts = {...originalAutoClickerCosts}; // Reset the costs
            localStorage.setItem("money", money);
            localStorage.setItem("autoClickers", autoClickers);
            moneyCounter.textContent = `Money: $${money}`;
            autoClickerCount.textContent = `x${autoClickers}`;
            autoClickerImage.style.display = 'none';
            autoClickerCount.style.display = 'none';
            updateButtonCosts();

            // Clear the auto clicker interval
            clearInterval(window.autoClickerIntervalId);
        }
    });

    function buyAutoClicker(button, buttonElement) {
        const cost = autoClickerCosts[button];
        if (money >= cost) {
            money -= cost;
            autoClickers += 1;
            autoClickerCosts[button] *= 2;
            moneyCounter.textContent = `Money: $${money}`;
            autoClickerCount.textContent = `x${autoClickers}`;
            autoClickerImage.style.display = 'block';
            autoClickerCount.style.display = 'inline';
            buttonElement.textContent = buttonElement.textContent.replace(/\(\-\$\d+\)/, `(-$${autoClickerCosts[button]})`);
            localStorage.setItem("money", money);
            localStorage.setItem("autoClickers", autoClickers);

            // Update the auto clicker interval to reflect the new auto clicker speed
            clearInterval(window.autoClickerIntervalId);
            autoClickerInterval = 1000 / autoClickers;
            window.autoClickerIntervalId = setInterval(function() {
                money += autoClickers;
                moneyCounter.textContent = `Money: $${money}`;
                localStorage.setItem("money", money);
            }, autoClickerInterval);
        } else {
            alert(`Not enough money to buy this auto clicker! You need $${cost}.`);
        }
    }

    function updateButtonCosts() {
        autoClickerButton.textContent = `Auto Clicker (-$${autoClickerCosts.button1})`;
        autoClickerButton2.textContent = `Mercedes Lot (-$${autoClickerCosts.button2})`;
        autoClickerButton3.textContent = `Mercedes Parking Garage (-$${autoClickerCosts.button3})`;
    }

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
