const LivroDAO = require('../infra/livroDAO');
const db = require('../../config/database');
module.exports = app => {
    app.get('/', (request, response) => {
        response.send(
            `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Document</title>
                </head>
                <body>
                    <h1>Olá mundo</h1>
                </body>
                </html>
            `
        );
    });
    app.get('/livros', (request, response) => {
        const livrodao = new LivroDAO(db);
        livrodao.lista().then(livros => response
            .marko(
                require('../views/livros/lista/lista.marko'), {livros: livros}
            )
        ).catch(error => console.log(error));
    });
    app.post('/livros', (request, response) => {
        const livrodao = new LivroDAO(db);
        livrodao.adiciona(request.body)
            .then(response.redirect('/livros'))
            .catch(error => console.log(error));
    });
    app.put('/livros', (request, response) => {
        const livrodao = new LivroDAO(db);
        livrodao.atualiza(request.body)
            .then(response.redirect('/livros'))
            .catch(error => console.log(error));
    });
    app.delete('/livros/:id', (request, response) => {
       const id = request.params.id;
       const livrodao = new LivroDAO(db);
        livrodao.remove(id)
            .then(() => response.status(200).end())
            .catch(error => console.log(error));
    });
    app.get('/livros/form', (request, response) => {
        response.marko(require('../views/livros/form/form.marko'), {livro: {}});
    });
    app.get('/livros/form/:id', (request, response) => {
        const id = request.params.id;
        const livrodao = new LivroDAO(db);
        livrodao.buscaPorId(id)
            .then(livro => response.marko(
                require('../views/livros/form/form.marko'),
                {livro: livro}
            ))
            .catch(error => console.log(error));
    });
};