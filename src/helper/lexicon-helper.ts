
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomWord(wordResult: any, word: string) {
    const nameOrRandomRelated = [wordResult.name, wordResult.related[getRandomInt(0, wordResult?.related?.length - 1)]][getRandomInt(0, 1)]

    const definitionOrnameOrRandomRelatedIfNoNumber = /\d/.test(wordResult?.definition) ? nameOrRandomRelated : wordResult?.definition
    const randSynonym = wordResult?.synonyms[getRandomInt(0, wordResult?.synonyms?.length - 1)]?.name

    let result = [randSynonym || definitionOrnameOrRandomRelatedIfNoNumber, definitionOrnameOrRandomRelatedIfNoNumber || wordResult?.name, wordResult?.name, word][getRandomInt(0, 3)]
    result = result.replace('.', '').replace('..', ' ')

    if (word.endsWith(',') || word.endsWith(':') || word.endsWith('.')) {
        result = result + word[word.length - 1]
    }
    return result
}
