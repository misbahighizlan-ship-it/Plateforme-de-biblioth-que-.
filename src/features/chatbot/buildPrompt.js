export function buildPrompt({ books, userMessage, currentBook = null }) {

  const booksList = books.slice(0, 5).map(b =>
    `- "${b.title}" | ${b.author} | ${b.category} | ${b.price} DH | ⭐${b.rating}/5`
  ).join('\n');

  const currentBookInfo = currentBook ? `
LIVRE CONSULTÉ: "${currentBook.title}" par ${currentBook.author}
Catégorie: ${currentBook.category} | Prix: ${currentBook.price} DH

MÊME AUTEUR:
${books.filter(b => b.author === currentBook.author && b.id !== currentBook.id)
      .slice(0, 2).map(b => `- "${b.title}" (${b.price} DH)`).join('\n') || "Aucun"}

SIMILAIRES:
${books.filter(b => b.category === currentBook.category && b.id !== currentBook.id)
      .slice(0, 2).map(b => `- "${b.title}" par ${b.author}`).join('\n') || "Aucun"}
` : "";

  return `Tu es BiblioBot, assistant de SmartLibrary BiblioIA.

RÈGLES:
- Réponds dans la langue de la question (français/arabe/anglais)
- Citations toujours dans la langue originale du livre
- Réponses précises avec emojis, jamais génériques
- Maximum 4-5 phrases par réponse

CATALOGUE (${books.length} livres, extrait de 5):
${booksList}
${currentBookInfo}
QUESTION: ${userMessage}`;
}