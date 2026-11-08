// script.js - Manipulação da tela e eventos do formulário

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("slabForm");
    const resultDiv = document.getElementById("result");
    const emptyState = document.getElementById("emptyState");
    const alertWarning = document.getElementById("alertWarning");
    const warningText = document.getElementById("warningText");
    const canvas = document.getElementById("slabCanvas");
    const ctx = canvas.getContext("2d");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
      
        const slabType = document.getElementById("slabType").value;
        const length = parseFloat(document.getElementById("length").value);
        const width = parseFloat(document.getElementById("width").value);
        const beamDirection = document.getElementById("beamDirection").value;
        const slabThickness = parseFloat(document.getElementById("slabThickness").value);
      
        const result = calcularLaje(slabType, length, width, beamDirection, slabThickness);
      
        // Atualiza os textos (Removido o concreto)
        document.getElementById("beams").textContent = result.beams;
        document.getElementById("beamSize").textContent = result.beamSize.toFixed(2);
        document.getElementById("squareMeters").textContent = result.squareMeters.toFixed(2);
        
        // Lógica do Alerta de Vão Livre
        const maiorVao = Math.max(length, width);
        if (maiorVao > 5) {
            warningText.innerHTML = `<b>Atenção:</b> O vão de ${maiorVao.toFixed(2)}m é considerado grande. Vãos acima de 5m podem exigir vigas duplas ou uma viga de sustentação (apoio) no meio para evitar flechas (curvaturas) na laje.`;
            alertWarning.style.display = "flex";
        } else {
            alertWarning.style.display = "none";
        }

        // Chama o desenho
        desenharLaje(length, width, beamDirection, result.beams);
      
        emptyState.style.display = "none";
        resultDiv.style.display = "block";
        
        resultDiv.style.animation = 'none';
        resultDiv.offsetHeight; 
        resultDiv.style.animation = null; 
    });

    // FUNÇÃO CORRIGIDA: Desenha a laje no Canvas
    function desenharLaje(length, width, beamDirection, numBeams) {
        const canvasWidth = 350;
        const canvasHeight = 270; 
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const padding = 30;
        const drawWidth = canvasWidth - (padding * 2);
        const drawHeight = canvasHeight - (padding * 2) - 20;

        // Fundo da laje
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(padding, padding, drawWidth, drawHeight);

        // 1. DESENHAR AS VIGAS (Laranja)
        ctx.strokeStyle = "#ff5722"; 
        ctx.lineWidth = 2; 
        ctx.beginPath();

        // O segredo está aqui: subtrair 1 do numBeams para achar os "espaços" reais
        // Ex: 8 vigas = 7 espaços. Assim a primeira linha é na borda (0) e a última na borda final.
        const numEspacos = numBeams - 1;
        
        for (let i = 0; i <= numEspacos; i++) {
            if (beamDirection === "length") {
                // Linhas verticais
                const x = padding + (i * (drawWidth / numEspacos));
                ctx.moveTo(x, padding);
                ctx.lineTo(x, padding + drawHeight);
            } else {
                // Linhas horizontais
                const y = padding + (i * (drawHeight / numEspacos));
                ctx.moveTo(padding, y);
                ctx.lineTo(padding + drawWidth, y);
            }
        }
        ctx.stroke();

        // 2. CONTORNO GERAL (Cinza)
        ctx.strokeStyle = "#94a3b8"; 
        ctx.lineWidth = 1;
        ctx.strokeRect(padding, padding, drawWidth, drawHeight);

        // 3. TEXTOS DE MEDIDA
        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        
        // Medida do topo (Largura)
        ctx.fillText(`${width.toFixed(2)}m`, canvasWidth / 2, padding - 10);
        
        // Medida lateral (Comprimento)
        ctx.save();
        ctx.translate(padding - 10, (padding + drawHeight) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${length.toFixed(2)}m`, 0, 0);
        ctx.restore();

        // 4. LEGENDA
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`* ${numBeams} vigas (incluindo as bordas).`, canvasWidth / 2, canvasHeight - 10);
    }
});