import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { 
    FaBold, FaItalic, FaUnderline, FaStrikethrough, FaQuoteRight, 
    FaListUl, FaListOl, FaLink, FaImage, FaHeading, FaUndo, FaRedo 
} from 'react-icons/fa';
import { useEffect } from 'react';

const MenuButton = ({ onClick, isActive, disabled, children, title }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-1.5 rounded-md transition-all duration-200 ${
            isActive 
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);

const Divider = () => (
    <div className="w-px h-5 bg-gray-300 dark:bg-slate-700 mx-1 self-center" />
);

const Toolbar = ({ editor }) => {
    if (!editor) return null;

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('Image URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-t-lg sticky top-0 z-10">
            <div className="flex items-center gap-0.5">
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
                    <span className="font-bold text-xs px-1">H2</span>
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">
                    <span className="font-bold text-xs px-1">H3</span>
                </MenuButton>
            </div>

            <Divider />

            <div className="flex items-center gap-0.5">
                <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
                    <FaBold size={13} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
                    <FaItalic size={13} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
                    <FaUnderline size={13} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strike">
                    <FaStrikethrough size={13} />
                </MenuButton>
            </div>
            
            <Divider />

            <div className="flex items-center gap-0.5">
                <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
                    <FaListUl size={13} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List">
                    <FaListOl size={13} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Blockquote">
                    <FaQuoteRight size={13} />
                </MenuButton>
            </div>

            <Divider />

            <div className="flex items-center gap-0.5">
                <MenuButton onClick={setLink} isActive={editor.isActive('link')} title="Link">
                    <FaLink size={13} />
                </MenuButton>
                <MenuButton onClick={addImage} title="Image">
                    <FaImage size={13} />
                </MenuButton>
            </div>

            <div className="flex-1" /> 

            <div className="flex items-center gap-0.5">
                <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
                    <FaUndo size={13} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
                    <FaRedo size={13} />
                </MenuButton>
            </div>
        </div>
    );
};

export default function RichTextEditor({ value, onChange, label, error, placeholder }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto my-4 border border-gray-200 dark:border-slate-700',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Write something...',
                emptyEditorClass: 'is-editor-empty before:content-[attr(data-placeholder)] before:text-gray-400 before:dark:text-slate-500 before:float-left before:pointer-events-none before:h-0',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 text-gray-900 dark:text-slate-100',
            },
        },
    });

    // Update content if value changes externally (e.g. initial load)
    useEffect(() => {
        if (editor && value && editor.getHTML() !== value) {
            // Check if the content is effectively the same to avoid cursor jumps
            if (editor.getText() === '' && value !== '<p></p>') {
                editor.commands.setContent(value);
            }
        }
    }, [value, editor]);

    return (
        <div className="w-full group">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <div className={`border rounded-lg overflow-hidden bg-white dark:bg-slate-900 transition-all duration-200 ${
                error 
                    ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' 
                    : 'border-gray-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500'
            }`}>
                <Toolbar editor={editor} />
                <EditorContent editor={editor} />
            </div>
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}
