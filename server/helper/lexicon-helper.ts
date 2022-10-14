export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomWord(wordResult: any, word: string) {
    const randRelatedIdx = getRandomInt(0, wordResult?.related?.length - 1 || 0);
    const relatedOrWord = !!wordResult?.related ? wordResult?.related?.at(randRelatedIdx)?.name : word;
    const nameOrRandomRelated = [wordResult?.name ?? word, relatedOrWord][getRandomInt(0, 1)]
    let randDefIdx = 0;
    try{
        randDefIdx = getRandomInt(0, wordResult?.definitions?.length-1 || 0);
    }
    catch(Ex){}
    const definitionOrnameOrRandomRelatedIfNoNumber = /\d/.test(wordResult?.definitions?.at(randDefIdx) ?? '') ? nameOrRandomRelated : wordResult?.definitions?.at(randDefIdx) ?? word;
    const randSynonIdx = getRandomInt(0, wordResult?.synonyms?.length - 1 || 0);
    const randSynonymOrWord = !!wordResult?.synonyms?.at ? wordResult?.synonyms?.at(randSynonIdx)?.name : word;

    let result = [(randSynonymOrWord ?? definitionOrnameOrRandomRelatedIfNoNumber) || (wordResult?.name ?? word), definitionOrnameOrRandomRelatedIfNoNumber || (wordResult?.name ?? word), word][getRandomInt(0, 2)]
    result = result.replace('.', '').replace('..', ' ');

    if (word.endsWith(',') || word.endsWith(':') || word.endsWith('.')) {
        result = result + word[word.length - 1]
    }
    return result
}
