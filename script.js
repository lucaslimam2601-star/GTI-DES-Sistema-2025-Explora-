// --- Cookie Management ---

function checkCookies() {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
        document.getElementById('cookieBanner').classList.remove('hidden');
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieBanner').classList.add('hidden');
    // Adicionar código para carregar Google Analytics, etc. aqui
}

function rejectCookies() {
    document.getElementById('cookieBanner').classList.add('hidden');
    // Opcional: Limpar cookies existentes
}

// --- Modal Functions ---

function showRegisterModal() {
    closeLoginModal();
    document.getElementById('registerModal').classList.remove('hidden');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.add('hidden');
}

function showLoginModal() {
    closeRegisterModal();
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

// --- AI Suggestions Functionality ---

function generateAISuggestions(input) {
    // Simulação de resposta da IA baseada em palavras-chave
    const suggestions = [];
    
    if (input.includes('romântic') || input.includes('amor') || input.includes('europa')) {
        suggestions.push({
            title: 'Paris, França - Pacote Romântico',
            description: '7 noites em hotel boutique próximo à Torre Eiffel, jantar em restaurante Michelin, cruzeiro noturno no Sena',
            price: 'R$9.000',
            rating: 5
        });
    }
    
    if (input.includes('praia') || input.includes('mar') || input.includes('tropical')) {
        suggestions.push({
            title: 'Maldívias - Paraíso Tropical',
            description: '5 noites em bangalô sobre as águas, mergulho com snorkel, spa aquático e gastronomia local',
            price: 'R$15.000',
            rating: 5
        });
    }
    
    if (input.includes('aventura') || input.includes('natureza') || input.includes('trekking')) {
        suggestions.push({
            title: 'Nova Zelândia - Aventura nos Alpes',
            description: 'Roteiro de 10 dias incluindo trekking, bungee jump, visita aos estúdios Hobbit e geleiras',
            price: 'R$9.500',
            rating: 4
        });
    }
    
    if (input.includes('cultura') || input.includes('história') || input.includes('itália')) {
        suggestions.push({
            title: 'Roma, Itália - Jornada Histórica',
            description: '6 noites com guia especializado, Coliseu, Vaticano, Pompeia e degustação de vinhos',
            price: 'R$12.000',
            rating: 5
        });
    }
    
    // Sugestão padrão caso nenhuma palavra-chave seja encontrada
    if (suggestions.length === 0) {
        suggestions.push({
            title: 'Destino Personalizado',
            description: 'Nossa IA analisou suas preferências e está criando um roteiro único para você!',
            price: 'Sob consulta',
            rating: 5
        });
    }
    
    return suggestions;
}

function getAISuggestions() {
    const input = document.getElementById('aiInput').value.toLowerCase();
    
    if (!input.trim()) {
        alert('Por favor, descreva o que você procura na sua viagem!');
        return;
    }
    
    const resultsDiv = document.getElementById('aiResults');
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';
    
    const suggestions = generateAISuggestions(input);
    
    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'bg-white rounded-lg p-4 shadow-sm';
        suggestionDiv.innerHTML = `
            <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <i class="fas fa-map-marker-alt text-blue-600"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800">${suggestion.title}</h4>
                    <p class="text-gray-600 mt-1">${suggestion.description}</p>
                    <div class="flex items-center mt-2">
                        <span class="text-blue-600 font-semibold">${suggestion.price}</span>
                        <span class="text-yellow-400 ml-4">${'⭐'.repeat(suggestion.rating)}</span>
                    </div>
                </div>
            </div>
        `;
        suggestionsList.appendChild(suggestionDiv);
    });
    
    resultsDiv.classList.remove('hidden');
}

function clearSearch() {
    document.getElementById('aiInput').value = '';
    document.getElementById('aiResults').classList.add('hidden');
}

function scrollToSearch() {
    document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', function() {
    checkCookies();
    
    // Adicionar event listener para Enter no textarea
    document.getElementById('aiInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            getAISuggestions();
        }
    });
});
