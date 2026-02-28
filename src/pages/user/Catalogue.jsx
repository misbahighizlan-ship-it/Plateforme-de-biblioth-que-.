import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaBook, FaTh, FaList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../slices/booksSlice";
import { fetchCategories } from "../../slices/categoriesSlice";
import ProductCard from "../../components/ProductCard";

export default function Catalogue() {
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // grid ou list

    const dispatch = useDispatch();
    const { list: books, loading, error } = useSelector((state) => state.books);
    const { list: categories } = useSelector((state) => state.categories);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchBooks());
        }
    }, [dispatch, books.length]);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    // Filtrer les livres
    const filteredBooks = books.filter((book) => {
        const matchCat = selectedCategory === "Tous" || book.category === selectedCategory;
        const matchSearch = book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-10">
                <p className="text-red-500 mb-4 font-semibold text-lg">Oups ! Une erreur est survenue lors du chargement des livres.</p>
                <button
                    onClick={() => dispatch(fetchBooks())}
                    className="px-6 py-2 bg-[#2B55B5] text-white rounded-xl hover:bg-[#3b66c6] transition"
                >
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER PAGE */}
            <div className="bg-white border-b border-gray-100 px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            Tous les livres
                        </h1>
                        <p className="text-gray-500">
                            Explorer notre collection de {books.length} livres sélectionnés.
                        </p>
                    </motion.div>

                    {/* BARRE DE RECHERCHE */}
                    <div className="mt-6 relative max-w-lg">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un livre ou un auteur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200
                         bg-white outline-none focus:border-pink-400 focus:ring-2
                         focus:ring-pink-100 transition-all text-gray-700"
                        />
                    </div>
                </div>
            </div>

            {/* CONTENU PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-6">

                    {/* ===== SIDEBAR FILTRE GAUCHE ===== */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full md:w-64 flex-shrink-0"
                    >
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">

                            {/* Titre filtre */}
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                                    <FaFilter className="text-white text-xs" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-base">Catégories</h3>
                            </div>

                            {/* Bouton Tous */}
                            <button
                                onClick={() => setSelectedCategory("Tous")}
                                style={{
                                    cursor: "pointer",
                                    ...(selectedCategory === "Tous" && {
                                        background: "linear-gradient(135deg, #ff758c, #7a5cff)"
                                    })
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl
                           text-sm font-semibold mb-2 transition-all duration-200
                           ${selectedCategory === "Tous"
                                        ? "text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <FaBook className="text-xs" />
                                    Tous les livres
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold
                  ${selectedCategory === "Tous"
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {books.length}
                                </span>
                            </button>

                            {/* Catégories */}
                            <div className="space-y-1">
                                {categories.map((cat) => {
                                    const count = books.filter(b => b.category === cat.name).length;
                                    const isActive = selectedCategory === cat.name;
                                    return (
                                        <button
                                            key={cat.id || cat.name}
                                            onClick={() => setSelectedCategory(cat.name)}
                                            style={{
                                                cursor: "pointer",
                                                ...(isActive && {
                                                    background: "linear-gradient(135deg, #ff758c, #7a5cff)"
                                                })
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-3
                                 rounded-2xl text-sm font-medium transition-all duration-200
                                 ${isActive
                                                    ? "text-white shadow-md"
                                                    : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="truncate text-left">{cat.name}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ml-2
                        ${isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-gray-100 text-gray-500"
                                                }`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                    </motion.aside>

                    {/* ===== GRILLE LIVRES DROITE ===== */}
                    <div className="flex-1 min-w-0">

                        {/* Header résultats */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-500 text-sm">
                                <span className="font-semibold text-gray-900">{filteredBooks.length}</span> livres trouvés
                                {selectedCategory !== "Tous" && (
                                    <span> dans <span className="text-pink-500 font-semibold">{selectedCategory}</span></span>
                                )}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    style={{
                                        cursor: "pointer",
                                        ...(viewMode === "grid" && {
                                            background: "linear-gradient(135deg, #ff758c, #7a5cff)"
                                        })
                                    }}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                    ${viewMode === "grid" ? "text-white" : "text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <FaTh />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    style={{
                                        cursor: "pointer",
                                        ...(viewMode === "list" && {
                                            background: "linear-gradient(135deg, #ff758c, #7a5cff)"
                                        })
                                    }}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                    ${viewMode === "list" ? "text-white" : "text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                            </div>
                        ) : (
                            <>
                                {/* Grille des livres — NE PAS TOUCHER ProductCard */}
                                {filteredBooks.length === 0 ? (
                                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                                        <div className="text-6xl mb-4">📚</div>
                                        <p className="text-gray-500">Aucun livre trouvé</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        layout
                                        className={`grid ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'} gap-6`}
                                    >
                                        {filteredBooks.map((book, index) => (
                                            <motion.div
                                                key={book.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <ProductCard book={book} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}
