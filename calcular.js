// calcular.js - Contém apenas a lógica matemática do cálculo

// Função para ajustar para múltiplos de 0,20 metros
function ajustarViga(valor) {
    return Math.ceil(valor / 0.20) * 0.20; 
}
  
// Função principal de cálculo
function calcularLaje(slabType, length, width, beamDirection, slabThickness) {
    const adjustedLength = ajustarViga(length);
    const adjustedWidth = ajustarViga(width);
    const opposite = beamDirection === "length" ? adjustedWidth : adjustedLength;
    const divisor = slabType === "ceramic" ? 0.38 : 0.42;
  
    const beams = Math.ceil(opposite / divisor);
    const beamSize = beamDirection === "length" ? adjustedLength : adjustedWidth;
    const squareMeters = parseFloat((beams * divisor * beamSize).toFixed(2));
  
    // Retorna apenas o que precisamos agora
    return { beams, beamSize, squareMeters };
}