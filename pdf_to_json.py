#!/usr/bin/env python3
"""
PDF to VCE Player JSON Converter
Converts exam PDF files to JSON format for VCE Player
"""

import re
import json
import sys


def parse_pdf_text(text):
    """Parse PDF text and extract questions"""
    questions = []

    # Split by QUESTION NO pattern
    question_blocks = re.split(r'QUESTION NO:\s*(\d+)', text)

    # Process each question (skip first empty element)
    for i in range(1, len(question_blocks), 2):
        question_num = int(question_blocks[i])
        content = question_blocks[i + 1] if i + 1 < len(question_blocks) else ""

        # Extract question text (everything before first option)
        question_match = re.search(r'^(.*?)(?=\n[A-D]\.)', content, re.DOTALL)
        if not question_match:
            continue

        question_text = question_match.group(1).strip()

        # Extract options
        options_pattern = r'([A-D])\.\s*([^\n]+(?:\n(?![A-D]\.|Answer:)[^\n]+)*)'
        options = re.findall(options_pattern, content)

        if len(options) < 2:  # Need at least 2 options
            continue

        option_texts = [opt[1].strip() for opt in options]

        # Extract answer
        answer_match = re.search(r'Answer:\s*([A-D])', content)
        if not answer_match:
            continue

        answer_letter = answer_match.group(1)
        answer_index = ord(answer_letter) - ord('A')

        # Extract explanation
        explanation = ""
        explanation_match = re.search(r'Explanation:\s*(.*?)(?=QUESTION NO:|$)', content, re.DOTALL)
        if explanation_match:
            explanation = explanation_match.group(1).strip()
            # Clean up explanation (remove excessive whitespace)
            explanation = re.sub(r'\s+', ' ', explanation)

        # Determine question type (single choice for now)
        question_type = "single"

        questions.append({
            "id": question_num,
            "type": question_type,
            "question": question_text,
            "options": option_texts,
            "correct": [answer_index],
            "explanation": explanation if explanation else None
        })

    return questions


def pdf_to_json(pdf_path, output_path=None, title="Exam"):
    """Convert PDF file to JSON format"""
    try:
        # Try pdfplumber first (better for complex PDFs)
        try:
            import pdfplumber
            with pdfplumber.open(pdf_path) as pdf:
                text = ""
                for page in pdf.pages:
                    text += page.extract_text() + "\n"
        except ImportError:
            # Fallback to PyPDF2
            try:
                from PyPDF2 import PdfReader
                reader = PdfReader(pdf_path)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
            except ImportError:
                print("Error: Please install pdfplumber or PyPDF2")
                print("Run: pip install pdfplumber")
                print("Or: pip install PyPDF2")
                return None

        # Parse the text
        questions = parse_pdf_text(text)

        if not questions:
            print("Warning: No questions found in PDF")
            return None

        # Create exam object
        exam = {
            "title": title,
            "questions": questions
        }

        # Save to file if output path provided
        if output_path:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(exam, f, ensure_ascii=False, indent=2)
            print(f"Successfully converted {len(questions)} questions")
            print(f"Output saved to: {output_path}")

        return exam

    except Exception as e:
        print(f"Error: {e}")
        return None


def main():
    if len(sys.argv) < 2:
        print("Usage: python pdf_to_json.py <pdf_file> [output_file] [exam_title]")
        print("\nExample:")
        print("  python pdf_to_json.py exam.pdf")
        print("  python pdf_to_json.py exam.pdf output.json")
        print("  python pdf_to_json.py exam.pdf output.json \"My Exam Title\"")
        sys.exit(1)

    pdf_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else pdf_path.replace('.pdf', '.json')
    title = sys.argv[3] if len(sys.argv) > 3 else "Exam"

    print(f"Converting: {pdf_path}")
    print(f"Title: {title}")

    result = pdf_to_json(pdf_path, output_path, title)

    if result:
        print("\nConversion complete!")
        print(f"Total questions: {len(result['questions'])}")
    else:
        print("\nConversion failed!")
        sys.exit(1)


if __name__ == "__main__":
    main()
