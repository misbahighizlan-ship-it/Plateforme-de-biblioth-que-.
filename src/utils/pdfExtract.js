import * as pdfjsLib from 'pdfjs-dist';

// Use unpkg to ensure the exact matching version is available, as cdnjs path sometimes differs.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

/**
 * Extracts text from a PDF file
 * @param {string} pdfUrl The URL of the PDF file
 * @param {number} maxPages Maximum number of pages to extract (to prevent excessive memory/API limits)
 * @returns {Promise<string>} The extracted text
 */
export const extractTextFromPDF = async (pdfUrl, maxPages = 40) => {
    if (!pdfUrl) return "";

    try {
        const loadingTask = pdfjsLib.getDocument({
            url: pdfUrl,
            cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`,
        });
        const pdf = await loadingTask.promise;
        let fullText = "";

        // We limit pages to avoid crashing browser or hitting API context limits
        const numPages = Math.min(pdf.numPages, maxPages);

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            // join the text items
            const pageText = textContent.items.map(item => item.str).join(" ");
            fullText += pageText + "\n";
        }

        return fullText;
    } catch (error) {
        console.error("Erreur lors de l'extraction du texte PDF :", error);
        return "";
    }
};
