import { readFileSync } from "fs";
import { LexiconBuilder } from "./lexicon-builder";

const preload = async () => {
    let vocab = readFileSync("./src/input/contemporary.json", {
        encoding: "utf8",
        flag: "r"
    });
    vocab = JSON.parse(vocab);
    const lexiconBuilder = new LexiconBuilder();
    await lexiconBuilder.prepare();
    await lexiconBuilder.buildLexiconFromInput((vocab as any).fulltext);
    lexiconBuilder.unmount();
}
preload();