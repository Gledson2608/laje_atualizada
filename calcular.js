// calcular.js - Contém apenas a lógica matemática do cálculo

function ajustarViga(valor) {
    return Math.ceil(valor / 0.20) * 0.20; 
}
  
function calcularLaje(slabType, length, width, beamDirection) {
    const adjustedLength = ajustarViga(length);
    const adjustedWidth = ajustarViga(width);
    const opposite = beamDirection === "length" ? adjustedWidth : adjustedLength;
    const divisor = slabType === "ceramic" ? 0.38 : 0.42;
  
    const beams = Math.ceil(opposite / divisor);
    const beamSize = beamDirection === "length" ? adjustedLength : adjustedWidth;
    
    const realCoverage = beams * divisor; 
    const squareMeters = parseFloat((realCoverage * beamSize).toFixed(2));
  
    return { 
        beams, 
        beamSize, 
        squareMeters, 
        adjustedLength, 
        adjustedWidth, 
        realCoverage, 
        divisor,
        opposite 
    };
}