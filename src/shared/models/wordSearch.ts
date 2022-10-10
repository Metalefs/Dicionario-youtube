export class wordSearch {
  name = '';
  definition = '';
  example = '';
  synonyms: externalRef[];
  antonynms: externalRef[];
  related: externalRef[];
  constructor(name = "",definition = "",example = "",synonynms = [],antonyms = [],related = []) {
    this.name=name;
    this.definition=definition;
    this.example=example;
    this.synonyms=synonynms;
    this.antonynms=antonyms;
    this.related=related;
  }
}
interface externalRef {
  name: string;
  link: string;
}
