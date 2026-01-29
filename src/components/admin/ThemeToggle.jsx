export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-lg bg-gray-200 px-3 py-1 text-sm 
                 text-gray-900
                 dark:bg-gray-800 dark:text-white"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
