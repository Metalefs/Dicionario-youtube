import { parse } from 'node-html-parser';
import { wordSearch } from './models/wordSearch';
import { config } from './config';
import { Scraper } from './interfaces/scraper';

import got from 'got';

export class DicioInformalScraper implements Scraper {
  constructor() {
    this.getDefinition = this.getDefinition.bind(this);
    this.tryGetFirstDefinitionContent =
    this.tryGetFirstDefinitionContent.bind(this);
  }
  async getDefinition(query, link = null) {
    const response = await got(
      link ?? config.websites.dicionarioInformal(query)
    );
    const baseUrl = response.url;

    let searchResult: wordSearch = new wordSearch();

    console.log('searching: ' + query);

    let content = await this.getContent(response as any);
    if (content.includes('Nenhuma Definição encontrada')) {
      content = await this.tryGetFirstDefinitionContent(baseUrl, content);
    }

    searchResult = await this.getData(content, query);
    return searchResult;
  }

  private async getData(html, query) {
    const root = parse(html);

    let name;
    try {
      name = root.querySelector('#word-header').getAttribute('value');
    } catch (ex) {
      console.error('error while searching: ' + query);
    }

    const definitions = [];
    const definitionParagraphs = root.querySelectorAll(
      '[itemprop="description"] > p'
    );
    for (const def of definitionParagraphs) {
      if (def?.textContent) definitions.push(def?.textContent || '');
    }

    const examples = [];
    const exampleParagraphs = root.querySelectorAll(
      '[itemprop="description"] > blockquote'
    );
    for (const example of exampleParagraphs) {
      if (example?.textContent) examples.push(example?.textContent || '');
    }

    const synonyms = [];
    const synonymAnchors = root.querySelectorAll('#sinonimos > div > span > a');
    synonymAnchors.forEach((synonymAnchor) => {
      synonyms.push({
        name: synonymAnchor.textContent.trim(),
        link: synonymAnchor.getAttribute('href'),
      });
    });

    const antonynms = [];
    const antonynmAnchors = root.querySelectorAll(
      '#antonimos > div > span > a'
    );
    antonynmAnchors.forEach((antonynmAnchor) => {
      antonynms.push({
        name: antonynmAnchor.innerText
          .replace('&nbsp;', '')
          .replace('&nbsp;', ''),
        link: antonynmAnchor.getAttribute('href'),
      });
    });

    const related = [];
    const relatedAnchors = root.querySelectorAll(
      '#relacionadas > div > span > a'
    );
    relatedAnchors.forEach((relatedAnchor) => {
      related.push({
        name: relatedAnchor.innerText
          .replace('&nbsp;', '')
          .replace('&nbsp;', ''),
        link: relatedAnchor.getAttribute('href'),
      });
    });

    return {
      name,
      definitions,
      examples,
      synonyms,
      antonynms,
      related,
    };
  }

  private async tryGetFirstDefinitionContent(baseUrl: string, content: string) {
    const anchor = parse(content).querySelector(
      '.di-blue-link > a:nth-child(1)'
    );
    if (anchor) {
      const href = anchor.getAttribute('href');
      const url = new URL(baseUrl);
      console.log(
        'navigating to: ' +
          url.origin +
          href.replace('https://www.dicionarioinformal.com.br', '')
      );
      content = await this.getContent(
        (await got(
          url.origin + href.replace('https://www.dicionarioinformal.com.br', '')
        )) as any
      );
    }
    return content;
  }

  async getContent(response) {
    return response.body;
  }
}
