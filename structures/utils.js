const fs = require('fs/promises');
const path = require('path');
const { resolve } = require('path');
const URL = require('url');

class utils {
  static async *getFiles(folder) {
        const dirents = await fs.readdir(folder, { withFileTypes: true });
        for (const dirent of dirents) {
            const res = resolve(folder, dirent.name);
            if (dirent.isDirectory()) {
                yield* this.getFiles(res);
            } else {
                yield res;
            }
        }
    }
    static async format(match, pathLog) {
        try {
        const jsonFormat = {
            "stringFormat": `${match[1]}:${match[2]}:${match[3]}`,
            "hostname": URL.parse(match[1]).hostname,
            "fullpath": match[1],
            "login": match[2],
            "password": match[3],
            "pathFolder": pathLog
        };
        return jsonFormat;
    } catch(e) {
        console.log(e);
        return null;
    }
       }

       static async saveToFile(json) {
        await fs.appendFile('LP_Database.txt', `${json.login}:${json.password}\n`).catch(x=>console.log(x));
        await fs.appendFile('Login_Database.txt', `${json.login}\n`).catch(x=>console.log(x));
        await fs.appendFile('Pass_Database.txt', `${json.password}\n`).catch(x=>console.log(x));
        await fs.appendFile('ULP_Database.txt', `==============================\n${json.fullpath}\n${json.login}:${json.password}\n${json.pathFolder}\n`).catch(x=>console.log(x));
        await fs.appendFile(path.resolve('DomainDataBase',`${json.hostname}.txt`), `${json.login}:${json.password}\n`).catch(x=>console.log(x));
        const accessURL = global.accessUrl.some(x => json.fullpath.toLowerCase().includes(x.trim()));
        if(accessURL) await fs.appendFile('Access.txt', `==============================\n${json.fullpath}\n${json.login}:${json.password}\n${json.pathFolder}\n`).catch(x=>console.log(x));
       }
}


module.exports = utils;
