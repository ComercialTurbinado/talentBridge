// Elementos do DOM
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const registerForms = document.querySelectorAll('.register-form');

// Função para alternar entre as tabs
function switchTab(tabId) {
    // Remover classe active de todas as tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Adicionar classe active na tab selecionada
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Event Listeners para as tabs
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        switchTab(tabId);
    });
});

// Função para validar formulário
function validateForm(form) {
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Função para redirecionar ao formulário completo
function redirectToForm(type) {
    if (type === 'empresa') {
        window.location.href = './empresa/cadastro-simples';
    } else if (type === 'candidato') {
        window.location.href = './candidato/cadastro';
    }
}

// Função para enviar formulário
async function submitForm(form, type) {
    if (!validateForm(form)) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    try {
        // Redirecionar para o formulário completo
        redirectToForm(type);
    } catch (error) {
        console.error('Erro ao processar formulário:', error);
        alert('Ocorreu um erro ao processar o formulário. Por favor, tente novamente.');
    }
}

// Event Listeners para os formulários
registerForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = form.closest('.tab-content').id;
        submitForm(form, type);
    });
});

// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header fixo com scroll
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
}); 