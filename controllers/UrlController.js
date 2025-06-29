const path = require('path');

module.exports = class UrlController {
    static Page(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }

    static async PagePost(req, res) {
        const { urlOriginal } = req.body;
        console.log("URL Recebida:", urlOriginal);
        res.send("URL recebida com sucesso!");
    }
}
