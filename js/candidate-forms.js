// Máscaras para campos
function applyMasks() {
    // Máscara para telefone
    const phoneInput = document.getElementById('candidate-phone');
    const phoneCountry = document.getElementById('phone-country');
    
    if (phoneInput && phoneCountry) {
        phoneCountry.addEventListener('change', (e) => {
            const countryCode = e.target.value;
            phoneInput.value = ''; // Limpa o input ao mudar o país
            
            // Remove máscaras anteriores
            phoneInput.removeEventListener('input', phoneInput.maskHandler);
            
            // Aplica nova máscara baseada no país
            phoneInput.maskHandler = (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                switch(countryCode) {
                    case '+55': // Brasil
                        if (value.length <= 11) {
                            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                        }
                        break;
                    case '+1': // EUA/Canadá
                        if (value.length <= 10) {
                            value = value.replace(/^(\d{3})(\d)/, '($1) $2');
                            value = value.replace(/(\d{3})(\d)/, '$1-$2');
                        }
                        break;
                    case '+44': // Reino Unido
                        if (value.length <= 11) {
                            value = value.replace(/^(\d{4})(\d)/, '$1 $2');
                            value = value.replace(/(\d{4})(\d)/, '$1 $2');
                        }
                        break;
                    case '+971': // EAU
                    case '+966': // Arábia Saudita
                    case '+974': // Catar
                    case '+965': // Kuwait
                    case '+973': // Bahrein
                    case '+968': // Omã
                        if (value.length <= 9) {
                            value = value.replace(/^(\d{3})(\d)/, '$1 $2');
                            value = value.replace(/(\d{3})(\d)/, '$1 $2');
                        }
                        break;
                }
                
                e.target.value = value;
            };
            
            phoneInput.addEventListener('input', phoneInput.maskHandler);
        });
        
        // Dispara o evento para aplicar a máscara inicialmente
        phoneCountry.dispatchEvent(new Event('change'));
    }
}

// Validação de campos
function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    // Limpa mensagens de erro anteriores
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    inputs.forEach(input => input.classList.remove('error'));
    
    // Valida campos obrigatórios
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
            isValid = false;
            input.classList.add('error');
            
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'Este campo é obrigatório';
            input.parentElement.appendChild(message);
        }
    });
    
    // Validação de e-mail
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
            
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'E-mail inválido';
            emailInput.parentElement.appendChild(message);
        }
    }
    
    // Validação de URL do LinkedIn
    const linkedinInput = document.getElementById('linkedin-url');
    if (linkedinInput && linkedinInput.value) {
        const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
        if (!linkedinRegex.test(linkedinInput.value)) {
            isValid = false;
            linkedinInput.classList.add('error');
            
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'URL do LinkedIn inválida';
            linkedinInput.parentElement.appendChild(message);
        }
    }
    
    // Validação de arquivo de currículo
    const resumeInput = document.getElementById('resume-file');
    if (resumeInput && resumeInput.files.length > 0) {
        const file = resumeInput.files[0];
        const fileType = file.type;
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (!validTypes.includes(fileType)) {
            isValid = false;
            resumeInput.classList.add('error');
            
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'Formato de arquivo inválido. Use PDF, DOC ou DOCX';
            resumeInput.parentElement.appendChild(message);
        }
        
        // Verificar tamanho (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            isValid = false;
            resumeInput.classList.add('error');
            
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'O arquivo deve ter no máximo 5MB';
            resumeInput.parentElement.appendChild(message);
        }
    }
    
    return isValid;
}

// Inicialização do Select2
function initializeSelect2() {
    $('.select2').each(function() {
        const element = $(this);
        element.select2({
            theme: 'bootstrap-5',
            width: element.hasClass('phone-country') ? '120px' : '100%',
            language: {
                noResults: function() {
                    return "Nenhum resultado encontrado";
                },
                searching: function() {
                    return "Buscando...";
                }
            }
        });
    });
}

// Submissão do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    if (!validateForm(form)) {
        // Scroll para o primeiro erro
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        // Criar FormData para envio de arquivos
        const formData = new FormData(form);
        
        // Aqui você implementaria a chamada para sua API
        // Por exemplo: const response = await fetch('/api/candidates', { method: 'POST', body: formData });
        console.log('Dados do formulário:', Object.fromEntries(formData));
        
        // Simulação de envio
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Limpar formulário e mostrar mensagem de sucesso
        form.reset();
        
        // Reset Select2
        $('.select2').val(null).trigger('change');
        
        alert('Cadastro realizado com sucesso! Em breve entraremos em contato com oportunidades adequadas ao seu perfil.');
        
        // Redirecionar para a página inicial
        window.location.href = '/';
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Finalizar Cadastro';
    }
}

// Aprimorar campo de LinkedIn com preenchimento automático
function enhanceLinkedInField() {
    const linkedinInput = document.getElementById('linkedin-url');
    if (linkedinInput) {
        linkedinInput.addEventListener('blur', () => {
            let value = linkedinInput.value.trim();
            
            // Se o valor não estiver vazio e não começar com http ou https
            if (value && !value.startsWith('http')) {
                // Se começar com www., adiciona https://
                if (value.startsWith('www.')) {
                    value = 'https://' + value;
                }
                // Se começar com linkedin.com, adiciona https://
                else if (value.startsWith('linkedin.com')) {
                    value = 'https://' + value;
                }
                // Se começar com in/, adiciona https://linkedin.com/
                else if (value.startsWith('in/')) {
                    value = 'https://linkedin.com/' + value;
                }
                // Se for apenas o username, adiciona o caminho completo
                else if (!value.includes('.') && !value.includes('/')) {
                    value = 'https://linkedin.com/in/' + value;
                }
                // Atualiza o valor do campo
                linkedinInput.value = value;
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Select2
    initializeSelect2();
    
    // Aplicar máscaras
    applyMasks();
    
    // Aprimorar campo de LinkedIn
    enhanceLinkedInField();
    
    // Configurar envio do formulário
    const form = document.getElementById('candidate-register-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}); 