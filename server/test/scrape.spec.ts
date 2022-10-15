
import { describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import { LexiconBuilder } from '../lexicon-builder';
//import { launch } from 'server/shared/browser';
import { Navigator } from '../shared/navigator';

describe('Scrape', () => {
  test('search amizade', async () => {
    const query = 'amizade';
    //const browser = await launch();
    const start = performance.now();
    const navigator = new Navigator(/*browser as any*/)

    const data = await navigator.searchDicioInformal(query);
  
    const duration = (performance.now() - start);
  
    const result = {duration,data}


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
    const start = performance.now();
  
    const data = await lexiconBuilder.builLexiconAndReturnWordDefinition(query);
  
    const duration = (performance.now() - start);
  
    const result = {duration,data}

    fs.writeFileSync(
      `./server/test/results/scrape/definition-result.json`,
      JSON.stringify(result)
    );

    expect(result).toBeTruthy();
    //browser.close()

  }, 20000);

});
