// Busca de dados da empresa pelo website
async function fetchCompanyData(website) {
    const websiteForm = document.querySelector('.form-group');
    websiteForm.classList.add('loading');
    
    try {
        // Simulação de API - em produção, substituir por chamada real à API
        // Exemplo: const response = await fetch(`https://api.clearbit.com/v1/companies/domain/${domain}`);
        
        // Simulando atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados simulados - substituir pela resposta real da API
        const companyData = {
            name: website.includes('microsoft') ? 'Microsoft Corporation' : 
                  website.includes('apple') ? 'Apple Inc.' : 
                  website.includes('emirates') ? 'Emirates Group' : 
                  'Empresa Internacional',
            domain: website.replace('https://', '').replace('http://', '').split('/')[0],
            logo: website.includes('microsoft') ? 'https://logo.clearbit.com/microsoft.com' : 
                  website.includes('apple') ? 'https://logo.clearbit.com/apple.com' : 
                  website.includes('emirates') ? 'https://logo.clearbit.com/emirates.com' : 
                  'https://via.placeholder.com/80',
            description: website.includes('microsoft') ? 'Empresa líder global em software e tecnologia.' : 
                         website.includes('apple') ? 'Empresa de tecnologia que projeta produtos eletrônicos.' : 
                         website.includes('emirates') ? 'Uma das maiores companhias aéreas do mundo.' : 
                         'Empresa internacional com foco em inovação.',
            email: website.includes('microsoft') ? 'contact@microsoft.com' : 
                   website.includes('apple') ? 'info@apple.com' : 
                   website.includes('emirates') ? 'contact@emirates.com' : 
                   `info@${website.replace('https://', '').replace('http://', '').split('/')[0]}`,
            country: website.includes('microsoft') ? 'US' : 
                     website.includes('apple') ? 'US' : 
                     website.includes('emirates') ? 'AE' : 
                     '',
            sector: website.includes('microsoft') ? 'tecnologia' : 
                    website.includes('apple') ? 'tecnologia' : 
                    website.includes('emirates') ? 'servicos' : 
                    ''
        };
        
        return companyData;
    } catch (error) {
        console.error('Erro ao buscar dados da empresa:', error);
        return null;
    } finally {
        websiteForm.classList.remove('loading');
    }
}

// Preencher preview de dados da empresa
function populateCompanyPreview(data) {
    const preview = document.querySelector('.company-preview');
    
    if (!data) {
        alert('Não foi possível encontrar informações para este site. Por favor, verifique o endereço ou preencha os dados manualmente.');
        return;
    }
    
    document.getElementById('company-logo').src = data.logo;
    document.getElementById('preview-name').textContent = data.name;
    document.getElementById('preview-description').textContent = data.description;
    document.getElementById('preview-email').textContent = data.email;
    
    preview.style.display = 'block';
}

// Preencher dados do formulário a partir dos dados da empresa
function populateCompanyForm(data) {
    document.getElementById('company-name').value = data.name || '';
    
    if (data.country) {
        const countrySelect = document.getElementById('company-country');
        countrySelect.value = data.country;
        // Dispara o evento de change para o Select2
        $(countrySelect).trigger('change');
    }
    
    if (data.sector) {
        const sectorSelect = document.getElementById('company-sector');
        sectorSelect.value = data.sector;
        $(sectorSelect).trigger('change');
    }
    
    // Preencher email do contato
    const contactEmail = document.getElementById('contact-email');
    if (contactEmail && data.email) {
        contactEmail.value = data.email;
    }
}

// Aplicação de dados ao formulário
function applyCompanyData() {
    const preview = document.querySelector('.company-preview');
    populateCompanyForm({
        name: document.getElementById('preview-name').textContent,
        email: document.getElementById('preview-email').textContent,
        domain: document.getElementById('company-website').value.replace('https://', '').replace('http://', '').split('/')[0]
    });
    
    preview.style.display = 'none';
}

// Máscaras para campos
function applyMasks() {
    // Máscara para telefone
    const phoneInput = document.getElementById('contact-phone');
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
    
    return isValid;
}

// Inicialização do Select2
function initializeSelect2() {
    $('.select2').each(function() {
        const element = $(this);
        const isMultiple = element.prop('multiple');
        
        element.select2({
            theme: 'bootstrap-5',
            width: element.hasClass('phone-country') ? '120px' : '100%',
            placeholder: isMultiple ? 'Selecione opções' : 'Selecione...',
            allowClear: true,
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
        // Criar FormData para envio
        const formData = new FormData(form);
        
        // Aqui você implementaria a chamada para sua API
        console.log('Dados do formulário:', Object.fromEntries(formData));
        
        // Simulação de envio
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mostrar mensagem de sucesso
        alert('Cadastro realizado com sucesso! Em breve nossa equipe entrará em contato para completar o seu cadastro e oferecer soluções personalizadas para sua empresa.');
        
        // Redirecionar para a página inicial ou dashboard
        window.location.href = '/';
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Finalizar Cadastro';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Select2
    initializeSelect2();
    
    // Aplicar máscaras
    applyMasks();
    
    // Configurar busca de dados da empresa
    const fetchButton = document.getElementById('fetch-company-data');
    if (fetchButton) {
        fetchButton.addEventListener('click', async () => {
            const websiteInput = document.getElementById('company-website');
            const website = websiteInput.value.trim();
            
            if (!website) {
                alert('Por favor, informe o site da empresa.');
                websiteInput.focus();
                return;
            }
            
            const companyData = await fetchCompanyData(website);
            populateCompanyPreview(companyData);
        });
    }
    
    // Configurar uso dos dados encontrados
    const useDataButton = document.getElementById('use-data');
    if (useDataButton) {
        useDataButton.addEventListener('click', () => {
            applyCompanyData();
        });
    }
    
    // Configurar envio do formulário
    const form = document.getElementById('company-register-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}); 