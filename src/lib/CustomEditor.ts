import { Editor, Transforms, Element } from "slate";
import { TextAlign } from "@/lib/schemas/Document";

export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isItalicMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  isUnderlineMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleUnderlineMark(editor: Editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  },

  setTextColor(editor: Editor, color: string) {
    Editor.addMark(editor, "color", color);
  },

  getTextColor(editor: Editor): string {
    return Editor.marks(editor)?.color || "#ffffff";
  },

  setHighlightColor(editor: Editor, color: string) {
    Editor.addMark(editor, "backgroundColor", color);
  },

  getHighlightColor(editor: Editor): string {
    return Editor.marks(editor)?.backgroundColor || "transparent";
  },

  setFontSize(editor: Editor, fontSize: number) {
    Editor.addMark(editor, "fontSize", fontSize);
  },

  getFontSize(editor: Editor): number {
    return Editor.marks(editor)?.fontSize || 16;
  },

  setTextAlign(editor: Editor, textAlign: TextAlign) {
    Transforms.setNodes(
      editor,
      { textAlign: textAlign },
      {
        match: (n) => Element.isElement(n),
        mode: "lowest",
      },
    );
  },
  getTextAlign(editor: Editor): TextAlign {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      mode: "lowest",
    });

    if (match) {
      const [node] = match;
      if ("textAlign" in node && typeof node.textAlign === "string") {
        return node.textAlign as TextAlign;
      }
    }

    return "left";
  },
  setLineHeight(editor: Editor, lineHeight: number) {
    Transforms.setNodes(
      editor,
      { lineHeight: lineHeight },
      {
        match: (n) => Element.isElement(n),
        mode: "lowest",
      },
    );
  },

  getLineHeight(editor: Editor): number {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      mode: "lowest",
    });

    if (match) {
      const [node] = match;
      if ("lineHeight" in node && typeof node.lineHeight === "number") {
        return node.lineHeight;
      }
    }

    return 1.5;
  },
  setParaSpaceBefore(editor: Editor, spacing: number) {
    Transforms.setNodes(
      editor,
      { paraSpaceBefore: spacing },
      {
        match: (n) => Element.isElement(n),
        mode: "lowest",
      },
    );
  },

  getParaSpaceBefore(editor: Editor): number {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      mode: "lowest",
    });

    if (match) {
      const [node] = match;
      if ("marginTop" in node && typeof node.marginTop === "number") {
        return node.marginTop;
      }
    }

    return 0;
  },

  setParaSpaceAfter(editor: Editor, spacing: number) {
    Transforms.setNodes(
      editor,
      { paraSpaceAfter: spacing },
      {
        match: (n) => Element.isElement(n),
        mode: "lowest",
      },
    );
  },

  getParaSpaceAfter(editor: Editor): number {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      mode: "lowest",
    });

    if (match) {
      const [node] = match;
      if ("marginBottom" in node && typeof node.marginBottom === "number") {
        return node.marginBottom;
      }
    }

    return 0;
  },

  setFontFamily(editor: Editor, fontFamily: string) {
    Transforms.setNodes(
      editor,
      { fontFamily },
      {
        match: (n) => Element.isElement(n),
        mode: "lowest",
      },
    );
  },

  getFontFamily(editor: Editor): string {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      mode: "lowest",
    });

    if (match) {
      const [node] = match;
      if ("fontFamily" in node && typeof node.fontFamily === "string") {
        return node.fontFamily;
      }
    }

    return "";
  },
};
