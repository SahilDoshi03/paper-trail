type CustomText = {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  background?: string;
};

type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };

export type { CustomText, CustomElement };
