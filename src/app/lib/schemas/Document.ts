import { z } from "zod";

export const TextAlignEnum = z.enum(["left", "center", "right", "justify"]);

export const CustomTextSchema = z.object({
  text: z.string(),
  fontSize: z.number(),
  color: z.string(),
  bold: z.boolean(),
  italic: z.boolean(),
  underline: z.boolean(),
  backgroundColor: z.string(),
  textAlign: TextAlignEnum,
});

export const CustomElementSchema = z.object({
  type: z.enum(["paragraph", "code"]),
  textAlign: TextAlignEnum,
  lineHeight: z.number(),
  paraSpaceBefore: z.number(),
  paraSpaceAfter: z.number(),
  fontFamily: z.string(),
  children: z.array(CustomTextSchema),
});

const DescendantSchema = z.union([CustomElementSchema, CustomTextSchema]);

export const DocumentSchema = z.object({
  id: z.number(),
  title: z.string(),
  elements: z.array(DescendantSchema),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()

});

export const PartialDocumentSchema = DocumentSchema.partial();

export const CreateDocumentSchema = z.object({
  title: z.string().min(1),
});

export type TextAlign = z.infer<typeof TextAlignEnum>;
export type CustomText = z.infer<typeof CustomTextSchema>;
export type CustomElement = z.infer<typeof CustomElementSchema>;
export type Descendant = CustomElement | CustomText;
export type EditorDocument = z.infer<typeof DocumentSchema>;

