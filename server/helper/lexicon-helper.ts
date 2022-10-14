
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomWord(wordResult: any, word: string) {
    const nameOrRandomRelated = [wordResult?.name || word, (wordResult?.related?.at(getRandomInt(0, wordResult?.related?.length - 1 || 0))?.name ?? word)][getRandomInt(0, 1)]
    let rand = 0;
    try{
        rand = getRandomInt(0, wordResult?.definitions?.length-1 || 0);
    }
    catch(Ex){}
    const definitionOrnameOrRandomRelatedIfNoNumber = /\d/.test(wordResult?.definitions?.at(rand) ?? '') ? nameOrRandomRelated : wordResult?.definitions?.at(rand) ?? word
    const randSynonym = wordResult?.synonyms?.at(getRandomInt(0, wordResult?.synonyms?.length - 1 || 0))?.name

    let result = [(randSynonym ?? definitionOrnameOrRandomRelatedIfNoNumber) || (wordResult?.name ?? word), definitionOrnameOrRandomRelatedIfNoNumber || (wordResult?.name ?? word), word][getRandomInt(0, 2)]
    result = result.replace('.', '').replace('..', ' ');

    if (word.endsWith(',') || word.endsWith(':') || word.endsWith('.')) {
        result = result + word[word.length - 1]
    }
    return result
}
