import { LexiconBuilder } from "./lexicon-builder";
import { transcript } from './input/contemporary';

const preload = async () => {
    const vocab = transcript.map(t => t.text)
    const lexiconBuilder = new LexiconBuilder();
    await lexiconBuilder.prepare();
    await lexiconBuilder.buildLexiconFromInput((vocab as any).fulltext);
    lexiconBuilder.unmount();
}
preload();