import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  RichTextEditor,
  type RichTextEditorRef,
  insertImages,
  LinkBubbleMenu,
  TableBubbleMenu,
} from "mui-tiptap";
import { Box } from "@mui/material";
import useExtensions from './useExtensions';
import type { EditorOptions } from "@tiptap/core";
import EditorMenuControls from "./EditorMenuControls"; // o ajusta según tu estructura

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

interface RichTextProps {
  value?: string | null;
  onChange?: (html: string) => void;
}

const RichText = forwardRef<RichTextEditorRef, RichTextProps>(
  ({ onChange, value }, ref) => {
    const extensions = useExtensions({ placeholder: "" });
    const rteRef = useRef<RichTextEditorRef>(null);
    const [isEditable] = useState(true);
    const [showMenuBar] = useState(true);

    // 🔁 Exponer el ref del editor al padre
    useImperativeHandle(ref, () => rteRef.current as RichTextEditorRef, []);

    // Cargar contenido si cambia la prop `value`
    useEffect(() => {
      const editor = rteRef.current?.editor;
      if (editor && value !== undefined && value !== editor.getHTML()) {
        editor.commands.setContent(value);
      }
    }, [value]);

    // Detectar cambios del editor
    useEffect(() => {
      const editor = rteRef.current?.editor;
      if (!editor || !onChange) return;

      const handler = () => onChange(editor.getHTML());
      editor.on("update", handler);
      return () => {
        editor.off("update", handler);
      };
    }, [onChange]);

    const handleNewImageFiles = useCallback((files: File[], insertPosition?: number) => {
      if (!rteRef.current?.editor) return;

      const attributes = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributes,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    }, []);

    const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> = useCallback(
      (view, event) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) return false;

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
          handleNewImageFiles(imageFiles, insertPosition);
          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles]
    );

    const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> = useCallback(
      (_view, event) => {
        if (!event.clipboardData) return false;

        const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          return true;
        }

        return false;
      },
      [handleNewImageFiles]
    );

    return (
      <Box
        sx={{
          "& .ProseMirror": {
            minHeight: "207px",
            maxHeight: "207px",
            overflowY: "auto",
          },
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={value || ""}
          editable={isEditable}
          editorProps={{
            handleDrop: handleDrop,
            handlePaste: handlePaste,
          }}
          renderControls={() => <EditorMenuControls />}
          RichTextFieldProps={{
            variant: "outlined",
            MenuBarProps: {
              hide: !showMenuBar,
            },
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
    );
  }
);

export default RichText;