//import { Browser } from "puppeteer-core";
import { DicioInformalScraper } from "./dicio-informal-scraper";

export class Navigator {
  scrapers:DicioInformalScraper[] = [];
  constructor(/*private browser: Browser*/) {
    this.scrapers.push(new DicioInformalScraper(/*this.browser*/));
    this.searchDicioInformal = this.searchDicioInformal.bind(this);
  }

  async searchDicioInformal(words) {
    this.scrapers = this.scrapers ?? [new DicioInformalScraper(/*this.browser*/)];
    return this.scrapers[0].getDefinition(words);
  }  
}