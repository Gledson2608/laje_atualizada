document.getElementById("slabForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const slabType = document.getElementById("slabType").value;
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const beamDirection = document.getElementById("beamDirection").value;
  
    // Chama a função de cálculo
    const result = calcularLaje(slabType, length, width, beamDirection);
  
    // Exibe os resultados
    document.getElementById("beams").textContent = result.beams;
    document.getElementById("beamSize").textContent = result.beamSize.toFixed(2);
    document.getElementById("squareMeters").textContent = result.squareMeters; // Aqui não arredonda
  
    // Exibe a seção de resultados
    document.getElementById("result").style.display = "block";
  });
  
  // Função para ajustar para múltiplos de 0,20 metros
  function ajustarViga(valor) {
    return Math.ceil(valor / 0.20) * 0.20; // Ajusta para o próximo múltiplo de 0,20
  }
  
  // Função de cálculo separada
  function calcularLaje(slabType, length, width, beamDirection) {
    // Ajuste dos valores de largura e comprimento
    const adjustedLength = ajustarViga(length);
    const adjustedWidth = ajustarViga(width);
  
    // Determina qual valor será usado como base para o cálculo
    const opposite = beamDirection === "length" ? adjustedWidth : adjustedLength;
    const divisor = slabType === "ceramic" ? 0.38 : 0.42;
  
    // Número de vigas
    const beams = Math.ceil(opposite / divisor);
  
    // Tamanho da viga
    const beamSize = beamDirection === "length" ? adjustedLength : adjustedWidth;
  
    // Metragem quadrada (sem arredondar)
    const squareMeters = beams * divisor * beamSize;
  
    return { beams, beamSize, squareMeters };
  }
