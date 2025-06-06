// Máscaras para campos
function applyMasks() {
    // Máscara para CNPJ
    const cnpjInput = document.getElementById('company-cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 14) {
                value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Máscara para telefone internacional
    const phoneInput = document.getElementById('company-phone');
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

    // Máscara para Tax ID
    const taxIdInput = document.getElementById('company-tax-id');
    if (taxIdInput) {
        taxIdInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 15) {
                value = value.replace(/^(\d{3})(\d)/, '$1-$2');
                value = value.replace(/(\d{3})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Máscara para Código Postal
    const postalCodeInput = document.getElementById('company-postal-code');
    if (postalCodeInput) {
        postalCodeInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/^(\d{3})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Máscara para CEP
    const cepInput = document.getElementById('company-cep');
    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }
}

// Validação de CNPJ
function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    if (cnpj.length !== 14) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cnpj.charAt(12))) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cnpj.charAt(13))) return false;
    
    return true;
}

// Busca de CEP
async function fetchCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            throw new Error('CEP não encontrado');
        }
        
        return data;
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
}

// Preenchimento automático do endereço
async function handleCEPInput(cep) {
    const cepData = await fetchCEP(cep);
    if (cepData) {
        document.getElementById('company-street').value = cepData.logradouro;
        document.getElementById('company-neighborhood').value = cepData.bairro;
        document.getElementById('company-city').value = cepData.localidade;
        document.getElementById('company-state').value = cepData.uf;
    }
}

// Gerenciamento de Etapas
let currentStep = 1;
const totalSteps = 7;

function updateProgress() {
    // Atualiza a barra de progresso
    const progress = (currentStep - 1) * (100 / (totalSteps - 1));
    document.querySelector('.progress').style.width = `${progress}%`;
    
    // Atualiza os indicadores de etapa
    document.querySelectorAll('.step').forEach(step => {
        const stepNumber = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
}

function showStep(stepNumber) {
    // Esconde todas as etapas
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Mostra a etapa atual
    const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Atualiza o progresso
    currentStep = stepNumber;
    updateProgress();
}

function validateStep(stepNumber) {
    const stepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    const inputs = stepElement.querySelectorAll('input, select, textarea');
    let isValid = true;
    
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
    
    return isValid;
}

// Atualizar dados de confirmação
function updateConfirmationData() {
    document.getElementById('confirm-company-name').textContent = document.getElementById('company-name').value;
    document.getElementById('confirm-company-website').textContent = document.getElementById('company-website').value;
    document.getElementById('confirm-company-email').textContent = document.getElementById('company-email').value;
    
    const companyPhoneCountry = document.getElementById('company-phone-country');
    const companyPhone = document.getElementById('company-phone');
    document.getElementById('confirm-company-phone').textContent = companyPhoneCountry.value + ' ' + companyPhone.value;
    
    document.getElementById('confirm-contact-name').textContent = document.getElementById('contact-name').value;
    document.getElementById('confirm-contact-email').textContent = document.getElementById('contact-email').value;
    
    const phoneCountry = document.getElementById('phone-country');
    const phone = document.getElementById('contact-phone');
    document.getElementById('confirm-contact-phone').textContent = phoneCountry.value + ' ' + phone.value;
}

// Event Listeners para navegação entre etapas
document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', async () => {
        // Validação da etapa atual
        if (!validateStep(currentStep)) {
            return;
        }
        
        // Verificar se está saindo da etapa de contato (etapa 2) para realizar cadastro rápido
        if (currentStep === 2) {
            const success = await performQuickRegistration();
            if (!success) {
                return;
            }
        }
        
        // Atualizar tela de confirmação se estiver indo para a etapa 6
        if (currentStep === 5) {
            updateConfirmationData();
        }
        
        showStep(currentStep + 1);
    });
});

document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', () => {
        showStep(currentStep - 1);
    });
});

// Gerenciamento de campos específicos por tipo de empresa
function handleCompanyType() {
    const companyType = document.getElementById('company-type');
    const brazilFields = document.querySelectorAll('.company-brazil');
    const internationalFields = document.querySelectorAll('.company-international');
    
    if (companyType) {
        companyType.addEventListener('change', (e) => {
            const type = e.target.value;
            
            brazilFields.forEach(field => {
                field.style.display = type === 'brasil' ? 'block' : 'none';
                const input = field.querySelector('input, select');
                if (input) {
                    input.required = type === 'brasil';
                }
            });
            
            internationalFields.forEach(field => {
                field.style.display = type === 'internacional' ? 'block' : 'none';
                const input = field.querySelector('input, select');
                if (input) {
                    input.required = type === 'internacional';
                }
            });
        });
    }
}

// Inicialização do Select2
function initializeSelect2() {
    // Configuração padrão para todos os selects
    const defaultConfig = {
        theme: 'bootstrap-5',
        width: '100%',
        language: {
            noResults: function() {
                return "Nenhum resultado encontrado";
            },
            searching: function() {
                return "Buscando...";
            }
        }
    };

    // Inicializa o select de país
    $('#company-country').select2({
        ...defaultConfig,
        placeholder: "Selecione o país",
        allowClear: true,
        matcher: function(params, data) {
            // Se não houver termo de busca, retorna todos os resultados
            if ($.trim(params.term) === '') {
                return data;
            }

            // Remove emojis e acentos para busca
            const term = params.term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const text = data.text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            // Busca por nome do país ou código
            if (text.indexOf(term) > -1 || data.id.toLowerCase() === term) {
                return data;
            }

            return null;
        }
    });

    // Inicializa o select de DDD
    $('#phone-country').select2({
        ...defaultConfig,
        placeholder: "DDD",
        allowClear: true,
        width: '120px',
        matcher: function(params, data) {
            if ($.trim(params.term) === '') {
                return data;
            }

            const term = params.term.toLowerCase();
            const text = data.text.toLowerCase();

            // Busca por código do país, DDD ou nome do país
            if (text.indexOf(term) > -1 || data.id === term || data.element.dataset.country === term) {
                return data;
            }

            return null;
        }
    });
}

// Busca de dados da empresa pelo website
async function fetchCompanyData(website) {
    const websiteForm = document.querySelector('.form-step[data-step="1"]');
    websiteForm.classList.add('loading');
    
    try {
        // Simulação de API - em produção, substituir por chamada real à API
        // Exemplo: const response = await fetch(`https://api.clearbit.com/v1/companies/domain/${domain}`);
        
        // Simulando atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1800));
        
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
            description: website.includes('microsoft') ? 'Empresa líder global em software e tecnologia, fornecendo soluções para negócios e consumidores.' : 
                         website.includes('apple') ? 'Empresa de tecnologia que projeta e desenvolve produtos eletrônicos de consumo, software e serviços online.' : 
                         website.includes('emirates') ? 'Uma das maiores companhias aéreas do mundo, oferecendo serviços de transporte aéreo de primeira classe.' : 
                         'Empresa internacional com foco em inovação e soluções globais.',
            email: website.includes('microsoft') ? 'contact@microsoft.com' : 
                   website.includes('apple') ? 'info@apple.com' : 
                   website.includes('emirates') ? 'contact@emirates.com' : 
                   `info@${website.replace('https://', '').replace('http://', '').split('/')[0]}`,
            phone: website.includes('microsoft') ? '+1 (425) 882-8080' : 
                   website.includes('apple') ? '+1 (408) 996-1010' : 
                   website.includes('emirates') ? '+971 600 555 555' : 
                   '+1 (000) 000-0000',
            location: website.includes('microsoft') ? 'Redmond, Washington, EUA' : 
                      website.includes('apple') ? 'Cupertino, California, EUA' : 
                      website.includes('emirates') ? 'Dubai, Emirados Árabes Unidos' : 
                      'Localização não disponível',
            country: website.includes('microsoft') ? 'US' : 
                     website.includes('apple') ? 'US' : 
                     website.includes('emirates') ? 'AE' : 
                     '',
            countryCode: website.includes('microsoft') ? '+1' : 
                         website.includes('apple') ? '+1' : 
                         website.includes('emirates') ? '+971' : 
                         '',
            category: website.includes('microsoft') ? 'tecnologia' : 
                      website.includes('apple') ? 'tecnologia' : 
                      website.includes('emirates') ? 'servicos' : 
                      '',
            size: website.includes('microsoft') ? '1001+' : 
                  website.includes('apple') ? '1001+' : 
                  website.includes('emirates') ? '1001+' : 
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
    document.getElementById('preview-address').textContent = data.location || 'Não disponível';
    document.getElementById('preview-phone').textContent = data.phone || 'Não disponível';
    document.getElementById('preview-email').textContent = data.email || 'Não disponível';
    
    preview.style.display = 'block';
}

// Preencher dados do formulário a partir dos dados da empresa
function populateCompanyForm(data) {
    // Básicos
    document.getElementById('company-name').value = data.name || '';
    document.getElementById('company-email').value = data.email || '';
    
    // País e telefone se disponíveis
    if (data.country) {
        const countrySelect = document.getElementById('company-country');
        countrySelect.value = data.country;
        // Dispara o evento de change para o Select2
        $(countrySelect).trigger('change');
    }
    
    if (data.countryCode && data.phone) {
        const phoneCountrySelect = document.getElementById('phone-country');
        phoneCountrySelect.value = data.countryCode;
        // Dispara o evento de change para o Select2
        $(phoneCountrySelect).trigger('change');
        
        // Extrair apenas números do telefone
        const phoneNumbers = data.phone.replace(/\D/g, '');
        document.getElementById('company-phone').value = phoneNumbers;
    }
    
    // Dados da empresa se disponíveis
    if (data.size) {
        document.getElementById('company-size').value = data.size;
    }
    
    if (data.category) {
        document.getElementById('company-sector').value = data.category;
    }
    
    if (data.description) {
        document.getElementById('company-description').value = data.description;
    }
    
    // Armazenar o domínio que foi consultado
    if (data.domain) {
        const domainInput = document.createElement('input');
        domainInput.type = 'hidden';
        domainInput.name = 'company-domain';
        domainInput.value = data.domain;
        document.getElementById('company-register-form').appendChild(domainInput);
    }
}

// Aplicação de dados ao formulário
function applyCompanyData() {
    const preview = document.querySelector('.company-preview');
    populateCompanyForm({
        name: document.getElementById('preview-name').textContent,
        email: document.getElementById('preview-email').textContent,
        phone: document.getElementById('preview-phone').textContent,
        location: document.getElementById('preview-address').textContent,
        description: document.getElementById('preview-description').textContent,
        domain: document.getElementById('company-website').value.replace('https://', '').replace('http://', '').split('/')[0]
    });
    
    preview.style.display = 'none';
    
    // Avança para a etapa de contato
    showStep(2);
}

// Cadastro rápido com dados iniciais
async function performQuickRegistration() {
    const form = document.getElementById('company-register-form');
    const formData = new FormData(form);
    const quickData = {
        website: formData.get('company-website'),
        name: formData.get('company-name'),
        email: formData.get('contact-email'),
        phone: formData.get('phone-country') + ' ' + formData.get('contact-phone'),
        contactName: formData.get('contact-name'),
        acceptTerms: formData.get('quick-terms') === 'on',
        acceptMarketing: formData.get('marketing-consent') === 'on'
    };
    
    if (!quickData.acceptTerms) {
        return false;
    }
    
    try {
        // Aqui você faria o cadastro inicial na API
        console.log('Cadastro rápido realizado:', quickData);
        
        // Simular envio
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Indicar que já foi feito o cadastro rápido
        const registrationFlag = document.createElement('input');
        registrationFlag.type = 'hidden';
        registrationFlag.name = 'quick-registration-complete';
        registrationFlag.value = 'true';
        form.appendChild(registrationFlag);
        
        return true;
    } catch (error) {
        console.error('Erro ao realizar cadastro rápido:', error);
        return false;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Select2
    initializeSelect2();
    
    // Aplicar máscaras
    applyMasks();
    
    // Configurar tipo de empresa
    handleCompanyType();
    
    // Configurar busca de CEP
    const cepInput = document.getElementById('company-cep');
    if (cepInput) {
        cepInput.addEventListener('blur', () => {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length === 8) {
                handleCEPInput(cep);
            }
        });
    }
    
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
    
    // Configurar edição manual dos dados
    const editDataButton = document.getElementById('edit-data');
    if (editDataButton) {
        editDataButton.addEventListener('click', () => {
            document.querySelector('.company-preview').style.display = 'none';
            showStep(2);
        });
    }
    
    // Configurar envio do formulário
    const form = document.getElementById('company-register-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Valida a etapa atual
            if (!validateStep(6)) {
                return;
            }
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Aqui você implementaria a chamada para sua API
                console.log('Dados completos do formulário:', data);
                
                // Simular envio
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Avançar para a tela de oportunidades
                showStep(7);
                
                // Scroll para o topo da página
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
                submitButton.disabled = false;
                submitButton.textContent = 'Finalizar Cadastro';
            }
        });
    }
    
    // Inicializa o Select2 para todos os selects
    $('.select2').each(function() {
        $(this).select2({
            theme: 'bootstrap-5',
            width: $(this).hasClass('phone-country') ? '120px' : '100%',
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
    
    // Inicializa o progresso
    updateProgress();
}); 