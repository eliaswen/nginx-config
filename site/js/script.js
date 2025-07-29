document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const size = Math.random() * (120 - 30) + 30;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${Math.random() * 95}%`;
        const duration = Math.random() * (30 - 10) + 10;
        shape.style.animationDuration = `${duration}s`;
        const delay = Math.random() * -duration;
        shape.style.animationDelay = `${delay}s`;
        shape.style.opacity = '0.07';
    });

    const discordButton = document.getElementById('discord-copy-button');
    const notification = document.getElementById('copy-notification');
    const closeNotificationButton = document.getElementById('close-notification');
    let notificationTimeout;

    if (discordButton) {
        discordButton.addEventListener('click', (e) => {
            e.preventDefault();
            const usernameToCopy = 'ewenlau';
            navigator.clipboard.writeText(usernameToCopy).then(() => {
                notification.classList.add('show');
                if (notificationTimeout) clearTimeout(notificationTimeout);
                notificationTimeout = setTimeout(() => {
                    notification.classList.remove('show');
                }, 4000);
            }).catch(err => {
                console.error('Failed to copy username: ', err);
                alert('Failed to copy username. Please try manually.');
            });
        });
    }

    if (closeNotificationButton) {
        closeNotificationButton.addEventListener('click', () => {
            notification.classList.remove('show');
            if (notificationTimeout) clearTimeout(notificationTimeout);
        });
    }

    const targetSequence = ['ArrowUp', 'ArrowDown', 'ArrowUp', 'ArrowDown', 'ArrowUp', 'ArrowDown'];
    let keySequence = [];
    let messageShown = false;
    const easterEggDiv = document.getElementById('easter-egg-message');

    document.addEventListener('keydown', (e) => {
        if (messageShown || !easterEggDiv) return;

        const keyName = e.key;

        if (keyName === 'ArrowUp' || keyName === 'ArrowDown') {
            keySequence.push(keyName);

            if (keySequence.length > targetSequence.length) {
                keySequence.shift();
            }

            if (keySequence.length === targetSequence.length) {
                let match = true;
                for (let i = 0; i < targetSequence.length; i++) {
                    if (keySequence[i] !== targetSequence[i]) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    easterEggDiv.style.display = 'block';
                    messageShown = true;
                    keySequence = [];
                }
            }
        } else {
            if (keyName !== 'Control' && keyName !== 'Alt' && keyName !== 'Shift' && keyName !== 'Meta') {
                 keySequence = [];
            }
        }
    });
});
