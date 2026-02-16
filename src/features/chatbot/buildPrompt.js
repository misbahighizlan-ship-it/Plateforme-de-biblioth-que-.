export function buildPrompt({ books, userMessage }) {
  // On limite le contexte pour éviter un prompt trop long
  const compactBooks = books.slice(0, 50).map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    category: b.category,
    description: b.description,
    // si tu as "quotes" ou "excerpts" dans MockAPI, ajoute-les ici
  }));

  return `
Tu es un assistant IA pour une bibliothèque digitale.
Règles :
- Réponds en français.
- Base-toi UNIQUEMENT sur les livres fournis ci-dessous.
- Si on demande une citation/extrait et qu'il n'y en a pas dans les données, dis que la bibliothèque ne contient pas encore d'extraits pour ce livre et propose un résumé (à partir de la description) + des recommandations alternatives.
- Donne une réponse courte, claire, et actionnable.

Données des livres (JSON) :
${JSON.stringify(compactBooks, null, 2)}

Message utilisateur :
"${userMessage}"

Ta réponse attendue :
1) Intention détectée (recommandation / citation / info)
2) 3 suggestions max (Titre — Auteur — Catégorie — Pourquoi)
3) Si pertinent : une citation/extrait (uniquement si disponible), sinon expliquer qu'il n'y en a pas.
`;
}