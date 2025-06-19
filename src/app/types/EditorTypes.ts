type TextAlign = "left" | "center" | "right" | "justify";

type CustomText = {
  text: string;
  fontSize?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  backgroundColor?: string;
  textAlign?: TextAlign;
};

type CustomElement = {
  type: "paragraph" | "code";
  textAlign?: TextAlign;
  children: CustomText[];
};

export type { CustomText, CustomElement, TextAlign };
