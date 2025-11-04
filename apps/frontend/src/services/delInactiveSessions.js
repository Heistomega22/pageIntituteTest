import { SessionController } from '../controllers/sessionController.js';

const sessionController = new SessionController();

document.addEventListener('DOMContentLoaded', async () => {
    const delButton = document.getElementById('delete-sessions-btn');
    const delInactiveButton = document.getElementById('delete-inactive-sessions-btn');

    if (delButton) {
        delButton.addEventListener('click', async () => {
            await sessionController.deleteAllSessions();
            alert('Inactive sessions deleted successfully.');
        });
    }

    if (delInactiveButton) {
        delInactiveButton.addEventListener('click', async () => {
            await sessionController.deleteInactiveSessions();
            alert('All sessions deleted successfully.');
        });
    }
});