
import { describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import { LexiconBuilder } from 'server/lexicon-builder';
//import { launch } from 'server/shared/browser';
import { Navigator } from '..//shared/navigator';

describe('Scrape', () => {
  test('search amizade', async () => {
    const query = 'amizade';
    //const browser = await launch();
    const navigator = new Navigator(/*browser as any*/)
    const result = await navigator.searchDicioInformal(query);

    fs.writeFileSync(
      `./server/test/results/scrape/result.json`,
      JSON.stringify(result)
    );

    expect(result).toBeTruthy();
    //browser.close()

  }, 20000);

  test('search obrigado', async () => {
    const query = 'obrigado';
    //const browser = await launch();
    const lexiconBuilder = new LexiconBuilder(/*browser as any*/)
    await lexiconBuilder.prepare();
    const result = await lexiconBuilder.builLexiconAndReturnWordDefinition(query);

    fs.writeFileSync(
      `./server/test/results/scrape/definition-result.json`,
      JSON.stringify(result)
    );

    expect(result).toBeTruthy();
    //browser.close()

  }, 20000);

});
