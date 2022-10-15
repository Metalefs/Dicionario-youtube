//import { Browser } from "puppeteer-core";
import { DicioInformalScraper } from "./dicio-informal-scraper";

export class Navigator {
  dicioInformalScraper:DicioInformalScraper;
  constructor(/*private browser: Browser*/) {
    this.dicioInformalScraper = new DicioInformalScraper(/*this.browser*/);
    this.searchDicioInformal = this.searchDicioInformal.bind(this);
  }

  async searchDicioInformal(words) {
    this.dicioInformalScraper = this.dicioInformalScraper?? new DicioInformalScraper(/*this.browser*/);
    return this.dicioInformalScraper.getDefinition(words);
  }  
}