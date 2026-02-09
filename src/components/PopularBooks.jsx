export default function PopularBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#0b1230] to-[#050814] py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-white mb-10">
          <span className="text-rose-400">Popular</span> Books
        </h2>

        <BooksCarousel books={books.slice(0, 5)} />
      </div>
    </section>
  );
}
