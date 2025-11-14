import { useState } from 'react';
import { Exam } from '../types/exam';
import { parseExamFile } from '../utils/parser';

interface FileUploadProps {
  onExamLoaded: (exam: Exam, shouldShuffle: boolean) => void;
}

export const FileUpload = ({ onExamLoaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldShuffle, setShouldShuffle] = useState(false);

  const handleFile = (file: File) => {
    setError(null);

    if (!file.name.endsWith('.json')) {
      setError('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const exam = parseExamFile(content);
        onExamLoaded(exam, shouldShuffle);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse file');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md p-8 relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4 animate-float">
            <svg
              className="w-20 h-20 mx-auto text-white drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            VCE Player
          </h1>
          <p className="text-white text-opacity-90 text-lg">
            Start your exam journey today
          </p>
        </div>

        {/* Upload area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`glass-effect rounded-2xl p-12 text-center transition-all duration-300 shadow-2xl ${
            isDragging
              ? 'scale-105 ring-4 ring-white ring-opacity-50'
              : 'hover:scale-102'
          }`}
        >
          <div className="mb-6">
            <div className={`inline-block p-4 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 ${isDragging ? 'animate-glow' : ''}`}>
              <svg
                className="h-16 w-16 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          <p className="text-gray-700 mb-6 text-lg font-medium">
            Drag and drop your exam file here
          </p>

          <label className="cursor-pointer group">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 inline-block font-semibold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
              Browse Files
            </span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>

          <div className="mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-600">
              Supports JSON format only
            </p>
          </div>
        </div>

        {/* Shuffle option */}
        <div className="mt-6 glass-effect rounded-xl p-5 shadow-lg animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <label className="flex items-start cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={shouldShuffle}
                onChange={(e) => setShouldShuffle(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer"
              />
            </div>
            <div className="ml-3 flex-1">
              <span className="text-gray-800 font-semibold group-hover:text-purple-600 transition-colors">
                Shuffle answer options
              </span>
              <p className="text-xs text-gray-600 mt-1">
                Randomize the order of answer choices for each question
              </p>
            </div>
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-6 p-4 bg-red-500 bg-opacity-10 backdrop-blur-sm border border-red-300 rounded-xl shadow-lg animate-scale-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white text-opacity-80 text-sm">
            Upload your JSON exam file to get started
          </p>
        </div>
      </div>
    </div>
  );
};
