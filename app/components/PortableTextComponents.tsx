import Image from 'next/image';
import { PortableTextReactComponents } from '@portabletext/react';
import React, { memo, Suspense } from 'react';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighterPrism } from 'react-syntax-highlighter';

// Define proper types instead of any
interface MemoizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  caption?: string;
}

// Memoize components for better performance
const MemoizedImage = memo(({ src, alt, width, height, className, caption }: MemoizedImageProps) => (
  <figure className="my-8">
    <Image
      src={src || ''}
      alt={alt || ' '}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 800px"
    />
    {caption && (
      <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>
    )}
  </figure>
));

MemoizedImage.displayName = 'MemoizedImage';

// Define proper type for code block
interface CodeBlockProps {
  language?: string;
  code: string;
  filename?: string;
}

// Create code block component with loading state
const CodeBlock = memo(({ language, code, filename }: CodeBlockProps) => (
  <Suspense fallback={<div className="bg-gray-900 text-gray-100 p-5 rounded-lg animate-pulse h-32" />}>
    <div className="my-6 rounded-lg overflow-hidden">
      <SyntaxHighlighterPrism
        language={language || 'typescript'}
        style={atomDark}
        className="text-sm"
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.25rem',
          margin: '0',
        }}
      >
        {code}
      </SyntaxHighlighterPrism>
      {filename && (
        <div className="text-xs text-gray-500 mt-1 px-1">
          {filename}
        </div>
      )}
    </div>
  </Suspense>
));

CodeBlock.displayName = 'CodeBlock';

export const PortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => (
      <MemoizedImage 
        src={value.asset?.url}
        alt={value.alt}
        width={800}
        height={500}
        className="rounded-lg shadow-md mx-auto"
        caption={value.caption}
      />
    ),
    code: ({ value }) => (
      <CodeBlock 
        language={value.language}
        code={value.code}
        filename={value.filename}
      />
    ),
    callout: ({ value }) => (
      <div className={`p-4 my-6 border-l-4 bg-gray-50 rounded-r-lg ${value.tone === 'warning' ? 'border-yellow-500' : 'border-blue-500'}`}>
        <div className="font-semibold">{value.title}</div>
        <div>{value.text}</div>
      </div>
    )
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-6 text-gray-800">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold my-5 text-gray-800">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold my-4 text-gray-800">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold my-3 text-gray-800">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-semibold my-3 text-gray-800">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-semibold my-3 text-gray-800">{children}</h6>,
    normal: ({ children }) => <p className="text-lg leading-relaxed my-4 text-gray-700">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-1 my-6 italic bg-blue-50 rounded-r-lg text-gray-700">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
        target={value.href.startsWith('/') ? undefined : "_blank"}
        rel={value.href.startsWith('/') ? undefined : "noopener noreferrer"}
      >
        {children}
      </a>
    ),
  },
}; 