export interface SurahItem {
    number: number
    numberOfVerses: number | string
    name: {
      short: string;
      long: string;
      transliteration: {
        id: string;
        en: string;
        [key: string]: string;
      };
      translation: {
        id: string;
        en: string;
        [key: string]: string;
      }
    };
    revelation: {
      id: string;
    };
    tafsir:{
      id: string;
    };
    preBismillah: {
      text: {
        arab: string;
      }
    };
    verses: Verse[];
  }

export interface Verse {
    number: {
        inQuran: number;
        inSurah: number;
    };
    meta: {
        juz: number;
        page: number;
        manzil: number;
        ruku: number;
        hizbQuarter: number;
        sajda: {
            recommended: boolean;
            obligatory: boolean;
        };
    };
    text: {
        arab: string;
        transliteration: {
            en: string;
        };
    };
    translation: {
        en: string;
        id: string;
        [key: string]: string;
    };
    audio: {
        primary: string;
        secondary: string[];
    };
    tafsir: {
        id: {
            short: string;
            long: string;
        };
    };
}