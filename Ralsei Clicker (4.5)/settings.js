document.addEventListener("DOMContentLoaded", function() {
    const settingsButton = document.getElementById("settings-button");
    const settingsTab = document.getElementById("settings-tab");
    const resetButton = document.getElementById("reset-button");
    const hardModeButton = document.getElementById("hard-mode-button");
    const nameInput = document.getElementById("name-input");
    const nameButton = document.getElementById("name-button");
    const closeSettingsButton = document.getElementById("close-settings-button");
    const clickerNameDisplay = document.querySelector(".shop-name");

    let clickerName = localStorage.getItem("clickerName") || "Your Clicker";
    let hardMode = JSON.parse(localStorage.getItem("hardMode")) || false;
    const maxLength = 8;

    // Initialize the UI with saved values
    clickerNameDisplay.textContent = `${clickerName}'s Ralsei Clicker`;
    updateHardModeDisplay();

    settingsButton.addEventListener("click", function() {
        settingsTab.style.display = 'block';
    });

    closeSettingsButton.addEventListener("click", function() {
        settingsTab.style.display = 'none';
    });

    resetButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to reset your game?")) {
            localStorage.clear();
            location.reload();
        }
    });

    hardModeButton.addEventListener("click", function() {
        hardMode = !hardMode;
        localStorage.setItem("hardMode", JSON.stringify(hardMode));
        updateHardMode();
    });

    nameButton.addEventListener("click", function() {
        const newName = nameInput.value.trim();
        if (newName.length <= maxLength) {
            clickerName = newName;
            localStorage.setItem("clickerName", clickerName);
            clickerNameDisplay.textContent = `${clickerName}'s Ralsei Clicker`;
            updateMoneyDisplay();
        } else {
            alert(`Name is too long! Please enter a name with a maximum of ${maxLength} characters.`);
        }
    });

    function updateHardMode() {
        // Retrieve stored costs or reset to original
        let autoClickerCosts = JSON.parse(localStorage.getItem("autoClickerCosts")) || {
            button1: 50,
            button2: 200,
            button3: 800
        };

        if (hardMode) {
            autoClickerCosts = {
                button1: autoClickerCosts.button1 * 4,
                button2: autoClickerCosts.button2 * 4,
                button3: autoClickerCosts.button3 * 4
            };
            localStorage.setItem("hardModeCosts", JSON.stringify(autoClickerCosts));
        } else {
            autoClickerCosts = JSON.parse(localStorage.getItem("originalAutoClickerCosts")) || {
                button1: 50,
                button2: 200,
                button3: 800
            };
        }

        updateButtonCosts(autoClickerCosts);
        localStorage.setItem("autoClickerCosts", JSON.stringify(autoClickerCosts));
        updateHardModeDisplay();
    }

    function updateHardModeDisplay() {
        hardModeButton.textContent = hardMode ? "Hard Mode (Enabled)" : "Hard Mode (Disabled)";
    }

    function updateMoneyDisplay() {
        const moneyCounter = document.querySelector(".money-counter");
        const money = parseInt(localStorage.getItem("money")) || 0;
        moneyCounter.textContent = `Money: $${formatNumber(money)}`;
        document.title = `$${formatNumber(money)} - ${clickerName}'s Ralsei Clicker`;
    }

    function updateButtonCosts(autoClickerCosts) {
        const autoClickerButton = document.getElementById("auto-clicker-button");
        const autoClickerButton2 = document.getElementById("auto-clicker-button-2");
        const autoClickerButton3 = document.getElementById("auto-clicker-button-3");

        autoClickerButton.textContent = `Auto Clicker (-$${formatNumber(autoClickerCosts.button1)})`;
        autoClickerButton2.textContent = `Mercedes Lot (-$${formatNumber(autoClickerCosts.button2)})`;
        autoClickerButton3.textContent = `Mercedes Parking Garage (-$${formatNumber(autoClickerCosts.button3)})`;
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});
