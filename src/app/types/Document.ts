import { Descendant } from "slate";

type DocumentType = {
  id: number;
  title: string;
  elements: Descendant[];
  createdAt: Date;
  updatedAt: Date;
};

export type { DocumentType }
