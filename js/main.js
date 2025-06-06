// Elementos do DOM
const menuItems = document.querySelectorAll('.menu-item');
const searchInput = document.querySelector('.search-bar input');
const notificationBtn = document.querySelector('.notification-btn');
const userProfile = document.querySelector('.user-profile');

// Função para carregar atividades recentes
async function loadRecentActivities() {
    try {
        const response = await fetch('/api/activities');
        const activities = await response.json();
        
        const activityList = document.querySelector('.activity-list');
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.description}</p>
                    <span class="activity-time">${formatDate(activity.timestamp)}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar atividades:', error);
    }
}

// Função para carregar notificações
async function loadNotifications() {
    try {
        const response = await fetch('/api/notifications');
        const notifications = await response.json();
        
        const notificationsList = document.querySelector('.notifications-list');
        notificationsList.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''}">
                <div class="notification-icon">
                    <i class="fas ${getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <span class="notification-time">${formatDate(notification.timestamp)}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar notificações:', error);
    }
}

// Função para formatar data
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Menos de 1 minuto
    if (diff < 60000) {
        return 'Agora mesmo';
    }
    
    // Menos de 1 hora
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
    }
    
    // Menos de 24 horas
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    }
    
    // Menos de 7 dias
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
    }
    
    // Formato padrão
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para obter ícone de atividade
function getActivityIcon(type) {
    const icons = {
        'candidate': 'fa-user-plus',
        'application': 'fa-file-alt',
        'interview': 'fa-calendar-check',
        'hiring': 'fa-check-circle',
        'default': 'fa-info-circle'
    };
    return icons[type] || icons.default;
}

// Função para obter ícone de notificação
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'warning': 'fa-exclamation-triangle',
        'error': 'fa-times-circle',
        'info': 'fa-info-circle',
        'default': 'fa-bell'
    };
    return icons[type] || icons.default;
}

// Função para lidar com logout
function handleLogout() {
    // Implementar lógica de logout
    console.log('Logout realizado');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Carregar dados iniciais
    loadRecentActivities();
    loadNotifications();
    
    // Menu ativo
    const currentPath = window.location.pathname;
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
    
    // Pesquisa
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Implementar lógica de pesquisa
        console.log('Pesquisando:', searchTerm);
    });
    
    // Notificações
    notificationBtn.addEventListener('click', () => {
        // Implementar lógica de notificações
        console.log('Abrir notificações');
    });
    
    // Perfil do usuário
    userProfile.addEventListener('click', () => {
        // Implementar lógica do perfil
        console.log('Abrir perfil');
    });
}); 