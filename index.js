const utils = require("./structures/utils");
const fs = require('fs/promises');
const folder = process.argv[2] || './logs';
const pt = require('path');

(async() => {
    const existDomainFolder = (await fs.lstat('./DomainDataBase').catch(()=>null))?.isDirectory();

    if(existDomainFolder == null) await fs.mkdir('./DomainDataBase');

    const modules = (await fs.readdir('./moduleStealer')).map(file => require(pt.resolve('./moduleStealer/', file)));

    for await (path of utils.getFiles(folder)) {
        if(/assword/.test(pt.basename(path).toLowerCase())) {
            for(module of modules) {
               const logdata = await module.get(path);
               for(d of logdata) {
                const json = await d;
                console.log(json);
                utils.saveToFile(ajson);
                if(!logdata.length) break;
               }
            }
        }
    }

})();