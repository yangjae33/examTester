# VCE Player

A modern web-based exam player for practice tests and certifications.

## Features

- **File Upload**: Drag & drop or browse JSON exam files
- **Question Types**: Support for single-choice and multiple-choice questions
- **Real-time Scoring**: Instant feedback on correct/incorrect answers
- **Progress Tracking**: Automatically saves your progress in localStorage
- **Answer Shuffling**: Option to randomize answer choices for each question
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **PDF Converter**: Convert PDF exam files to JSON format

## Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- Tailwind CSS (styling)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173/ to view the app.

### Build for Production

```bash
npm run build
```

## Exam File Format

Create a JSON file with the following structure:

```json
{
  "title": "Your Exam Title",
  "questions": [
    {
      "id": 1,
      "type": "single",
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": [0],
      "explanation": "Optional explanation"
    },
    {
      "id": 2,
      "type": "multiple",
      "question": "Select all that apply",
      "options": ["Option A", "Option B", "Option C"],
      "correct": [0, 2],
      "explanation": "Optional explanation"
    }
  ]
}
```

### Field Descriptions

- `title`: The exam title
- `questions`: Array of question objects
  - `id`: Unique question identifier (number)
  - `type`: Question type (`"single"` or `"multiple"`)
  - `question`: The question text
  - `options`: Array of answer options
  - `correct`: Array of correct answer indices (0-based)
  - `explanation`: (Optional) Explanation shown after answering

## Converting PDF to JSON

If you have exam questions in PDF format, you can use the included converter script.

### Prerequisites

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### Usage

```bash
python pdf_to_json.py <pdf_file> [output_file] [exam_title]
```

**Examples:**

```bash
# Basic conversion (creates exam.json)
python pdf_to_json.py exam.pdf

# Specify output filename
python pdf_to_json.py exam.pdf my-exam.json

# Specify output filename and exam title
python pdf_to_json.py exam.pdf my-exam.json "CAMS Certification Exam"
```

### Supported PDF Format

The converter works best with PDFs that have this structure:

```
QUESTION NO: X
Question text here?
A. Option 1
B. Option 2
C. Option 3
D. Option 4
Answer: B
Explanation:
Detailed explanation here...
```

## Sample Exam

A sample exam file (`sample-exam.json`) is included in the project root. You can use this to test the player.

## How to Use

1. Start the development server
2. Open your browser to http://localhost:5173/
3. Drag and drop or browse for a JSON exam file
4. Answer questions one by one
5. Review your score at the end
6. Progress is automatically saved to localStorage

## Features in Detail

### Progress Tracking
Your progress is automatically saved to your browser's localStorage, so you can close the browser and continue later.

### Scoring
- Immediate feedback after each answer
- Correct answers shown in green
- Incorrect answers shown in red
- Final score summary at the end

### Question Navigation
- Answer submission required before moving to next question
- Automatic progression after answering
- Progress bar shows completion status

## License

MIT
