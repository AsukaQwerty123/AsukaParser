const baseExp = new RegExp('Url: (.+)(?:\r|)\nUsername: (.+)(?:\r|)\nPassword: (.+)', 'gm');
const fs = require('fs/promises');
const { format } = require('../structures/utils');

class hz2 {
    static async get(path) {
        const data = await fs.readFile(path, 'utf-8').catch(x=>'');
        const mathes = [...data.matchAll(baseExp)];

        const json = mathes.map(async x=>format(x, path));
        return json;
    }
}

module.exports = hz2;