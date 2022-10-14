export class wordSearch {
  name = '';
  definitions: string[] = [];
  examples: string[] = [];
  synonyms: externalRef[];
  antonynms: externalRef[];
  related: externalRef[];
  isRelatedLoaded?= false;
  constructor(name = "",definitions = [],examples = [],synonynms = [],antonyms = [],related = []) {
    this.name=name;
    this.definitions=definitions;
    this.examples=examples;
    this.synonyms=synonynms;
    this.antonynms=antonyms;
    this.related=related;
  }
}
interface externalRef {
  name: string;
  link: string;
}
