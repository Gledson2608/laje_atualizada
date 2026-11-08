// script.js - Manipulação da tela e eventos do formulário

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("slabForm");
    const resultDiv = document.getElementById("result");
    const emptyState = document.getElementById("emptyState");
    const alertWarning = document.getElementById("alertWarning");
    const warningText = document.getElementById("warningText");
    const canvas = document.getElementById("slabCanvas");
    const ctx = canvas.getContext("2d");
    
    const btnMemory = document.getElementById("btnMemory");
    const memoryPanel = document.getElementById("memoryPanel");
    const memoryContent = document.getElementById("memoryContent");
    
    btnMemory.addEventListener("click", function() {
        if (memoryPanel.style.display === "none") {
            memoryPanel.style.display = "block";
            btnMemory.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ocultar Memória de Cálculo';
        } else {
            memoryPanel.style.display = "none";
            btnMemory.innerHTML = '<i class="fa-solid fa-square-root-variable"></i> Ver Memória de Cálculo';
        }
    });
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
      
        const slabType = document.getElementById("slabType").value;
        const length = parseFloat(document.getElementById("length").value);
        const width = parseFloat(document.getElementById("width").value);
        const beamDirection = document.getElementById("beamDirection").value;
      
        const result = calcularLaje(slabType, length, width, beamDirection);
      
        document.getElementById("beams").textContent = result.beams;
        document.getElementById("beamSize").textContent = result.beamSize.toFixed(2);
        document.getElementById("squareMeters").textContent = result.squareMeters.toFixed(2);
        
        const maiorVao = Math.max(length, width);
        if (maiorVao > 5) {
            warningText.innerHTML = `<b>Atenção:</b> O vão de ${maiorVao.toFixed(2)}m é considerado grande. Vãos acima de 5m podem exigir vigas duplas ou uma viga de sustentação (apoio) no meio para evitar flechas (curvaturas) na laje.`;
            alertWarning.style.display = "flex";
        } else {
            alertWarning.style.display = "none";
        }

        const tipoTexto = slabType === "ceramic" ? "Lajota (0,38m)" : "Isopor (0,42m)";
        const dirTexto = beamDirection === "length" ? "Comprimento" : "Largura";

        memoryContent.innerHTML = `
            <p><strong>1. Ajuste de medidas (múltiplos de 20cm):</strong><br>
            Comprimento original ${length.toFixed(2)}m → Ajustado para <span class="highlight-math">${result.adjustedLength.toFixed(2)}m</span>.<br>
            Largura original ${width.toFixed(2)}m → Ajustada para <span class="highlight-math">${result.adjustedWidth.toFixed(2)}m</span>.</p>
            
            <p><strong>2. Definição do vão:</strong><br>
            Como a direção da viga é no <strong>${dirTexto}</strong>, usamos o lado oposto de <span class="highlight-math">${result.opposite.toFixed(2)}m</span> para o cálculo.</p>

            <p><strong>3. Número de Vigas:</strong><br>
            Divisor do tipo ${tipoTexto}: <span class="highlight-math">${result.divisor}m</span>.<br>
            Conta: ${result.opposite.toFixed(2)} / ${result.divisor} = ${(result.opposite / result.divisor).toFixed(2)}.<br>
            Arredondando para cima: <span class="highlight-math">${result.beams} vigas</span>.</p>

            <p><strong>4. Área Real (considerando as vigas):</strong><br>
            As ${result.beams} vigas cobrem uma largura real de: ${result.beams} x ${result.divisor} = <span class="highlight-math">${result.realCoverage.toFixed(2)}m</span>.<br>
            Área final: ${result.realCoverage.toFixed(2)}m x ${result.beamSize.toFixed(2)}m = <span class="highlight-math">${result.squareMeters.toFixed(2)}m²</span>.</p>
        `;

        memoryPanel.style.display = "none";
        btnMemory.innerHTML = '<i class="fa-solid fa-square-root-variable"></i> Ver Memória de Cálculo';

        desenharLaje(length, width, beamDirection, result.beams);
      
        emptyState.style.display = "none";
        resultDiv.style.display = "block";
        
        resultDiv.style.animation = 'none';
        resultDiv.offsetHeight; 
        resultDiv.style.animation = null; 
    });

    function desenharLaje(length, width, beamDirection, numBeams) {
        const canvasWidth = 350;
        const canvasHeight = 270; 
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const padding = 30;
        const drawWidth = canvasWidth - (padding * 2);
        const drawHeight = canvasHeight - (padding * 2) - 20;

        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(padding, padding, drawWidth, drawHeight);

        ctx.strokeStyle = "#ff5722"; 
        ctx.lineWidth = 2; 
        ctx.beginPath();

        const numEspacos = numBeams - 1;
        
        for (let i = 0; i <= numEspacos; i++) {
            if (beamDirection === "length") {
                const x = padding + (i * (drawWidth / numEspacos));
                ctx.moveTo(x, padding);
                ctx.lineTo(x, padding + drawHeight);
            } else {
                const y = padding + (i * (drawHeight / numEspacos));
                ctx.moveTo(padding, y);
                ctx.lineTo(padding + drawWidth, y);
            }
        }
        ctx.stroke();

        ctx.strokeStyle = "#94a3b8"; 
        ctx.lineWidth = 1;
        ctx.strokeRect(padding, padding, drawWidth, drawHeight);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        
        ctx.fillText(`${width.toFixed(2)}m`, canvasWidth / 2, padding - 10);
        
        ctx.save();
        ctx.translate(padding - 10, (padding + drawHeight) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${length.toFixed(2)}m`, 0, 0);
        ctx.restore();

        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`* ${numBeams} vigas (incluindo as bordas).`, canvasWidth / 2, canvasHeight - 10);
    }
});