const fs = require('fs').promises;
const path = require('path');

async function getTree(dir, depth, prefix = '') {
    if (depth < 0) return { dirCount: 0, fileCount: 0 };

    const files = await fs.readdir(dir);
    let dirCount = 0;
    let fileCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            dirCount++;
            const subTree = await getTree(filePath, depth - 1, `${prefix}${i === files.length - 1 ? '    ' : '│   '}`);
            dirCount += subTree.dirCount;
            fileCount += subTree.fileCount;
        } else {
            fileCount++;
        }

        console.log(`${prefix}${i === files.length - 1 ? '└── ' : '├── '}${file}`);
    }

    return { dirCount, fileCount };
}

async function main() {
    const args = process.argv.slice(2);
    const dir = args[0] || '.';
    const depthFlagIndex = args.findIndex(arg => arg === '--depth' || arg === '-d');
    const depth = depthFlagIndex !== -1 ? parseInt(args[depthFlagIndex + 1], 10) : Infinity;

    console.log(dir);
    const { dirCount, fileCount } = await getTree(dir, depth);
    console.log(`\n${dirCount} directories, ${fileCount} files`);
}

main().catch(console.error);
