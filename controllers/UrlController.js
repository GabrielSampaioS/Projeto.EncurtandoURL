const path = require('path');
const shoterId = require('shortid');
const UrlModel = require('../models/Url.js');
const { console } = require('inspector');

module.exports = class UrlController {

    // Serve a página inicial
    static Page(req, res) {
        //Fazer:
        //Incluir exibição do histórico de URLs encurtadas 

        res.sendFile(path.join(__dirname, '../public/index.html'));

    }

    //Gera URL encurtada
    static async encurtar(req, res) {
        const { urlOriginal } = req.body;

        //ZOD    

        if (!urlOriginal || typeof urlOriginal !== 'string') {
            return res.status(400).send('URL inválida');
        }

        try {
            //varificar se já existe
            const existe = await UrlModel.findOne({ urlOriginal });
            if (existe) {
                return res.send(`URL já encurtada ${req.headers.host}/${existe.codigoCurto}`)
            }

            const codigoCurto = shoterId.generate();

            const novaUrl = new UrlModel({
                urlOriginal,
                codigoCurto,
                createdAt: new Date()
            });


            await novaUrl.save();

            res.redirect('/');

        } catch (err) {
            console.error(err);
            res.status(500).send('Erro interno')
        }

    }

    // Redireciona para a URL original
    static async redirecionar(req, res) {
        const { codigoCurto } = req.params
        try {
            const encontrado = await UrlModel.findOne({ codigoCurto })

            if (!encontrado) {
                return res.status(400).send('URL não encontrada');
            }

            res.redirect(encontrado.urlOriginal);

        } catch (err) {
            console.error(err);
            res.status(500).send('Erro interno')
        }

    }
    // Lista todas as URLs encurtadas

    static async lista(req, res) {

        try {
            const retorno = await UrlModel.find();

            //Limpa os dados
            const dadosLimpos = retorno.map(url => ({
                urlOriginal: url.urlOriginal,
                codigoCurto: url.codigoCurto
            }));

            res.json(dadosLimpos);
        } catch (err) {

            res.status(500).send('Erro aqui');
        }
    }
}
