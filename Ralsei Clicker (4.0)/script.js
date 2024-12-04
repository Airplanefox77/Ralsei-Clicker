document.addEventListener("DOMContentLoaded", function() {
    const clickableBox = document.querySelector(".clickable-box");
    const moneyCounter = document.querySelector(".money-counter");
    const clickerNameDisplay = document.querySelector(".shop-name"); // Clicker name display within shop box
    const autoClickerButton = document.getElementById("auto-clicker-button");
    const autoClickerButton2 = document.getElementById("auto-clicker-button-2");
    const autoClickerButton3 = document.getElementById("auto-clicker-button-3");
    const autoClickerCount = document.getElementById("auto-clicker-count");
    const autoClickerImage = document.getElementById("auto-clicker-image");
    const settingsButton = document.getElementById("settings-button");
    const settingsTab = document.getElementById("settings-tab");
    const resetButton = document.getElementById("reset-button");
    const hardModeButton = document.getElementById("hard-mode-button");
    const nameInput = document.getElementById("name-input");
    const nameButton = document.getElementById("name-button");
    const closeSettingsButton = document.getElementById("close-settings-button");

    let money = parseInt(localStorage.getItem("money")) || 0;
    let autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
    let clickerName = localStorage.getItem("clickerName") || "Your Clicker";
    const originalAutoClickerCosts = {
        button1: 50,
        button2: 200,
        button3: 800
    };
    let autoClickerCosts = JSON.parse(localStorage.getItem("autoClickerCosts")) || {...originalAutoClickerCosts};
    let hardMode = JSON.parse(localStorage.getItem("hardMode")) || false;
    const storedHardModeCosts = JSON.parse(localStorage.getItem("hardModeCosts"));

    // Load hard mode costs if they exist
    if (storedHardModeCosts && hardMode) {
        autoClickerCosts = storedHardModeCosts;
    }

    // Update the UI with saved values
    moneyCounter.textContent = `Money: $${formatNumber(money)}`;
    document.title = `$${formatNumber(money)} - ${clickerName}'s Ralsei Clicker`; // Update tab title with money and clicker name
    clickerNameDisplay.textContent = `${clickerName}'s Ralsei Clicker`; // Display clicker name
    autoClickerCount.textContent = `x${autoClickers}`;
    autoClickerImage.style.display = autoClickers > 0 ? 'block' : 'none';
    autoClickerCount.style.display = autoClickers > 0 ? 'inline' : 'none';
    updateButtonCosts();
    updateHardModeDisplay();

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

    settingsButton.addEventListener("click", function() {
        settingsTab.style.display = 'block';
    });

    closeSettingsButton.addEventListener("click", function() {
        settingsTab.style.display = 'none';
    });

    hardModeButton.addEventListener("click", function() {
        hardMode = !hardMode;
        localStorage.setItem("hardMode", JSON.stringify(hardMode));
        updateHardMode();
    });

    resetButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to reset your game?")) {
            money = 0;
            autoClickers = 0;
            autoClickerCosts = {...originalAutoClickerCosts};
            hardMode = false;
            localStorage.setItem("money", money);
            localStorage.setItem("autoClickers", autoClickers);
            localStorage.setItem("autoClickerCosts", JSON.stringify(autoClickerCosts));
            localStorage.setItem("hardMode", JSON.stringify(hardMode));
            updateMoneyDisplay();
            autoClickerCount.textContent = `x${autoClickers}`;
            autoClickerImage.style.display = 'none';
            autoClickerCount.style.display = 'none';
            updateButtonCosts();
            updateHardModeDisplay();

            // Clear the auto clicker interval
            clearInterval(window.autoClickerIntervalId);
        }
    });

    nameButton.addEventListener("click", function() {
        const newName = nameInput.value.trim();
        if (newName) {
            clickerName = newName;
            localStorage.setItem("clickerName", clickerName);
            clickerNameDisplay.textContent = `${clickerName}'s Ralsei Clicker`;
            updateMoneyDisplay();
        }
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

    function updateHardMode() {
        if (hardMode) {
            // Store the current costs
            localStorage.setItem("originalAutoClickerCosts", JSON.stringify(autoClickerCosts));
            autoClickerCosts = {
                button1: autoClickerCosts.button1 * 4,
                button2: autoClickerCosts.button2 * 4,
                button3: autoClickerCosts.button3 * 4
            };
            localStorage.setItem("hardModeCosts", JSON.stringify(autoClickerCosts));
            hardModeButton.textContent = "Hard Mode (Enabled)";
        } else {
            // Retrieve the stored costs
            autoClickerCosts = JSON.parse(localStorage.getItem("originalAutoClickerCosts")) || {...originalAutoClickerCosts};
            hardModeButton.textContent = "Hard Mode (Disabled)";
        }
        updateButtonCosts();
        localStorage.setItem("autoClickerCosts", JSON.stringify(autoClickerCosts));
    }

    function updateHardModeDisplay() {
        hardModeButton.textContent = hardMode ? "Hard Mode (Enabled)" : "Hard Mode (Disabled)";
    }

    function updateMoneyDisplay() {
        moneyCounter.textContent = `Money: $${formatNumber(money)}`;
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
