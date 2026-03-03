import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Ai from "../pages/user/Ai";

// Mock geminiService
import * as geminiService from "../services/geminiService";
jest.mock("../services/geminiService", () => ({
    askGemini: jest.fn(),
}));

// Mock buildPrompt
jest.mock("../features/chatbot/buildPrompt", () => ({
    buildPrompt: jest.fn(),
}));

// Create test store
function createTestStore(books = []) {
    return configureStore({
        reducer: {
            books: (state = { list: books, loading: false }, action) => state,
        },
    });
}

// Render helper
function renderWithProviders(ui, { store = createTestStore(), ...options } = {}) {
    return render(
        <Provider store={store}>
            <MemoryRouter>{ui}</MemoryRouter>
        </Provider>,
        options
    );
}

// Setup a mock scrollRef
beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("Ai Chatbot Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the Ai page and initial greeting", () => {
        renderWithProviders(<Ai />);

        // Header check
        expect(screen.getByText("Assistant SmartLib IA")).toBeInTheDocument();

        // Initial bot message check
        expect(screen.getByText(/Bonjour ! Je suis votre assistant SmartLib IA/)).toBeInTheDocument();
    });

    test("renders the correct number of books in the header", () => {
        const store = createTestStore([{ id: "1" }, { id: "2" }]);
        renderWithProviders(<Ai />, { store });

        expect(screen.getByText("2 livres")).toBeInTheDocument();
    });

    test("renders quick suggestions", () => {
        renderWithProviders(<Ai />);
        expect(screen.getByText("💡 Suggestions rapides")).toBeInTheDocument();
        expect(screen.getByText("📚 Recommande-moi un livre")).toBeInTheDocument();
        expect(screen.getByText("🔮 Thriller psychologique")).toBeInTheDocument();
    });

    test("clicking a quick suggestion fills the input box", () => {
        renderWithProviders(<Ai />);

        const suggestionBtn = screen.getByText("📚 Recommande-moi un livre");
        fireEvent.click(suggestionBtn);

        const input = screen.getByPlaceholderText(/Posez votre question.../);
        expect(input.value).toBe("📚 Recommande-moi un livre");
    });

    test("sends a message and displays loading state, then receives AI response", async () => {
        geminiService.askGemini.mockResolvedValueOnce("Voici une recommandation de livre : L'Étranger");

        renderWithProviders(<Ai />);

        const input = screen.getByPlaceholderText(/Posez votre question.../);
        const sendButton = screen.getByRole("button", { name: "" }); // The button has no text, just an icon

        // Type user message
        fireEvent.change(input, { target: { value: "Je cherche un bon roman" } });

        // Submit form
        fireEvent.click(sendButton);

        // Message should be added to UI
        expect(screen.getByText("Je cherche un bon roman")).toBeInTheDocument();

        // Input should be cleared
        expect(input.value).toBe("");

        // Wait for AI response
        await waitFor(() => {
            expect(screen.getByText("Voici une recommandation de livre : L'Étranger")).toBeInTheDocument();
        });

        expect(geminiService.askGemini).toHaveBeenCalledTimes(1);
    });

    test("handles AI error gracefully", async () => {
        geminiService.askGemini.mockRejectedValueOnce(new Error("API Error"));

        renderWithProviders(<Ai />);

        const input = screen.getByPlaceholderText(/Posez votre question.../);
        // Find the submit button by checking its type
        const sendButton = screen.getAllByRole("button").find(btn => btn.type === "submit");

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/Service IA temporairement indisponible/)).toBeInTheDocument();
        });
    });

    test("send button is disabled when input is empty", () => {
        renderWithProviders(<Ai />);
        const sendButton = screen.getAllByRole("button").find(btn => btn.type === "submit");
        expect(sendButton).toBeDisabled();

        const input = screen.getByPlaceholderText(/Posez votre question.../);
        fireEvent.change(input, { target: { value: "Hello" } });
        expect(sendButton).not.toBeDisabled();
    });
});
