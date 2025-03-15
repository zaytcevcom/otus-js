const fs = require('fs');
const { Transform, pipeline } = require('stream');

function filterNonTextChars(word) {
    return word.replace(/[^a-zA-Z]/g, '');
}

const wordProcessor = new Transform({
    transform(chunk, encoding, callback) {
        const words = chunk.toString().split(/\s+/).map(filterNonTextChars);

        const wordCounts = {};
        words.forEach(word => {
            if (word) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });

        const sortedWords = Object.keys(wordCounts).sort();
        const index = sortedWords.map(word => wordCounts[word]);

        this.push(JSON.stringify(index));
        callback();
    }
});

const inputFile = process.argv[2];
const outputFile = 'output.txt';

if (!inputFile) {
    console.error('Пример команды: node stream.js files/1.txt');
    process.exit(1);
}

const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
const writeStream = fs.createWriteStream(outputFile);

pipeline(
    readStream,
    wordProcessor,
    writeStream,
    (err) => {
        if (err) {
            console.error('Ошибка в pipeline:', err);
        } else {
            console.log('Обработка завершена. Результат записан в', outputFile);
        }
    }
);
