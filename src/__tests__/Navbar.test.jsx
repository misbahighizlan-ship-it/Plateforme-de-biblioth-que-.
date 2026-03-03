import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Navbar from "../components/Navbar";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }) => <div>{children}</div>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock react-icons to avoid import issues
jest.mock("react-icons/fa", () => ({
    FaHeart: (props) => <span data-testid="icon-heart" {...props} />,
    FaShoppingCart: (props) => <span data-testid="icon-cart" {...props} />,
    FaBook: (props) => <span data-testid="icon-book" {...props} />,
    FaHome: (props) => <span data-testid="icon-home" {...props} />,
    FaRobot: (props) => <span data-testid="icon-robot" {...props} />,
    FaSignInAlt: (props) => <span data-testid="icon-login" {...props} />,
    FaBars: (props) => <span data-testid="icon-bars" {...props} />,
    FaTimes: (props) => <span data-testid="icon-times" {...props} />,
    FaChevronDown: (props) => <span data-testid="icon-chevron" {...props} />,
}));

jest.mock("react-icons/md", () => ({
    MdMovie: (props) => <span {...props} />,
    MdScience: (props) => <span {...props} />,
    MdChildCare: (props) => <span {...props} />,
}));

jest.mock("react-icons/gi", () => ({
    GiDramaMasks: (props) => <span {...props} />,
    GiGhost: (props) => <span {...props} />,
}));

// Helper to create a test store
function createTestStore({ cartCount = 0, wishlistCount = 0 } = {}) {
    return configureStore({
        reducer: {
            cart: (state = { items: Array(cartCount).fill({ id: "x" }) }, action) => state,
            wishlist: (state = { items: Array(wishlistCount).fill({ id: "x" }) }, action) => state,
            categories: (state = { list: [] }, action) => state,
        },
    });
}

// Helper to render with providers
function renderNavbar({ cartCount = 0, wishlistCount = 0, onCartClick = jest.fn() } = {}) {
    const store = createTestStore({ cartCount, wishlistCount });
    return {
        ...render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar onCartClick={onCartClick} />
                </MemoryRouter>
            </Provider>
        ),
        store,
        onCartClick,
    };
}

// ─── TESTS ───────────────────────────────────────────────

describe("Navbar Component", () => {
    test("renders without crashing", () => {
        renderNavbar();
    });

    test("renders the SmartLibrary logo text", () => {
        renderNavbar();
        expect(screen.getByText("SmartLibrary")).toBeInTheDocument();
        expect(screen.getByText("BiblioIA")).toBeInTheDocument();
    });

    test("renders all desktop navigation links", () => {
        renderNavbar();
        expect(screen.getByText("Accueil")).toBeInTheDocument();
        expect(screen.getByText("Catalogue")).toBeInTheDocument();
        expect(screen.getByText("Assistant IA")).toBeInTheDocument();
        expect(screen.getByText("Contact & Avis")).toBeInTheDocument();
    });

    test("renders Login button", () => {
        renderNavbar();
        // There might be multiple "Login" texts (desktop + mobile menu); at least one should exist
        const loginElements = screen.getAllByText("Login");
        expect(loginElements.length).toBeGreaterThanOrEqual(1);
    });

    test("does not show cart badge when cart is empty", () => {
        renderNavbar({ cartCount: 0 });
        // No badge number should appear for cart
        expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    test("shows cart badge count when cart has items", () => {
        renderNavbar({ cartCount: 3 });
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    test("does not show wishlist badge when wishlist is empty", () => {
        renderNavbar({ wishlistCount: 0 });
        // No badge number for wishlist
        expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    test("shows wishlist badge count when wishlist has items", () => {
        renderNavbar({ wishlistCount: 5 });
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    test("calls onCartClick when cart button is clicked", () => {
        const { onCartClick } = renderNavbar({ cartCount: 2 });
        const cartButton = screen.getByTestId("icon-cart").closest("button");
        fireEvent.click(cartButton);
        expect(onCartClick).toHaveBeenCalledTimes(1);
    });

    test("toggles mobile menu on burger button click", () => {
        renderNavbar();
        // Mobile menu should not be visible initially
        // Look for the burger button
        const burgerButton = screen.getByTestId("icon-bars").closest("button");
        expect(burgerButton).toBeInTheDocument();

        // Click burger — mobile menu should open
        fireEvent.click(burgerButton);
        // After click, the mobile menu links should be visible (duplicated)
        const accueilLinks = screen.getAllByText("Accueil");
        expect(accueilLinks.length).toBeGreaterThanOrEqual(2); // Desktop + Mobile
    });

    test("navigation links point to correct routes", () => {
        renderNavbar();
        const accueilLink = screen.getByText("Accueil").closest("a");
        expect(accueilLink).toHaveAttribute("href", "/");

        const catalogueLink = screen.getByText("Catalogue").closest("a");
        expect(catalogueLink).toHaveAttribute("href", "/catalogue");

        const aiLink = screen.getByText("Assistant IA").closest("a");
        expect(aiLink).toHaveAttribute("href", "/ai");

        const contactLink = screen.getByText("Contact & Avis").closest("a");
        expect(contactLink).toHaveAttribute("href", "/contact");
    });

    test("wishlist link points to /wishlist", () => {
        renderNavbar();
        const wishlistLink = screen.getByTestId("icon-heart").closest("a");
        expect(wishlistLink).toHaveAttribute("href", "/wishlist");
    });

    test("shows both cart and wishlist badges when both have items", () => {
        renderNavbar({ cartCount: 2, wishlistCount: 4 });
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
    });
});
