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
        "id": "p1",
        "brand": "Nescafé",
        "name": "Nescafé 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 77,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 16754,
            "6": 14520,
            "12": 13613
        },
        "image": "Nescafé 400g.webp"
    },
    {
        "id": "p2",
        "brand": "Nescafé",
        "name": "Nescafé Vainilla latte x 8 sobres",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 95,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 3846,
            "6": 3333,
            "12": 3125
        },
        "image": "Nescafé Vainilla latte x 8 sobres.webp"
    },
    {
        "id": "p3",
        "brand": "Nescafé",
        "name": "Nescafé Capuchino x 8 sobres",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 84,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 3846,
            "6": 3333,
            "12": 3125
        },
        "image": "Nescafé Capuchino x 8 sobres.webp"
    },
    {
        "id": "p4",
        "brand": "Nescafé",
        "name": "Nescafé Caramel  latte x 8 sobres",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 89,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 3846,
            "6": 3333,
            "12": 3125
        },
        "image": "Nescafé Caramel  latte x 8 sobres.webp"
    },
    {
        "id": "p5",
        "brand": "Nescafé",
        "name": "Nescafé Mokka x 8 sobres",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 78,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 3846,
            "6": 3333,
            "12": 3125
        },
        "image": "Nescafé Mokka x 8 sobres.webp"
    },
    {
        "id": "p6",
        "brand": "Nescafé",
        "name": "Nescafe Stick x 96 sobres",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 74,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 13846,
            "6": 12000,
            "12": 11250
        },
        "image": "Nescafe Stick x 96 sobres.webp"
    },
    {
        "id": "p7",
        "brand": "Genérica",
        "name": "Leche Surlart Sin Lactosa descremada",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": true,
        "isNew": true,
        "prices": {
            "1": 1538,
            "6": 1333,
            "12": 1250
        },
        "image": "Leche Surlart Sin Lactosa descremada.webp"
    },
    {
        "id": "p8",
        "brand": "Pitrufquén",
        "name": "Leche Pitrufquen 1lt",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 87,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1268,
            "6": 1099,
            "12": 1030
        },
        "image": "Leche Pitrufquen 1lt.webp"
    },
    {
        "id": "p9",
        "brand": "Surlat",
        "name": "Leche entera surlat 1lt",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 89,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1385,
            "6": 1200,
            "12": 1125
        },
        "image": "Leche entera surlat 1lt.webp"
    },
    {
        "id": "p10",
        "brand": "Surlat",
        "name": "Leche desceemda Surlat",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 85,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1385,
            "6": 1200,
            "12": 1125
        },
        "image": "Leche descremada Surlat.webp"
    },
    {
        "id": "p11",
        "brand": "San José",
        "name": "Atun lomito 140g San jose en aceite",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1498,
            "6": 1299,
            "12": 1218
        },
        "image": "Atun lomito 140g San jose en aceite.webp"
    },
    {
        "id": "p12",
        "brand": "San José",
        "name": "Atun lomito 140g San jose en agua",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 95,
        "isOffer": false,
        "isNew": true,
        "prices": {
            "1": 1498,
            "6": 1299,
            "12": 1218
        },
        "image": "Atun lomito 140g San jose en agua.webp"
    },
    {
        "id": "p13",
        "brand": "San José",
        "name": "Lomito de jurel 160g San Jose en aceite",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1190,
            "6": 1031,
            "12": 967
        },
        "image": "Lomito de jurel 160g San Jose en aceite.webp"
    },
    {
        "id": "p14",
        "brand": "Big Cola",
        "name": "Big Cola 1,7lt",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 93,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1008,
            "6": 873,
            "12": 819
        },
        "image": "Big Cola 1,7lt.webp"
    },
    {
        "id": "p15",
        "brand": "Big Cola",
        "name": "Big Cola Zero 1,7lt",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1008,
            "6": 873,
            "12": 819
        },
        "image": "Big Cola Zero 1,7lt.webp"
    },
    {
        "id": "p16",
        "brand": "Big Cola",
        "name": "Big Cola 3 Lts",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 84,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1512,
            "6": 1311,
            "12": 1229
        },
        "image": "Big Cola 3,03lt.webp"
    },
    {
        "id": "p17",
        "brand": "Big Cola",
        "name": "Big Cola Zero 3.03 lt",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 80,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1512,
            "6": 1311,
            "12": 1229
        },
        "image": "Big Cola Zero 3.03 lt.webp"
    },
    {
        "id": "p18",
        "brand": "Agua Vida",
        "name": "Agua Vida sin gas 1600 mml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 88,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1008,
            "6": 873,
            "12": 819
        },
        "image": "Agua Vida sin gas 1600 mml.webp"
    },
    {
        "id": "p19",
        "brand": "Agua Vida",
        "name": "Agua Vida con gas 1600 mml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 85,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1008,
            "6": 873,
            "12": 819
        },
        "image": "Agua Vida con gas 1600 mml.webp"
    },
    {
        "id": "p20",
        "brand": "Benedictino",
        "name": "Bendictino sin gas 500 ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 76,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 446,
            "6": 387,
            "12": 363
        },
        "image": "Benedictino con gas 500 ml.webp"
    },
    {
        "id": "p21",
        "brand": "Benedictino",
        "name": "Benedictino sin gas 500 ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 77,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 446,
            "6": 387,
            "12": 363
        },
        "image": "Benedictino sin gas 500 ml.webp"
    },
    {
        "id": "p22",
        "brand": "Canora",
        "name": "Arroz Canora G2 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1077,
            "6": 933,
            "12": 875
        },
        "image": "Arroz Canora G2 1k.webp"
    },
    {
        "id": "p23",
        "brand": "Canoro",
        "name": "Arroz Canoro G1 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 87,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1231,
            "6": 1067,
            "12": 1000
        },
        "image": "Arroz Canora G2 1k.webp"
    },
    {
        "id": "p24",
        "brand": "Miraflores",
        "name": "Arroz Miraflores 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 85,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2292,
            "6": 1987,
            "12": 1863
        },
        "image": "Arroz Miraflores 1k.webp"
    },
    {
        "id": "p25",
        "brand": "Tucapel",
        "name": "Arroz Tucapel Gran Selección 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 73,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1831,
            "6": 1587,
            "12": 1488
        },
        "image": "Arroz Tucapel Gran Selección 1k.webp"
    },
    {
        "id": "p26",
        "brand": "Blue Bonet",
        "name": "Arroz Blue Bonet 900g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 78,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1154,
            "6": 1000,
            "12": 938
        },
        "image": "Arroz Blue Bonnet 900g.webp"
    },
    {
        "id": "p27",
        "brand": "Canoro",
        "name": "Spaguetti Canoro 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 78,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 677,
            "6": 587,
            "12": 550
        },
        "image": "Spaghetti Canoro 400g.webp"
    },
    {
        "id": "p28",
        "brand": "Carozzi",
        "name": "Spaguetti #5 Carozzi 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 83,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1000,
            "6": 867,
            "12": 813
        },
        "image": "Spaghetti N5 Carozzi 400g.webp"
    },
    {
        "id": "p29",
        "brand": "Carozzi",
        "name": "Corbatas Carozzi 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 88,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1000,
            "6": 867,
            "12": 813
        },
        "image": "Corbatas Carozzi 400g.webp"
    },
    {
        "id": "p30",
        "brand": "Carozzi",
        "name": "Mostacholli Carozzi 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 95,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1000,
            "6": 867,
            "12": 813
        },
        "image": "Mostaccioli Carozzi 400g.webp"
    },
    {
        "id": "p31",
        "brand": "Pharma",
        "name": "Spaguetti Pharma 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 76,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Spaghetti Pharma 400g.webp"
    },
    {
        "id": "p32",
        "brand": "Pharma",
        "name": "Espirales Pharma 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 87,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Espirales Parma 400g.webp"
    },
    {
        "id": "p33",
        "brand": "Pharma",
        "name": "Mostacholi Pharma 400g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 98,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Mostacholi Parma 400g.webp"
    },
    {
        "id": "p34",
        "brand": "Carozzi",
        "name": "Salsa Carozzi Italiana 200g",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 97,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 738,
            "6": 640,
            "12": 600
        },
        "image": "Salsa Carozzi Italiana 200g.webp"
    },
    {
        "id": "p35",
        "brand": "San Remo",
        "name": "Salsa San Remo 200g",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 492,
            "6": 427,
            "12": 400
        },
        "image": "Salsa San Remo 200g.webp"
    },
    {
        "id": "p36",
        "brand": "Teodoro",
        "name": "Salsa Teodoro Italiana 200g",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 308,
            "6": 267,
            "12": 250
        },
        "image": "Salsa Teodoro Italiana 200g.webp"
    },
    {
        "id": "p37",
        "brand": "Minuto Verde",
        "name": "Arveja congelada 1k minuto verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 90,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2734,
            "6": 2369,
            "12": 2221
        },
        "image": "Arveja congelada 1k minuto verde.webp"
    },
    {
        "id": "p38",
        "brand": "Minuto Verde",
        "name": "Arveja congelada200g Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 734,
            "6": 636,
            "12": 596
        },
        "image": "Arveja congelada200g Minuto Verde.webp"
    },
    {
        "id": "p39",
        "brand": "Minuto Verde",
        "name": "Choclo congealdo 200g Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 74,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 672,
            "6": 583,
            "12": 546
        },
        "image": "Choclo congelado 200 g Minuto Verde.webp"
    },
    {
        "id": "p40",
        "brand": "Minuto Verde",
        "name": "Choclo congelado 1k Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2734,
            "6": 2369,
            "12": 2221
        },
        "image": "Choclo congelado 1k Minuto Verde.webp"
    },
    {
        "id": "p41",
        "brand": "Minuto Verde",
        "name": "Habas congeladas 200g Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 87,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 715,
            "6": 620,
            "12": 581
        },
        "image": "Habas congeladas 200g Minuto Verde.webp"
    },
    {
        "id": "p42",
        "brand": "Minuto Verde",
        "name": "Habas congeladas 1k Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 3092,
            "6": 2680,
            "12": 2513
        },
        "image": "Habas congeladas 1k Minuto Verde.webp"
    },
    {
        "id": "p43",
        "brand": "Minuto Verde",
        "name": "Primavera congelada 200g Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 85,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 672,
            "6": 583,
            "12": 546
        },
        "image": "Primavera congelada 200g Minuto Verde.webp"
    },
    {
        "id": "p44",
        "brand": "Minuto Verde",
        "name": "Primavera congelada 1k Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 3206,
            "6": 2779,
            "12": 2605
        },
        "image": "Primavera congelada 1k Minuto Verde.webp"
    },
    {
        "id": "p45",
        "brand": "Minuto Verde",
        "name": "Papas pre fritas 7x7m 2,5k Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 5721,
            "6": 4958,
            "12": 4648
        },
        "image": "Papas pre fritas 7x7m 2,5k Minuto Verde.webp"
    },
    {
        "id": "p46",
        "brand": "Minuto Verde",
        "name": "Papas Duquesa 500g Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 72,
        "isOffer": false,
        "isNew": true,
        "prices": {
            "1": 2148,
            "6": 1861,
            "12": 1745
        },
        "image": "Papas Duquesa 500g Minuto Verde.webp"
    },
    {
        "id": "p47",
        "brand": "Minuto Verde",
        "name": "Pasta de Choclo 1k Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 89,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 3960,
            "6": 3432,
            "12": 3218
        },
        "image": "Pasta de Choclo 1k Minuto Verde.webp"
    },
    {
        "id": "p48",
        "brand": "Minuto Verde",
        "name": "Mix Pimentones 150g  Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": false,
        "isNew": true,
        "prices": {
            "1": 706,
            "6": 612,
            "12": 574
        },
        "image": "Mix Pimentones 150g  Minuto Verde.webp"
    },
    {
        "id": "p49",
        "brand": "Minuto Verde",
        "name": "Sofrito con ajo 150g Minuto Verde",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 87,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 752,
            "6": 652,
            "12": 611
        },
        "image": "Sofrito con ajo 150g Minuto Verde.webp"
    },
    {
        "id": "p50",
        "brand": "Surlat",
        "name": "Queso Gauda laminado 200g Surlat",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 77,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 3303,
            "6": 2862,
            "12": 2683
        },
        "image": "Queso Gauda laminado 200g Surlat.webp"
    },
    {
        "id": "p51",
        "brand": "Quillayes",
        "name": "Queso Chanco laminado 250g Quillayes",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 3376,
            "6": 2926,
            "12": 2743
        },
        "image": "Queso Chanco laminado 250g Quillayes.webp"
    },
    {
        "id": "p52",
        "brand": "Swan",
        "name": "Servilleta Swan x300un",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 91,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1154,
            "6": 1000,
            "12": 938
        },
        "image": "Servilleta Swan x300un.webp"
    },
    {
        "id": "p53",
        "brand": "Swan",
        "name": "Confort 50mt x 4 Swan",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 73,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2846,
            "6": 2467,
            "12": 2313
        },
        "image": "Confort 50mt x 4 Swan.webp"
    },
    {
        "id": "p54",
        "brand": "Swan",
        "name": "Toalla de papel Swan 70 m",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1652,
            "6": 1432,
            "12": 1342
        },
        "image": "Toalla de papel Swan 70 m.webp"
    },
    {
        "id": "p55",
        "brand": "Genérica",
        "name": "Bolsa de basura 50x70",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 77,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 538,
            "6": 467,
            "12": 438
        },
        "image": "Bolsa de basura 50x70.webp"
    },
    {
        "id": "p56",
        "brand": "Genérica",
        "name": "Bolsa de basura 70x90",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 77,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 769,
            "6": 667,
            "12": 625
        },
        "image": "Bolsa de basura 70x90.webp"
    },
    {
        "id": "p57",
        "brand": "Genérica",
        "name": "Bolsa de basura 80x110",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 80,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1231,
            "6": 1067,
            "12": 1000
        },
        "image": "Bolsa de basura 80x110.webp"
    },
    {
        "id": "p58",
        "brand": "Genérica",
        "name": "Trapero de algodón 50x70",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 82,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 692,
            "6": 600,
            "12": 563
        },
        "image": "Trapero de algodón 50x70.webp"
    },
    {
        "id": "p59",
        "brand": "Genérica",
        "name": "Paño microfibra 38x38 cm",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 75,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 538,
            "6": 467,
            "12": 438
        },
        "image": "Paño microfibra 38x38 cm.webp"
    },
    {
        "id": "p60",
        "brand": "Genérica",
        "name": "Paños de esponja x 3",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 81,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1077,
            "6": 933,
            "12": 875
        },
        "image": "Paños de esponja x 3.webp"
    },
    {
        "id": "p61",
        "brand": "Genérica",
        "name": "Trapero de Microfibra",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 78,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Trapero de Microfibra.webp"
    },
    {
        "id": "p62",
        "brand": "Genérica",
        "name": "Toalla 2 x250 Prepicada",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 78,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 10000,
            "6": 8667,
            "12": 8125
        },
        "image": "Toalla 2 x250 Prepicada.webp"
    },
    {
        "id": "p63",
        "brand": "Genérica",
        "name": "Paño de sacudir amarillo 35x40 cm",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 615,
            "6": 533,
            "12": 500
        },
        "image": "Paño de sacudir amarillo 35x40 cm.webp"
    },
    {
        "id": "p64",
        "brand": "Genérica",
        "name": "Trapero humedo x 12",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 75,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1692,
            "6": 1467,
            "12": 1375
        },
        "image": "Trapero humedo x 12.webp"
    },
    {
        "id": "p65",
        "brand": "Ariel",
        "name": "Detergente Ariel 1,8l",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 72,
        "isOffer": false,
        "isNew": true,
        "prices": {
            "1": 8600,
            "6": 7453,
            "12": 6988
        },
        "image": "Detergente Ariel 1,8l.webp"
    },
    {
        "id": "p66",
        "brand": "Canoro",
        "name": "Azucar Canoro 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 81,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1077,
            "6": 933,
            "12": 875
        },
        "image": "Azucar Canoro 1k.webp"
    },
    {
        "id": "p67",
        "brand": "Iansa",
        "name": "Azucar Iansa 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 95,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1615,
            "6": 1400,
            "12": 1313
        },
        "image": "Azucar Iansa 1k.webp"
    },
    {
        "id": "p68",
        "brand": "Genérica",
        "name": "Medialunas 45g x 180u",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 95,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 47600,
            "6": 41253,
            "12": 38675
        },
        "image": "Medialunas 45g x 180u.webp"
    },
    {
        "id": "p69",
        "brand": "Genérica",
        "name": "Muffin relleno DDL  x 6",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 75,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 6923,
            "6": 6000,
            "12": 5625
        },
        "image": "Muffin relleno ddl x6.webp"
    },
    {
        "id": "p70",
        "brand": "Genérica",
        "name": "Muffin Chocolate Chips chocolate x6",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 75,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 6923,
            "6": 6000,
            "12": 5625
        },
        "image": "Muffin Chocolate Chips chocolate x6.webp"
    },
    {
        "id": "p71",
        "brand": "Genérica",
        "name": "Muffin Vainilla chips chocolate x6",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 6923,
            "6": 6000,
            "12": 5625
        },
        "image": "Muffin Vainilla chips chocolate x6.webp"
    },
    {
        "id": "p72",
        "brand": "Costa",
        "name": "Mini Cocaditas  Costa 35g",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 277,
            "6": 240,
            "12": 225
        },
        "image": "Mini Cocaditas  Costa 35g.webp"
    },
    {
        "id": "p73",
        "brand": "Costa",
        "name": "Mini Mantequilla Costa 35g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 277,
            "6": 240,
            "12": 225
        },
        "image": "Mini Mantequilla Costa 35g.webp"
    },
    {
        "id": "p74",
        "brand": "Costa",
        "name": "Mini Chips Costa 35",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 277,
            "6": 240,
            "12": 225
        },
        "image": "Mini Chips Costa 35.webp"
    },
    {
        "id": "p75",
        "brand": "Costa",
        "name": "Mini Brownie Chips Costa35g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 89,
        "isOffer": false,
        "isNew": true,
        "prices": {
            "1": 277,
            "6": 240,
            "12": 225
        },
        "image": "Mini Brownie Chips Costa 35g.webp"
    },
    {
        "id": "p76",
        "brand": "Costa",
        "name": "Cereal Bar Chocolate Costa x20",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 5538,
            "6": 4800,
            "12": 4500
        },
        "image": "Cereal Bar Chocolate Costa x20.webp"
    },
    {
        "id": "p77",
        "brand": "Costa",
        "name": "Mini Vino Costa 35g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 83,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 277,
            "6": 240,
            "12": 225
        },
        "image": "Mini Vino Costa 35g.webp"
    },
    {
        "id": "p78",
        "brand": "Costa",
        "name": "Mini Dulcitas Costa 35g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 79,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 277,
            "6": 240,
            "12": 225
        },
        "image": "Mini Dulcitas Costa 35g.webp"
    },
    {
        "id": "p79",
        "brand": "Pita Chips",
        "name": "Pita Chips Original 115g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 78,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1648,
            "6": 1428,
            "12": 1339
        },
        "image": "Pita Chips Original 115g.webp"
    },
    {
        "id": "p80",
        "brand": "Pita Chips",
        "name": "Pita Chips Toamte Romero 115g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 90,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1648,
            "6": 1428,
            "12": 1339
        },
        "image": "Pita Chips Tomate Romero 115g.webp"
    },
    {
        "id": "p81",
        "brand": "Pita Chips",
        "name": "Pita Chips Cebolla  115g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1648,
            "6": 1428,
            "12": 1339
        },
        "image": "Pita Chips Cebolla  115g.webp"
    },
    {
        "id": "p82",
        "brand": "Pita Chips",
        "name": "Pita Chips Jalapeño 115g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 76,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1648,
            "6": 1428,
            "12": 1339
        },
        "image": "Pita Chips Jalapeño 115g.webp"
    },
    {
        "id": "p83",
        "brand": "Pita Chips",
        "name": "Pita Chips Cúrcuma 115g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 74,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1648,
            "6": 1428,
            "12": 1339
        },
        "image": "Pita Chips Cúrcuma 115g.webp"
    },
    {
        "id": "p84",
        "brand": "Té Club",
        "name": "Te Club 100 bolsitas",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2908,
            "6": 2520,
            "12": 2363
        },
        "image": "Te Club 100 bolsitas.webp"
    },
    {
        "id": "p85",
        "brand": "3 Arroyos",
        "name": "Areja lata 350g  3 Arroyos",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 97,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 769,
            "6": 667,
            "12": 625
        },
        "image": "Arveja lata 350g 3 Arroyos.webp"
    },
    {
        "id": "p86",
        "brand": "3 Arroyos",
        "name": "Lenteja en lata 350g 3 arroyos",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 97,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 769,
            "6": 667,
            "12": 625
        },
        "image": "Lenteja en lata 350g 3 arroyos.webp"
    },
    {
        "id": "p87",
        "brand": "3 Arroyos",
        "name": "Garbanzo lata 350g 3 arroyos",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 80,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 769,
            "6": 667,
            "12": 625
        },
        "image": "Garbanzo lata 350g 3 arroyos.webp"
    },
    {
        "id": "p88",
        "brand": "3 Arroyos",
        "name": "Choclo en grano  lata 350g 3 Arroyos",
        "category": "conservas",
        "type": "Conservas",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 923,
            "6": 800,
            "12": 750
        },
        "image": "Choclo en grano  lata 350g 3 Arroyos.webp"
    },
    {
        "id": "p89",
        "brand": "Canoro",
        "name": "Energetica canoro 500ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 79,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 923,
            "6": 800,
            "12": 750
        },
        "image": "Energetica canoro 500ml.webp"
    },
    {
        "id": "p90",
        "brand": "Canoro",
        "name": "Limonada Canoro 600 ml Frambuesa",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 84,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Limonada Canoro 600 ml Frambuesa.webp"
    },
    {
        "id": "p91",
        "brand": "Canoro",
        "name": "Limonada Canoro 600 ml Maracuya",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 87,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Limonada Canoro 600 ml Maracuya.webp"
    },
    {
        "id": "p92",
        "brand": "Canoro",
        "name": "Limonada Canoro 600 ml Maqui Berries",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 74,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Limonada Canoro 600 ml Maqui Berries.webp"
    },
    {
        "id": "p93",
        "brand": "Canoro",
        "name": "Limonada Canoro 600 ml Menta Jenjibre",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 95,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Limonada Canoro 600 ml.webp"
    },
    {
        "id": "p94",
        "brand": "Canoro",
        "name": "Limonada Canoro 600 ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 82,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 846,
            "6": 733,
            "12": 688
        },
        "image": "Limonada Canoro 600 ml.webp"
    },
    {
        "id": "p95",
        "brand": "Genérica",
        "name": "Coca cola 591 ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 98,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1308,
            "6": 1133,
            "12": 1063
        },
        "image": "Coca cola 591 ml.webp"
    },
    {
        "id": "p96",
        "brand": "Genérica",
        "name": "Coca Zero 591 ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 72,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1308,
            "6": 1133,
            "12": 1063
        },
        "image": "Coca Zero 591 ml.webp"
    },
    {
        "id": "p97",
        "brand": "Genérica",
        "name": "Fanta 591 ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 71,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1308,
            "6": 1133,
            "12": 1063
        },
        "image": "Fanta 591 ml.webp"
    },
    {
        "id": "p98",
        "brand": "Genérica",
        "name": "Sprite 591 ml",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1308,
            "6": 1133,
            "12": 1063
        },
        "image": "Sprite 591 ml.webp"
    },
    {
        "id": "p99",
        "brand": "Maggi",
        "name": "Sopas Maggi Costilla",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 75,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 692,
            "6": 600,
            "12": 563
        },
        "image": "Sopas Maggi Costilla.webp"
    },
    {
        "id": "p100",
        "brand": "Genérica",
        "name": "Sopa Pollo con Arroz",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 92,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 692,
            "6": 600,
            "12": 563
        },
        "image": "Sopa Pollo con Arroz.webp"
    },
    {
        "id": "p101",
        "brand": "Genérica",
        "name": "Sopa Pollo con Fideos",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 692,
            "6": 600,
            "12": 563
        },
        "image": "Sopa Pollo con Fideos.webp"
    },
    {
        "id": "p102",
        "brand": "Genérica",
        "name": "Sopa Carne con Fideos",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 98,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 692,
            "6": 600,
            "12": 563
        },
        "image": "Sopa Carne con Fideos.webp"
    },
    {
        "id": "p103",
        "brand": "Genérica",
        "name": "Alitas de pollo rebozadas 2k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 70,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 14615,
            "6": 12667,
            "12": 11875
        },
        "image": "Alitas de pollo rebozadas 2k.webp"
    },
    {
        "id": "p104",
        "brand": "Genérica",
        "name": "Nugguet de polllo 3k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 86,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 18677,
            "6": 16187,
            "12": 15175
        },
        "image": "Nugget de pollo 3k.webp"
    },
    {
        "id": "p105",
        "brand": "Smart Price",
        "name": "Aceite vegetal 900 ml Samrt Price",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 93,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2231,
            "6": 1933,
            "12": 1813
        },
        "image": "Aceite vegetal 900ml Smart Price.webp"
    },
    {
        "id": "p106",
        "brand": "Miraflores",
        "name": "Aceite Maravilla 900 ml Miraflores",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 72,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2923,
            "6": 2533,
            "12": 2375
        },
        "image": "Aceite Maravilla 900 ml Miraflores.webp"
    },
    {
        "id": "p107",
        "brand": "Genérica",
        "name": "Muffin relleno ddl x6",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 93,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 6923,
            "6": 6000,
            "12": 5625
        },
        "image": "Muffin relleno ddl x6.webp"
    },
    {
        "id": "p108",
        "brand": "Genérica",
        "name": "Muffin Vainilla con Chips chocolate x6",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 82,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 6923,
            "6": 6000,
            "12": 5625
        },
        "image": "Muffin Vainilla con Chips chocolate x6 (repetido).webp"
    },
    {
        "id": "p109",
        "brand": "Genérica",
        "name": "Muffin Chocolate con Chips de Chocolate x6",
        "category": "liquidos",
        "type": "Líquidos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 6923,
            "6": 6000,
            "12": 5625
        },
        "image": "Muffin Chocolate con Chips de Chocolate x6 (repetido).webp"
    },
    {
        "id": "p110",
        "brand": "Genérica",
        "name": "Medialunas x30 Argentinas",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 7930,
            "6": 6873,
            "12": 6443
        },
        "image": "Medialunas x30 Argentinas.webp"
    },
    {
        "id": "p111",
        "brand": "Genérica",
        "name": "Ketchup Kraf 850g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 95,
        "isOffer": false,
        "isNew": true,
        "prices": {
            "1": 3000,
            "6": 2600,
            "12": 2438
        },
        "image": "Ketchup Kraft 850 g.webp"
    },
    {
        "id": "p112",
        "brand": "Hellmann's",
        "name": "Mayonesa Hellmans 630 g",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 73,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2677,
            "6": 2320,
            "12": 2175
        },
        "image": "Mayonesa Hellmann's 630 g.webp"
    },
    {
        "id": "p113",
        "brand": "Heinz",
        "name": "Mostaza Heinz 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 79,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2754,
            "6": 2387,
            "12": 2238
        },
        "image": "Mostaza Heinz 1k.webp"
    },
    {
        "id": "p114",
        "brand": "Selecta",
        "name": "Harina Selecta con polvo 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 74,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1692,
            "6": 1467,
            "12": 1375
        },
        "image": "Harina Selecta con polvo 1k.webp"
    },
    {
        "id": "p115",
        "brand": "Selecta",
        "name": "Harina Selecta sin Polvo 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 75,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1692,
            "6": 1467,
            "12": 1375
        },
        "image": "Harina Selecta sin polvo 1k.webp"
    },
    {
        "id": "p116",
        "brand": "Mont Blanc",
        "name": "Harina Mont Blanc sin polvo 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 98,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1431,
            "6": 1240,
            "12": 1163
        },
        "image": "Harina Mont Blanc sin polvo 1k.webp"
    },
    {
        "id": "p117",
        "brand": "Mont Blanc",
        "name": "Harina Mont Blanc con polvo 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 83,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1431,
            "6": 1240,
            "12": 1163
        },
        "image": "Harina Mont Blanc con polvo 1k.webp"
    },
    {
        "id": "p118",
        "brand": "Linderos",
        "name": "Harina Linderos  1k sin polvo",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 73,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1077,
            "6": 933,
            "12": 875
        },
        "image": "Harina Linderos  1k sin polvo.webp"
    },
    {
        "id": "p119",
        "brand": "Linderos",
        "name": "Harina Linderos 1k con Polvo",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 90,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 1077,
            "6": 933,
            "12": 875
        },
        "image": "Harina Linderos  1k con polvo.webp"
    },
    {
        "id": "p120",
        "brand": "Nestlé",
        "name": "Manjar Nestle 1k",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 97,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 4923,
            "6": 4267,
            "12": 4000
        },
        "image": "Manjar Nestle 1k.webp"
    },
    {
        "id": "p121",
        "brand": "Super Beef",
        "name": "Hamburguesa 100g x2 super beef",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 96,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1231,
            "6": 1067,
            "12": 1000
        },
        "image": "Hamburguesa 100g x2 super beef.webp"
    },
    {
        "id": "p122",
        "brand": "Mastodonte",
        "name": "Hamburguesa Mastodonte 180g",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 82,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1892,
            "6": 1640,
            "12": 1538
        },
        "image": "Hamburguesa Mastodonte 185g.webp"
    },
    {
        "id": "p123",
        "brand": "King Kong",
        "name": "Hamburguesa King Kong 185",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 90,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 1062,
            "6": 920,
            "12": 863
        },
        "image": "Hamburguesa King Kong 185.webp"
    },
    {
        "id": "p124",
        "brand": "Hacienda",
        "name": "Carne Molida Hacienda",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 85,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 2108,
            "6": 1827,
            "12": 1713
        },
        "image": "Carne Molida Hacienda.webp"
    },
    {
        "id": "p125",
        "brand": "Genérica",
        "name": "Malaya 1k",
        "category": "lacteos",
        "type": "Lácteos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 79,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 15928,
            "6": 13804,
            "12": 12941
        },
        "image": "Malaya 1k.webp"
    },
    {
        "id": "p126",
        "brand": "Sadia",
        "name": "Nugguet de pollo 3k Sadia",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 81,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 18677,
            "6": 16187,
            "12": 15175
        },
        "image": "Nugget de pollo 3k Sadia.webp"
    },
    {
        "id": "p127",
        "brand": "Sadia",
        "name": "Alitas Rebozadas 2k Sadfia",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 97,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 13077,
            "6": 11333,
            "12": 10625
        },
        "image": "Alitas Rebozadas 2k Sadia.webp"
    },
    {
        "id": "p128",
        "brand": "Genérica",
        "name": "Mayonesa Kraft 1,42l",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 83,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 12600,
            "6": 10920,
            "12": 10238
        },
        "image": "Mayonesa Kraft 1,42l.webp"
    },
    {
        "id": "p129",
        "brand": "Genérica",
        "name": "Mayonesa Kraft 650 ml",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 82,
        "isOffer": true,
        "isNew": false,
        "prices": {
            "1": 6538,
            "6": 5667,
            "12": 5313
        },
        "image": "Mayonesa Kraft 650 ml.webp"
    },
    {
        "id": "p130",
        "brand": "Genérica",
        "name": "Mayonesa Kraft 789ml pote",
        "category": "abarrotes",
        "type": "Alimentos",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 79,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 8154,
            "6": 7067,
            "12": 6625
        },
        "image": "Mayonesa Kraft 789ml pote.webp"
    },
    {
        "id": "p131",
        "brand": "La Española",
        "name": "Salchica La Española x 20",
        "category": "limpieza",
        "type": "Limpieza",
        "availability": "stock",
        "clientTypes": [
            "minorista",
            "mayorista"
        ],
        "popularity": 77,
        "isOffer": false,
        "isNew": false,
        "prices": {
            "1": 3384,
            "6": 2933,
            "12": 2750
        },
        "image": "Salchicha La Española x 20.webp"
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
        clientTypes: ['minorista', 'mayorista'],
        productTypes: []
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
    navDropdownCategories: document.getElementById('navDropdownCategories'),
    categoriesDropdown: document.getElementById('categoriesDropdown'),
    categoriesMenuBtn: document.getElementById('categoriesMenuBtn'),
    brandLogo: document.getElementById('brandLogo'),
    navLinkOffers: document.getElementById('navLinkOffers'),
    navLinkNew: document.getElementById('navLinkNew'),
    navLinkHowToBuy: document.getElementById('navLinkHowToBuy'),
    navExtraInfo: document.getElementById('navExtraInfo'),
    adminNavGroup: document.getElementById('adminNavGroup'),
    
    // Mobile Drawer
    mobileDrawer: document.getElementById('mobileDrawer'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileDrawerCloseBtn: document.getElementById('mobileDrawerCloseBtn'),
    drawerOverlay: document.getElementById('drawerOverlay'),
    drawerNavStandard: document.getElementById('drawerNavStandard'),
    drawerNavAdmin: document.getElementById('drawerNavAdmin'),
    
    // Cart elements
    cartDrawer: document.getElementById('cartDrawer'),
    cartTriggerBtn: document.getElementById('cartTriggerBtn'),
    cartDrawerCloseBtn: document.getElementById('cartDrawerCloseBtn'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartBadge: document.getElementById('cartBadge'),
    cartDrawerCount: document.getElementById('cartDrawerCount'),
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

    modalCheckoutSuccess: document.getElementById('modalCheckoutSuccess'),
    successOrderId: document.getElementById('successOrderId'),
    btnCopyOrderId: document.getElementById('btnCopyOrderId'),
    modalProductDetail: document.getElementById('modalProductDetail'),
    btnCloseProductDetail: document.getElementById('btnCloseProductDetail'),

    // --- NEW SEPARATE ADMIN VIEWS DOM ELEMENTS ---
    adminTriggerBtn: document.getElementById('adminTriggerBtn'),
    adminLoginView: document.getElementById('adminLoginView'),
    adminOrdersView: document.getElementById('adminOrdersView'),
    adminSalesView: document.getElementById('adminSalesView'),
    adminConsolidatedView: document.getElementById('adminConsolidatedView'),
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
    
    // Consolidated View DOM elements
    adminConsolidatedTable: document.getElementById('adminConsolidatedTable'),
    consolidatedSearchInput: document.getElementById('consolidatedSearchInput'),
    btnExportConsolidatedExcel: document.getElementById('btnExportConsolidatedExcel'),
    kpiConsolidatedDistinct: document.getElementById('kpiConsolidatedDistinct'),
    kpiConsolidatedTotalUnits: document.getElementById('kpiConsolidatedTotalUnits'),
    kpiConsolidatedTotalRevenue: document.getElementById('kpiConsolidatedTotalRevenue'),
    
    // Navigation bar toggles
    navDropdownCategories: document.getElementById('navDropdownCategories'),
    adminNavGroup: document.getElementById('adminNavGroup'),
    navLinkAdminOrders: document.getElementById('navLinkAdminOrders'),
    navLinkAdminSales: document.getElementById('navLinkAdminSales'),
    navLinkAdminConsolidated: document.getElementById('navLinkAdminConsolidated'),
    btnHeaderAdminLogout: document.getElementById('btnHeaderAdminLogout'),
    navExtraInfo: document.getElementById('navExtraInfo'),
    footerLinkAdmin: document.getElementById('footerLinkAdmin'),
    footerLinkAdminBottom: document.getElementById('footerLinkAdminBottom'),
    footerLinkAdminConsolidado: document.getElementById('footerLinkAdminConsolidado'),
    
    // Mobile Drawer switchers
    drawerNavStandard: document.getElementById('drawerNavStandard'),
    drawerNavAdmin: document.getElementById('drawerNavAdmin'),
    drawerCategoriesBtn: document.getElementById('drawerCategoriesBtn'),
    drawerCategoriesContent: document.getElementById('drawerCategoriesContent'),
    mobileAdminOrdersLink: document.getElementById('mobileAdminOrdersLink'),
    mobileAdminSalesLink: document.getElementById('mobileAdminSalesLink'),
    mobileAdminConsolidatedLink: document.getElementById('mobileAdminConsolidatedLink'),
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

    // Sync database in background on load
    syncDatabaseWithLocal();
}

function initializeOrdersDatabase() {
    const raw = localStorage.getItem('ahorraya_orders');
    let needsReSeed = !raw;
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (parsed.length > 0 && !parsed[0].hasOwnProperty('status')) {
                needsReSeed = true;
            }
        } catch (e) {
            needsReSeed = true;
        }
    }
    
    if (needsReSeed) {
        const seededOrders = MOCK_HISTORICAL_ORDERS.map((o, idx) => {
            let status = 'Entregado';
            if (idx === 0) status = 'En Ruta de Despacho';
            else if (idx === 1) status = 'Procesando Pedido';
            return { ...o, status: status };
        });
        localStorage.setItem('ahorraya_orders', JSON.stringify(seededOrders));
    }
}

function getOrders() {
    try {
        return JSON.parse(localStorage.getItem('ahorraya_orders')) || [];
    } catch (e) {
        return [];
    }
}

// Saves order locally and pushes to PostgreSQL serverless API in background
async function saveOrder(order) {
    // 1. Save locally first for instant checkout feedback
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('ahorraya_orders', JSON.stringify(orders));

    // 2. Post to PostgreSQL securely in background
    try {
        const response = await fetch('/.netlify/functions/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (response.ok) {
            console.log("✅ Order successfully synced to PostgreSQL database.");
        } else {
            console.warn("⚠️ Server rejected order sync. Kept locally.");
        }
    } catch (e) {
        console.warn("⚠️ Failed to sync order to PostgreSQL. Kept locally.", e);
    }
}

// Syncs local storage with PostgreSQL database
async function syncDatabaseWithLocal() {
    try {
        const response = await fetch('/.netlify/functions/orders');
        if (response.ok) {
            const remoteOrders = await response.json();
            if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
                localStorage.setItem('ahorraya_orders', JSON.stringify(remoteOrders));
                console.log("💾 Synchronized with PostgreSQL database successfully.");
            }
        }
    } catch (e) {
        console.warn("⚠️ Database offline or not configured. Using offline local storage.", e);
    }
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
    
    // Mobile drawer categories dropdown toggle
    if (DOM.drawerCategoriesBtn && DOM.drawerCategoriesContent) {
        DOM.drawerCategoriesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const chevron = DOM.drawerCategoriesBtn.querySelector('.dropdown-chevron');
            if (DOM.drawerCategoriesContent.style.display === 'none' || !DOM.drawerCategoriesContent.style.display) {
                DOM.drawerCategoriesContent.style.display = 'flex';
                if (chevron) chevron.style.transform = 'rotate(180deg)';
            } else {
                DOM.drawerCategoriesContent.style.display = 'none';
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        });
    }
    
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
        if (e.target.tagName === 'INPUT' && (e.target.name === 'availability' || e.target.name === 'brand' || e.target.name === 'clientType' || e.target.name === 'categoryFilter' || e.target.name === 'productTypeFilter')) {
            updateActiveFiltersState();
            applyFiltersAndRenderPLP();
        }
    });

    // Sidebar filter groups collapse/expand toggle
    document.querySelectorAll('.filter-group-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.preventDefault();
            const group = header.closest('.filter-group');
            if (group) {
                group.classList.toggle('open');
            }
        });
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
        if (window.selectPaymentMethod) {
            window.selectPaymentMethod('transferencia');
        }
    });
    
    DOM.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitCheckout();
    });

    // Dynamic payment method select cards click events
    const checkPaymentHidden = document.getElementById('checkPayment');
    const confirmBtn = document.getElementById('btnConfirmSendWhatsApp');
    const cardWebpay = document.getElementById('paymentCardWebpay');
    const cardTransferencia = document.getElementById('paymentCardTransferencia');

    window.selectPaymentMethod = function(method) {
        if (!checkPaymentHidden) return;
        checkPaymentHidden.value = method;

        if (method === 'webpay') {
            if (cardWebpay) cardWebpay.classList.add('active');
            if (cardTransferencia) cardTransferencia.classList.remove('active');
            if (confirmBtn) confirmBtn.textContent = 'Pagar de forma segura con Webpay';
        } else {
            if (cardWebpay) cardWebpay.classList.remove('active');
            if (cardTransferencia) cardTransferencia.classList.add('active');
            if (confirmBtn) confirmBtn.textContent = 'Confirmar y Enviar a WhatsApp';
        }
    };

    if (cardWebpay) {
        cardWebpay.addEventListener('click', () => selectPaymentMethod('webpay'));
    }
    if (cardTransferencia) {
        cardTransferencia.addEventListener('click', () => selectPaymentMethod('transferencia'));
    }

    // Set initial state
    if (confirmBtn) {
        confirmBtn.textContent = 'Confirmar y Enviar a WhatsApp';
    }

    document.querySelectorAll('.close-cart-and-browse').forEach(btn => {
        btn.addEventListener('click', () => {
            closeCartDrawer();
            navigateToView('plp', { category: 'all' });
        });
    });

    // Dynamic Tracking Order Lookup Database
    DOM.btnTrackOrder.addEventListener('click', () => {
        const orderId = sanitizeInput(DOM.trackingInput.value).trim();
        if (!orderId) return;
        
        DOM.trackingResult.style.display = 'block';
        const orders = getOrders();
        const order = orders.find(o => o.id.toUpperCase() === orderId.toUpperCase());
        
        if (order) {
            DOM.trackingResult.className = 'tracking-result-box';
            
            const deliveryLabel = order.method === 'retiro' ? 'Retiro en Sala de Ventas Recoleta' : 'Despacho a Domicilio';
            const statusLabel = order.status || 'Recibido (Pendiente de Pago)';
            
            let statusEmoji = '⏳';
            if (statusLabel.includes('Ruta')) statusEmoji = '🚚';
            else if (statusLabel.includes('Entregado')) statusEmoji = '✅';
            else if (statusLabel.includes('Procesando')) statusEmoji = '⚙️';
            
            const customerName = (order.customer && order.customer.name) ? order.customer.name : 'Cliente Sin Nombre';
            const customerAddress = (order.customer && order.customer.address) ? order.customer.address : 'Sin Dirección';
            DOM.trackingResult.innerHTML = `
                <p style="margin-bottom: 8px;">📦 <strong>Código de Pedido:</strong> ${order.id}</p>
                <p style="margin-bottom: 8px;">👤 <strong>Cliente:</strong> ${sanitizeInput(customerName)}</p>
                <p style="margin-bottom: 8px;">📍 <strong>Dirección:</strong> ${sanitizeInput(customerAddress)}</p>
                <p style="margin-bottom: 8px;">🚚 <strong>Método:</strong> ${deliveryLabel}</p>
                <p style="margin-bottom: 8px;">💰 <strong>Monto Total:</strong> $${formatNumber(order.total || 0)}</p>
                <p style="margin-top: 12px; padding: 12px; background-color: var(--color-bg-light); border-left: 4px solid var(--color-primary); border-radius: var(--border-radius); font-weight: 700;">
                    Estado Actual: ${statusEmoji} ${statusLabel}
                </p>
            `;
        } else {
            DOM.trackingResult.className = 'tracking-result-box error';
            DOM.trackingResult.innerHTML = `
                <p>❌ Código no encontrado. Por favor, ingresa el código exacto (Ej: AY-10492-2026).</p>
            `;
        }
    });

    // Copy Order ID Clipboard Micro-interaction
    const btnCopyOrderId = document.getElementById('btnCopyOrderId');
    if (btnCopyOrderId) {
        btnCopyOrderId.addEventListener('click', () => {
            const orderIdText = DOM.successOrderId.textContent.trim();
            navigator.clipboard.writeText(orderIdText).then(() => {
                const prevHtml = btnCopyOrderId.innerHTML;
                btnCopyOrderId.innerHTML = '✅ ¡Copiado!';
                btnCopyOrderId.style.borderColor = 'var(--color-success)';
                btnCopyOrderId.style.color = 'var(--color-success)';
                setTimeout(() => {
                    btnCopyOrderId.innerHTML = prevHtml;
                    btnCopyOrderId.style.borderColor = '';
                    btnCopyOrderId.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

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
    
    // Header Lock button click (if present)
    if (DOM.adminTriggerBtn) {
        DOM.adminTriggerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleAdminRoute();
        });
    }

    // Footer bottom admin link click (if present)
    if (DOM.footerLinkAdminBottom) {
        DOM.footerLinkAdminBottom.addEventListener('click', (e) => {
            e.preventDefault();
            handleAdminRoute();
        });
    }

    // Footer admin button click
    if (DOM.footerLinkAdmin) {
        DOM.footerLinkAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            handleAdminRoute();
        });
    }

    // Footer admin ventas link click
    const footerLinkAdminVentas = document.getElementById('footerLinkAdminVentas');
    if (footerLinkAdminVentas) {
        footerLinkAdminVentas.addEventListener('click', (e) => {
            e.preventDefault();
            handleAdminRoute();
        });
    }

    // Footer admin consolidado link click
    if (DOM.footerLinkAdminConsolidado) {
        DOM.footerLinkAdminConsolidado.addEventListener('click', (e) => {
            e.preventDefault();
            handleAdminRoute('admin-consolidated');
        });
    }

    if (DOM.mobileAdminLoginLink) {
        DOM.mobileAdminLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            handleAdminRoute();
        });
    }

    // Login Form Submit validation
    if (DOM.adminLoginForm) {
        DOM.adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = DOM.adminUserField.value.trim();
            const password = DOM.adminPassField.value;

            if (username === 'ahorraya' && password === '1234567') {
                sessionStorage.setItem('ahorraya_admin_logged_in', 'true');
                sessionStorage.setItem('ahorraya_admin_user', username);
                
                // Clean forms
                if (DOM.adminUserField) DOM.adminUserField.value = '';
                if (DOM.adminPassField) DOM.adminPassField.value = '';
                if (DOM.loginErrorMsg) DOM.loginErrorMsg.style.display = 'none';
                
                // Toggle menu tabs and navigate
                updateNavigationUI();
                const targetView = STATE.pendingAdminView || 'admin-orders';
                STATE.pendingAdminView = null;
                navigateToView(targetView);
            } else {
                if (DOM.loginErrorMsg) DOM.loginErrorMsg.style.display = 'block';
                if (DOM.adminPassField) DOM.adminPassField.value = '';
            }
        });
    }

    // Back to shop button in login
    if (DOM.adminLoginView) {
        const btnBackHome = DOM.adminLoginView.querySelector('.btn-back-home');
        if (btnBackHome) {
            btnBackHome.addEventListener('click', () => {
                navigateToView('home');
            });
        }
    }

    // Logout actions
    const logoutActions = [];
    if (DOM.btnHeaderAdminLogout) logoutActions.push(DOM.btnHeaderAdminLogout);
    if (DOM.mobileAdminLogoutLink) logoutActions.push(DOM.mobileAdminLogoutLink);
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
    if (DOM.navLinkAdminOrders) {
        DOM.navLinkAdminOrders.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToView('admin-orders');
        });
    }
    if (DOM.navLinkAdminSales) {
        DOM.navLinkAdminSales.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToView('admin-sales');
        });
    }
    if (DOM.navLinkAdminConsolidated) {
        DOM.navLinkAdminConsolidated.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToView('admin-consolidated');
        });
    }

    // Separate views mobile drawer clicks
    if (DOM.mobileAdminOrdersLink) {
        DOM.mobileAdminOrdersLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            navigateToView('admin-orders');
        });
    }
    if (DOM.mobileAdminSalesLink) {
        DOM.mobileAdminSalesLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            navigateToView('admin-sales');
        });
    }
    if (DOM.mobileAdminConsolidatedLink) {
        DOM.mobileAdminConsolidatedLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            navigateToView('admin-consolidated');
        });
    }

    // Search input listener for consolidated view
    if (DOM.consolidatedSearchInput) {
        DOM.consolidatedSearchInput.addEventListener('input', () => {
            renderAdminConsolidatedDashboard();
        });
    }

    // Export Excel Button for consolidated view
    if (DOM.btnExportConsolidatedExcel) {
        DOM.btnExportConsolidatedExcel.addEventListener('click', () => {
            exportConsolidatedToCSV();
        });
    }

    // Admin Sales Period Buttons
    if (DOM.adminSalesView) {
        DOM.adminSalesView.querySelectorAll('.btn-period').forEach(btn => {
            btn.addEventListener('click', () => {
                DOM.adminSalesView.querySelectorAll('.btn-period').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                STATE.adminPeriod = btn.getAttribute('data-period');
                renderAdminSalesDashboard();
            });
        });
    }

    // Export Excel Button
    if (DOM.btnExportExcel) {
        DOM.btnExportExcel.addEventListener('click', () => {
            exportSalesToCSV();
        });
    }

    // Orders detailed overlay viewer button
    if (DOM.adminOrdersTable) {
        DOM.adminOrdersTable.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('.btn-view-order');
            if (viewBtn) {
                const orderId = viewBtn.getAttribute('data-order-id');
                openOrderDetailModal(orderId);
            }
        });
    }

    // Video Sound Mute/Unmute Toggle
    const soundToggleBtn = document.getElementById('videoSoundToggle');
    const soundToggleIcon = document.getElementById('soundToggleIcon');
    const carouselVideo = document.querySelector('.carousel-video');

    if (soundToggleBtn && carouselVideo) {
        soundToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isMuted = carouselVideo.muted;
            carouselVideo.muted = !isMuted;
            
            if (carouselVideo.muted) {
                soundToggleBtn.setAttribute('aria-label', 'Activar Sonido');
                soundToggleIcon.innerHTML = `<path d="M3.27,3L2,4.27L7.73,10H3V16H7L12,21V14.27L16.25,18.53C15.58,19.04 14.83,19.46 14,19.7V21.77C15.38,21.44 16.63,20.78 17.68,18.95L20.73,22L22,20.73L4.27,3M14,3.23V5.29C14.93,5.57 15.79,6.06 16.55,6.7L15.06,8.19C14.57,7.88 14.05,7.63 13.5,7.47M16.5,12C16.5,11.23 16.19,10.54 15.69,10.03L17.18,8.54C18.04,9.45 18.5,10.67 18.5,12c0,1.25-.41,2.4-1.12,3.33L15.89,13.84C16.27,13.33 16.5,12.7 16.5,12Z"/>`;
            } else {
                soundToggleBtn.setAttribute('aria-label', 'Desactivar Sonido');
                soundToggleIcon.innerHTML = `<path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.77 16.5,12M3,9H7L12,4V20L7,15H3V9Z"/>`;
            }
        });
    }

    // Mobile PLP Filter Sidebar Toggle
    const mobileFilterTrigger = document.getElementById('mobileFilterTrigger');
    const plpSidebar = document.getElementById('plpSidebar');
    if (mobileFilterTrigger && plpSidebar) {
        mobileFilterTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            plpSidebar.classList.toggle('open');
            if (plpSidebar.classList.contains('open')) {
                mobileFilterTrigger.innerHTML = '❌ Cerrar Filtros';
                mobileFilterTrigger.style.backgroundColor = 'var(--color-secondary)';
                mobileFilterTrigger.style.color = 'white';
            } else {
                mobileFilterTrigger.innerHTML = '🔍 Filtrar y Marcas';
                mobileFilterTrigger.style.backgroundColor = '';
                mobileFilterTrigger.style.color = '';
            }
        });
    }

    // Auto-unmute on first user interaction to help sound play naturally
    const unmuteOnInteract = () => {
        if (carouselVideo && carouselVideo.muted) {
            carouselVideo.muted = false;
            if (soundToggleBtn && soundToggleIcon) {
                soundToggleBtn.setAttribute('aria-label', 'Desactivar Sonido');
                soundToggleIcon.innerHTML = `<path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.77 16.5,12M3,9H7L12,4V20L7,15H3V9Z"/>`;
            }
        }
    };
    document.body.addEventListener('click', unmuteOnInteract, { once: true });
}

// Redirects to correct Admin section based on auth state
function handleAdminRoute(targetView = 'admin-orders') {
    const isLoggedIn = sessionStorage.getItem('ahorraya_admin_logged_in') === 'true';
    if (isLoggedIn) {
        navigateToView(targetView);
    } else {
        STATE.pendingAdminView = targetView;
        navigateToView('admin-login');
    }
}

// Helper to map category slugs to human-readable titles
function getCategoryLabel(category) {
    const labels = {
        'abarrotes': 'Abarrotes Básicos',
        'liquidos': 'Bebidas y Líquidos',
        'limpieza': 'Limpieza e Higiene',
        'lacteos': 'Lácteos y Fiambrería',
        'conservas': 'Conservas y Salsas'
    };
    return labels[category] || category;
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
    if (DOM.adminConsolidatedView) DOM.adminConsolidatedView.classList.remove('active');
    
    // Reset standard links active state
    DOM.navLinkOffers.classList.remove('active');
    DOM.navLinkNew.classList.remove('active');

    // Reset admin header links active state
    DOM.navLinkAdminOrders.classList.remove('active');
    DOM.navLinkAdminSales.classList.remove('active');
    if (DOM.navLinkAdminConsolidated) DOM.navLinkAdminConsolidated.classList.remove('active');

    // Scroll to top unless we are scrolling to a specific product
    if (!options.scrollToProduct) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (viewName === 'home') {
        DOM.homeView.classList.add('active');
        STATE.activeCategory = 'all';
    } 
    else if (viewName === 'plp') {
        DOM.plpView.classList.add('active');
        resetFilterCheckboxes();
        
        // Collapse all sidebar filter groups on opening the PLP
        document.querySelectorAll('.filter-group').forEach(group => {
            group.classList.remove('open');
        });
        
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
            DOM.plpTitle.textContent = 'Ofertas de la Semana';
            DOM.navLinkOffers.classList.add('active');
            STATE.activeCategory = 'offers';
        } 
        else if (options.filter === 'new') {
            DOM.plpTitle.textContent = 'Nuevos Productos Mayoristas';
            DOM.navLinkNew.classList.add('active');
            STATE.activeCategory = 'new';
        } 
        else if (options.search) {
            DOM.plpTitle.textContent = `Resultados de Búsqueda: "${options.search}"`;
            STATE.activeCategory = 'search';
        }
        
        updateActiveFiltersState();
        applyFiltersAndRenderPLP();

        if (options.scrollToProduct) {
            setTimeout(() => {
                const cardEl = document.getElementById(`card-${options.scrollToProduct}`);
                if (cardEl) {
                    cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    cardEl.classList.add('highlight-flash');
                    setTimeout(() => {
                        cardEl.classList.remove('highlight-flash');
                    }, 2600);
                }
            }, 100);
        }
    }
    else if (viewName === 'admin-login') {
        DOM.adminLoginView.classList.add('active');
    }
    else if (viewName === 'admin-orders') {
        DOM.adminOrdersView.classList.add('active');
        DOM.navLinkAdminOrders.classList.add('active');
        calculateKPIs();
        renderAdminOrdersTable();
        
        // Sync in background, then recalculate & re-render to display the absolute latest database state
        syncDatabaseWithLocal().then(() => {
            calculateKPIs();
            renderAdminOrdersTable();
        });
    }
    else if (viewName === 'admin-sales') {
        DOM.adminSalesView.classList.add('active');
        DOM.navLinkAdminSales.classList.add('active');
        calculateKPIs();
        renderAdminSalesDashboard();
        
        // Sync in background, then recalculate & re-render to display the absolute latest database state
        syncDatabaseWithLocal().then(() => {
            calculateKPIs();
            renderAdminSalesDashboard();
        });
    }
    else if (viewName === 'admin-consolidated') {
        if (DOM.adminConsolidatedView) DOM.adminConsolidatedView.classList.add('active');
        if (DOM.navLinkAdminConsolidated) DOM.navLinkAdminConsolidated.classList.add('active');
        calculateKPIs();
        renderAdminConsolidatedDashboard();
        
        // Sync in background, then recalculate & re-render to display the absolute latest database state
        syncDatabaseWithLocal().then(() => {
            calculateKPIs();
            renderAdminConsolidatedDashboard();
        });
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
function createProductCardHTML(product, isHome = false) {
    const priceUnit1 = product.prices[1];
    const bestPrice = isHome ? (product.prices[12] || product.prices[6] || priceUnit1) : priceUnit1;
    const bestTierQty = product.prices[12] ? 12 : (product.prices[6] ? 6 : 1);
    const unitSavings = priceUnit1 - bestPrice;
    const pctSavings = unitSavings > 0 ? Math.round((unitSavings / priceUnit1) * 100) : 0;
    const totalBoxSavings = unitSavings * bestTierQty;

    // In Home, remove the "A Pedido" and "Nuevo" badges (keep "Oferta" and show savings badge)
    const avBadge = (!isHome && product.availability === 'order')
        ? `<span class="badge badge-new" style="background-color: var(--color-primary-light); color: white;">📦 A Pedido</span>` 
        : '';
    const saleBadge = product.isOffer ? `<span class="badge badge-sale">🔥 Oferta</span>` : '';
    const savingsBadge = (isHome && pctSavings > 0) 
        ? `<span class="badge badge-sale" style="background-color: var(--color-success); color: white; font-weight: 700;">🔥 ¡Ahorras ${pctSavings}%!</span>` 
        : '';
    const newBadge = (!isHome && product.isNew) ? `<span class="badge badge-new">✨ Nuevo</span>` : '';

    const bodyContent = isHome ? `
        <span class="product-brand">${sanitizeInput(product.brand)}</span>
        <h3 class="product-desc" title="${sanitizeInput(product.name)}">${sanitizeInput(product.name)}</h3>
        
        <div class="price-display-wrapper">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-primary-dark); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
                ⭐ Mejor Precio x ${bestTierQty} u.
            </div>
            <div class="price-unit-row">
                <span class="price-value" data-unit-price="${bestPrice}">$${formatNumber(bestPrice)}</span>
                <span class="price-subtext">por unidad</span>
            </div>
            ${unitSavings > 0 ? `
            <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 2px; display: flex; align-items: center; gap: 6px;">
                <span>Normal 1 u: <span style="text-decoration: line-through;">$${formatNumber(priceUnit1)}</span></span>
            </div>
            <div class="price-bulk-saving" style="margin-top: 6px; padding: 4px 8px; background-color: rgba(40, 167, 69, 0.1); border-left: 3px solid var(--color-success); border-radius: 4px; font-size: 0.78rem; color: #1e7e34; font-weight: 700;">
                💡 Ahorras $${formatNumber(unitSavings)} c/u ($${formatNumber(totalBoxSavings)} por ${bestTierQty} u.)
            </div>
            ` : ''}
        </div>
    ` : `
        <span class="product-brand">${sanitizeInput(product.brand)}</span>
        <h3 class="product-desc" title="${sanitizeInput(product.name)}">${sanitizeInput(product.name)}</h3>
        
        <div class="pricing-tiers-tab" role="tablist">
            <button class="tier-btn active" data-tier="1" role="tab" aria-selected="true">1 u.</button>
            <button class="tier-btn" data-tier="6" role="tab" aria-selected="false">6 u.</button>
            <button class="tier-btn" data-tier="12" role="tab" aria-selected="false">12 u.+</button>
        </div>
        
        <div class="price-display-wrapper">
            <div class="price-unit-row">
                <span class="price-value" data-unit-price="${priceUnit1}">$${formatNumber(priceUnit1)}</span>
                <span class="price-subtext">por unidad</span>
            </div>
            <div class="price-total-row">
                <span>Total: <strong class="total-amount">$${formatNumber(priceUnit1)}</strong></span>
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
    `;

    return `
        <div class="product-card ${isHome ? 'simplified-home-card' : ''}" data-product-id="${product.id}" id="card-${product.id}">
            <div class="product-badge-container">
                ${saleBadge}
                ${savingsBadge}
                ${newBadge}
                ${avBadge}
            </div>
            
            <div class="product-img-wrapper">
                <img src="productos/${product.image}" alt="${sanitizeInput(product.name)}" class="product-img" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="svg-fallback" style="display: none; width: 100%; height: 100%;">
                    ${getProductSvg(product.category, product.name)}
                </div>
            </div>
            
            <div class="product-card-body">
                ${bodyContent}
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
    DOM.offersGrid.innerHTML = offers.map(p => createProductCardHTML(p, true)).join('');
    
    const abarrotes = PRODUCTS.filter(p => p.category === 'abarrotes').slice(0, 4);
    DOM.abarrotesGrid.innerHTML = abarrotes.map(p => createProductCardHTML(p, true)).join('');

    const limpieza = PRODUCTS.filter(p => p.category === 'limpieza').slice(0, 4);
    DOM.limpiezaGrid.innerHTML = limpieza.map(p => createProductCardHTML(p, true)).join('');

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
        
        // If it's a simplified Home card, bind redirect behavior to the entire card and return early
        if (card.classList.contains('simplified-home-card')) {
            card.addEventListener('click', (e) => {
                let cat = null;
                let filter = null;
                if (container === DOM.offersGrid) {
                    filter = 'offers';
                } else if (container === DOM.abarrotesGrid) {
                    cat = 'abarrotes';
                } else if (container === DOM.limpiezaGrid) {
                    cat = 'limpieza';
                } else {
                    cat = product.category;
                }
                navigateToView('plp', { category: cat, filter: filter, scrollToProduct: productId });
            });
            return;
        }

        // Bind modal behavior to specific element clicks (image, brand, description) if it is on the PLP (Catalog) page
        const isPlpContainer = (container === DOM.plpGrid);
        if (isPlpContainer) {
            const detailTargets = card.querySelectorAll('.product-img-wrapper, .product-brand, .product-desc');
            detailTargets.forEach(el => {
                el.style.cursor = 'pointer';
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    openProductDetailModal(product);
                });
            });
        }

        const tierButtons = card.querySelectorAll('.tier-btn');
        const qtyInput = card.querySelector('.qty-input');
        const plusBtn = card.querySelector('.qty-btn.plus');
        const minusBtn = card.querySelector('.qty-btn.minus');
        const unitPriceLabel = card.querySelector('.price-value');
        const totalPriceLabel = card.querySelector('.total-amount');
        const addBtn = card.querySelector('.add-cart-btn');

        const getTierPrice = (qty) => {
            if (qty >= 12) return product.prices[12];
            if (qty >= 6) return product.prices[6];
            return product.prices[1];
        };

        const updatePrices = (qty) => {
            const unitPrice = getTierPrice(qty);
            const total = unitPrice * qty;
            
            unitPriceLabel.textContent = `$${formatNumber(unitPrice)}`;
            unitPriceLabel.setAttribute('data-unit-price', unitPrice);
            totalPriceLabel.textContent = `$${formatNumber(total)}`;
            
            let activeTier = 1;
            if (qty >= 12) activeTier = 12;
            else if (qty >= 6) activeTier = 6;

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
            cb.checked = true; // Check both stock and order to ensure all items are visible
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
    STATE.activeFilters.productTypes = getCheckedValues('productTypeFilter');
    
    const catCheckboxes = getCheckedValues('categoryFilter');
    if (catCheckboxes.length > 0) {
        STATE.activeFilters.categories = catCheckboxes;
        STATE.activeCategory = 'filters';
    } else {
        STATE.activeFilters.categories = [];
    }

    if (STATE.activeFilters.productTypes.length > 0) {
        STATE.activeCategory = 'filters';
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

    if (STATE.activeFilters.productTypes && STATE.activeFilters.productTypes.length > 0) {
        filteredList = filteredList.filter(p => STATE.activeFilters.productTypes.includes(p.type));
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
        DOM.plpGrid.innerHTML = filteredList.map(p => createProductCardHTML(p, false)).join('');
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
        
        if (item.quantity >= 12) unitWholesalePrice = product.prices[12];
        else if (item.quantity >= 6) unitWholesalePrice = product.prices[6];
        
        const rowTotal = unitWholesalePrice * item.quantity;
        subtotalNormal += (unitDetailPrice * item.quantity);
        subtotalWholesale += rowTotal;

        return `
            <div class="cart-row" data-product-id="${product.id}">
                <img src="productos/${product.image}" alt="${sanitizeInput(product.name)}" class="cart-row-img">
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

// 15. SECURE CHECKOUT SUBMIT
async function submitCheckout() {
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

    const submitBtn = document.getElementById('btnConfirmSendWhatsApp');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Procesando tu pedido...';
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

        if (item.quantity >= 12) {
            unitActivePrice = product.prices[12];
            formatType = 'Gran Mayor';
        } else if (item.quantity >= 6) {
            unitActivePrice = product.prices[6];
            formatType = 'Packs';
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

    const deliveryText = methodVal === 'retiro' ? 'Retiro en Sala de Ventas Recoleta' : 'Despacho a Domicilio';
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
        total: finalBill,
        status: paymentVal === 'webpay' ? 'Pendiente de Pago (WebPay)' : 'Recibido (Pendiente de Pago)'
    };
    try {
        await saveOrder(newOrderObj);
    } catch (dbErr) {
        console.warn("Postgres save failed, proceeding anyway", dbErr);
    }

    if (paymentVal === 'transferencia') {
        let msg = `=================================\n`;
        msg += `          *AHORRAYA! CHILE*        \n`;
        msg += `      *VALE DE COMPRA / PEDIDO*     \n`;
        msg += `=================================\n\n`;
        msg += `🧾 *Orden ID:* ${orderId}\n`;
        msg += `📅 *Fecha:* ${new Date().toLocaleDateString('es-CL')}\n\n`;
        
        msg += `---------------------------------\n`;
        msg += `👤 *DATOS DEL CLIENTE:*\n`;
        msg += `• *Nombre:* ${name}\n`;
        msg += `• *RUT:* ${rut}\n`;
        msg += `• *Teléfono:* ${phone}\n`;
        msg += `• *Email:* ${email}\n`;
        msg += `• *Dirección:* ${address}\n`;
        msg += `---------------------------------\n\n`;

        msg += `📦 *DETALLE DE PRODUCTOS:*\n`;
        msg += `${itemsText}\n`;
        msg += `---------------------------------\n`;
        
        msg += `💵 *RESUMEN DE CUENTA:*\n`;
        msg += `• *Subtotal:* $${formatNumber(totalDiscountedValue)}\n`;
        msg += `• *Envío (${deliveryText}):* ${shippingCost === 0 ? 'Gratis' : `$${formatNumber(shippingCost)}`}\n`;
        msg += `• *Medio de Pago:* Transferencia Bancaria\n`;
        msg += `• *TOTAL A PAGAR:* *$${formatNumber(finalBill)}*\n`;
        
        if (savings > 0) {
            msg += `• *Ahorro por Mayor:* $${formatNumber(savings)}\n`;
        }
        msg += `---------------------------------\n\n`;
        
        msg += `💬 *MENSAJE AL EJECUTIVO:*\n`;
        msg += `_Hola, este es mi vale de pedido. Favor facilitarme los datos de transferencia bancaria para concretar mi pago y confirmar el despacho._\n`;
        msg += `=================================`;

        const encodedText = encodeURIComponent(msg);
        const whatsappUrl = `https://wa.me/56951496392?text=${encodedText}`;

        STATE.cart = [];
        saveCartToStorage();
        updateCartUI();

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }

        DOM.successOrderId.textContent = orderId;
        
        const btnGo = document.getElementById('btnGoToWhatsappSuccess');
        if (btnGo) {
            btnGo.href = whatsappUrl;
        }

        closeModal(DOM.modalCheckout);
        openModal(DOM.modalCheckoutSuccess);
        
        // Redirect tab to trigger WhatsApp directly (popup blocker proof)
        window.location.href = whatsappUrl;
    } else if (paymentVal === 'webpay') {
        try {
            if (submitBtn) {
                submitBtn.textContent = 'Conectando con Transbank...';
            }
            const res = await fetch('/.netlify/functions/webpay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'create',
                    orderId: orderId,
                    amount: finalBill
                })
            });

            const resData = await res.json();

            if (res.ok && resData.token && resData.url) {
                STATE.cart = [];
                saveCartToStorage();
                updateCartUI();

                const form = document.createElement('form');
                form.method = 'POST';
                form.action = resData.url;
                
                const inputToken = document.createElement('input');
                inputToken.type = 'hidden';
                inputToken.name = 'token_ws';
                inputToken.value = resData.token;
                
                form.appendChild(inputToken);
                document.body.appendChild(form);
                form.submit();
            } else {
                throw new Error(resData.error || 'Respuesta inválida del servidor');
            }
        } catch (err) {
            console.error('Webpay initialization error:', err);
            alert("No pudimos conectar con Webpay. Por favor, selecciona Pago con Transferencia.");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        }
    }
}


// ==========================================================================
// --- NEW FEATURES: ADMIN PORTAL PORTLET LOGIC (SEPARATE VIEWS ENGINE) ---
// ==========================================================================

// Calculates and sets KPI Metric widgets across all active displays
function calculateKPIs() {
    const orders = getOrders() || [];
    let revenueSum = 0;
    
    orders.forEach(order => {
        if (order && typeof order.total === 'number') {
            revenueSum += order.total;
        } else if (order && order.total) {
            const parsed = Number(order.total);
            if (!isNaN(parsed)) revenueSum += parsed;
        }
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
    const orders = getOrders() || [];
    const tbody = DOM.adminOrdersTable.querySelector('tbody');
    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted);">No hay pedidos registrados en el sistema.</td></tr>`;
        return;
    }

    const rowsHTML = orders.map(order => {
        const orderDateStr = formatDateString(order.date);
        const customerName = (order.customer && order.customer.name) ? order.customer.name : 'Cliente Sin Nombre';
        const customerRut = (order.customer && order.customer.rut) ? order.customer.rut : 'Sin RUT';
        const nameShort = customerName.length > 25 ? customerName.substring(0, 22) + '...' : customerName;
        const methodBadge = order.method === 'retiro' 
            ? `<span class="order-badge-status success">Retiro</span>` 
            : `<span class="order-badge-status pending">Despacho</span>`;

        return `
            <tr>
                <td>${orderDateStr}</td>
                <td><strong>${order.id || 'Sin ID'}</strong></td>
                <td title="${sanitizeInput(customerName)}">${sanitizeInput(nameShort)}</td>
                <td>${sanitizeInput(customerRut)}</td>
                <td>${methodBadge}</td>
                <td><strong>$${formatNumber(order.total || 0)}</strong></td>
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

    document.getElementById('detId').textContent = order.id || '';
    document.getElementById('detDate').textContent = formatDateString(order.date);
    document.getElementById('detName').textContent = (order.customer && order.customer.name) ? order.customer.name : 'Cliente Sin Nombre';
    document.getElementById('detRut').textContent = (order.customer && order.customer.rut) ? order.customer.rut : 'Sin RUT';
    document.getElementById('detPhone').textContent = (order.customer && order.customer.phone) ? order.customer.phone : 'Sin Teléfono';
    document.getElementById('detEmail').textContent = (order.customer && order.customer.email) ? order.customer.email : 'Sin Email';
    document.getElementById('detAddress').textContent = (order.customer && order.customer.address) ? order.customer.address : 'Sin Dirección';
    document.getElementById('detMethod').textContent = order.method === 'retiro' ? 'Retiro en Sala de Ventas Recoleta' : 'Despacho a Domicilio';
    document.getElementById('detPayment').textContent = order.payment ? order.payment.toUpperCase() : 'TRANSFERENCIA';
    document.getElementById('detTotal').textContent = `$${formatNumber(order.total || 0)}`;

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
        const id = order.id || 'Sin ID';
        const client = (order.customer && order.customer.name) ? order.customer.name.replace(/;/g, ',') : 'Cliente Sin Nombre';
        const rut = (order.customer && order.customer.rut) ? order.customer.rut.replace(/;/g, ',') : 'Sin RUT';
        const email = (order.customer && order.customer.email) ? order.customer.email.replace(/;/g, ',') : 'Sin Email';
        const phone = (order.customer && order.customer.phone) ? order.customer.phone.replace(/;/g, ',') : 'Sin Telefono';
        const address = (order.customer && order.customer.address) ? order.customer.address.replace(/;/g, ',') : 'Sin Direccion';
        const method = order.method === 'retiro' ? 'Retiro Recoleta' : 'Despacho Domicilio';
        const payment = order.payment ? order.payment.toUpperCase() : 'TRANSFERENCIA';
        const shipCost = order.shippingCost || 0;
        const total = order.total || 0;

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

// 18. CONSOLIDATED PRODUCTS ENGINE
function renderAdminConsolidatedDashboard() {
    const orders = getOrders() || [];
    if (!DOM.adminConsolidatedTable) return;
    const tbody = DOM.adminConsolidatedTable.querySelector('tbody');
    if (!tbody) return;

    const summaryMap = {};

    // Seed catalog products
    PRODUCTS.forEach(p => {
        summaryMap[p.id] = {
            id: p.id,
            brand: p.brand || 'Genérico',
            name: p.name,
            category: getCategoryLabel(p.category),
            totalQuantity: 0,
            totalRevenue: 0,
            orderIds: new Set()
        };
    });

    // Accumulate orders
    orders.forEach(order => {
        if (!order.items || !Array.isArray(order.items)) return;
        order.items.forEach(item => {
            const pKey = item.productId || item.name;
            if (!summaryMap[pKey]) {
                const catalogProd = PRODUCTS.find(p => p.id === item.productId || p.name === item.name);
                summaryMap[pKey] = {
                    id: pKey,
                    brand: (catalogProd && catalogProd.brand) || item.brand || 'Genérico',
                    name: (catalogProd && catalogProd.name) || item.name || 'Producto',
                    category: (catalogProd && catalogProd.category) ? getCategoryLabel(catalogProd.category) : (item.category || 'General'),
                    totalQuantity: 0,
                    totalRevenue: 0,
                    orderIds: new Set()
                };
            }
            const qty = Number(item.quantity) || 0;
            const unitPrice = Number(item.unitPrice) || 0;
            summaryMap[pKey].totalQuantity += qty;
            summaryMap[pKey].totalRevenue += (qty * unitPrice);
            if (order.id) {
                summaryMap[pKey].orderIds.add(order.id);
            }
        });
    });

    let itemsArray = Object.values(summaryMap);

    // Apply search filter if query entered
    const searchVal = DOM.consolidatedSearchInput ? DOM.consolidatedSearchInput.value.trim().toLowerCase() : '';
    if (searchVal) {
        itemsArray = itemsArray.filter(item => 
            item.name.toLowerCase().includes(searchVal) || 
            item.brand.toLowerCase().includes(searchVal) ||
            item.category.toLowerCase().includes(searchVal)
        );
    }

    // Sort items: products with demand first (quantity desc, revenue desc), then name asc
    itemsArray.sort((a, b) => {
        if (b.totalQuantity !== a.totalQuantity) {
            return b.totalQuantity - a.totalQuantity;
        }
        if (b.totalRevenue !== a.totalRevenue) {
            return b.totalRevenue - a.totalRevenue;
        }
        return a.name.localeCompare(b.name);
    });

    // Compute metrics for KPIs
    let distinctProductsSold = 0;
    let globalTotalUnits = 0;
    let globalTotalRevenue = 0;

    Object.values(summaryMap).forEach(item => {
        if (item.totalQuantity > 0) {
            distinctProductsSold++;
            globalTotalUnits += item.totalQuantity;
            globalTotalRevenue += item.totalRevenue;
        }
    });

    if (DOM.kpiConsolidatedDistinct) DOM.kpiConsolidatedDistinct.textContent = formatNumber(distinctProductsSold);
    if (DOM.kpiConsolidatedTotalUnits) DOM.kpiConsolidatedTotalUnits.textContent = formatNumber(globalTotalUnits);
    if (DOM.kpiConsolidatedTotalRevenue) DOM.kpiConsolidatedTotalRevenue.textContent = `$${formatNumber(globalTotalRevenue)}`;

    if (itemsArray.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted);">No se encontraron productos que coincidan con la búsqueda.</td></tr>`;
        return;
    }

    const rowsHTML = itemsArray.map(item => {
        const orderCount = item.orderIds.size;
        
        let cajasApprox = '-';
        if (item.totalQuantity > 0) {
            const numCajas = Math.floor(item.totalQuantity / 12);
            const restUnidades = item.totalQuantity % 12;
            if (numCajas > 0 && restUnidades > 0) {
                cajasApprox = `${numCajas} cj + ${restUnidades} un.`;
            } else if (numCajas > 0) {
                cajasApprox = `${numCajas} cj`;
            } else {
                cajasApprox = `${item.totalQuantity} un.`;
            }
        }

        const badgeSales = item.totalQuantity > 0 
            ? `<span class="order-badge-status success">${formatNumber(item.totalQuantity)} un.</span>` 
            : `<span class="order-badge-status pending" style="background-color: #f1f5f9; color: #64748b;">Sin pedidos</span>`;

        return `
            <tr>
                <td><strong>${sanitizeInput(item.brand)}</strong></td>
                <td>${sanitizeInput(item.name)}</td>
                <td><span class="category-tag">${sanitizeInput(item.category)}</span></td>
                <td>${badgeSales}</td>
                <td>${cajasApprox}</td>
                <td><strong>${orderCount}</strong> ${orderCount === 1 ? 'pedido' : 'pedidos'}</td>
                <td><strong>$${formatNumber(item.totalRevenue)}</strong></td>
            </tr>
        `;
    }).join('');

    tbody.innerHTML = rowsHTML;
}

function exportConsolidatedToCSV() {
    const orders = getOrders() || [];
    const summaryMap = {};

    PRODUCTS.forEach(p => {
        summaryMap[p.id] = {
            id: p.id,
            brand: p.brand || 'Genérico',
            name: p.name,
            category: getCategoryLabel(p.category),
            totalQuantity: 0,
            totalRevenue: 0,
            orderIds: new Set()
        };
    });

    orders.forEach(order => {
        if (!order.items || !Array.isArray(order.items)) return;
        order.items.forEach(item => {
            const pKey = item.productId || item.name;
            if (!summaryMap[pKey]) {
                const catalogProd = PRODUCTS.find(p => p.id === item.productId || p.name === item.name);
                summaryMap[pKey] = {
                    id: pKey,
                    brand: (catalogProd && catalogProd.brand) || item.brand || 'Genérico',
                    name: (catalogProd && catalogProd.name) || item.name || 'Producto',
                    category: (catalogProd && catalogProd.category) ? getCategoryLabel(catalogProd.category) : (item.category || 'General'),
                    totalQuantity: 0,
                    totalRevenue: 0,
                    orderIds: new Set()
                };
            }
            const qty = Number(item.quantity) || 0;
            const unitPrice = Number(item.unitPrice) || 0;
            summaryMap[pKey].totalQuantity += qty;
            summaryMap[pKey].totalRevenue += (qty * unitPrice);
            if (order.id) summaryMap[pKey].orderIds.add(order.id);
        });
    });

    let itemsArray = Object.values(summaryMap);
    itemsArray.sort((a, b) => b.totalQuantity - a.totalQuantity);

    let csvContent = "ID Producto;Marca;Nombre Producto;Categoria;Unidades Totales;N° Pedidos;Total Ventas ($)\n";

    itemsArray.forEach(item => {
        const id = item.id;
        const brand = item.brand.replace(/;/g, ',');
        const name = item.name.replace(/;/g, ',');
        const category = item.category.replace(/;/g, ',');
        const units = item.totalQuantity;
        const numOrders = item.orderIds.size;
        const revenue = item.totalRevenue;

        csvContent += `${id};${brand};${name};${category};${units};${numOrders};${revenue}\n`;
    });

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `consolidado_productos_ahorraya_${new Date().toISOString().split('T')[0]}.csv`);
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

// 19. PRODUCT DETAIL MODAL (QUICK VIEW / FULL SCREEN EXPANSION)
function openProductDetailModal(product) {
    const modal = DOM.modalProductDetail;
    const content = document.getElementById('modalProductDetailContent');
    if (!modal || !content) return;

    const priceDetail = product.prices[1];
    
    content.innerHTML = `
        <div class="modal-product-img-wrapper">
            <img src="productos/${product.image}" alt="${sanitizeInput(product.name)}" class="modal-product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="svg-fallback" style="display: none; width: 100%; height: 100%; padding: 20px;">
                ${getProductSvg(product.category, product.name)}
            </div>
        </div>
        <h2>${sanitizeInput(product.name)}</h2>
        
        <div class="pricing-tiers-tab modal-tiers-tab" role="tablist" style="margin-bottom: 18px;">
            <button class="tier-btn active" data-tier="1" role="tab" aria-selected="true">1 u.</button>
            <button class="tier-btn" data-tier="6" role="tab" aria-selected="false">6 u.</button>
            <button class="tier-btn" data-tier="12" role="tab" aria-selected="false">12 u.+</button>
        </div>
        
        <div class="price-display-wrapper" style="margin-bottom: 20px;">
            <div class="price-unit-row" style="display: flex; align-items: baseline; gap: 6px;">
                <span class="price-value modal-price-value" data-unit-price="${priceDetail}">$${formatNumber(priceDetail)}</span>
                <span class="price-subtext" style="font-size: 0.8rem; color: var(--color-text-muted);">por unidad</span>
            </div>
            <div class="price-total-row" style="margin-top: 4px; font-size: 0.9rem;">
                <span>Total: <strong class="modal-total-amount">$${formatNumber(priceDetail)}</strong></span>
            </div>
        </div>
        
        <div class="card-action-row" style="display: flex; gap: 12px;">
            <div class="quantity-counter modal-qty-counter">
                <button class="qty-btn modal-qty-minus">-</button>
                <input type="number" class="qty-input modal-qty-input" value="1" min="1" max="999">
                <button class="qty-btn modal-qty-plus">+</button>
            </div>
            
            <button class="btn btn-primary modal-add-btn ripple">Agregar al Carrito</button>
        </div>
    `;

    document.getElementById('detailProductBrand').textContent = product.brand;

    const tierButtons = content.querySelectorAll('.tier-btn');
    const qtyInput = content.querySelector('.modal-qty-input');
    const plusBtn = content.querySelector('.modal-qty-plus');
    const minusBtn = content.querySelector('.modal-qty-minus');
    const unitPriceLabel = content.querySelector('.modal-price-value');
    const totalPriceLabel = content.querySelector('.modal-total-amount');
    const addBtn = content.querySelector('.modal-add-btn');

    const getTierPrice = (qty) => {
        if (qty >= 12) return product.prices[12];
        if (qty >= 6) return product.prices[6];
        return product.prices[1];
    };

    const updateModalPrices = (qty) => {
        const unitPrice = getTierPrice(qty);
        const total = unitPrice * qty;
        
        unitPriceLabel.textContent = `$${formatNumber(unitPrice)}`;
        unitPriceLabel.setAttribute('data-unit-price', unitPrice);
        totalPriceLabel.textContent = `$${formatNumber(total)}`;
        
        let activeTier = 1;
        if (qty >= 12) activeTier = 12;
        else if (qty >= 6) activeTier = 6;

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
            updateModalPrices(tierVal);
        });
    });

    plusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        val++;
        qtyInput.value = val;
        updateModalPrices(val);
    });

    minusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) {
            val--;
            qtyInput.value = val;
            updateModalPrices(val);
        }
    });

    qtyInput.addEventListener('input', () => {
        let val = parseInt(qtyInput.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        qtyInput.value = val;
        updateModalPrices(val);
    });

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const finalQty = parseInt(qtyInput.value, 10) || 1;
        addToCart(product.id, finalQty);
        
        addBtn.textContent = '¡Agregado!';
        addBtn.style.backgroundColor = 'var(--color-success)';
        setTimeout(() => {
            addBtn.textContent = 'Agregar al Carrito';
            addBtn.style.backgroundColor = '';
            closeModal(modal);
        }, 800);
    });

    openModal(modal);
}
