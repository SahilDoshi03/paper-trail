import { Descendant } from "slate";

type Document = {
  id: number;
  title: string;
  elements: Descendant[];
  createdAt: Date;
  updatedAt: Date;
};

export type { Document }
