import { Box } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import {
  LinkBubbleMenu,
  // MenuButton,
  RichTextEditor,
  // RichTextReadOnly,
  TableBubbleMenu,
  insertImages,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useCallback, useEffect, useRef, useState } from "react";
import useExtensions from "./useExtensions";
import EditorMenuControls from "./EditorMenuControls";

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
  value?: string;
  onChange?: (html: string) => void;
}

const RichText: React.FC<RichTextProps> = ({ onChange, value }) => {
  const extensions = useExtensions({
    placeholder: "",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, _setIsEditable] = useState(true);
  const [showMenuBar, _setShowMenuBar] = useState(true);

  // Cargar el contenido cuando cambia value
  useEffect(() => {
    const editor = rteRef.current?.editor;
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  // Escuchar cambios del editor
  useEffect(() => {
  const editor = rteRef.current?.editor;
  if (!editor || !onChange) return;

  const handler = () => onChange(editor.getHTML());
  editor.on("update", handler);

  // ✅ Limpiar correctamente el listener al desmontar o actualizar
  return () => {
    editor.off("update", handler);
  };
}, [onChange]);

  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) {
        return;
      }

      // For the sake of a demo, we don't have a server to upload the files to,
      // so we'll instead convert each one to a local "temporary" object URL.
      // This will not persist properly in a production setting. You should
      // instead upload the image files to your server, or perhaps convert the
      // images to bas64 if you would like to encode the image data directly
      // into the editor content, though that can make the editor content very
      // large. You will probably want to use the same upload function here as
      // for the MenuButtonImageUpload `onUploadFiles` prop.
      const attributesForImageFiles = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    [],
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          // Return true to treat the event as handled. We call preventDefault
          // ourselves for good measure.
          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles],
    );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files,
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          // Return true to mark the paste event as handled. This can for
          // instance prevent redundant copies of the same image showing up,
          // like if you right-click and copy an image from within the editor
          // (in which case it will be added to the clipboard both as a file and
          // as HTML, which Tiptap would otherwise separately parse.)
          return true;
        }

        // We return false here to allow the standard paste-handler to run.
        return false;
      },
      [handleNewImageFiles],
    );

  // const [submittedContent, setSubmittedContent] = useState("");

  return (
    <Box
      sx={{
        // An example of how editor styles can be overridden. In this case,
        // setting where the scroll anchors to when jumping to headings. The
        // scroll margin isn't built in since it will likely vary depending on
        // where the editor itself is rendered (e.g. if there's a sticky nav
        // bar on your site).
        // "& .ProseMirror": {
        //     "& h1, & h2, & h3, & h4, & h5, & h6": {
        //     scrollMarginTop: showMenuBar ? 50 : 0,
        //     },
        // },
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
        content={value || ''}
        editable={isEditable}
        editorProps={{
          handleDrop: handleDrop,
          handlePaste: handlePaste,
        }}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          // The "outlined" variant is the default (shown here only as
          // example), but can be changed to "standard" to remove the outlined
          // field border from the editor
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

export default RichText;