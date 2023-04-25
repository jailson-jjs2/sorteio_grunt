document.addEventListener('DOMContentLoaded', function() { // EVENTO PARA O DOM
  document.getElementById('form_sorteio').addEventListener('submit', function(evento) {//CALLBACK
    evento.preventDefault(); // PARA O FORMULARIO Ñ ATUALIZAR A PAG E APAGAR DADOS
    let numeroMaximo = document.getElementById('numero_maximo').value;
    numeroMaximo = parseInt(numeroMaximo);

    let numeroAleatorio = Math.random() * numeroMaximo;
    numeroAleatorio = Math.floor(numeroAleatorio + 1);
    
    document.getElementById('resultado_valor').innerText = numeroAleatorio;
    document.querySelector('.resultado').style.display = 'block';
  })
})