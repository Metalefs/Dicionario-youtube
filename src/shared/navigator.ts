import { Browser, Page } from "puppeteer-core";
import { parse } from "node-html-parser";
import { wordSearch } from "./models/wordSearch";
import { config } from "./config";


export class Navigator {

  constructor(private browser: Browser) {

  }

  async searchDicioInformal(query) {
    const result = await this.getPage(query);
    return result;
  }

  async getPage(query) {
    const page = await this.browser.newPage();
    await page.goto(config.websites.dicionarioInformal(query));
    const baseUrl = (page as unknown as Page).url();
    let searchResult: wordSearch = new wordSearch();

    console.log('searching: ' + query);

    let content = await (page as unknown as Page).content();
    if (content.includes('Nenhuma Definição encontrada')) {
      const anchor = parse(content).querySelector('.di-blue-link > a:nth-child(1)');
      if(anchor)
      {
        const href = anchor.getAttribute('href');
        const url = new URL(baseUrl);
        console.log(url.origin + href)
        await page.goto(url.origin + href);
        content = await (page as unknown as Page).content();
      }
    }

    searchResult = this.getData(content, query);

    // await (page as unknown as Page).screenshot({
    //   path: `./src/screenshots/${query}.png`,
    //   fullPage: true,
    // });
    return searchResult;
  }

  getData(html, query) {
    const root = parse(html);

    let name;
    try {
      name = root.querySelector('#word-header').getAttribute('value')
    }
    catch (ex) {
      console.error('erro ao obter ' + query);
    }

    const definition = root.querySelector('[itemprop="description"] > p')?.textContent || '';
    const example = root.querySelector('[itemprop="description"] > blockquote')?.textContent || '';

    const synonyms = [];
    const synonymAnchors = root.querySelectorAll('#sinonimos > div > span > a');
    synonymAnchors.forEach(synonymAnchor => {
      synonyms.push({
        name: synonymAnchor.textContent.trim(),
        link: synonymAnchor.getAttribute('href')
      })
    })

    const antonynms = [];
    const antonynmAnchors = root.querySelectorAll('#antonimos > div > span > a');
    antonynmAnchors.forEach(antonynmAnchor => {
      antonynms.push({
        name: antonynmAnchor.innerText.replace('&nbsp;', '').replace('&nbsp;', ''),
        link: antonynmAnchor.getAttribute('href')
      })
    })

    const related = [];
    const relatedAnchors = root.querySelectorAll('#relacionadas > div > span > a');
    relatedAnchors.forEach(relatedAnchor => {
      related.push({
        name: relatedAnchor.innerText.replace('&nbsp;', '').replace('&nbsp;', ''),
        link: relatedAnchor.getAttribute('href')
      })
    })

    return {
      name,
      definition,
      example,
      synonyms,
      antonynms,
      related
    }
  }

}