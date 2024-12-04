document.addEventListener("DOMContentLoaded", function() {
    const achievementsContainer = document.createElement('div');
    achievementsContainer.className = 'achievements-container';
    document.body.appendChild(achievementsContainer);

    const achievements = [
        {
            id: 'start',
            title: 'Everyone starts somewhere',
            description: 'Reach $1 for the first time.',
            achieved: false
        },
        {
            id: 'over9000',
            title: "It's over 9,000!",
            description: 'Reach $9,001.',
            achieved: false
        },
        {
            id: 'pingpong',
            title: 'pong',
            description: 'Set your clicker\'s name to "ping".',
            achieved: false
        },
        {
            id: 'millionaire',
            title: 'Millionaire',
            description: 'Reach $1,000,000.',
            achieved: false
        },
        {
            id: 'firstAutoClicker',
            title: 'Auto Enthusiast',
            description: 'Buy your first auto-clicker.',
            achieved: false
        }
        // Add more achievements here later
    ];

    function checkAchievements(money, autoClickers) {
        if (money >= 1 && !achievements.find(a => a.id === 'start').achieved) {
            unlockAchievement('start');
        }
        if (money >= 9001) {
            unlockAchievement('over9000');
        }
        if (money >= 1000000) {
            unlockAchievement('millionaire');
        }
        if (autoClickers >= 1 && !achievements.find(a => a.id === 'firstAutoClicker').achieved) {
            unlockAchievement('firstAutoClicker');
        }
    }

    function checkNameAchievement(name) {
        if (name.toLowerCase() === 'ping') {
            unlockAchievement('pingpong');
        }
    }

    function unlockAchievement(id, allowRepetition = false) {
        const achievement = achievements.find(a => a.id === id);
        if (achievement && (!achievement.achieved || allowRepetition)) {
            if (!achievement.achieved || allowRepetition) {
                achievement.achieved = true;
                showAchievementNotification(achievement);
                if (!allowRepetition) saveAchievements();
            }
        }
    }
    
    function checkNameAchievement(name) {
        if (name.toLowerCase() === 'ping') {
            unlockAchievement('pingpong', true);
        }
    }
    

    function showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-image">
                <img src="https://th.bing.com/th/id/R.42b5e07842ba58868cd8086cd21ab211?rik=dqQVruoE4%2faQcg&pid=ImgRaw&r=0" alt="Achievement Image"> <!-- Use your image link here -->
            </div>
            <div class="achievement-text">
                <strong>${achievement.title}</strong>
                <p>${achievement.description}</p>
            </div>
        `;
        achievementsContainer.appendChild(notification);

        function removeNotification() {
            notification.remove();
        }

        if (document.hasFocus()) {
            setTimeout(removeNotification, 4000); // Remove after 4 seconds
        } else {
            const focusListener = () => {
                if (document.hasFocus()) {
                    setTimeout(removeNotification, 4000); // Remove after 4 seconds
                    window.removeEventListener('focus', focusListener);
                }
            };
            window.addEventListener('focus', focusListener);
        }
    }

    function saveAchievements() {
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }

    function loadAchievements() {
        const savedAchievements = JSON.parse(localStorage.getItem('achievements'));
        if (savedAchievements) {
            for (let i = 0; i < achievements.length; i++) {
                const savedAchievement = savedAchievements.find(a => a.id === achievements[i].id);
                if (savedAchievement) {
                    achievements[i].achieved = savedAchievement.achieved;
                }
            }
        }
    }

    // Load achievements on page load
    loadAchievements();

    // Export the checkAchievements and checkNameAchievement functions to be used in main.js and settings.js
    window.checkAchievements = checkAchievements;
    window.checkNameAchievement = checkNameAchievement;
});
