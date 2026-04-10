import type { Editor } from '@tiptap/react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  LinkOutlined,
  PictureOutlined,
  UndoOutlined,
  RedoOutlined,
  LineOutlined,
  HighlightOutlined,
  CodeOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { Button, Tooltip, Select, Divider } from 'antd';

interface MenuBarProps {
  editor: Editor;
  onAddImage: () => void;
  onAddLink: () => void;
}

const HEADING_OPTIONS = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: '1', label: 'Heading 1' },
  { value: '2', label: 'Heading 2' },
  { value: '3', label: 'Heading 3' },
];

export function MenuBar({ editor, onAddImage, onAddLink }: MenuBarProps) {
  const currentHeading = editor.isActive('heading', { level: 1 })
    ? '1'
    : editor.isActive('heading', { level: 2 })
      ? '2'
      : editor.isActive('heading', { level: 3 })
        ? '3'
        : 'paragraph';

  const handleHeadingChange = (value: string) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 }).run();
    }
  };

  const ToolBtn = ({
    icon,
    title,
    action,
    isActive = false,
    disabled = false,
  }: {
    icon: React.ReactNode;
    title: string;
    action: () => void;
    isActive?: boolean;
    disabled?: boolean;
  }) => (
    <Tooltip title={title} mouseEnterDelay={0.5}>
      <Button
        type={isActive ? 'primary' : 'text'}
        icon={icon}
        size="small"
        onClick={action}
        disabled={disabled}
        className="rich-text-editor__btn"
      />
    </Tooltip>
  );

  return (
    <div className="rich-text-editor__toolbar">
      <Select
        value={currentHeading}
        onChange={handleHeadingChange}
        options={HEADING_OPTIONS}
        size="small"
        style={{ width: 120 }}
        popupMatchSelectWidth={false}
      />

      <Divider type="vertical" />

      <ToolBtn
        icon={<BoldOutlined />}
        title="Bold (Ctrl+B)"
        action={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      />
      <ToolBtn
        icon={<ItalicOutlined />}
        title="Italic (Ctrl+I)"
        action={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      />
      <ToolBtn
        icon={<UnderlineOutlined />}
        title="Underline (Ctrl+U)"
        action={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
      />
      <ToolBtn
        icon={<StrikethroughOutlined />}
        title="Strikethrough"
        action={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      />
      <ToolBtn
        icon={<HighlightOutlined />}
        title="Highlight"
        action={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive('highlight')}
      />
      <ToolBtn
        icon={<CodeOutlined />}
        title="Code"
        action={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
      />

      <Divider type="vertical" />

      <ToolBtn
        icon={<UnorderedListOutlined />}
        title="Bullet List"
        action={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      />
      <ToolBtn
        icon={<OrderedListOutlined />}
        title="Ordered List"
        action={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      />
      <ToolBtn
        icon={<MinusOutlined />}
        title="Code Block"
        action={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
      />
      <ToolBtn
        icon={<LineOutlined />}
        title="Horizontal Rule"
        action={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <Divider type="vertical" />

      <ToolBtn
        icon={<AlignLeftOutlined />}
        title="Align Left"
        action={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
      />
      <ToolBtn
        icon={<AlignCenterOutlined />}
        title="Align Center"
        action={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
      />
      <ToolBtn
        icon={<AlignRightOutlined />}
        title="Align Right"
        action={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
      />

      <Divider type="vertical" />

      <ToolBtn
        icon={<LinkOutlined />}
        title="Link"
        action={onAddLink}
        isActive={editor.isActive('link')}
      />
      <ToolBtn
        icon={<PictureOutlined />}
        title="Image"
        action={onAddImage}
      />

      <Divider type="vertical" />

      <ToolBtn
        icon={<UndoOutlined />}
        title="Undo (Ctrl+Z)"
        action={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      />
      <ToolBtn
        icon={<RedoOutlined />}
        title="Redo (Ctrl+Shift+Z)"
        action={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      />
    </div>
  );
}
