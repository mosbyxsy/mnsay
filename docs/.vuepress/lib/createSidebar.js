const fs = require('fs');
const path = require('path');

module.exports = function createSidebar(dir) {
    const dirPath = path.resolve(__dirname, '../../' + dir);
    const list = [];

    try {
        const files = fs.readdirSync(dirPath);

        files.forEach(function(file) {
            if (file === 'README.md' || file === 'index.md') {
                list.unshift('');
            } else {
                const stats = fs.statSync(path.join(dirPath, file));
                if (stats.isFile()) {
                    list.push(file);
                } else {
                    let children = fs.readdirSync(path.join(dirPath, file));
                    const childList = children.map(function (child) {
                        return file + '/' + ((child === 'README.md' || child === 'index.md') ? '' : child);
                    });
                    list.push({
                        title: file.charAt(0).toUpperCase() + file.slice(1),
                        sidebarDepth: 1,
                        children: childList.sort()
                    });
                }
            }
        });
    } catch (e) {
        console.warn(e);
    }

    console.log(dir, list);
    return list;
}