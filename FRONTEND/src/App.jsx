import { useEffect, useMemo, useState, useCallback, memo } from "react";

import {
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    Calculator,
    CheckCircle2,
    ChevronUp,
    Copy,
    FileText,
    Menu,
    MessageCircle,
    Moon,
    Phone,
    Search,
    ShieldCheck,
    Sparkles,
    Sun,
    TrendingUp,
    X,
    Zap,
} from "lucide-react";

import {
    getServices,
    createEnquiry,
} from "./api";

/* =====================================================
   BUSINESS DETAILS
===================================================== */

const PHONE = "6303151379";
const WHATSAPP = "916303151379";
const EMAIL = "smbassociates@gmail.com";

/* =====================================================
   SERVICE CATEGORIES
===================================================== */

const CATEGORY_NAMES = {
    ALL: "All Services",
    GST: "GST Services",
    INCOME_TAX: "Income Tax",
    BUSINESS: "Business Licenses",
    ANNUAL: "Annual Filings",
    REGISTRATION: "Company/Firm Registration",
    OTHER: "Other Services",
};

const CATEGORY_ORDER = [
    "GST",
    "INCOME_TAX",
    "BUSINESS",
    "ANNUAL",
    "REGISTRATION",
    "OTHER",
];

/* =====================================================
   DEFAULT / FALLBACK SERVICES
===================================================== */

const DEFAULT_SERVICES = [
    { id: 1, title: "GST Return Filing (NIL)", category: "GST", price: 249, unit: "", popular: true, description: "NIL GST Return Filing for businesses with no transactions during the tax period." },
    { id: 2, title: "GST Return Filing (Taxable)", category: "GST", price: 699, unit: "", popular: true, description: "Regular Monthly/Quarterly GST Return filing for active businesses." },
    { id: 3, title: "GST Amendment", category: "GST", price: 999, unit: "", popular: false, description: "Amendment in core/non-core details of existing GST Registration." },
    { id: 4, title: "GST Cancellation", category: "GST", price: 1499, unit: "", popular: false, description: "Official cancellation / surrender of GST Registration." },
    { id: 5, title: "GST Registration (1 Day)", category: "GST", price: 1499, unit: "", popular: true, description: "Fast-track GST Registration application with complete document preparation." },

    { id: 6, title: "ITR-1 Salaried Return", category: "INCOME_TAX", price: 499, unit: "", popular: true, description: "Income tax return filing for salaried individuals and pension income." },
    { id: 7, title: "ITR-2 Individual / HUF", category: "INCOME_TAX", price: 999, unit: "", popular: false, description: "Tax return for capital gains, multiple properties, or crypto income." },
    { id: 8, title: "ITR-3 Business / Profession", category: "INCOME_TAX", price: 1999, unit: "", popular: false, description: "Filing for individuals/HUFs having income from business or profession." },
    { id: 9, title: "ITR-4 Presumptive Business", category: "INCOME_TAX", price: 1299, unit: "", popular: true, description: "Presumptive tax return under Section 44AD / 44ADA for small business/freelancers." },
    { id: 10, title: "Tax Planning Consultation", category: "INCOME_TAX", price: 799, unit: "", popular: false, description: "Expert tax saving advice and consultation under Old & New tax regimes." },

    { id: 11, title: "FSSAI Food License (Basic)", category: "BUSINESS", price: 999, unit: "", popular: true, description: "Basic FSSAI registration for food manufacturers, distributors and restaurants." },
    { id: 12, title: "MSME / Udyam Registration", category: "BUSINESS", price: 499, unit: "", popular: true, description: "Government MSME registration for subsidies, loans, and business benefits." },
    { id: 13, title: "Import Export Code (IEC)", category: "BUSINESS", price: 1499, unit: "", popular: false, description: "Registration for obtaining 10-digit IEC code from DGFT for import/export." },
    { id: 14, title: "Trade License Application", category: "BUSINESS", price: 1999, unit: "", popular: false, description: "Local municipal trade license application and renewal assistance." },

    { id: 15, title: "ROC Annual Return (Pvt Ltd)", category: "ANNUAL", price: 4999, unit: "", popular: true, description: "Mandatory annual ROC filing including Form AOC-4 and MGT-7." },
    { id: 16, title: "Director KYC (DIR-3 KYC)", category: "ANNUAL", price: 499, unit: "", popular: true, description: "Annual Director Identification Number (DIN) e-KYC compliance." },
    { id: 17, title: "LLP Form 11 & Form 8 Filing", category: "ANNUAL", price: 3499, unit: "", popular: false, description: "Annual compliance returns for Limited Liability Partnerships." },

    { id: 18, title: "Private Limited Company", category: "REGISTRATION", price: 6999, unit: "", popular: true, description: "Complete Pvt Ltd incorporation including Name Approval, DSC, SPICe+, DIN, PAN, TAN & GST." },
    { id: 19, title: "Partnership Firm Registration", category: "REGISTRATION", price: 2999, unit: "", popular: false, description: "Drafting partnership deed and registration with Registrar of Firms." },
    { id: 20, title: "LLP Incorporation", category: "REGISTRATION", price: 4999, unit: "", popular: false, description: "LLP registration with MCA, agreement drafting and PIN/PAN generation." },
    { id: 21, title: "One Person Company (OPC)", category: "REGISTRATION", price: 5999, unit: "", popular: false, description: "Single-owner company registration with limited liability protection." },

    { id: 22, title: "Digital Signature Certificate (Class 3)", category: "OTHER", price: 999, unit: "", popular: true, description: "Class 3 DSC token with 2 years validity for e-filing and tenders." },
    { id: 23, title: "Trademark Registration", category: "OTHER", price: 3999, unit: "", popular: false, description: "Brand name / logo trademark search and filing with TM Registry." },
    { id: 24, title: "PAN / TAN Application", category: "OTHER", price: 399, unit: "", popular: false, description: "New PAN or TAN card application and correction service." }
];

/* =====================================================
   PRICE FORMATTER
===================================================== */

function formatPrice(price) {
    return `₹${Number(price).toLocaleString("en-IN")}`;
}

/* =====================================================
   MEMOIZED SUB-COMPONENTS FOR HIGH PERFORMANCE
===================================================== */

const ServiceListItem = memo(function ServiceListItem({ service, onSelect }) {
    return (
        <div className="service-list-item">
            <div className="service-name">
                <span className="service-check">✓</span>
                <span>{service.title}</span>
            </div>
            <div className="service-price-action">
                <strong>{formatPrice(service.price)} {service.unit}</strong>
                <button
                    type="button"
                    className="service-details-button"
                    onClick={() => onSelect(service)}
                >
                    Details
                </button>
            </div>
        </div>
    );
});

/* =====================================================
   MAIN APP
===================================================== */

function App() {
    const [services, setServices] = useState(DEFAULT_SERVICES);
    const [category, setCategory] = useState("ALL");
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showEnquiry, setShowEnquiry] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openCategory, setOpenCategory] = useState("GST");

    // Dark / Light Mode state
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    // Instant Search query & debouncing
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Interactive Fee Estimator items
    const [selectedCalcIds, setSelectedCalcIds] = useState([1, 6]);

    // Toast notification state
    const [toast, setToast] = useState(null);

    // Scroll to top visibility
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery.trim().toLowerCase());
        }, 150);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    /* =================================================
       LOAD SERVICES (WITH CACHING & FAST FALLBACK)
    ================================================= */

    useEffect(() => {
        loadServices();
    }, []);

    async function loadServices() {
        try {
            const data = await getServices();
            const serviceList = Array.isArray(data) ? data : data?.results || [];
            if (serviceList.length > 0) {
                setServices(serviceList);
            }
        } catch (error) {
            console.error("Failed to load services, using default catalog:", error);
        } finally {
            setLoading(false);
        }
    }

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const showToastNotification = useCallback((message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3200);
    }, []);

    /* =================================================
       FILTERED SERVICES & SEARCH
    ================================================= */

    const filteredServices = useMemo(() => {
        let result = services;

        if (category !== "ALL") {
            result = result.filter((service) => service.category === category);
        }

        if (debouncedSearch) {
            result = result.filter((service) => {
                const titleMatch = service.title.toLowerCase().includes(debouncedSearch);
                const descMatch = (service.description || "").toLowerCase().includes(debouncedSearch);
                const catMatch = (CATEGORY_NAMES[service.category] || "").toLowerCase().includes(debouncedSearch);
                return titleMatch || descMatch || catMatch;
            });
        }

        return result;
    }, [services, category, debouncedSearch]);

    /* =================================================
       GROUP SERVICES
    ================================================= */

    const groupedServices = useMemo(() => {
        const groups = {};

        CATEGORY_ORDER.forEach((name) => {
            groups[name] = [];
        });

        filteredServices.forEach((service) => {
            if (!groups[service.category]) {
                groups[service.category] = [];
            }
            groups[service.category].push(service);
        });

        return groups;
    }, [filteredServices]);

    /* =================================================
       FEE CALCULATOR TOTAL
    ================================================= */

    const calcTotal = useMemo(() => {
        return selectedCalcIds.reduce((sum, id) => {
            const item = services.find((s) => s.id === id);
            return sum + (item ? Number(item.price) : 0);
        }, 0);
    }, [selectedCalcIds, services]);

    const toggleCalcId = useCallback((id) => {
        setSelectedCalcIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    }, []);

    /* =================================================
       HANDLERS
    ================================================= */

    function openEnquiry(service = null) {
        setSelectedService(service);
        setShowEnquiry(true);
    }

    function closeEnquiry() {
        setShowEnquiry(false);
    }

    function scrollToSection(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    function toggleCategory(group) {
        setOpenCategory(openCategory === group ? null : group);
    }

    function copyToClipboard(text, label) {
        navigator.clipboard.writeText(text);
        showToastNotification(`Copied ${label} to clipboard!`);
    }

    return (
        <div className="app">
            {/* TOAST NOTIFICATION */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    <CheckCircle2 size={18} />
                    <span>{toast.message}</span>
                </div>
            )}

            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="navbar">
                <div className="container nav-container">
                    <a
                        href="#"
                        className="logo"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div className="logo-icon">SMB</div>
                        <div className="logo-text">
                            <strong>smb</strong>
                            <span>ASSOCIATES</span>
                        </div>
                    </a>

                    <nav className={menuOpen ? "nav-links open" : "nav-links"}>
                        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
                        <a href="#calculator" onClick={() => setMenuOpen(false)}>Calculator</a>
                        <a href="#why-us" onClick={() => setMenuOpen(false)}>Why Us</a>
                        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                    </nav>

                    <div className="nav-right">
                        <button
                            type="button"
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        <a href={`tel:${PHONE}`} className="phone-link">
                            <Phone size={15} />
                            {PHONE}
                        </a>

                        <button
                            className="primary-button small"
                            onClick={() => openEnquiry()}
                        >
                            Get Started
                        </button>
                    </div>

                    <button
                        className="mobile-menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* =================================================
                HERO
            ================================================= */}

            <section className="hero">
                <div className="hero-decoration"></div>
                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="eyebrow">
                            <Sparkles size={16} />
                            SMB ASSOCIATES — TAX & BUSINESS SERVICES
                        </div>

                        <h1>
                            Tax and business
                            <span>services made simple.</span>
                        </h1>

                        <p>
                            Professional GST, income tax, business registration and
                            compliance services with transparent pricing, instant calculations and dedicated assistance.
                        </p>

                        <div className="hero-buttons">
                            <button
                                className="primary-button"
                                onClick={() => scrollToSection("services")}
                            >
                                Explore Services
                                <ArrowRight size={18} />
                            </button>

                            <button
                                className="secondary-button"
                                onClick={() => scrollToSection("calculator")}
                            >
                                <Calculator size={18} />
                                Fee Estimator
                            </button>

                            <a
                                href={`https://wa.me/${WHATSAPP}`}
                                target="_blank"
                                rel="noreferrer"
                                className="whatsapp-hero-btn"
                            >
                                <MessageCircle size={18} />
                                WhatsApp Us
                            </a>
                        </div>

                        <div className="trust-items">
                            <span>
                                <ShieldCheck size={17} />
                                Transparent Pricing
                            </span>
                            <span>
                                <BadgeCheck size={17} />
                                Professional Assistance
                            </span>
                            <span>
                                <CheckCircle2 size={17} />
                                Simple Digital Process
                            </span>
                        </div>
                    </div>

                    {/* HERO PRICE CARD */}

                    <div className="hero-price-card">
                        <div className="card-heading">
                            <strong>Popular Services</strong>
                            <span className="live-status">● Live Pricing</span>
                        </div>

                        {services
                            .filter((service) => service.popular)
                            .slice(0, 5)
                            .map((service) => (
                                <div className="popular-service" key={service.id}>
                                    <div>
                                        <strong>{service.title}</strong>
                                        <small>{CATEGORY_NAMES[service.category] || service.category}</small>
                                    </div>
                                    <span>{formatPrice(service.price)}</span>
                                </div>
                            ))}

                        <button
                            className="card-action"
                            onClick={() => scrollToSection("services")}
                        >
                            View All {services.length} Services
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* =================================================
                INSTANT SEARCH & SERVICES DASHBOARD
            ================================================= */}

            <section id="services" className="services-section section">
                <div className="container">
                    <div className="section-heading">
                        <div className="section-heading-text">
                            <div className="section-eyebrow">OUR SERVICES</div>
                            <h2>Complete tax and business solutions</h2>
                        </div>
                        <p className="section-heading-desc">
                            Choose a category below to view all available services and transparent pricing.
                        </p>
                    </div>

                    {/* LIVE INSTANT SEARCH BAR */}

                    <div className="search-filter-box">
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search any service (e.g. GST filing, ITR-1, FSSAI, Pvt Ltd)..."
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="clear-search-btn"
                                    onClick={() => setSearchQuery("")}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* CATEGORY FILTER PILLS */}
                        <div className="category-pills">
                            <button
                                className={`pill-btn ${category === "ALL" ? "active" : ""}`}
                                onClick={() => setCategory("ALL")}
                            >
                                All ({services.length})
                            </button>
                            {CATEGORY_ORDER.map((catKey) => {
                                const count = services.filter((s) => s.category === catKey).length;
                                return (
                                    <button
                                        key={catKey}
                                        className={`pill-btn ${category === catKey ? "active" : ""}`}
                                        onClick={() => setCategory(catKey)}
                                    >
                                        {CATEGORY_NAMES[catKey]} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* CATEGORY DASHBOARD GRID */}

                    {loading ? (
                        <div className="loading-box">
                            <div className="loader"></div>
                            <p>Loading services catalog...</p>
                        </div>
                    ) : (
                        <div className="service-category-grid">
                            {CATEGORY_ORDER.map((group) => {
                                const items = groupedServices[group] || [];
                                if (items.length === 0) return null;

                                // Auto-expand when searching
                                const isOpen = debouncedSearch ? true : openCategory === group;

                                return (
                                    <div
                                        className={`service-category ${isOpen ? "expanded" : ""}`}
                                        key={group}
                                    >
                                        <button
                                            type="button"
                                            className="service-category-title clickable-category"
                                            onClick={() => toggleCategory(group)}
                                        >
                                            <div className="category-check">✓</div>
                                            <h3>{CATEGORY_NAMES[group]}</h3>
                                            <span className="category-arrow">
                                                {isOpen ? "−" : "+"}
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="service-list">
                                                {items.map((service) => (
                                                    <ServiceListItem
                                                        key={service.id}
                                                        service={service}
                                                        onSelect={setSelectedService}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {!loading && filteredServices.length === 0 && (
                        <div className="empty-services">
                            <FileText size={40} />
                            <h3>No matching services found</h3>
                            <p>Try searching for a different keyword or view all categories.</p>
                            <button
                                className="primary-button small"
                                onClick={() => {
                                    setSearchQuery("");
                                    setCategory("ALL");
                                }}
                                style={{ marginTop: "15px" }}
                            >
                                Reset Search
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* =================================================
                INTERACTIVE FEE CALCULATOR WIDGET
            ================================================= */}

            <section id="calculator" className="calculator-section section">
                <div className="container">
                    <div className="section-heading center">
                        <div className="section-eyebrow">INTERACTIVE ESTIMATOR</div>
                        <h2>Instant Fee Calculator</h2>
                        <p>
                            Select the compliance & filing services you require to calculate your estimated total investment instantly.
                        </p>
                    </div>

                    <div className="calculator-box">
                        <div className="calc-services-selector">
                            <h3>Select Required Services:</h3>
                            <div className="calc-items-grid">
                                {services.map((service) => {
                                    const isSelected = selectedCalcIds.includes(service.id);
                                    return (
                                        <div
                                            key={service.id}
                                            className={`calc-item-card ${isSelected ? "selected" : ""}`}
                                            onClick={() => toggleCalcId(service.id)}
                                        >
                                            <div className="calc-checkbox">
                                                {isSelected ? "✓" : ""}
                                            </div>
                                            <div className="calc-item-info">
                                                <strong>{service.title}</strong>
                                                <small>{CATEGORY_NAMES[service.category]}</small>
                                            </div>
                                            <span className="calc-item-price">
                                                {formatPrice(service.price)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="calc-summary-card">
                            <div className="calc-summary-header">
                                <Calculator size={22} />
                                <h3>Estimated Breakdown</h3>
                            </div>

                            <div className="calc-summary-list">
                                {selectedCalcIds.length === 0 ? (
                                    <p className="empty-calc-text">
                                        Select any service on the left to view breakdown.
                                    </p>
                                ) : (
                                    selectedCalcIds.map((id) => {
                                        const item = services.find((s) => s.id === id);
                                        if (!item) return null;
                                        return (
                                            <div className="calc-summary-item" key={id}>
                                                <span>{item.title}</span>
                                                <strong>{formatPrice(item.price)}</strong>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className="calc-total-box">
                                <span>Total Estimated Fee:</span>
                                <strong>{formatPrice(calcTotal)}</strong>
                            </div>

                            <button
                                className="primary-button full"
                                disabled={selectedCalcIds.length === 0}
                                onClick={() => {
                                    const selectedNames = selectedCalcIds
                                        .map((id) => services.find((s) => s.id === id)?.title)
                                        .filter(Boolean)
                                        .join(", ");
                                    openEnquiry({ title: `Selected Package: (${selectedNames}) - Total: ${formatPrice(calcTotal)}` });
                                }}
                            >
                                Request Package Quote
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                WHY US
            ================================================= */}

            <section id="why-us" className="why-section section">
                <div className="container">
                    <div className="section-heading center">
                        <div className="section-eyebrow">WHY SMB ASSOCIATES</div>
                        <h2>Simple, transparent and professional</h2>
                        <p>We make tax filing, registrations and business compliance easier.</p>
                    </div>

                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-icon"><Calculator /></div>
                            <h3>Transparent Pricing</h3>
                            <p>Clear service pricing helps you understand the cost upfront before getting started.</p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon"><BadgeCheck /></div>
                            <h3>Professional Assistance</h3>
                            <p>Get dedicated expert guidance for GST, income tax, registrations and compliance.</p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon"><ShieldCheck /></div>
                            <h3>Reliable Process</h3>
                            <p>A simple digital process designed to make service requests fast and convenient.</p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon"><MessageCircle /></div>
                            <h3>Easy Communication</h3>
                            <p>Reach us instantly through phone, WhatsApp or online enquiry form for quick responses.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                ABOUT
            ================================================= */}

            <section id="about" className="about-section section">
                <div className="container about-container">
                    <div className="about-content">
                        <div className="section-eyebrow">ABOUT SMB ASSOCIATES</div>
                        <h2>Your trusted partner for tax and business compliance</h2>
                        <p>
                            SMB Associates provides professional tax, GST, business registration and compliance
                            solutions for individuals, freelancers, startups, and established enterprises.
                        </p>
                        <p>
                            Our core mission is to remove complexity from financial compliance with transparent pricing,
                            responsive digital tools, and dedicated assistance.
                        </p>

                        <button className="primary-button" onClick={() => openEnquiry()}>
                            Talk to Us <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="about-features">
                        <div className="about-feature">
                            <div className="about-feature-icon"><FileText /></div>
                            <div>
                                <h3>Tax Services</h3>
                                <p>Income tax, GST filing, TDS compliance and tax planning.</p>
                            </div>
                        </div>

                        <div className="about-feature">
                            <div className="about-feature-icon"><Building2 /></div>
                            <div>
                                <h3>Business Registrations</h3>
                                <p>Company, LLP, FSSAI, MSME and Trade licenses.</p>
                            </div>
                        </div>

                        <div className="about-feature">
                            <div className="about-feature-icon"><BriefcaseBusiness /></div>
                            <div>
                                <h3>Annual Compliance</h3>
                                <p>ROC returns, Director KYC and LLP disclosures.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                CONTACT
            ================================================= */}

            <section id="contact" className="contact-section section">
                <div className="container">
                    <div className="contact-box">
                        <div className="contact-content">
                            <div className="section-eyebrow">CONTACT US</div>
                            <h2>Need help with tax or business filings?</h2>
                            <p>
                                Contact SMB Associates today. Our experienced team will guide you through the exact requirements.
                            </p>
                        </div>

                        <div className="contact-actions">
                            <a href={`tel:${PHONE}`} className="contact-action">
                                <Phone size={20} />
                                <div>
                                    <small>Call Us</small>
                                    <strong>{PHONE}</strong>
                                </div>
                            </a>

                            <a
                                href={`https://wa.me/${WHATSAPP}`}
                                target="_blank"
                                rel="noreferrer"
                                className="contact-action"
                            >
                                <MessageCircle size={20} />
                                <div>
                                    <small>WhatsApp</small>
                                    <strong>Chat With Us</strong>
                                </div>
                            </a>

                            <button className="primary-button" onClick={() => openEnquiry()}>
                                Send Enquiry <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="footer">
                <div className="container footer-container">
                    <div className="footer-brand">
                        <div className="footer-logo">SMB</div>
                        <div>
                            <strong>SMB Associates</strong>
                            <p>Tax & Business Solutions</p>
                        </div>
                    </div>

                    <div className="footer-links">
                        <a href="#services">Services</a>
                        <a href="#calculator">Calculator</a>
                        <a href="#why-us">Why Us</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="footer-contact">
                        <a href={`tel:${PHONE}`}>
                            <Phone size={15} />
                            {PHONE}
                        </a>
                        <a href={`mailto:${EMAIL}`}>
                            {EMAIL}
                        </a>
                    </div>
                </div>

                <div className="container footer-bottom">
                    <span>© {new Date().getFullYear()} SMB Associates. All rights reserved.</span>
                    <span>Designed for Speed & High Scale</span>
                </div>
            </footer>

            {/* FLOATING QUICK ACTIONS BAR */}
            <div className="floating-actions">
                <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noreferrer"
                    className="float-btn whatsapp"
                    title="Chat on WhatsApp"
                    aria-label="WhatsApp"
                >
                    <MessageCircle size={22} />
                </a>

                {showScrollTop && (
                    <button
                        className="float-btn scroll-top"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        title="Scroll to top"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp size={20} />
                    </button>
                )}
            </div>

            {/* =================================================
                SERVICE MODAL
            ================================================= */}

            {selectedService && !showEnquiry && (
                <ServiceModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                    onRequest={() => openEnquiry(selectedService)}
                />
            )}

            {/* =================================================
                ENQUIRY MODAL
            ================================================= */}

            {showEnquiry && (
                <EnquiryModal
                    service={selectedService}
                    onClose={closeEnquiry}
                    onSuccessToast={() => showToastNotification("Enquiry submitted successfully!")}
                />
            )}
        </div>
    );
}

/* =====================================================
   SERVICE MODAL
===================================================== */

function ServiceModal({ service, onClose, onRequest }) {
    return (
        <div
            className="modal-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="modal">
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <X size={20} />
                </button>

                <div className="modal-icon"><FileText /></div>
                <div className="modal-category">
                    {CATEGORY_NAMES[service.category] || service.category}
                </div>

                <h2>{service.title}</h2>

                <div className="modal-price">
                    {formatPrice(service.price)} {service.unit}
                </div>

                {service.description && (
                    <p className="modal-description">{service.description}</p>
                )}

                {Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="modal-features">
                        <h3>What's included</h3>
                        {service.features.map((feature, idx) => (
                            <div key={idx} className="modal-feature">
                                <CheckCircle2 size={17} />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                )}

                <button className="primary-button modal-button" onClick={onRequest}>
                    Request This Service <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

/* =====================================================
   ENQUIRY MODAL
===================================================== */

function EnquiryModal({ service, onClose, onSuccessToast }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: service ? service.title : "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            service: service ? service.title : "",
        }));
    }, [service]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await createEnquiry(form);
            setSuccess(true);
            if (onSuccessToast) onSuccessToast();
            setForm({ name: "", email: "", phone: "", service: "", message: "" });
        } catch (err) {
            console.error("Enquiry submission failed:", err);
            setError("Unable to submit your enquiry. Please try again or contact us directly.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div
            className="modal-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="modal enquiry-modal">
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <X size={20} />
                </button>

                {!success ? (
                    <>
                        <div className="modal-icon"><MessageCircle /></div>
                        <div className="modal-category">SMB ASSOCIATES</div>
                        <h2>Send an Enquiry</h2>
                        <p className="modal-description">
                            Fill in your details and our team will get back to you promptly.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="Your phone number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Your email address"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Service Required</label>
                                <input
                                    type="text"
                                    name="service"
                                    value={form.service}
                                    onChange={handleChange}
                                    placeholder="Service title or package"
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you need..."
                                    rows="3"
                                />
                            </div>

                            {error && <div className="form-error">{error}</div>}

                            <button
                                type="submit"
                                className="primary-button modal-button"
                                disabled={submitting}
                            >
                                {submitting ? "Submitting..." : "Submit Enquiry"}
                                {!submitting && <ArrowRight size={18} />}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
                        <div className="success-icon">
                            <CheckCircle2 size={42} />
                        </div>
                        <h2>Enquiry Submitted!</h2>
                        <p>Thank you for reaching out. SMB Associates will get back to you shortly.</p>
                        <button className="primary-button modal-button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;