import { Editor, Transforms, Element } from "slate";

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

  setHighlightColor(editor: Editor, color: string) {
    Editor.addMark(editor, "background", color);
  },
};
