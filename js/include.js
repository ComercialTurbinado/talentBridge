/**
 * Script de inclusão para cabeçalho e rodapé
 * 
 * Este script carrega os arquivos de cabeçalho e rodapé e substitui as tags de modelo
 * com os valores apropriados para cada página.
 */

// Configuração base
const baseConfig = {
    // Determinar automaticamente a profundidade do URL para ajustar caminhos relativos
    baseUrl: getBaseUrl(),
    defaultTitle: 'Conectando Talentos e Oportunidades',
};

/**
 * Determina a URL base com base na profundidade do caminho atual
 */
function getBaseUrl() {
    const path = window.location.pathname;
    const depth = path.split('/').filter(Boolean).length;
    
    // Ajusta o caminho relativo com base na profundidade
    return depth > 0 ? '../'.repeat(depth) : './';
}

/**
 * Carrega um arquivo HTML e o insere em um elemento específico
 */
async function includeHTML(file, targetSelector, replacements = {}) {
    try {
        const response = await fetch(baseConfig.baseUrl + file);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${file}: ${response.status} ${response.statusText}`);
        }
        
        let html = await response.text();
        
        // Substitui as tags de modelo com os valores fornecidos
        html = html.replace(/%%BASE_URL%%/g, baseConfig.baseUrl.endsWith('/') ? baseConfig.baseUrl.slice(0, -1) : baseConfig.baseUrl);
        
        // Aplica as substituições personalizadas
        for (const [key, value] of Object.entries(replacements)) {
            html = html.replace(new RegExp(`%%${key}%%`, 'g'), value);
        }
        
        // Insere o HTML no elemento alvo
        document.querySelector(targetSelector).innerHTML = html;
        
        return true;
    } catch (error) {
        console.error(`Falha ao incluir ${file}:`, error);
        return false;
    }
}

/**
 * Inicializa os componentes da página
 */
async function initializePageComponents(pageConfig = {}) {
    // Mescla a configuração da página com a configuração base
    const config = { ...baseConfig, ...pageConfig };
    
    // Insere o cabeçalho
    if (config.headerTarget) {
        await includeHTML('includes/header.html', config.headerTarget, {
            TITULO: config.title || config.defaultTitle,
            ESTILOS_ADICIONAIS: config.additionalStyles || ''
        });
    }
    
    // Insere o rodapé
    if (config.footerTarget) {
        await includeHTML('includes/footer.html', config.footerTarget, {
            SCRIPTS_ADICIONAIS: config.additionalScripts || ''
        });
    }
}

// Exporta as funções para uso global
window.pageUtils = {
    include: includeHTML,
    initialize: initializePageComponents,
    getBaseUrl
}; 