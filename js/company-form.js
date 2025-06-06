/**
 * Formulário de Cadastro de Empresa
 * 
 * Este script gerencia o formulário de cadastro de empresa
 * com validação e busca de dados pelo website.
 */

$(document).ready(function() {
    // Inicializar Select2
    initializeSelect2();
    
    // Inicializar buscador pelo website
    initializeWebsiteSearch();
    
    // Formatar telefone com base no país selecionado
    $('#phone-country').on('change', function() {
        applyPhoneFormat($(this).val());
    });
    
    // Manipular envio do formulário
    $('#company-register-simple').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
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

// Inicializar busca pelo website
function initializeWebsiteSearch() {
    const searchButton = document.getElementById('search-company');
    const websiteInput = document.getElementById('company-website');
    const previewContainer = document.getElementById('company-preview');
    
    if (!searchButton || !websiteInput || !previewContainer) return;
    
    // Botão de busca
    searchButton.addEventListener('click', function() {
        const website = websiteInput.value.trim();
        
        if (!website) {
            showError(websiteInput, 'Por favor, informe o site da empresa');
            return;
        }
        
        if (!isValidUrl(website)) {
            showError(websiteInput, 'Por favor, informe um URL válido (com https://)');
            return;
        }
        
        // Mostrar loading
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchButton.disabled = true;
        
        // Simular busca de dados pelo site (em produção, substituir pela chamada API real)
        setTimeout(function() {
            // Dados simulados (em produção, viriam da API)
            const companyData = {
                name: extractCompanyNameFromUrl(website),
                sector: determineSectorFromUrl(website)
            };
            
            // Preencher preview
            document.getElementById('preview-name').textContent = companyData.name;
            document.getElementById('preview-sector').textContent = companyData.sector;
            
            // Mostrar preview
            previewContainer.style.display = 'block';
            
            // Restaurar botão
            searchButton.innerHTML = '<i class="fas fa-search"></i> Buscar';
            searchButton.disabled = false;
            
            // Scroll para o preview
            previewContainer.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
    
    // Botão para aplicar os dados do preview
    document.getElementById('apply-preview').addEventListener('click', function() {
        const companyName = document.getElementById('preview-name').textContent;
        const companySector = document.getElementById('preview-sector').textContent;
        
        // Preencher campos do formulário
        document.getElementById('company-name').value = companyName;
        
        // Encontrar e selecionar o setor no select
        const sectorSelect = document.getElementById('company-sector');
        const sectorOptions = Array.from(sectorSelect.options);
        
        const sectorMatch = sectorOptions.find(option => 
            option.text.toLowerCase().includes(companySector.toLowerCase())
        );
        
        if (sectorMatch) {
            sectorSelect.value = sectorMatch.value;
            $(sectorSelect).trigger('change'); // Para atualizar Select2
        }
        
        // Ocultar preview
        previewContainer.style.display = 'none';
        
        // Focar no próximo campo a ser preenchido
        document.getElementById('company-country').focus();
    });
    
    // Botão para cancelar
    document.getElementById('cancel-preview').addEventListener('click', function() {
        previewContainer.style.display = 'none';
    });
    
    // Função auxiliar para validar URL
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Extrai o nome da empresa a partir da URL (simplificado)
    function extractCompanyNameFromUrl(url) {
        try {
            const hostname = new URL(url).hostname;
            // Remover prefixos comuns e TLDs
            let name = hostname
                .replace(/^www\./i, '')
                .replace(/\.(com|org|net|io|co|ai|app|tech|br|ae|uk|us)(\.[a-z]{2})?$/i, '');
            
            // Dividir por pontos e traços, capitalizar cada parte
            name = name.split(/[.-]/)
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ');
                
            return name;
        } catch (e) {
            return 'Empresa Não Identificada';
        }
    }
    
    // Determina o setor baseado em palavras-chave na URL e domínio
    function determineSectorFromUrl(url) {
        const hostname = new URL(url).hostname.toLowerCase();
        const path = new URL(url).pathname.toLowerCase();
        
        const sectorKeywords = {
            'tecnologia': ['tech', 'software', 'app', 'digital', 'system', 'tech', 'cloud', 'data', 'ai'],
            'financas': ['bank', 'finance', 'invest', 'capital', 'money', 'fintech', 'pay'],
            'imobiliario': ['property', 'real', 'estate', 'imoveis', 'imovel', 'home'],
            'construcao': ['construct', 'build', 'engenh', 'obra', 'arquitet'],
            'hospitalidade': ['hotel', 'resort', 'hospit', 'stay', 'booking'],
            'turismo': ['travel', 'trip', 'tour', 'turismo', 'viagem'],
            'varejo': ['shop', 'store', 'retail', 'loja', 'mart', 'market', 'buy'],
            'saude': ['health', 'med', 'pharma', 'hospital', 'clinic', 'saude', 'doctor'],
            'educacao': ['edu', 'learn', 'school', 'curso', 'ensino', 'universi', 'college'],
            'logistica': ['logistic', 'transport', 'shipping', 'delivery', 'freight', 'cargo'],
            'servicos': ['service', 'consult', 'agency', 'solution']
        };
        
        // Concatenar hostname e path para busca
        const fullText = hostname + ' ' + path;
        
        // Verificar cada conjunto de palavras-chave
        for (const [sector, keywords] of Object.entries(sectorKeywords)) {
            for (const keyword of keywords) {
                if (fullText.includes(keyword)) {
                    return sectorDisplayNames[sector] || capitalize(sector);
                }
            }
        }
        
        return 'Não identificado';
    }
    
    // Nomes de exibição para os setores
    const sectorDisplayNames = {
        'tecnologia': 'Tecnologia',
        'financas': 'Finanças',
        'imobiliario': 'Imobiliário',
        'construcao': 'Construção',
        'hospitalidade': 'Hospitalidade',
        'turismo': 'Turismo',
        'varejo': 'Varejo',
        'saude': 'Saúde',
        'educacao': 'Educação',
        'logistica': 'Logística',
        'servicos': 'Serviços Profissionais'
    };
    
    // Função auxiliar para capitalizar texto
    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

// Validação do formulário
function validateForm() {
    const form = document.getElementById('company-register-simple');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Limpar mensagens de erro anteriores
    const errorMessages = form.querySelectorAll('.error-message');
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
        } else if (field.type === 'url' && field.value) {
            try {
                new URL(field.value);
            } catch (e) {
                showError(field, 'Por favor, insira uma URL válida com https://');
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
    
    // Se houver erro, rolar até o primeiro erro
    if (!isValid) {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
    
    return isValid;
}

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
    } else if (field.parentNode.classList.contains('input-with-button')) {
        // Para campos com botão, colocar após o contêiner
        field.parentNode.after(errorDiv);
    } else {
        // Para inputs normais, colocar após o campo
        field.after(errorDiv);
    }
}

// Formatar telefone com base no país selecionado
function applyPhoneFormat(countryCode) {
    const phoneInput = document.getElementById('contact-phone');
    
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
                <p>Suas informações foram recebidas. Um de nossos consultores entrará em contato em breve para discutir suas necessidades de recrutamento.</p>
                <p>Verifique seu e-mail para instruções de acesso à sua conta.</p>
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