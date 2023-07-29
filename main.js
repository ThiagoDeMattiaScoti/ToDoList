const novaTarefa = document.querySelector('.colocar');
const enviaTarefa = document.querySelector('.enviar');
const lista = document.querySelector('.lista');
//seleciona

// document.addEventListener('click', function(e){
//     const el = e.target;
//     if (el == enviaTarefa){
//         if (novaTarefa !== ''){
//         let list = lista.innerHTML += `<li>${novaTarefa.value}<button class='apaga'>Apagar</button></li></br>`;
//         }
//     }
//     const apagaTarefa = document.querySelector('.apaga');
//     if (el == apagaTarefa) {
//         list = lista.innerHTML = '';
//     }
//     console.log(el);
// })

function criaLi() { // cria o a tag li no html
    const li = document.createElement('li');
    return li;
}


function criaTarefa(textoInput){ //cria a tarefa e manda para a tag li
    const li = criaLi();
    li.innerText = textoInput;
    lista.appendChild(li);
    limpaInput();
    criaBtnApagar(li);
    salvarTarefas();
}

novaTarefa.addEventListener('keypress', function(e){ // se o enter for pressionado manda a msg
    if (e.keyCode === 13) {
        if (!novaTarefa.value) return;
        criaTarefa(novaTarefa.value);
        limpaInput()
    }
})

enviaTarefa.addEventListener('click', function(){ // se tiver clique no botao msm que o enter
    if (!novaTarefa.value) return;
    criaTarefa(novaTarefa.value);
    limpaInput()
})

function limpaInput(){ //limpa o input dps que criar nova tarefa
    novaTarefa.value='';
    novaTarefa.focus(); //deixa o tracinho piscante
}

function criaBtnApagar(li){ //cria o botao de apagar
    li.innerText += ' '
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar') //seta o botao com a classe apagar
    li.appendChild(btnApagar);
}

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')){ //se o botao clicado tem a class apagar...
        el.parentElement.remove(); //remove o pai do botao
        salvarTarefas(); //apaga do save tbm
    }
})

function salvarTarefas() { //salva as tarefas pra dps que fechar o navegador
    const liTarefas = lista.querySelectorAll('li')
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //joga o array dentro de um arquivo JSON como uma string
    localStorage.setItem('lista', tarefasJSON); //salva (só strings) no localStorage do navegador
}

function adcTarefasSalvas(){
    const tarefas = localStorage.getItem('lista');
    const listaDeTarefas = JSON.parse(tarefas); //converte para array

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adcTarefasSalvas()