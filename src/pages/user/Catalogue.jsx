import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../../slices/booksSlice";
import ProductCard from "../../components/ProductCard";

export default function Catalogue() {
    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get("category");

    const dispatch = useDispatch();
    const { list: books, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchBooks());
        }
    }, [dispatch, books.length]);

    const filteredBooks = categoryFilter
        ? books.filter(b => b.category?.trim() === categoryFilter.trim())
        : books;

    if (error) {
        return (
            <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-10">
                <p className="text-red-400 mb-4 font-semibold text-lg">Oups ! Une erreur est survenue lors du chargement des livres.</p>
                <button
                    onClick={() => dispatch(fetchBooks())}
                    className="px-6 py-2 bg-[#2B55B5] rounded-xl hover:bg-[#3b66c6] transition"
                >
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-10">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        {categoryFilter ? `Catégorie : ${categoryFilter}` : "Tous les livres"}
                    </h1>
                    <p className="text-gray-400">
                        Explorer notre collection de livres sélectionnés.
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <ProductCard key={book.id} book={book} />
                        ))}
                        {filteredBooks.length === 0 && (
                            <p className="text-gray-500 col-span-full text-center py-20 text-xl italic">
                                Aucun livre trouvé pour cette recherche.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
