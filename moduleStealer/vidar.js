const baseExp = new RegExp('Host: (.+)(?:\r|)\nLogin: (.+)(?:\r|)\nPassword: (.+)', 'gm');
const fs = require('fs/promises');
const { format } = require('../structures/utils');

class vidar {
    static async get(path) {
        const data = await fs.readFile(path, 'utf-8').catch(x=>'');
        const mathes = [...data.matchAll(baseExp)];

        const json = mathes.map(async x=>format(x, path));
        return json;
    }
}

module.exports = vidar;