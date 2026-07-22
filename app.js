/* ==========================================================================
   AHORRAYA BUSINESS LOGIC & APPLICATION ENGINE (Vanilla JS / Harvard CyberSec)
   ========================================================================== */

// 1. INPUT SANITIZATION (Harvard CyberSec standard to prevent XSS)
function sanitizeInput(str) {
    if (!str) return '';
    return str.toString()
        .replace(/[&<>"']/g, function(m) {
            switch (m) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;';
                default: return m;
            }
        })
        .trim();
}

// 2. PRODUCT DATABASE (Local Grocery Database with Volume Pricing Tiers)
const PRODUCTS = [
    {
        id: 'p1',
        brand: 'Chef',
        name: 'Aceite de Maravilla 900ml',
        category: 'abarrotes',
        type: 'Alimentos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 95,
        isOffer: true,
        isNew: false,
        prices: {
            1: 2290,   // Detail unit price
            12: 1890,  // Box unit price (from 12 units)
            24: 1690   // Pallet unit price (from 24 units / boxes equivalent)
        }
    },
    {
        id: 'p2',
        brand: 'Tucapel',
        name: 'Arroz Grado 1 Largo Ancho 1kg',
        category: 'abarrotes',
        type: 'Alimentos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 92,
        isOffer: true,
        isNew: false,
        prices: {
            1: 1450,
            12: 1190,
            24: 990
        }
    },
    {
        id: 'p3',
        brand: 'Lucchetti',
        name: 'Fideos Espagueti N°5 400g',
        category: 'abarrotes',
        type: 'Alimentos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 88,
        isOffer: false,
        isNew: false,
        prices: {
            1: 950,
            12: 790,
            24: 650
        }
    },
    {
        id: 'p4',
        brand: 'Iansa',
        name: 'Azúcar Granulada Blanca 1kg',
        category: 'abarrotes',
        type: 'Alimentos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 90,
        isOffer: true,
        isNew: false,
        prices: {
            1: 1390,
            12: 1090,
            24: 950
        }
    },
    {
        id: 'p5',
        brand: 'Omo',
        name: 'Detergente Polvo Multiacción 3kg',
        category: 'limpieza',
        type: 'Limpieza',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 85,
        isOffer: false,
        isNew: true,
        prices: {
            1: 7490,
            12: 5990,
            24: 5290
        }
    },
    {
        id: 'p6',
        brand: 'Clorox',
        name: 'Cloro Líquido Tradicional 2L',
        category: 'limpieza',
        type: 'Limpieza',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 80,
        isOffer: false,
        isNew: false,
        prices: {
            1: 1990,
            12: 1590,
            24: 1390
        }
    },
    {
        id: 'p7',
        brand: 'Soprole',
        name: 'Leche Entera Caja 1L',
        category: 'lacteos',
        type: 'Lácteos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 89,
        isOffer: false,
        isNew: true,
        prices: {
            1: 1150,
            12: 950,
            24: 850
        }
    },
    {
        id: 'p8',
        brand: 'Nescafé',
        name: 'Café Instantáneo Tradicional 170g',
        category: 'abarrotes',
        type: 'Alimentos',
        availability: 'order',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 94,
        isOffer: true,
        isNew: false,
        prices: {
            1: 5290,
            12: 4490,
            24: 3990
        }
    },
    {
        id: 'p9',
        brand: 'Colun',
        name: 'Queso Laminado Ranco 500g',
        category: 'lacteos',
        type: 'Lácteos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 87,
        isOffer: false,
        isNew: false,
        prices: {
            1: 5490,
            12: 4690,
            24: 4190
        }
    },
    {
        id: 'p10',
        brand: 'Coca-Cola',
        name: 'Bebida Coca-Cola Original 2.5L Retornable',
        category: 'liquidos',
        type: 'Líquidos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 97,
        isOffer: false,
        isNew: false,
        prices: {
            1: 2100,
            12: 1750,
            24: 1550
        }
    },
    {
        id: 'p11',
        brand: 'Andina',
        name: 'Néctar de Durazno Watt\'s 1.5L',
        category: 'liquidos',
        type: 'Líquidos',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 83,
        isOffer: false,
        isNew: true,
        prices: {
            1: 1490,
            12: 1190,
            24: 990
        }
    },
    {
        id: 'p12',
        brand: 'San Remo',
        name: 'Salsa de Tomates Italiana 200g',
        category: 'conservas',
        type: 'Conservas',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 86,
        isOffer: false,
        isNew: false,
        prices: {
            1: 690,
            12: 550,
            24: 450
        }
    },
    {
        id: 'p13',
        brand: 'Esmeralda',
        name: 'Atún Desmenuzado en Aceite 160g',
        category: 'conservas',
        type: 'Conservas',
        availability: 'order',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 82,
        isOffer: true,
        isNew: true,
        prices: {
            1: 1290,
            12: 990,
            24: 850
        }
    },
    {
        id: 'p14',
        brand: 'Quix',
        name: 'Lavaloza Líquido Concentrado 750ml',
        category: 'limpieza',
        type: 'Limpieza',
        availability: 'stock',
        clientTypes: ['minorista', 'mayorista'],
        popularity: 89,
        isOffer: false,
        isNew: false,
        prices: {
            1: 2590,
            12: 2190,
            24: 1890
        }
    }
];

// Helper to generate dynamic SVG graphics
function getProductSvg(category, name) {
    let path = '';
    
    if (category === 'abarrotes' && name.includes('Aceite')) {
        path = `<path d="M12 2a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V4a2 2 0 0 0-2-2m0 2a1 1 0 0 1 1 1v1h-2V5a1 1 0 0 1 1-1m-4 4h8v3H8V8m0 5h8v7H8v-7z" fill="var(--color-accent-dark)"/>`;
    } else if (category === 'abarrotes' && (name.includes('Arroz') || name.includes('Azúcar') || name.includes('Harina'))) {
        path = `<path d="M16 3H8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3M8 5h8a1 1 0 0 1 1 1v2H7V6a1 1 0 0 1 1-1m8 14H8a1 1 0 0 1-1-1v-8h10v8a1 1 0 0 1-1 1M9.5 12h5v1.5h-5V12m0 3h5v1.5h-5V15z" fill="var(--color-primary-light)"/>`;
    } else if (category === 'abarrotes' && name.includes('Fideos')) {
        path = `<path d="M5 3h14v18H5V3zm2 2v14h10V5H7zm2 2h6v2H9V7zm0 4h6v2H9v-2zm0 4h6v2H9v-2z" fill="var(--color-secondary)"/>`;
    } else if (category === 'limpieza' && name.includes('Detergente')) {
        path = `<path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 4v14h12V6H6zm6 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 2a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" fill="var(--color-primary)"/>`;
    } else if (category === 'limpieza' && (name.includes('Cloro') || name.includes('Lavaloza'))) {
        path = `<path d="M12 2a2 2 0 0 0-2 2v1.17C8.42 5.78 7 7.22 7 9v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9c0-1.78-1.42-3.22-3-3.83V4a2 2 0 0 0-2-2m-3 8h2v2H9v-2zm0 4h2v2H9v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z" fill="var(--color-primary-light)"/>`;
    } else if (category === 'lacteos') {
        path = `<path d="M12 2L5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6l-7-4zm0 2.5L16.2 7H7.8L12 4.5zM7 9h10v11H7V9zm2 2v3h6v-3H9zm0 5v1.5h6V16H9z" fill="var(--color-primary-dark)"/>`;
    } else if (category === 'liquidos') {
        path = `<path d="M12 2a2 2 0 0 0-2 2v2c-2 0-3 2-3 4v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10c0-2-1-4-3-4V4a2 2 0 0 0-2-2m-3 8h6v2H9v-2zm0 4h6v4H9v-4z" fill="var(--color-secondary)"/>`;
    } else if (category === 'conservas') {
        path = `<path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v2h12V5H6zm0 4v8h12V9H6zm0 10v1h12v-1H6z" fill="var(--color-text-muted)"/>`;
    } else {
        path = `<path d="M12 2a3 3 0 0 0-3 3v1H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3m0 2a1 1 0 0 1 1 1v1h-2V5a1 1 0 0 1 1-1M6 8h12v3H6V8m0 5h12v5H6v-5z" fill="var(--color-primary-light)"/>`;
    }
    
    return `<svg viewBox="0 0 24 24" width="100%" height="100%">${path}</svg>`;
}

// 3. APPLICATION STATE
const STATE = {
    cart: [],
    currentView: 'home',
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'popularity',
    activeFilters: {
        availability: ['stock'],
        brands: [],
        categories: [],
        clientTypes: ['minorista', 'mayorista']
    },
    adminPeriod: 'day' // Sales report grouping: day, week, month, year
};

// 4. HISTORICAL SIMULATED ORDERS (localStorage database)
const MOCK_HISTORICAL_ORDERS = [
    {
        id: 'AY-10492-2026',
        date: '2026-07-22T10:15:00.000Z',
        customer: {
            name: 'Juan Pérez (Minimarket El Sol)',
            rut: '76.812.543-2',
            phone: '+56 9 8765 4321',
            email: 'contacto@minimarketelsol.cl',
            address: 'Av. Providencia 1240, Providencia, RM'
        },
        method: 'domicilio',
        payment: 'webpay',
        shippingCost: 0,
        items: [
            { productId: 'p1', quantity: 24, unitPrice: 1690 }, 
            { productId: 'p2', quantity: 12, unitPrice: 1190 }, 
            { productId: 'p10', quantity: 12, unitPrice: 1750 } 
        ],
        total: 75840
    },
    {
        id: 'AY-10491-2026',
        date: '2026-07-22T08:30:00.000Z',
        customer: {
            name: 'María Alejandra Gómez',
            rut: '12.435.678-9',
            phone: '+56 9 9123 4567',
            email: 'maria.gomez@gmail.com',
            address: 'Condominio Las Brisas Casa 14, Chicureo'
        },
        method: 'domicilio',
        payment: 'transferencia',
        shippingCost: 4990,
        items: [
            { productId: 'p5', quantity: 2, unitPrice: 7490 },  
            { productId: 'p6', quantity: 6, unitPrice: 1990 }   
        ],
        total: 31910
    },
    {
        id: 'AY-10488-2026',
        date: '2026-07-21T16:45:00.000Z',
        customer: {
            name: 'Distribuidora Renca Limitada',
            rut: '77.923.410-k',
            phone: '+56 2 2456 7890',
            email: 'adquisiciones@distrenca.cl',
            address: 'Av. Jorge Hirmas 2410, Bodega 4, Renca'
        },
        method: 'retiro',
        payment: 'credito',
        shippingCost: 0,
        items: [
            { productId: 'p1', quantity: 120, unitPrice: 1690 }, 
            { productId: 'p4', quantity: 200, unitPrice: 950 },  
            { productId: 'p2', quantity: 100, unitPrice: 990 }   
        ],
        total: 491800
    },
    {
        id: 'AY-10485-2026',
        date: '2026-07-20T11:20:00.000Z',
        customer: {
            name: 'Carlos Henríquez (Almacén Central)',
            rut: '10.982.435-5',
            phone: '+56 9 8223 9944',
            email: 'carlos.h@almacencentral.cl',
            address: 'Gran Avenida 8940, La Cisterna'
        },
        method: 'domicilio',
        payment: 'transferencia',
        shippingCost: 0,
        items: [
            { productId: 'p8', quantity: 24, unitPrice: 3990 },  
            { productId: 'p7', quantity: 36, unitPrice: 850 }    
        ],
        total: 126360
    },
    {
        id: 'AY-10472-2026',
        date: '2026-07-18T14:10:00.000Z',
        customer: {
            name: 'Verónica Tapia (Botillería Vero)',
            rut: '15.932.122-k',
            phone: '+56 9 7332 1100',
            email: 'vero.tapia@botilleria.cl',
            address: 'Vicuña Mackenna 7320, La Florida'
        },
        method: 'domicilio',
        payment: 'webpay',
        shippingCost: 0,
        items: [
            { productId: 'p10', quantity: 48, unitPrice: 1550 }, 
            { productId: 'p11', quantity: 24, unitPrice: 990 }   
        ],
        total: 98160
    },
    {
        id: 'AY-10461-2026',
        date: '2026-07-15T09:30:00.000Z',
        customer: {
            name: 'Comercializadora San Francisco',
            rut: '76.012.983-5',
            phone: '+56 2 2843 9122',
            email: 'ventas@comercialsf.cl',
            address: 'Camino Melipilla Km 18, Padre Hurtado'
        },
        method: 'retiro',
        payment: 'transferencia',
        shippingCost: 0,
        items: [
            { productId: 'p14', quantity: 48, unitPrice: 1890 }, 
            { productId: 'p5', quantity: 24, unitPrice: 5290 },  
            { productId: 'p6', quantity: 48, unitPrice: 1390 }   
        ],
        total: 284400
    },
    {
        id: 'AY-10420-2026',
        date: '2026-07-09T17:15:00.000Z',
        customer: {
            name: 'Patricia Rojas',
            rut: '14.823.119-2',
            phone: '+56 9 9922 8833',
            email: 'paty.rojas@gmail.com',
            address: 'Las Condes 10240, Depto 504, Las Condes'
        },
        method: 'domicilio',
        payment: 'webpay',
        shippingCost: 4990,
        items: [
            { productId: 'p3', quantity: 10, unitPrice: 950 },   
            { productId: 'p12', quantity: 12, unitPrice: 550 }   
        ],
        total: 21090
    },
    {
        id: 'AY-10398-2026',
        date: '2026-06-25T11:00:00.000Z',
        customer: {
            name: 'Almacenes El Ahorro',
            rut: '78.109.832-1',
            phone: '+56 9 9234 1199',
            email: 'compras@almacenelahorro.cl',
            address: 'San Diego 1420, Santiago Centro'
        },
        method: 'domicilio',
        payment: 'credito',
        shippingCost: 0,
        items: [
            { productId: 'p1', quantity: 48, unitPrice: 1690 },  
            { productId: 'p2', quantity: 48, unitPrice: 990 },   
            { productId: 'p4', quantity: 48, unitPrice: 950 }    
        ],
        total: 174240
    },
    {
        id: 'AY-10310-2026',
        date: '2026-05-14T10:45:00.000Z',
        customer: {
            name: 'Supermercado Central Buin',
            rut: '76.498.112-9',
            phone: '+56 2 2821 3490',
            email: 'adquisiciones@buinsuper.cl',
            address: 'J.J. Pérez 432, Buin'
        },
        method: 'domicilio',
        payment: 'transferencia',
        shippingCost: 0,
        items: [
            { productId: 'p1', quantity: 240, unitPrice: 1690 }, 
            { productId: 'p8', quantity: 96, unitPrice: 3990 }   
        ],
        total: 788640
    },
    {
        id: 'AY-10204-2026',
        date: '2026-04-18T16:00:00.000Z',
        customer: {
            name: 'Negocio Los Aromos',
            rut: '9.348.112-k',
            phone: '+56 9 8456 1234',
            email: 'aromos.negocio@outlook.com',
            address: 'Los Alerces 2390, Quinta Normal'
        },
        method: 'retiro',
        payment: 'transferencia',
        shippingCost: 0,
        items: [
            { productId: 'p2', quantity: 24, unitPrice: 990 },   
            { productId: 'p3', quantity: 24, unitPrice: 790 },   
            { productId: 'p4', quantity: 24, unitPrice: 950 }    
        ],
        total: 65520
    },
    {
        id: 'AY-10085-2026',
        date: '2026-01-10T12:00:00.000Z',
        customer: {
            name: 'Minimarket San Miguel',
            rut: '81.932.410-5',
            phone: '+56 9 7324 8190',
            email: 'compras@minisanmiguel.cl',
            address: 'Salesianos 1420, San Miguel'
        },
        method: 'domicilio',
        payment: 'credito',
        shippingCost: 0,
        items: [
            { productId: 'p10', quantity: 96, unitPrice: 1550 }, 
            { productId: 'p14', quantity: 48, unitPrice: 1890 }  
        ],
        total: 239520
    },
    {
        id: 'AY-00982-2025',
        date: '2025-11-20T14:40:00.000Z',
        customer: {
            name: 'Distribuidora La Vega SpA',
            rut: '76.843.190-2',
            phone: '+56 2 2737 9900',
            email: 'ventas@lavegadis.cl',
            address: 'Dávila Baeza 983, Recoleta'
        },
        method: 'retiro',
        payment: 'transferencia',
        shippingCost: 0,
        items: [
            { productId: 'p1', quantity: 480, unitPrice: 1690 }, 
            { productId: 'p2', quantity: 480, unitPrice: 990 },  
            { productId: 'p4', quantity: 480, unitPrice: 950 }   
        ],
        total: 1742400
    }
];

// 5. DOM ELEMENTS BINDING
const DOM = {
    mainContent: document.getElementById('mainContent'),
    homeView: document.getElementById('homeView'),
    plpView: document.getElementById('plpView'),
    plpTitle: document.getElementById('plpTitle'),
    plpGrid: document.getElementById('plpGrid'),
    offersGrid: document.getElementById('offersGrid'),
    abarrotesGrid: document.getElementById('abarrotesGrid'),
    limpiezaGrid: document.getElementById('limpiezaGrid'),
    
    // Search elements
    searchInput: document.getElementById('searchInput'),
    searchForm: document.getElementById('searchForm'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    
    // Navigation items
    categoriesDropdown: document.getElementById('categoriesDropdown'),
    categoriesMenuBtn: document.getElementById('categoriesMenuBtn'),
    brandLogo: document.getElementById('brandLogo'),
    navLinkOffers: document.getElementById('navLinkOffers'),
    navLinkNew: document.getElementById('navLinkNew'),
    navLinkHowToBuy: document.getElementById('navLinkHowToBuy'),
    
    // Mobile Drawer
    mobileDrawer: document.getElementById('mobileDrawer'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileDrawerCloseBtn: document.getElementById('mobileDrawerCloseBtn'),
    drawerOverlay: document.getElementById('drawerOverlay'),
    
    // Cart elements
    cartDrawer: document.getElementById('cartDrawer'),
    cartTriggerBtn: document.getElementById('cartTriggerBtn'),
    cartDrawerCloseBtn: document.getElementById('cartDrawerCloseBtn'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartBadge: document.getElementById('cartBadge'),
    cartTotalHeader: document.getElementById('cartTotalHeader'),
    cartDrawerItems: document.getElementById('cartDrawerItems'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartDrawerFooter: document.getElementById('cartDrawerFooter'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartDeliveryCost: document.getElementById('cartDeliveryCost'),
    cartTotal: document.getElementById('cartTotal'),
    cartSavingAlert: document.getElementById('cartSavingAlert'),
    cartSavingsAmount: document.getElementById('cartSavingsAmount'),
    btnCheckout: document.getElementById('btnCheckout'),
    
    // PLP filters & widgets
    productCount: document.getElementById('productCount'),
    sortBySelect: document.getElementById('sortBySelect'),
    btnResetFilters: document.getElementById('btnResetFilters'),
    brandFiltersContainer: document.getElementById('brandFiltersContainer'),
    noResultsState: document.getElementById('noResultsState'),
    btnClearSearchAndFilters: document.getElementById('btnClearSearchAndFilters'),
    
    // Modals
    modalHowToBuy: document.getElementById('modalHowToBuy'),
    modalPayments: document.getElementById('modalPayments'),
    modalDelivery: document.getElementById('modalDelivery'),
    modalOrderStatus: document.getElementById('modalOrderStatus'),
    modalCheckout: document.getElementById('modalCheckout'),
    modalMap: document.getElementById('modalMap'),
    checkoutForm: document.getElementById('checkoutForm'),
    btnTrackOrder: document.getElementById('btnTrackOrder'),
    trackingInput: document.getElementById('trackingInput'),
    trackingResult: document.getElementById('trackingResult'),

    // --- NEW SEPARATE ADMIN VIEWS DOM ELEMENTS ---
    adminTriggerBtn: document.getElementById('adminTriggerBtn'),
    adminLoginView: document.getElementById('adminLoginView'),
    adminOrdersView: document.getElementById('adminOrdersView'),
    adminSalesView: document.getElementById('adminSalesView'),
    adminLoginForm: document.getElementById('adminLoginForm'),
    adminUserField: document.getElementById('adminUser'),
    adminPassField: document.getElementById('adminPass'),
    loginErrorMsg: document.getElementById('loginErrorMsg'),
    adminOrdersTable: document.getElementById('adminOrdersTable'),
    btnExportExcel: document.getElementById('btnExportExcel'),
    modalOrderDetail: document.getElementById('modalOrderDetail'),
    chartBarsTrack: document.getElementById('chartBarsTrack'),
    chartXLabels: document.getElementById('chartXLabels'),
    chartTitle: document.getElementById('chartTitle'),
    chartYMax: document.getElementById('chartYMax'),
    chartYMid: document.getElementById('chartYMid'),
    salesSummaryTable: document.getElementById('salesSummaryTable'),
    
    // Navigation bar toggles
    navDropdownCategories: document.getElementById('navDropdownCategories'),
    adminNavGroup: document.getElementById('adminNavGroup'),
    navLinkAdminOrders: document.getElementById('navLinkAdminOrders'),
    navLinkAdminSales: document.getElementById('navLinkAdminSales'),
    btnHeaderAdminLogout: document.getElementById('btnHeaderAdminLogout'),
    navExtraInfo: document.getElementById('navExtraInfo'),
    footerLinkAdmin: document.getElementById('footerLinkAdmin'),
    
    // Mobile Drawer switchers
    drawerNavStandard: document.getElementById('drawerNavStandard'),
    drawerNavAdmin: document.getElementById('drawerNavAdmin'),
    mobileAdminOrdersLink: document.getElementById('mobileAdminOrdersLink'),
    mobileAdminSalesLink: document.getElementById('mobileAdminSalesLink'),
    mobileAdminLogoutLink: document.getElementById('mobileAdminLogoutLink'),
    mobileAdminLoginLink: document.getElementById('mobileAdminLoginLink')
};

// 6. APPLICATION INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadCartFromStorage();
    initializeOrdersDatabase();
    renderHomeShelves();
    populateBrandFilters();
    setupEventListeners();
    updateCartUI();
    setupCarousel();
    
    // Check session on startup to restore menu
    updateNavigationUI();
}

function initializeOrdersDatabase() {
    if (!localStorage.getItem('ahorraya_orders')) {
        localStorage.setItem('ahorraya_orders', JSON.stringify(MOCK_HISTORICAL_ORDERS));
    }
}

function getOrders() {
    try {
        return JSON.parse(localStorage.getItem('ahorraya_orders')) || [];
    } catch (e) {
        return [];
    }
}

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('ahorraya_orders', JSON.stringify(orders));
}

// Update menu headers depending on Admin login status
function updateNavigationUI() {
    const isLoggedIn = sessionStorage.getItem('ahorraya_admin_logged_in') === 'true';
    const username = sessionStorage.getItem('ahorraya_admin_user') || 'ahorraya';

    if (isLoggedIn) {
        // Hide standard navbar links and show admin ones
        DOM.navDropdownCategories.style.display = 'none';
        DOM.navLinkOffers.style.display = 'none';
        DOM.navLinkNew.style.display = 'none';
        DOM.navExtraInfo.style.display = 'none';
        DOM.adminNavGroup.style.display = 'flex';
        
        // Mobile drawer toggles
        DOM.drawerNavStandard.style.display = 'none';
        DOM.drawerNavAdmin.style.display = 'flex';

        // Update username display in panels
        document.querySelectorAll('.adminDisplayUser').forEach(el => {
            el.textContent = username;
        });
    } else {
        // Show standard client menu
        DOM.navDropdownCategories.style.display = 'inline-block';
        DOM.navLinkOffers.style.display = 'inline-flex';
        DOM.navLinkNew.style.display = 'inline-flex';
        DOM.navExtraInfo.style.display = 'block';
        DOM.adminNavGroup.style.display = 'none';
        
        // Mobile drawer toggles
        DOM.drawerNavStandard.style.display = 'flex';
        DOM.drawerNavAdmin.style.display = 'none';
    }
}

// 7. EVENT LISTENERS SETUP
function setupEventListeners() {
    // Return home logo click
    DOM.brandLogo.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToView('home');
    });

    // Categories dropdown navigation
    DOM.categoriesDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const cat = e.target.getAttribute('data-category');
            STATE.activeCategory = cat;
            STATE.searchQuery = '';
            DOM.searchInput.value = '';
            DOM.clearSearchBtn.style.display = 'none';
            navigateToView('plp', { category: cat });
        }
    });

    // Mobile drawer category click
    DOM.mobileDrawer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('data-category')) {
            e.preventDefault();
            const cat = e.target.getAttribute('data-category');
            STATE.activeCategory = cat;
            STATE.searchQuery = '';
            DOM.searchInput.value = '';
            closeMobileDrawer();
            navigateToView('plp', { category: cat });
        }
    });

    // Subheader nav links
    DOM.navLinkOffers.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToView('plp', { filter: 'offers' });
    });
    DOM.navLinkNew.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToView('plp', { filter: 'new' });
    });
    DOM.navLinkHowToBuy.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(DOM.modalHowToBuy);
    });

    // Search bar submit
    DOM.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawQuery = DOM.searchInput.value;
        const cleanQuery = sanitizeInput(rawQuery);
        if (cleanQuery) {
            STATE.searchQuery = cleanQuery;
            navigateToView('plp', { search: cleanQuery });
        }
    });

    DOM.searchInput.addEventListener('input', () => {
        DOM.clearSearchBtn.style.display = DOM.searchInput.value.length > 0 ? 'block' : 'none';
    });

    DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        DOM.clearSearchBtn.style.display = 'none';
        STATE.searchQuery = '';
        if (STATE.currentView === 'plp') {
            applyFiltersAndRenderPLP();
        }
    });

    // Drawers toggle events
    DOM.mobileMenuBtn.addEventListener('click', openMobileDrawer);
    DOM.mobileDrawerCloseBtn.addEventListener('click', closeMobileDrawer);
    DOM.drawerOverlay.addEventListener('click', closeMobileDrawer);
    
    DOM.cartTriggerBtn.addEventListener('click', openCartDrawer);
    DOM.cartDrawerCloseBtn.addEventListener('click', closeCartDrawer);
    DOM.cartOverlay.addEventListener('click', closeCartDrawer);
    
    // Sort
    DOM.sortBySelect.addEventListener('change', (e) => {
        STATE.sortBy = e.target.value;
        applyFiltersAndRenderPLP();
    });

    // Reset PLP
    DOM.btnResetFilters.addEventListener('click', resetFilters);
    DOM.btnClearSearchAndFilters.addEventListener('click', () => {
        DOM.searchInput.value = '';
        DOM.clearSearchBtn.style.display = 'none';
        STATE.searchQuery = '';
        resetFilters();
    });

    // Sidebar filter checkboxes
    DOM.plpView.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && (e.target.name === 'availability' || e.target.name === 'brand' || e.target.name === 'clientType' || e.target.name === 'categoryFilter')) {
            updateActiveFiltersState();
            applyFiltersAndRenderPLP();
        }
    });

    // Quick info blocks
    document.getElementById('blockPayments').addEventListener('click', () => openModal(DOM.modalPayments));
    document.getElementById('blockDelivery').addEventListener('click', () => openModal(DOM.modalDelivery));
    document.getElementById('blockOrderStatus').addEventListener('click', () => openModal(DOM.modalOrderStatus));
    document.getElementById('infoDespachoBtn').addEventListener('click', () => openModal(DOM.modalDelivery));
    
    // Modals bindings
    document.querySelectorAll('.btn-how-to-buy-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(DOM.modalHowToBuy);
        });
    });
    document.getElementById('footerLinkPayments').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(DOM.modalPayments);
    });
    document.getElementById('footerLinkDelivery').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(DOM.modalDelivery);
    });
    document.getElementById('footerAddressBtn').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(DOM.modalMap);
    });
    document.getElementById('mobileOffersLink').addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDrawer();
        navigateToView('plp', { filter: 'offers' });
    });
    document.getElementById('mobileNewLink').addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDrawer();
        navigateToView('plp', { filter: 'new' });
    });
    document.getElementById('mobileHowToBuyLink').addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDrawer();
        openModal(DOM.modalHowToBuy);
    });

    // Modal Close
    document.querySelectorAll('.modal-close-btn, .modal-close-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(btn.closest('.modal-overlay'));
        });
    });
    
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Cart list interactions
    DOM.cartDrawerItems.addEventListener('click', handleCartItemInteractions);
    
    // Checkout drawer trigger
    DOM.btnCheckout.addEventListener('click', () => {
        closeCartDrawer();
        openModal(DOM.modalCheckout);
    });
    
    DOM.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitCheckoutToWhatsApp();
    });

    document.querySelectorAll('.close-cart-and-browse').forEach(btn => {
        btn.addEventListener('click', () => {
            closeCartDrawer();
            navigateToView('plp', { category: 'all' });
        });
    });

    // Tracking Order Mock
    DOM.btnTrackOrder.addEventListener('click', () => {
        const orderId = sanitizeInput(DOM.trackingInput.value);
        if (!orderId) return;
        
        DOM.trackingResult.style.display = 'block';
        if (orderId.startsWith('AY-') && orderId.length > 5) {
            DOM.trackingResult.className = 'tracking-result-box';
            DOM.trackingResult.innerHTML = `
                <p>📦 <strong>Pedido:</strong> ${orderId}</p>
                <p>🚚 <strong>Estado:</strong> En Ruta de Despacho</p>
                <p>🕒 <strong>Entrega estimada:</strong> Mañana entre 08:30 y 13:30 Hrs</p>
                <p>👤 <strong>Repartidor:</strong> Carlos Henríquez (+569 9876 5432)</p>
            `;
        } else {
            DOM.trackingResult.className = 'tracking-result-box error';
            DOM.trackingResult.innerHTML = `
                <p>❌ Código no encontrado. Por favor, verifica el formato AY-XXXXX-XXXX.</p>
            `;
        }
    });

    DOM.homeView.addEventListener('click', (e) => {
        const viewAllLink = e.target.closest('.view-all-link');
        const viewProductsBtn = e.target.closest('.view-products-btn');
        if (viewAllLink) {
            e.preventDefault();
            const cat = viewAllLink.getAttribute('data-category');
            const filter = viewAllLink.getAttribute('data-filter');
            if (cat) navigateToView('plp', { category: cat });
            if (filter) navigateToView('plp', { filter: filter });
        }
        if (viewProductsBtn) {
            e.preventDefault();
            const cat = viewProductsBtn.getAttribute('data-category');
            navigateToView('plp', { category: cat });
        }
    });

    // --- NEW ADMIN PORTAL LISTENERS ---
    
    // Header Lock button click
    DOM.adminTriggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleAdminRoute();
    });

    // Footer admin button click
    DOM.footerLinkAdmin.addEventListener('click', (e) => {
        e.preventDefault();
        handleAdminRoute();
    });

    DOM.mobileAdminLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDrawer();
        handleAdminRoute();
    });

    // Login Form Submit validation
    DOM.adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = DOM.adminUserField.value.trim();
        const password = DOM.adminPassField.value;

        if (username === 'ahorraya' && password === '1234567') {
            sessionStorage.setItem('ahorraya_admin_logged_in', 'true');
            sessionStorage.setItem('ahorraya_admin_user', username);
            
            // Clean forms
            DOM.adminUserField.value = '';
            DOM.adminPassField.value = '';
            DOM.loginErrorMsg.style.display = 'none';
            
            // Toggle menu tabs and navigate
            updateNavigationUI();
            navigateToView('admin-orders');
        } else {
            DOM.loginErrorMsg.style.display = 'block';
            DOM.adminPassField.value = '';
        }
    });

    // Back to shop button in login
    DOM.adminLoginView.querySelector('.btn-back-home').addEventListener('click', () => {
        navigateToView('home');
    });

    // Logout actions
    const logoutActions = [DOM.btnHeaderAdminLogout, DOM.mobileAdminLogoutLink];
    document.querySelectorAll('.btnAdminLogout').forEach(btn => logoutActions.push(btn));

    logoutActions.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                closeMobileDrawer();
                sessionStorage.removeItem('ahorraya_admin_logged_in');
                sessionStorage.removeItem('ahorraya_admin_user');
                updateNavigationUI();
                navigateToView('home');
            });
        }
    });

    // Separate views header clicks
    DOM.navLinkAdminOrders.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToView('admin-orders');
    });
    DOM.navLinkAdminSales.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToView('admin-sales');
    });

    // Separate views mobile drawer clicks
    DOM.mobileAdminOrdersLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDrawer();
        navigateToView('admin-orders');
    });
    DOM.mobileAdminSalesLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDrawer();
        navigateToView('admin-sales');
    });

    // Admin Sales Period Buttons
    DOM.adminSalesView.querySelectorAll('.btn-period').forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.adminSalesView.querySelectorAll('.btn-period').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.adminPeriod = btn.getAttribute('data-period');
            renderAdminSalesDashboard();
        });
    });

    // Export Excel Button
    DOM.btnExportExcel.addEventListener('click', () => {
        exportSalesToCSV();
    });

    // Orders detailed overlay viewer button
    DOM.adminOrdersTable.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view-order');
        if (viewBtn) {
            const orderId = viewBtn.getAttribute('data-order-id');
            openOrderDetailModal(orderId);
        }
    });
}

// Redirects to correct Admin section based on auth state
function handleAdminRoute() {
    const isLoggedIn = sessionStorage.getItem('ahorraya_admin_logged_in') === 'true';
    if (isLoggedIn) {
        navigateToView('admin-orders');
    } else {
        navigateToView('admin-login');
    }
}

// 8. SPA ROUTING ENGINE
function navigateToView(viewName, options = {}) {
    STATE.currentView = viewName;
    
    // Close drawers
    closeMobileDrawer();
    closeCartDrawer();
    
    // Reset view visibility
    DOM.homeView.classList.remove('active');
    DOM.plpView.classList.remove('active');
    DOM.adminLoginView.classList.remove('active');
    DOM.adminOrdersView.classList.remove('active');
    DOM.adminSalesView.classList.remove('active');
    
    // Reset standard links active state
    DOM.navLinkOffers.classList.remove('active');
    DOM.navLinkNew.classList.remove('active');

    // Reset admin header links active state
    DOM.navLinkAdminOrders.classList.remove('active');
    DOM.navLinkAdminSales.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewName === 'home') {
        DOM.homeView.classList.add('active');
        STATE.activeCategory = 'all';
    } 
    else if (viewName === 'plp') {
        DOM.plpView.classList.add('active');
        resetFilterCheckboxes();
        
        if (options.category) {
            STATE.activeCategory = options.category;
            DOM.plpTitle.textContent = options.category === 'all' 
                ? 'Catálogo Completo de Abarrotes' 
                : `Categoría: ${getCategoryLabel(options.category)}`;
            
            if (options.category !== 'all') {
                const cb = document.querySelector(`input[name="categoryFilter"][value="${options.category}"]`);
                if (cb) cb.checked = true;
            }
        } 
        else if (options.filter === 'offers') {
            DOM.plpTitle.textContent = '🔥 Ofertas de la Semana';
            DOM.navLinkOffers.classList.add('active');
            STATE.activeCategory = 'offers';
        } 
        else if (options.filter === 'new') {
            DOM.plpTitle.textContent = '✨ Nuevos Productos Mayoristas';
            DOM.navLinkNew.classList.add('active');
            STATE.activeCategory = 'new';
        } 
        else if (options.search) {
            DOM.plpTitle.textContent = `Resultados de Búsqueda: "${options.search}"`;
            STATE.activeCategory = 'search';
        }
        
        updateActiveFiltersState();
        applyFiltersAndRenderPLP();
    }
    else if (viewName === 'admin-login') {
        DOM.adminLoginView.classList.add('active');
    }
    else if (viewName === 'admin-orders') {
        DOM.adminOrdersView.classList.add('active');
        DOM.navLinkAdminOrders.classList.add('active');
        calculateKPIs();
        renderAdminOrdersTable();
    }
    else if (viewName === 'admin-sales') {
        DOM.adminSalesView.classList.add('active');
        DOM.navLinkAdminSales.classList.add('active');
        calculateKPIs();
        renderAdminSalesDashboard();
    }
}

// 9. CAROUSEL
function setupCarousel() {
    const track = DOM.carouselTrack;
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('carouselNextBtn');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    let currentIndex = 0;
    let autoPlayTimer;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 50}%)`;
        const indicators = Array.from(indicatorsContainer.children);
        indicators.forEach((ind, i) => {
            if (i === index) ind.classList.add('active');
            else ind.classList.remove('active');
        });
        currentIndex = index;
    };

    const nextSlide = () => { updateCarousel((currentIndex + 1) % slides.length); };
    const prevSlide = () => { updateCarousel((currentIndex - 1 + slides.length) % slides.length); };
    const startAutoPlay = () => { autoPlayTimer = setInterval(nextSlide, 6000); };
    const stopAutoPlay = () => { clearInterval(autoPlayTimer); };

    nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
    prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });

    indicatorsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicator')) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            stopAutoPlay();
            updateCarousel(index);
            startAutoPlay();
        }
    });

    startAutoPlay();
}

// 10. PRODUCT CARDS
function createProductCardHTML(product) {
    const priceDetail = product.prices[1];
    const avBadge = product.availability === 'order' 
        ? `<span class="badge badge-new" style="background-color: var(--color-primary-light); color: white;">📦 A Pedido</span>` 
        : '';
    const saleBadge = product.isOffer ? `<span class="badge badge-sale">🔥 Oferta</span>` : '';
    const newBadge = product.isNew ? `<span class="badge badge-new">✨ Nuevo</span>` : '';

    return `
        <div class="product-card" data-product-id="${product.id}" id="card-${product.id}">
            <div class="product-badge-container">
                ${saleBadge}
                ${newBadge}
                ${avBadge}
            </div>
            
            <div class="product-img-wrapper">
                ${getProductSvg(product.category, product.name)}
            </div>
            
            <div class="product-card-body">
                <span class="product-brand">${sanitizeInput(product.brand)}</span>
                <h3 class="product-desc" title="${sanitizeInput(product.name)}">${sanitizeInput(product.name)}</h3>
                
                <div class="pricing-tiers-tab" role="tablist">
                    <button class="tier-btn active" data-tier="1" role="tab" aria-selected="true">1 u.</button>
                    <button class="tier-btn" data-tier="12" role="tab" aria-selected="false">12 u.</button>
                    <button class="tier-btn" data-tier="24" role="tab" aria-selected="false">24 u.+</button>
                </div>
                
                <div class="price-display-wrapper">
                    <div class="price-unit-row">
                        <span class="price-value" data-unit-price="${priceDetail}">$${formatNumber(priceDetail)}</span>
                        <span class="price-subtext">por unidad</span>
                    </div>
                    <div class="price-total-row">
                        <span>Total: <strong class="total-amount">$${formatNumber(priceDetail)}</strong></span>
                    </div>
                </div>
                
                <div class="card-action-row">
                    <div class="quantity-counter">
                        <button class="qty-btn minus">-</button>
                        <input type="number" class="qty-input" value="1" min="1" max="999">
                        <button class="qty-btn plus">+</button>
                    </div>
                    
                    <button class="btn btn-primary add-cart-btn ripple">Agregar</button>
                </div>
            </div>
        </div>
    `;
}

function formatNumber(num) {
    return new Intl.NumberFormat('es-CL').format(Math.round(num));
}

// 11. RENDER SHELVES
function renderHomeShelves() {
    const offers = PRODUCTS.filter(p => p.isOffer).slice(0, 4);
    DOM.offersGrid.innerHTML = offers.map(createProductCardHTML).join('');
    
    const abarrotes = PRODUCTS.filter(p => p.category === 'abarrotes').slice(0, 4);
    DOM.abarrotesGrid.innerHTML = abarrotes.map(createProductCardHTML).join('');

    const limpieza = PRODUCTS.filter(p => p.category === 'limpieza').slice(0, 4);
    DOM.limpiezaGrid.innerHTML = limpieza.map(createProductCardHTML).join('');

    bindCardInteractions(DOM.offersGrid);
    bindCardInteractions(DOM.abarrotesGrid);
    bindCardInteractions(DOM.limpiezaGrid);
}

function populateBrandFilters() {
    const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
    DOM.brandFiltersContainer.innerHTML = brands.map(brand => `
        <label class="filter-checkbox-label">
            <input type="checkbox" name="brand" value="${brand.toLowerCase()}">
            <span class="checkbox-box"></span>
            ${sanitizeInput(brand)}
        </label>
    `).join('');
}

// 12. BIND CARDS
function bindCardInteractions(container) {
    container.querySelectorAll('.product-card').forEach(card => {
        const productId = card.getAttribute('data-product-id');
        const product = PRODUCTS.find(p => p.id === productId);
        
        const tierButtons = card.querySelectorAll('.tier-btn');
        const qtyInput = card.querySelector('.qty-input');
        const plusBtn = card.querySelector('.qty-btn.plus');
        const minusBtn = card.querySelector('.qty-btn.minus');
        const unitPriceLabel = card.querySelector('.price-value');
        const totalPriceLabel = card.querySelector('.total-amount');
        const addBtn = card.querySelector('.add-cart-btn');

        const getTierPrice = (qty) => {
            if (qty >= 24) return product.prices[24];
            if (qty >= 12) return product.prices[12];
            return product.prices[1];
        };

        const updatePrices = (qty) => {
            const unitPrice = getTierPrice(qty);
            const total = unitPrice * qty;
            
            unitPriceLabel.textContent = `$${formatNumber(unitPrice)}`;
            unitPriceLabel.setAttribute('data-unit-price', unitPrice);
            totalPriceLabel.textContent = `$${formatNumber(total)}`;
            
            let activeTier = 1;
            if (qty >= 24) activeTier = 24;
            else if (qty >= 12) activeTier = 12;

            tierButtons.forEach(btn => {
                const tierVal = parseInt(btn.getAttribute('data-tier'), 10);
                if (tierVal === activeTier) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                }
            });
        };

        tierButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tierVal = parseInt(btn.getAttribute('data-tier'), 10);
                qtyInput.value = tierVal;
                updatePrices(tierVal);
            });
        });

        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            val++;
            qtyInput.value = val;
            updatePrices(val);
        });

        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val > 1) {
                val--;
                qtyInput.value = val;
                updatePrices(val);
            }
        });

        qtyInput.addEventListener('input', () => {
            let val = parseInt(qtyInput.value, 10);
            if (isNaN(val) || val < 1) val = 1;
            qtyInput.value = val;
            updatePrices(val);
        });

        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const finalQty = parseInt(qtyInput.value, 10) || 1;
            addToCart(productId, finalQty);
            addBtn.style.transform = 'scale(0.95)';
            setTimeout(() => { addBtn.style.transform = ''; }, 100);
        });
    });
}

// 13. PLP FILTER LOGIC
function resetFilters() {
    resetFilterCheckboxes();
    updateActiveFiltersState();
    applyFiltersAndRenderPLP();
}

function resetFilterCheckboxes() {
    document.querySelectorAll('.plp-sidebar input[type="checkbox"]').forEach(cb => {
        if (cb.name === 'availability') {
            cb.checked = (cb.value === 'stock');
        } else if (cb.name === 'clientType') {
            cb.checked = true;
        } else {
            cb.checked = false;
        }
    });
}

function updateActiveFiltersState() {
    const getCheckedValues = (name) => {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
    };

    STATE.activeFilters.availability = getCheckedValues('availability');
    STATE.activeFilters.brands = getCheckedValues('brand');
    STATE.activeFilters.clientTypes = getCheckedValues('clientType');
    
    const catCheckboxes = getCheckedValues('categoryFilter');
    if (catCheckboxes.length > 0) {
        STATE.activeFilters.categories = catCheckboxes;
        STATE.activeCategory = 'filters';
    } else {
        STATE.activeFilters.categories = [];
    }
}

function applyFiltersAndRenderPLP() {
    let filteredList = [...PRODUCTS];

    if (STATE.activeCategory !== 'all' && STATE.activeCategory !== 'filters') {
        if (STATE.activeCategory === 'offers') {
            filteredList = filteredList.filter(p => p.isOffer);
        } else if (STATE.activeCategory === 'new') {
            filteredList = filteredList.filter(p => p.isNew);
        } else if (STATE.activeCategory === 'search') {
            const q = STATE.searchQuery.toLowerCase();
            filteredList = filteredList.filter(p => 
                p.name.toLowerCase().includes(q) || 
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        } else {
            filteredList = filteredList.filter(p => p.category === STATE.activeCategory);
        }
    }

    if (STATE.activeFilters.availability.length > 0) {
        filteredList = filteredList.filter(p => STATE.activeFilters.availability.includes(p.availability));
    } else {
        filteredList = [];
    }

    if (STATE.activeFilters.categories.length > 0) {
        filteredList = filteredList.filter(p => STATE.activeFilters.categories.includes(p.category));
    }

    if (STATE.activeFilters.brands.length > 0) {
        filteredList = filteredList.filter(p => STATE.activeFilters.brands.includes(p.brand.toLowerCase()));
    }

    if (STATE.activeFilters.clientTypes.length > 0) {
        filteredList = filteredList.filter(p => 
            p.clientTypes.some(ct => STATE.activeFilters.clientTypes.includes(ct))
        );
    }

    if (STATE.sortBy === 'popularity') {
        filteredList.sort((a, b) => b.popularity - a.popularity);
    } else if (STATE.sortBy === 'price-asc') {
        filteredList.sort((a, b) => a.prices[1] - b.prices[1]);
    } else if (STATE.sortBy === 'price-desc') {
        filteredList.sort((a, b) => b.prices[1] - a.prices[1]);
    } else if (STATE.sortBy === 'name-asc') {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
    }

    DOM.productCount.textContent = `Mostrando ${filteredList.length} producto${filteredList.length === 1 ? '' : 's'}`;

    if (filteredList.length > 0) {
        DOM.plpGrid.innerHTML = filteredList.map(createProductCardHTML).join('');
        DOM.noResultsState.style.display = 'none';
        bindCardInteractions(DOM.plpGrid);
    } else {
        DOM.plpGrid.innerHTML = '';
        DOM.noResultsState.style.display = 'block';
    }
}

// 14. CART OPERATIONS
function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem('ahorraya_cart');
        if (saved) STATE.cart = JSON.parse(saved);
    } catch (e) {
        STATE.cart = [];
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('ahorraya_cart', JSON.stringify(STATE.cart));
    } catch (e) {}
}

function addToCart(productId, quantity) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = STATE.cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        STATE.cart.push({ productId: productId, quantity: quantity });
    }

    saveCartToStorage();
    updateCartUI();
    openCartDrawer();
}

function updateCartUI() {
    let totalItemsCount = 0;
    let subtotalNormal = 0;
    let subtotalWholesale = 0;

    const itemsHTML = STATE.cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        if (!product) return '';
        
        totalItemsCount += item.quantity;
        const unitDetailPrice = product.prices[1];
        let unitWholesalePrice = product.prices[1];
        
        if (item.quantity >= 24) unitWholesalePrice = product.prices[24];
        else if (item.quantity >= 12) unitWholesalePrice = product.prices[12];
        
        const rowTotal = unitWholesalePrice * item.quantity;
        subtotalNormal += (unitDetailPrice * item.quantity);
        subtotalWholesale += rowTotal;

        return `
            <div class="cart-row" data-product-id="${product.id}">
                <img src="logo.jpg" alt="${sanitizeInput(product.name)}" class="cart-row-img">
                <div class="cart-row-details">
                    <span class="cart-row-desc">${sanitizeInput(product.name)}</span>
                    <div class="cart-row-meta">
                        <div class="cart-row-counter">
                            <button class="cart-qty-btn minus">-</button>
                            <input type="text" class="cart-qty-input" value="${item.quantity}" readonly>
                            <button class="cart-qty-btn plus">+</button>
                        </div>
                        <div class="cart-row-price-calc">
                            <span class="unit-p">$${formatNumber(unitWholesalePrice)} c/u</span>
                            <span class="total-p">$${formatNumber(rowTotal)}</span>
                        </div>
                        <button class="cart-row-delete" aria-label="Eliminar">
                            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    DOM.cartBadge.textContent = totalItemsCount;
    DOM.cartDrawerCount.textContent = `${totalItemsCount} producto${totalItemsCount === 1 ? '' : 's'}`;
    DOM.cartTotalHeader.textContent = `$${formatNumber(subtotalWholesale)}`;
    DOM.cartSubtotal.textContent = `$${formatNumber(subtotalWholesale)}`;

    let deliveryCost = 0;
    if (subtotalWholesale === 0) {
        deliveryCost = 0;
        DOM.cartDeliveryCost.innerHTML = `$0`;
    } else if (subtotalWholesale >= 100000) {
        deliveryCost = 0;
        DOM.cartDeliveryCost.innerHTML = `<span class="free-badge">Gratis</span>`;
    } else {
        deliveryCost = 4990;
        DOM.cartDeliveryCost.innerHTML = `$${formatNumber(deliveryCost)}`;
    }

    const finalTotal = subtotalWholesale + deliveryCost;
    DOM.cartTotal.textContent = `$${formatNumber(finalTotal)}`;

    const savings = subtotalNormal - subtotalWholesale;
    if (savings > 0) {
        DOM.cartSavingAlert.style.display = 'block';
        DOM.cartSavingsAmount.textContent = `$${formatNumber(savings)}`;
    } else {
        DOM.cartSavingAlert.style.display = 'none';
    }

    if (STATE.cart.length > 0) {
        DOM.cartDrawerItems.innerHTML = itemsHTML;
        DOM.cartEmptyState.style.display = 'none';
        DOM.cartDrawerFooter.style.display = 'block';
    } else {
        DOM.cartDrawerItems.innerHTML = '';
        DOM.cartEmptyState.style.display = 'flex';
        DOM.cartDrawerFooter.style.display = 'none';
        DOM.cartTotalHeader.textContent = '$0';
    }
}

function handleCartItemInteractions(e) {
    const cartRow = e.target.closest('.cart-row');
    if (!cartRow) return;
    
    const productId = cartRow.getAttribute('data-product-id');
    const cartItem = STATE.cart.find(item => item.productId === productId);
    if (!cartItem) return;

    if (e.target.closest('.cart-row-delete')) {
        STATE.cart = STATE.cart.filter(item => item.productId !== productId);
        saveCartToStorage();
        updateCartUI();
        return;
    }
    if (e.target.closest('.cart-qty-btn.plus')) {
        cartItem.quantity++;
        saveCartToStorage();
        updateCartUI();
        return;
    }
    if (e.target.closest('.cart-qty-btn.minus')) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            STATE.cart = STATE.cart.filter(item => item.productId !== productId);
        }
        saveCartToStorage();
        updateCartUI();
        return;
    }
}

// 15. WHATSAPP CHECKOUT SUBMIT
function submitCheckoutToWhatsApp() {
    const name = sanitizeInput(document.getElementById('checkName').value);
    const rut = sanitizeInput(document.getElementById('checkRut').value);
    const phone = sanitizeInput(document.getElementById('checkPhone').value);
    const email = sanitizeInput(document.getElementById('checkEmail').value);
    const address = sanitizeInput(document.getElementById('checkAddress').value);
    const methodVal = document.getElementById('checkMethod').value;
    const paymentVal = document.getElementById('checkPayment').value;
    
    if (!name || !rut || !phone || !email || !address) {
        alert("Por favor, rellene todos los campos obligatorios.");
        return;
    }

    let itemsText = '';
    let totalNormalValue = 0;
    let totalDiscountedValue = 0;
    const orderItems = [];

    STATE.cart.forEach((item, index) => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        if (!product) return;

        const unitDetailPrice = product.prices[1];
        let unitActivePrice = product.prices[1];
        let formatType = 'Unidad';

        if (item.quantity >= 24) {
            unitActivePrice = product.prices[24];
            formatType = 'Palet/Gran Mayor';
        } else if (item.quantity >= 12) {
            unitActivePrice = product.prices[12];
            formatType = 'Caja/Packs';
        }

        const rowCost = unitActivePrice * item.quantity;
        totalNormalValue += (unitDetailPrice * item.quantity);
        totalDiscountedValue += rowCost;

        orderItems.push({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: unitActivePrice
        });

        itemsText += `${index + 1}) [${product.brand}] ${product.name}\n`;
        itemsText += `   Cant: ${item.quantity} x $${formatNumber(unitActivePrice)} (${formatType}) | Total: $${formatNumber(rowCost)}\n`;
    });

    const deliveryText = methodVal === 'retiro' ? 'Retiro en Bodega Renca' : 'Despacho a Domicilio';
    let shippingCost = 0;
    if (methodVal === 'domicilio') {
        shippingCost = totalDiscountedValue >= 100000 ? 0 : 4990;
    }
    
    const finalBill = totalDiscountedValue + shippingCost;
    const savings = totalNormalValue - totalDiscountedValue;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AY-${randomNum}-${new Date().getFullYear()}`;

    const newOrderObj = {
        id: orderId,
        date: new Date().toISOString(),
        customer: { name, rut, phone, email, address },
        method: methodVal,
        payment: paymentVal,
        shippingCost: shippingCost,
        items: orderItems,
        total: finalBill
    };
    saveOrder(newOrderObj);

    let msg = `🛒 *NUEVO PEDIDO AHORRAYA! CHILE*\n\n`;
    msg += `🧾 *Orden ID:* ${orderId}\n\n`;
    msg += `👤 *Datos del Cliente:*\n`;
    msg += `• *Nombre:* ${name}\n`;
    msg += `• *RUT:* ${rut}\n`;
    msg += `• *Teléfono:* ${phone}\n`;
    msg += `• *Email:* ${email}\n`;
    msg += `• *Dirección:* ${address}\n\n`;

    msg += `📦 *Detalle del Pedido:*\n`;
    msg += `${itemsText}\n`;
    
    msg += `💵 *Resumen de Compra:*\n`;
    msg += `• *Subtotal:* $${formatNumber(totalDiscountedValue)}\n`;
    msg += `• *Envío:* ${shippingCost === 0 ? 'Gratis' : `$${formatNumber(shippingCost)}`}\n`;
    msg += `• *Método Despacho:* ${deliveryText}\n`;
    msg += `• *Método Pago:* ${paymentVal.toUpperCase()}\n`;
    msg += `• *TOTAL A PAGAR:* $${formatNumber(finalBill)}\n`;
    
    if (savings > 0) {
        msg += `🎉 *Ahorro Total por Mayor:* $${formatNumber(savings)}\n`;
    }
    
    msg += `\n_Pedido procesado de forma segura bajo cifrado SSL. Pendiente confirmación de pago por ejecutivo._`;

    const encodedText = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/56912345678?text=${encodedText}`;

    STATE.cart = [];
    saveCartToStorage();
    updateCartUI();

    closeModal(DOM.modalCheckout);
    window.open(whatsappUrl, '_blank');
}


// ==========================================================================
// --- NEW FEATURES: ADMIN PORTAL PORTLET LOGIC (SEPARATE VIEWS ENGINE) ---
// ==========================================================================

// Calculates and sets KPI Metric widgets across all active displays
function calculateKPIs() {
    const orders = getOrders();
    let revenueSum = 0;
    
    orders.forEach(order => {
        revenueSum += order.total;
    });

    const totalOrders = orders.length;
    const averageTicket = totalOrders > 0 ? (revenueSum / totalOrders) : 0;

    // Loop through all classes for multiple views
    document.querySelectorAll('.kpiRevenue').forEach(el => {
        el.textContent = `$${formatNumber(revenueSum)}`;
    });
    document.querySelectorAll('.kpiOrdersCount').forEach(el => {
        el.textContent = totalOrders;
    });
    document.querySelectorAll('.kpiTicketAverage').forEach(el => {
        el.textContent = `$${formatNumber(averageTicket)}`;
    });
}

// Renders the orders management table
function renderAdminOrdersTable() {
    const orders = getOrders();
    const tbody = DOM.adminOrdersTable.querySelector('tbody');

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted);">No hay pedidos registrados en el sistema.</td></tr>`;
        return;
    }

    const rowsHTML = orders.map(order => {
        const orderDateStr = formatDateString(order.date);
        const nameShort = order.customer.name.length > 25 ? order.customer.name.substring(0, 22) + '...' : order.customer.name;
        const methodBadge = order.method === 'retiro' 
            ? `<span class="order-badge-status success">Retiro</span>` 
            : `<span class="order-badge-status pending">Despacho</span>`;

        return `
            <tr>
                <td>${orderDateStr}</td>
                <td><strong>${order.id}</strong></td>
                <td title="${sanitizeInput(order.customer.name)}">${sanitizeInput(nameShort)}</td>
                <td>${sanitizeInput(order.customer.rut)}</td>
                <td>${methodBadge}</td>
                <td><strong>$${formatNumber(order.total)}</strong></td>
                <td>
                    <button class="btn btn-outline-sm btn-view-order" data-order-id="${order.id}">
                        Ver Detalle
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    tbody.innerHTML = rowsHTML;
}

// Format Date string helper
function formatDateString(isoString) {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) {
        return isoString;
    }
}

// Opens individual order detail modal
function openOrderDetailModal(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('detId').textContent = order.id;
    document.getElementById('detDate').textContent = formatDateString(order.date);
    document.getElementById('detName').textContent = order.customer.name;
    document.getElementById('detRut').textContent = order.customer.rut;
    document.getElementById('detPhone').textContent = order.customer.phone;
    document.getElementById('detEmail').textContent = order.customer.email;
    document.getElementById('detAddress').textContent = order.customer.address;
    document.getElementById('detMethod').textContent = order.method === 'retiro' ? 'Retiro en Bodega Renca' : 'Despacho a Domicilio';
    document.getElementById('detPayment').textContent = order.payment.toUpperCase();
    document.getElementById('detTotal').textContent = `$${formatNumber(order.total)}`;

    const tbody = document.getElementById('detItemsTable').querySelector('tbody');
    let itemsHTML = order.items.map(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        const brand = product ? product.brand : 'Genérico';
        const name = product ? product.name : 'Producto';
        
        let formatType = 'Unidad';
        if (item.quantity >= 24) formatType = 'Palet';
        else if (item.quantity >= 12) formatType = 'Caja';

        const rowTotal = item.unitPrice * item.quantity;

        return `
            <tr>
                <td>${sanitizeInput(brand)}</td>
                <td>${sanitizeInput(name)}</td>
                <td>${formatType}</td>
                <td>${item.quantity}</td>
                <td>$${formatNumber(item.unitPrice)}</td>
                <td>$${formatNumber(rowTotal)}</td>
            </tr>
        `;
    }).join('');

    if (order.shippingCost > 0) {
        itemsHTML += `
            <tr style="color: var(--color-success);">
                <td colspan="2"><strong>Logística</strong></td>
                <td>Servicio</td>
                <td>1</td>
                <td>$${formatNumber(order.shippingCost)}</td>
                <td>$${formatNumber(order.shippingCost)}</td>
            </tr>
        `;
    }

    tbody.innerHTML = itemsHTML;
    openModal(DOM.modalOrderDetail);
}

// 16. SALES REPORTING GRAPHICS ENGINE
function renderAdminSalesDashboard() {
    const orders = getOrders();
    const period = STATE.adminPeriod;
    
    let groupedSales = {};
    let labels = [];
    const today = new Date();
    
    if (period === 'day') {
        DOM.chartTitle.textContent = 'Ingresos Diarios (Últimos 7 días)';
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const key = d.toISOString().split('T')[0];
            groupedSales[key] = { revenue: 0, count: 0, units: 0 };
            
            const dayNum = d.getDate();
            const monthNames = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            labels.push({ key: key, label: `${dayNum} ${monthNames[d.getMonth()]}` });
        }
    } 
    else if (period === 'week') {
        DOM.chartTitle.textContent = 'Ingresos Semanales (Últimas 6 semanas)';
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - (i * 7));
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(d.setDate(diff));
            const key = monday.toISOString().split('T')[0];
            
            groupedSales[key] = { revenue: 0, count: 0, units: 0 };
            labels.push({ key: key, label: `Sem ${monday.getDate()}/${monday.getMonth()+1}` });
        }
    } 
    else if (period === 'month') {
        DOM.chartTitle.textContent = 'Ingresos Mensuales (Últimos 6 meses)';
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            groupedSales[key] = { revenue: 0, count: 0, units: 0 };
            
            const monthNames = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            labels.push({ key: key, label: `${monthNames[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}` });
        }
    } 
    else if (period === 'year') {
        DOM.chartTitle.textContent = 'Ingresos Anuales (Últimos 3 años)';
        for (let i = 2; i >= 0; i--) {
            const yearNum = today.getFullYear() - i;
            const key = `${yearNum}`;
            groupedSales[key] = { revenue: 0, count: 0, units: 0 };
            labels.push({ key: key, label: `${yearNum}` });
        }
    }

    orders.forEach(order => {
        const orderDate = new Date(order.date);
        let key = '';

        if (period === 'day') {
            key = order.date.split('T')[0];
        } 
        else if (period === 'week') {
            const day = orderDate.getDay();
            const diff = orderDate.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(orderDate.setDate(diff));
            key = monday.toISOString().split('T')[0];
        } 
        else if (period === 'month') {
            key = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
        } 
        else if (period === 'year') {
            key = `${orderDate.getFullYear()}`;
        }

        let unitsCount = 0;
        order.items.forEach(it => unitsCount += it.quantity);

        if (groupedSales[key] !== undefined) {
            groupedSales[key].revenue += order.total;
            groupedSales[key].count += 1;
            groupedSales[key].units += unitsCount;
        }
    });

    let maxRevenue = 10000; 
    labels.forEach(lbl => {
        const val = groupedSales[lbl.key].revenue;
        if (val > maxRevenue) maxRevenue = val;
    });

    DOM.chartYMax.textContent = `$${formatCompactNumber(maxRevenue)}`;
    DOM.chartYMid.textContent = `$${formatCompactNumber(maxRevenue / 2)}`;

    const barsHTML = labels.map(lbl => {
        const data = groupedSales[lbl.key];
        const pct = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
        
        return `
            <div class="chart-bar-col">
                <div class="chart-bar-fill" 
                     style="height: ${pct}%;" 
                     data-tooltip="Ventas: $${formatNumber(data.revenue)} (${data.count} pedidos)"
                     role="img"
                     aria-label="Ventas en ${lbl.label}: $${formatNumber(data.revenue)}">
                </div>
            </div>
        `;
    }).join('');

    const xLabelsHTML = labels.map(lbl => {
        return `<span class="x-lbl" title="${lbl.label}">${lbl.label}</span>`;
    }).join('');

    DOM.chartBarsTrack.innerHTML = barsHTML;
    DOM.chartXLabels.innerHTML = xLabelsHTML;

    const summaryTbody = DOM.salesSummaryTable.querySelector('tbody');
    const tableHTML = labels.map(lbl => {
        const data = groupedSales[lbl.key];
        return `
            <tr>
                <td><strong>${lbl.label}</strong></td>
                <td>${data.count}</td>
                <td>${data.units} u.</td>
                <td><strong>$${formatNumber(data.revenue)}</strong></td>
            </tr>
        `;
    }).join('');
    
    summaryTbody.innerHTML = tableHTML;
}

function formatCompactNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num;
}

// 17. DOWNLOAD CSV EXPORT
function exportSalesToCSV() {
    const orders = getOrders();
    if (orders.length === 0) {
        alert("No hay datos de ventas disponibles para exportar.");
        return;
    }

    let csvContent = "Fecha;ID Pedido;Cliente;RUT;Email;Telefono;Direccion;Metodo Despacho;Metodo Pago;Costo Despacho;Monto Total\n";

    orders.forEach(order => {
        const orderDate = formatDateString(order.date).replace(/;/g, ',');
        const id = order.id;
        const client = order.customer.name.replace(/;/g, ',');
        const rut = order.customer.rut.replace(/;/g, ',');
        const email = order.customer.email.replace(/;/g, ',');
        const phone = order.customer.phone.replace(/;/g, ',');
        const address = order.customer.address.replace(/;/g, ',');
        const method = order.method === 'retiro' ? 'Retiro Renca' : 'Despacho Domicilio';
        const payment = order.payment.toUpperCase();
        const shipCost = order.shippingCost;
        const total = order.total;

        csvContent += `${orderDate};${id};${client};${rut};${email};${phone};${address};${method};${payment};${shipCost};${total}\n`;
    });

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte_ventas_ahorraya_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==========================================================================
// --- DRAWER & MODAL HELPER FUNCTIONS ---
// ==========================================================================

function openMobileDrawer() {
    DOM.mobileDrawer.classList.add('active');
    DOM.drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
    DOM.mobileDrawer.classList.remove('active');
    DOM.drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openCartDrawer() {
    DOM.cartDrawer.classList.add('active');
    DOM.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    DOM.cartDrawer.classList.remove('active');
    DOM.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    
    // Restore body overflow if no drawers or other modals are active
    const anyModalOpen = document.querySelector('.modal-overlay.active');
    const anyDrawerOpen = document.querySelector('.mobile-drawer.active, .cart-drawer.active');
    if (!anyModalOpen && !anyDrawerOpen) {
        document.body.style.overflow = '';
    }
}
