import { useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { MenuBar } from './MenuBar';
import './styles.css';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

/**
 * RichTextEditor - Tiptap-based rich text editor compatible with Ant Design Form.
 *
 * Usage with Ant Design Form:
 * <Form.Item name="content" label="Content">
 *   <RichTextEditor placeholder="Write content here..." />
 * </Form.Item>
 */
export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write something...',
  minHeight = 200,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'editor-image' },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({ placeholder }),
      Highlight,
      Color,
      TextStyle,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Tiptap returns <p></p> for empty content
      onChange?.(html === '<p></p>' ? '' : html);
    },
  });

  // Sync external value changes (e.g. form.setFieldsValue)
  useEffect(() => {
    if (!editor) return;
    const currentHTML = editor.getHTML();
    const normalizedCurrent = currentHTML === '<p></p>' ? '' : currentHTML;
    if (value !== normalizedCurrent) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rich-text-editor">
      <MenuBar editor={editor} onAddImage={addImage} onAddLink={addLink} />
      <EditorContent
        editor={editor}
        className="rich-text-editor__content"
        style={{ minHeight }}
      />
    </div>
  );
}
