import React from 'react';
import { Book } from '../types/book';
import { BookOpen, Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToReadingList: (book: Book) => void;
  isInReadingList: boolean;
}

export function BookCard({ book, onAddToReadingList, isInReadingList }: BookCardProps) {
  const { volumeInfo } = book;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-64">
        <img
          src={volumeInfo.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3'}
          alt={volumeInfo.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{volumeInfo.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {volumeInfo.description || 'No description available'}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <a
            href={volumeInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            <span>Preview</span>
          </a>
          <button
            onClick={() => onAddToReadingList(book)}
            className={`flex items-center ${
              isInReadingList ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInReadingList ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}