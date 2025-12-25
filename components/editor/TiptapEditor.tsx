'use client';

import { useState, useEffect } from 'react';
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
                    onClick={() => insertAtCursor('![alt text](', ')')}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Chèn ảnh"
                >
                    Image
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

            <div className="grid grid-cols-2 gap-0 divide-x divide-gray-300">
                <div className="bg-gray-50">
                    <div className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-700">
                        Markdown
                    </div>
                    <textarea
                        id="source-editor"
                        value={sourceCode}
                        onChange={handleSourceChange}
                        className="w-full min-h-[500px] p-4 font-mono text-sm resize-none focus:outline-none bg-white"
                        spellCheck={false}
                        placeholder="Viết markdown ở đây..."
                    />
                </div>

                <div className="bg-white">
                    <div className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-700">
                        Preview
                    </div>
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
                </div>
            </div>
        </div>
    );
}
