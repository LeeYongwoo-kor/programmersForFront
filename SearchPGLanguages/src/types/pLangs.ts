export interface ISearchPrgLanguagesRslt {
  results: IProgrammingLanguages[];
  count: number;
}

interface IProgrammingLanguages {
  objectId: string;
  ProgrammingLanguage: string;
  Source?: string;
  createdAt: Date;
  updatedAt: Date;
}
