type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};
type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };

export type { CustomText, CustomElement };
