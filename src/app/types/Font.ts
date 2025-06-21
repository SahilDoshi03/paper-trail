type WebFont = {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
  menu: string;
  axes?: {
    tag: string;
    start: number;
    end: number;
  }[];
};

export type { WebFont }
