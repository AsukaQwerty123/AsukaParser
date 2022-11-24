const baseExp = new RegExp('URL: (.+)(?:\r|)\nUSER: (.+)(?:\r|)\nPASS: (.+)', 'gm');
const fs = require('fs/promises');
const { format } = require('../structures/utils');

class raccoon {
    static async get(path) {
        const data = await fs.readFile(path, 'utf-8');
        const mathes = [...data.matchAll(baseExp)];

        const json = mathes.map(async x=>format(x, path));
        return json;
    }
}

module.exports = raccoon;