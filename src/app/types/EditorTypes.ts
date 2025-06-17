type CustomText = {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};
type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };

export type { CustomText, CustomElement };
