
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomWord(wordResult: any, word: string) {
    const nameOrRandomRelated = [wordResult.name, wordResult.related[getRandomInt(0, wordResult?.related?.length - 1)]?.name][getRandomInt(0, 1)]
    const rand = getRandomInt(0, wordResult?.definitions?.length-1);
    const definitionOrnameOrRandomRelatedIfNoNumber = /\d/.test(wordResult?.definitions[rand]) ? nameOrRandomRelated : wordResult?.definitions[rand]
    const randSynonym = wordResult?.synonyms[getRandomInt(0, wordResult?.synonyms?.length - 1)]?.name

    let result = [randSynonym || definitionOrnameOrRandomRelatedIfNoNumber || wordResult?.name || word, definitionOrnameOrRandomRelatedIfNoNumber || wordResult?.name || word, word][getRandomInt(0, 2)]
    result = result.replace('.', '').replace('..', ' ');

    if (word.endsWith(',') || word.endsWith(':') || word.endsWith('.')) {
        result = result + word[word.length - 1]
    }
    return result
}
