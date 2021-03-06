let tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener('click', evento => {
    let elementoClicado = evento.target;
    if(elementoClicado.dataset.type == "remover"){  
        let livroId = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/livros/${livroId}`, {method: 'DELETE'})
            .then(response => {
                let tr = elementoClicado.closest(`#livro_${livroId}`);
                tr.remove();
            })
            .catch(error => console.log(error));
    }
});