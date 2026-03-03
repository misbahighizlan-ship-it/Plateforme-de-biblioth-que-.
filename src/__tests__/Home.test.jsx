import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Home from "../pages/user/Home";

// Mock child components to isolate Home tests
jest.mock("../components/HeroSection", () => {
    return function MockHeroSection() {
        return <div data-testid="hero-section">HeroSection</div>;
    };
});

jest.mock("../components/CategoriesSection", () => {
    return function MockCategoriesSection() {
        return <div data-testid="categories-section">CategoriesSection</div>;
    };
});

jest.mock("../components/ProductCard", () => {
    return function MockProductCard({ book }) {
        return <div data-testid={`product-card-${book.id}`}>{book.title}</div>;
    };
});

// Mock framer-motion to avoid animation-related issues in tests
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }) => <div {...filterProps(props)}>{children}</div>,
        span: ({ children, ...props }) => <span {...filterProps(props)}>{children}</span>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

// Helper to filter out framer-motion-specific props
function filterProps(props) {
    const {
        initial, animate, exit, transition, whileInView, viewport,
        whileHover, whileTap, ...rest
    } = props;
    return rest;
}

// Mock books data
const mockBooks = [
    { id: "1", title: "Le Petit Prince", author: "Saint-Exupéry", category: "Fiction", price: 50, rating: 4.5 },
    { id: "2", title: "Les Misérables", author: "Victor Hugo", category: "Classique", price: 80, rating: 4.8 },
    { id: "3", title: "L'Étranger", author: "Albert Camus", category: "Philosophie", price: 45, rating: 4.3 },
    { id: "4", title: "Germinal", author: "Émile Zola", category: "Classique", price: 55, rating: 4.6 },
    { id: "5", title: "Extra Book", author: "Author", category: "Other", price: 30, rating: 3.5 },
];

// Helper to create a test store
function createTestStore(books = mockBooks) {
    return configureStore({
        reducer: {
            books: (state = { list: books, loading: false }, action) => state,
            cart: (state = { items: [] }, action) => state,
            wishlist: (state = { items: [] }, action) => state,
            categories: (state = { list: [] }, action) => state,
        },
    });
}

// Helper to render with providers
function renderWithProviders(ui, { store = createTestStore(), ...options } = {}) {
    return render(
        <Provider store={store}>
            <MemoryRouter>{ui}</MemoryRouter>
        </Provider>,
        options
    );
}

// ─── TESTS ───────────────────────────────────────────────

describe("Home Page", () => {
    test("renders without crashing", () => {
        renderWithProviders(<Home />);
    });

    test("renders the HeroSection component", () => {
        renderWithProviders(<Home />);
        expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });

    test("renders the CategoriesSection component", () => {
        renderWithProviders(<Home />);
        expect(screen.getByTestId("categories-section")).toBeInTheDocument();
    });

    test("renders the 'À PROPOS' section with correct heading", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("À PROPOS")).toBeInTheDocument();
        expect(screen.getByText(/La bibliothèque du/)).toBeInTheDocument();
        expect(screen.getByText("futur")).toBeInTheDocument();
    });

    test("renders the 3 feature cards (Assistant IA, Catalogue Riche, Commande Rapide)", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("Assistant IA")).toBeInTheDocument();
        expect(screen.getByText("Catalogue Riche")).toBeInTheDocument();
        expect(screen.getByText("Commande Rapide")).toBeInTheDocument();
    });

    test("renders the about section description text", () => {
        renderWithProviders(<Home />);
        expect(
            screen.getByText(/SmartLibrary BiblioIA combine l'intelligence artificielle/)
        ).toBeInTheDocument();
    });

    test("renders the stats row with correct numbers", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("500+")).toBeInTheDocument();
        expect(screen.getByText("10K+")).toBeInTheDocument();
        expect(screen.getByText("6+")).toBeInTheDocument();
        expect(screen.getByText("24/7")).toBeInTheDocument();
    });

    test("renders stat labels", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("Livres disponibles")).toBeInTheDocument();
        expect(screen.getByText("Lecteurs satisfaits")).toBeInTheDocument();
        expect(screen.getByText("Genres littéraires")).toBeInTheDocument();
        expect(screen.getByText("Assistant IA actif")).toBeInTheDocument();
    });

    test("renders the 'Livres Populaires' section title", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("SÉLECTION")).toBeInTheDocument();
        expect(screen.getByText(/Populaires/)).toBeInTheDocument();
    });

    test("renders max 4 product cards from the books list", () => {
        renderWithProviders(<Home />);
        expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
        expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
        expect(screen.getByTestId("product-card-3")).toBeInTheDocument();
        expect(screen.getByTestId("product-card-4")).toBeInTheDocument();
        // The 5th book should NOT be rendered (max 4)
        expect(screen.queryByTestId("product-card-5")).not.toBeInTheDocument();
    });

    test("renders 'Voir tout le catalogue' button", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("Voir tout le catalogue →")).toBeInTheDocument();
    });

    test("renders 'Voir tout →' link button", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("Voir tout →")).toBeInTheDocument();
    });

    test("renders no product cards when books list is empty", () => {
        const emptyStore = createTestStore([]);
        renderWithProviders(<Home />, { store: emptyStore });
        expect(screen.queryByTestId(/product-card/)).not.toBeInTheDocument();
    });
});
