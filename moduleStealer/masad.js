const baseExp = new RegExp('Link: (.+)(?:\r|)\nLogin: (.+)(?:\r|)\nPassword: (.+)', 'gm');
const fs = require('fs/promises');
const { format } = require('../structures/utils');

class masad {
    static async get(path) {
        const data = await fs.readFile(path, 'utf-8');
        const mathes = [...data.matchAll(baseExp)];

        const json = mathes.map(async x=>format(x, path));
        return json;
    }
}

module.exports = masad;