type TextAlign = "left" | "center" | "right" | "justify";

type CustomText = {
  text: string;
  fontSize: string;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  backgroundColor: string;
  textAlign: TextAlign;
};

type CustomElement = {
  type: "paragraph" | "code";
  textAlign: TextAlign;
  lineHeight: number;
  paraSpaceBefore: number;
  paraSpaceAfter: number;
  fontFamily: string;
  children: CustomText[];
};

export type { CustomText, CustomElement, TextAlign };
