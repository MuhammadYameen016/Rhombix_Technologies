import React from 'react';
import { Book } from '../types/book';
import { X } from 'lucide-react';

interface ReadingListProps {
  books: Book[];
  onRemoveFromList: (bookId: string) => void;
}

export function ReadingList({ books, onRemoveFromList }: ReadingListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Your reading list is empty
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex items-center bg-white p-4 rounded-lg shadow-sm"
        >
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3'}
            alt={book.volumeInfo.title}
            className="w-16 h-24 object-cover rounded"
          />
          <div className="ml-4 flex-1">
            <h4 className="font-semibold">{book.volumeInfo.title}</h4>
            <p className="text-sm text-gray-600">
              {book.volumeInfo.authors?.join(', ')}
            </p>
          </div>
          <button
            onClick={() => onRemoveFromList(book.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}