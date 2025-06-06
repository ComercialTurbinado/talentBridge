/**
 * Formulário de Cadastro de Candidato
 * 
 * Este script gerencia o formulário de cadastro de candidato 
 * com validação e navegação entre as etapas.
 */

$(document).ready(function() {
    // Inicializar Select2
    initializeSelect2();
    
    // Inicializar etapas do formulário
    initializeFormSteps();
    
    // Formatar telefone com base no país selecionado
    $('#phone-country').on('change', function() {
        applyPhoneFormat($(this).val());
    });
    
    // Formatar URL do LinkedIn quando o usuário sair do campo
    $('#candidate-linkedin').on('blur', function() {
        formatLinkedInUrl($(this).val());
    });
    
    // Manipular envio do formulário
    $('#candidate-register-form').on('submit', function(e) {
        e.preventDefault();
        
        if (validateFormStep(5)) {
            submitForm();
        }
    });
});

// Inicialização do Select2 para campos de seleção
function initializeSelect2() {
    $('.select2').each(function() {
        const element = $(this);
        const isMultiple = element.prop('multiple');
        const isPhoneCountry = element.hasClass('phone-country');
        
        let options = {
            theme: 'bootstrap-5',
            width: '100%',
            minimumResultsForSearch: (isPhoneCountry) ? Infinity : 8
        };
        
        if (isMultiple) {
            options.placeholder = 'Selecione uma ou mais opções';
            options.closeOnSelect = false;
            options.allowClear = true;
        }
        
        element.select2(options);
    });
}

// Gerenciamento de etapas do formulário
function initializeFormSteps() {
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.querySelector('.progress');
    const progressSteps = document.querySelectorAll('.step');
    
    // Próxima etapa
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.closest('.form-step').getAttribute('data-step'));
            const nextStep = this.getAttribute('data-next');
            
            if (validateFormStep(currentStep)) {
                goToStep(nextStep);
            }
        });
    });
    
    // Etapa anterior
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            goToStep(prevStep);
        });
    });
    
    // Função para navegar entre etapas
    function goToStep(stepNumber) {
        const targetStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        
        // Esconder todas as etapas
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Mostrar apenas a etapa alvo
        targetStep.classList.add('active');
        
        // Atualizar a barra de progresso
        const progress = (stepNumber - 1) * 20;
        progressBar.style.width = `${progress}%`;
        
        // Atualizar indicadores de etapa
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            
            if (stepNum < stepNumber) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNum == stepNumber) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        
        // Scroll para o topo do formulário
        window.scrollTo({
            top: document.querySelector('.register-container').offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// Validação de campos por etapa
function validateFormStep(stepNumber) {
    const step = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    const requiredFields = step.querySelectorAll('[required]');
    let isValid = true;
    
    // Limpar mensagens de erro anteriores
    const errorMessages = step.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
    
    // Validar campos obrigatórios
    requiredFields.forEach(field => {
        field.classList.remove('error');
        
        // Validação específica para diferentes tipos de campos
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(field, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
        } else if (field.type === 'file' && field.files.length > 0) {
            // Validar tamanho do arquivo (máximo 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB em bytes
            if (field.files[0].size > maxSize) {
                showError(field, 'O arquivo excede o tamanho máximo de 5MB');
                isValid = false;
            }
            
            // Validar tipo de arquivo
            const fileName = field.files[0].name;
            const fileExt = fileName.split('.').pop().toLowerCase();
            const allowedExts = ['pdf', 'doc', 'docx'];
            
            if (!allowedExts.includes(fileExt)) {
                showError(field, 'Formato de arquivo não permitido. Use PDF, DOC ou DOCX');
                isValid = false;
            }
        } else if (field.tagName === 'SELECT' && field.multiple) {
            // Para campos select múltiplos, verificar se pelo menos uma opção foi selecionada
            if ($(field).val() === null || $(field).val().length === 0) {
                showError(field, 'Selecione pelo menos uma opção');
                isValid = false;
            }
        } else if (field.value.trim() === '') {
            showError(field, 'Este campo é obrigatório');
            isValid = false;
        }
    });
    
    return isValid;
    
    // Função para mostrar mensagem de erro
    function showError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;
        
        // Lidar com grupos especiais como radiobuttons ou selects
        if (field.tagName === 'SELECT' && $(field).hasClass('select2')) {
            // Para campos select2, colocar após o container gerado pelo select2
            const select2Container = field.nextElementSibling;
            select2Container.after(errorDiv);
        } else if (field.type === 'checkbox' || field.type === 'radio') {
            // Para checkbox/radio, colocar após o label
            const label = field.nextElementSibling;
            label.after(errorDiv);
        } else {
            // Para inputs normais, colocar após o campo
            field.after(errorDiv);
        }
    }
}

// Formatar telefone com base no país selecionado
function applyPhoneFormat(countryCode) {
    const phoneInput = document.getElementById('candidate-phone');
    
    // Limpar formatação anterior
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '');
    
    // Aplicar máscara conforme o país selecionado
    if (countryCode === '+55') {
        // Formato brasileiro: (XX) XXXXX-XXXX
        $(phoneInput).off('input').on('input', function() {
            let value = $(this).val().replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length > 7) {
                $(this).val(`(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`);
            } else if (value.length > 2) {
                $(this).val(`(${value.substring(0, 2)}) ${value.substring(2)}`);
            } else if (value.length > 0) {
                $(this).val(`(${value}`);
            }
        });
    } else if (countryCode === '+971') {
        // Formato EAU: XX XXX XXXX
        $(phoneInput).off('input').on('input', function() {
            let value = $(this).val().replace(/\D/g, '');
            
            if (value.length > 9) {
                value = value.substring(0, 9);
            }
            
            if (value.length > 5) {
                $(this).val(`${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5)}`);
            } else if (value.length > 2) {
                $(this).val(`${value.substring(0, 2)} ${value.substring(2)}`);
            } else {
                $(this).val(value);
            }
        });
    } else {
        // Formato genérico internacional
        $(phoneInput).off('input');
    }
}

// Formatar URL do LinkedIn
function formatLinkedInUrl(url) {
    if (!url) return;
    
    const linkedinInput = document.getElementById('candidate-linkedin');
    let formattedUrl = url.trim();
    
    // Verificar se a URL já tem o protocolo
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
    }
    
    // Verificar se é um perfil do LinkedIn
    if (!formattedUrl.includes('linkedin.com/')) {
        // Se o usuário digitou apenas um nome de usuário
        if (!formattedUrl.includes('/')) {
            formattedUrl = 'https://linkedin.com/in/' + formattedUrl.replace('https://', '');
        } else {
            formattedUrl = 'https://linkedin.com/in/' + formattedUrl.split('/').pop();
        }
    }
    
    linkedinInput.value = formattedUrl;
}

// Envio do formulário
function submitForm() {
    // Mostrar indicador de carregamento
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Simular envio de API (em produção, substituir por chamada AJAX real)
    setTimeout(function() {
        // Simular conclusão bem-sucedida
        submitButton.innerHTML = '<i class="fas fa-check"></i> Cadastro Enviado!';
        
        // Exibir mensagem de sucesso
        const formContainer = document.querySelector('.register-form');
        formContainer.innerHTML = `
            <div class="success-message">
                <div class="icon-container">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Cadastro Realizado com Sucesso!</h2>
                <p>Seu currículo foi enviado para análise. Em breve entraremos em contato por e-mail com os próximos passos.</p>
                <p>Enquanto isso, fique atento ao seu e-mail e mantenha seus dados atualizados.</p>
                <div class="success-actions">
                    <a href="/" class="btn btn-outline">Voltar para o Início</a>
                </div>
            </div>
        `;
        
        // Scroll para o topo da mensagem
        window.scrollTo({
            top: document.querySelector('.register-container').offsetTop - 100,
            behavior: 'smooth'
        });
    }, 2000);
} 