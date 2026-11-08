// script.js - Manipulação da tela e eventos do formulário

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("slabForm");
    const resultDiv = document.getElementById("result");
    const emptyState = document.getElementById("emptyState");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede a página de recarregar
      
        // Pega os valores digitados pelo usuário
        const slabType = document.getElementById("slabType").value;
        const length = parseFloat(document.getElementById("length").value);
        const width = parseFloat(document.getElementById("width").value);
        const beamDirection = document.getElementById("beamDirection").value;
      
        // Chama a função matemática que está no arquivo calcular.js
        const result = calcularLaje(slabType, length, width, beamDirection);
      
        // Exibe os resultados na tela
        document.getElementById("beams").textContent = result.beams;
        document.getElementById("beamSize").textContent = result.beamSize.toFixed(2);
        document.getElementById("squareMeters").textContent = result.squareMeters.toFixed(2);
      
        // Esconde a mensagem de "tela vazia" e mostra o resultado
        emptyState.style.display = "none";
        resultDiv.style.display = "block";
        
        // Truque para reiniciar a animação do CSS toda vez que calcular
        resultDiv.style.animation = 'none';
        resultDiv.offsetHeight; /* trigger reflow */
        resultDiv.style.animation = null; 
    });
});