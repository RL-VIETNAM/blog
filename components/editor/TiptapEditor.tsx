'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const [sourceCode, setSourceCode] = useState('');
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState<'markdown' | 'preview'>('markdown');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (content.trim().startsWith('<') && content.includes('>')) {
            const TurndownService = require('turndown').default || require('turndown');
            const turndownService = new TurndownService({
                headingStyle: 'atx',
                codeBlockStyle: 'fenced',
            });
            const markdown = turndownService.turndown(content);
            setSourceCode(markdown);
        } else {
            setSourceCode(content);
        }
    }, [content]);

    const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setSourceCode(newContent);
        onChange(newContent);
    };

    const insertAtCursor = (before: string, after: string = '') => {
        const textarea = document.getElementById('source-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = sourceCode.substring(start, end);
        const newText = sourceCode.substring(0, start) + before + selectedText + after + sourceCode.substring(end);

        setSourceCode(newText);
        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('File phải là ảnh');
            return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File quá lớn. Tối đa 10MB');
            return;
        }

        const textarea = document.getElementById('source-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const loadingPlaceholder = '![loading image...](/loading.gif)';
        const cursorStart = textarea.selectionStart;
        const cursorEnd = textarea.selectionEnd;

        const textWithLoading = sourceCode.substring(0, cursorStart) + loadingPlaceholder + sourceCode.substring(cursorEnd);
        setSourceCode(textWithLoading);
        onChange(textWithLoading);

        try {
            setIsUploadingImage(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'blog/content');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Upload thất bại');
            }

            const data = await response.json();

            const imageMarkdown = `![${file.name.replace(/\.[^/.]+$/, '')}](${data.url})`;
            const newText = textWithLoading.replace(loadingPlaceholder, imageMarkdown);

            setSourceCode(newText);
            onChange(newText);

            setTimeout(() => {
                textarea.focus();
                const newPosition = cursorStart + imageMarkdown.length;
                textarea.setSelectionRange(newPosition, newPosition);
            }, 0);

            if (imageInputRef.current) {
                imageInputRef.current.value = '';
            }
        } catch (err) {
            const textWithoutLoading = textWithLoading.replace(loadingPlaceholder, '');
            setSourceCode(textWithoutLoading);
            onChange(textWithoutLoading);

            alert(err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload ảnh');
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleImageButtonClick = () => {
        imageInputRef.current?.click();
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
                <button
                    type="button"
                    onClick={() => insertAtCursor('**', '**')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Bold"
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => insertAtCursor('*', '*')}
                    className="px-3 py-1.5 rounded text-sm font-medium italic bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Italic"
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => insertAtCursor('~~', '~~')}
                    className="px-3 py-1.5 rounded text-sm font-medium line-through bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Strikethrough"
                >
                    S
                </button>

                <div className="w-px bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() => insertAtCursor('# ', '')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Heading 1"
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => insertAtCursor('## ', '')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Heading 2"
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => insertAtCursor('### ', '')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Heading 3"
                >
                    H3
                </button>

                <div className="w-px bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() => insertAtCursor('- ', '')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Unordered List"
                >
                    UL
                </button>
                <button
                    type="button"
                    onClick={() => insertAtCursor('1. ', '')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Ordered List"
                >
                    OL
                </button>
                <button
                    type="button"
                    onClick={() => insertAtCursor('> ', '')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Blockquote"
                >
                    Quote
                </button>

                <div className="w-px bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={handleImageButtonClick}
                    disabled={isUploadingImage}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Chèn ảnh"
                >
                    {isUploadingImage ? 'Uploading...' : 'Image'}
                </button>

                <button
                    type="button"
                    onClick={() => insertAtCursor('[link text](', ')')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Chèn link"
                >
                    Link
                </button>

                <button
                    type="button"
                    onClick={() => insertAtCursor('`', '`')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors font-mono"
                    title="Inline code"
                >
                    Code
                </button>


                <button
                    type="button"
                    onClick={() => insertAtCursor('$', '$')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Inline math"
                >
                    $x$
                </button>

                <button
                    type="button"
                    onClick={() => insertAtCursor('\n$$\n', '\n$$\n')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Block math"
                >
                    $$x$$
                </button>


                <button
                    type="button"
                    onClick={() => insertAtCursor('\n---\n')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Horizontal Rule"
                >
                    HR
                </button>
            </div>

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />

            <div className="border-b border-gray-300 bg-gray-100 flex">
                <button
                    type="button"
                    onClick={() => setActiveTab('markdown')}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'markdown'
                            ? 'bg-white text-gray-900 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    Markdown
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'preview'
                            ? 'bg-white text-gray-900 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    Preview
                </button>
            </div>

            <div className="bg-white">
                {activeTab === 'markdown' ? (
                    <textarea
                        id="source-editor"
                        value={sourceCode}
                        onChange={handleSourceChange}
                        className="w-full min-h-[500px] p-4 font-mono text-sm resize-none focus:outline-none bg-white"
                        spellCheck={false}
                        placeholder="Viết markdown ở đây..."
                    />
                ) : (
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none min-h-[500px] p-4 overflow-auto">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                img: ({ node, ...props }) => (
                                    <img {...props} className="max-w-full h-auto rounded-lg" />
                                )
                            }}
                        >
                            {sourceCode}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
