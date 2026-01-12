import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function FileDropzone({ onDrop, accept, label, error, hint, value, currentUrl }) {
    const handleDrop = useCallback((acceptedFiles) => {
        if (onDrop && acceptedFiles.length > 0) {
            onDrop(acceptedFiles[0]);
        }
    }, [onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: accept,
        maxFiles: 1,
        multiple: false
    });

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    {label}
                </label>
            )}
            
            <div 
                {...getRootProps()} 
                className={`
                    border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${isDragActive 
                        ? 'border-[#10a37f] bg-[#10a37f]/5' 
                        : 'border-gray-300 dark:border-slate-700 hover:border-[#10a37f] dark:hover:border-[#10a37f]'
                    }
                    ${error ? 'border-red-300 dark:border-red-500/50' : ''}
                    bg-white dark:bg-slate-800
                `}
            >
                <input {...getInputProps()} />
                
                {value ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-[#10a37f]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium truncate max-w-[200px]">{value.name}</span>
                        <span className="text-gray-500 dark:text-slate-400 text-xs">
                            ({(value.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                    </div>
                ) : currentUrl ? (
                     <div className="flex flex-col items-center justify-center gap-1 text-sm">
                        <div className="flex items-center gap-2 text-[#10a37f]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-medium">Current File</span>
                        </div>
                        <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate max-w-[300px]" onClick={(e) => e.stopPropagation()}>
                            {currentUrl.split('/').pop()}
                        </a>
                        <p className="text-xs text-gray-500 mt-2">Click or drag close to replace</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-sm text-gray-600 dark:text-slate-400">
                            {isDragActive ? (
                                <p>Drop the file here ...</p>
                            ) : (
                                <p>
                                    <span className="font-medium text-[#10a37f]">Upload a file</span> or drag and drop
                                </p>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-slate-500">
                            PDF, Ebook (EPUB), or Video up to 50MB
                        </p>
                    </div>
                )}
            </div>

            {hint && !error && <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{hint}</p>}
            {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}
