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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          VCE Player
        </h1>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
          }`}
        >
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-gray-600 mb-4">
            Drag and drop your exam file here, or
          </p>

          <label className="cursor-pointer">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
              Browse Files
            </span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>

          <p className="text-sm text-gray-500 mt-4">
            Supports JSON format only
          </p>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={shouldShuffle}
              onChange={(e) => setShouldShuffle(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">
              Shuffle answer options
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Randomize the order of answer choices for each question
          </p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
