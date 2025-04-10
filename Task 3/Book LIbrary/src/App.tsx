import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { BookCard } from './components/BookCard';
import { ReadingList } from './components/ReadingList';
import { Book } from './types/book';
import { Library, BookMarked } from 'lucide-react';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [showReadingList, setShowReadingList] = useState(false);

  const searchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=12`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  const addToReadingList = (book: Book) => {
    if (!readingList.find((b) => b.id === book.id)) {
      setReadingList([...readingList, book]);
    }
  };

  const removeFromReadingList = (bookId: string) => {
    setReadingList(readingList.filter((book) => book.id !== bookId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Library className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">BookShelf</h1>
            </div>
            <button
              onClick={() => setShowReadingList(!showReadingList)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <BookMarked className="w-5 h-5 mr-2" />
              Reading List ({readingList.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={searchBooks} />
        </div>

        {showReadingList ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Your Reading List</h2>
            <ReadingList
              books={readingList}
              onRemoveFromList={removeFromReadingList}
            />
          </div>
        ) : (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onAddToReadingList={addToReadingList}
                    isInReadingList={readingList.some((b) => b.id === book.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;