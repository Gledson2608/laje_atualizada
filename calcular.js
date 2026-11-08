// calcular.js - Contém apenas a lógica matemática do cálculo

// Função para ajustar para múltiplos de 0,20 metros
function ajustarViga(valor) {
    return Math.ceil(valor / 0.20) * 0.20; 
}
  
// Função principal de cálculo
function calcularLaje(slabType, length, width, beamDirection) {
    // Ajuste dos valores de largura e comprimento para múltiplos de 20cm
    const adjustedLength = ajustarViga(length);
    const adjustedWidth = ajustarViga(width);
  
    // Determina qual valor será usado como base para o cálculo
    const opposite = beamDirection === "length" ? adjustedWidth : adjustedLength;
    
    // O divisor muda dependendo do tipo de laje (Lajota=38cm, Isopor=42cm)
    const divisor = slabType === "ceramic" ? 0.38 : 0.42;
  
    // Número de vigas (sempre arredonda para cima, pois não existe meia viga)
    const beams = Math.ceil(opposite / divisor);
  
    // Tamanho da viga
    const beamSize = beamDirection === "length" ? adjustedLength : adjustedWidth;
  
    // Metragem quadrada (arredondando para 2 casas decimais)
    const squareMeters = parseFloat((beams * divisor * beamSize).toFixed(2));
  
    return { beams, beamSize, squareMeters };
}