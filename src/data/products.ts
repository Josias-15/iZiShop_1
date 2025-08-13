import { Product, Category } from "@/types";

export const categories: Category[] = [
  { 
    id: "electronics", 
    name: "Électronique", 
    icon: "📱",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "clothing", 
    name: "Vêtements", 
    icon: "👕",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "home", 
    name: "Maison", 
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "sports", 
    name: "Sport", 
    icon: "⚽",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

export const products: Product[] = [
  // Electronics - 4 products
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 699000,
    originalPrice: 799000,
    image: "https://images.unsplash.com/photo-1696446702798-da0ac47d3bdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1696446702798-da0ac47d3bdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Le dernier iPhone avec des fonctionnalités révolutionnaires",
    category: "electronics",
    rating: 4.8,
    stock: 15,
    seller: "Apple Store",
    featured: true,
    tags: ["smartphone", "apple", "ios"],
    attributes: {
      "Écran": "6.1 pouces Super Retina XDR",
      "Stockage": "128 GB",
      "Caméra": "48 MP Pro",
      "Batterie": "Jusqu'à 23h de lecture vidéo"
    },
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 650000,
    originalPrice: 750000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Smartphone Android haut de gamme avec IA intégrée",
    category: "electronics",
    rating: 4.7,
    stock: 20,
    seller: "Samsung Store",
    featured: false,
    tags: ["smartphone", "samsung", "android"],
    attributes: {
      "Écran": "6.2 pouces Dynamic AMOLED",
      "Stockage": "256 GB",
      "Caméra": "50 MP Triple",
      "Batterie": "4000 mAh"
    },
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    name: "MacBook Air M3",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ordinateur portable ultra-léger avec puce M3",
    category: "electronics",
    rating: 4.9,
    stock: 8,
    seller: "Apple Store",
    featured: true,
    tags: ["laptop", "apple", "macbook"],
    attributes: {
      "Processeur": "Apple M3",
      "RAM": "8 GB",
      "Stockage": "256 GB SSD",
      "Écran": "13.6 pouces Liquid Retina"
    },
    createdAt: "2024-01-12"
  },
  {
    id: "4",
    name: "AirPods Pro 2",
    price: 150000,
    originalPrice: 180000,
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Écouteurs sans fil avec réduction de bruit active",
    category: "electronics",
    rating: 4.6,
    stock: 25,
    seller: "Apple Store",
    featured: false,
    tags: ["écouteurs", "apple", "sans-fil"],
    attributes: {
      "Autonomie": "6h avec boîtier 30h",
      "Connectivité": "Bluetooth 5.3",
      "Réduction de bruit": "Active",
      "Résistance": "IPX4"
    },
    createdAt: "2024-01-08"
  },
  
  // Clothing - 4 products
  {
    id: "5",
    name: "T-shirt Premium Coton",
    price: 15000,
    originalPrice: 20000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "T-shirt en coton bio premium, confortable et durable",
    category: "clothing",
    rating: 4.3,
    stock: 50,
    seller: "FashionTech",
    featured: false,
    tags: ["t-shirt", "coton", "casual"],
    attributes: {
      "Matière": "100% Coton Bio",
      "Coupe": "Regular",
      "Couleurs": "Blanc, Noir, Gris",
      "Entretien": "Lavage machine 30°C"
    },
    createdAt: "2024-01-14"
  },
  {
    id: "6",
    name: "Jean Slim Fit",
    price: 45000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Jean moderne avec coupe ajustée et finition premium",
    category: "clothing",
    rating: 4.4,
    stock: 30,
    seller: "DenimCorp",
    featured: true,
    tags: ["jean", "denim", "slim"],
    attributes: {
      "Matière": "98% Coton, 2% Élasthanne",
      "Coupe": "Slim Fit",
      "Tailles": "28-38",
      "Couleur": "Bleu brut"
    },
    createdAt: "2024-01-11"
  },
  {
    id: "7",
    name: "Robe d'été Florale",
    price: 35000,
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Robe légère parfaite pour l'été avec motifs floraux",
    category: "clothing",
    rating: 4.6,
    stock: 25,
    seller: "SummerStyle",
    featured: false,
    tags: ["robe", "été", "floral"],
    attributes: {
      "Matière": "Viscose",
      "Longueur": "Mi-longue",
      "Motif": "Floral",
      "Saison": "Printemps/Été"
    },
    createdAt: "2024-01-09"
  },
  {
    id: "8",
    name: "Veste en Cuir",
    price: 120000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Veste en cuir véritable, style intemporel et élégant",
    category: "clothing",
    rating: 4.8,
    stock: 8,
    seller: "LeatherCraft",
    featured: true,
    tags: ["veste", "cuir", "classique"],
    attributes: {
      "Matière": "Cuir véritable",
      "Doublure": "Polyester",
      "Style": "Biker",
      "Couleur": "Noir"
    },
    createdAt: "2024-01-07"
  },

  // Home - 4 products
  {
    id: "9",
    name: "Canapé 3 Places",
    price: 250000,
    originalPrice: 300000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Canapé confortable avec revêtement en tissu premium",
    category: "home",
    rating: 4.5,
    stock: 5,
    seller: "HomeFurniture",
    featured: true,
    tags: ["canapé", "salon", "confort"],
    attributes: {
      "Dimensions": "200x85x90 cm",
      "Matière": "Tissu + Mousse",
      "Places": "3 personnes",
      "Couleur": "Gris clair"
    },
    createdAt: "2024-01-13"
  },
  {
    id: "10",
    name: "Table Basse Moderne",
    price: 85000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Table basse design avec plateau en verre trempé",
    category: "home",
    rating: 4.2,
    stock: 12,
    seller: "ModernHome",
    featured: false,
    tags: ["table", "verre", "moderne"],
    attributes: {
      "Dimensions": "120x60x45 cm",
      "Matière": "Verre trempé + Métal",
      "Style": "Contemporain",
      "Couleur": "Transparent/Noir"
    },
    createdAt: "2024-01-06"
  },
  {
    id: "11",
    name: "Lampe de Bureau LED",
    price: 25000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Lampe de bureau ajustable avec éclairage LED",
    category: "home",
    rating: 4.4,
    stock: 35,
    seller: "LightTech",
    featured: false,
    tags: ["lampe", "bureau", "led"],
    attributes: {
      "Type": "LED",
      "Puissance": "12W",
      "Réglage": "Intensité + Température",
      "Alimentation": "USB-C"
    },
    createdAt: "2024-01-04"
  },
  {
    id: "12",
    name: "Coussin Décoratif",
    price: 8000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Coussin en velours avec motifs géométriques",
    category: "home",
    rating: 4.1,
    stock: 60,
    seller: "DecoHome",
    featured: false,
    tags: ["coussin", "velours", "déco"],
    attributes: {
      "Dimensions": "45x45 cm",
      "Matière": "Velours",
      "Motif": "Géométrique",
      "Entretien": "Nettoyage à sec"
    },
    createdAt: "2024-01-02"
  },

  // Sports - 4 products
  {
    id: "13",
    name: "Chaussures de Running",
    price: 75000,
    originalPrice: 85000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Chaussures de course légères avec amorti avancé",
    category: "sports",
    rating: 4.7,
    stock: 40,
    seller: "SportMax",
    featured: true,
    tags: ["running", "chaussures", "sport"],
    attributes: {
      "Type": "Running",
      "Amorti": "Gel",
      "Pointures": "36-46",
      "Poids": "280g"
    },
    createdAt: "2024-01-16"
  },
  {
    id: "14",
    name: "Tapis de Yoga",
    price: 18000,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Tapis de yoga antidérapant en caoutchouc naturel",
    category: "sports",
    rating: 4.3,
    stock: 28,
    seller: "YogaLife",
    featured: false,
    tags: ["yoga", "tapis", "fitness"],
    attributes: {
      "Dimensions": "183x61 cm",
      "Épaisseur": "6 mm",
      "Matière": "Caoutchouc naturel",
      "Antidérapant": "Oui"
    },
    createdAt: "2024-01-01"
  },
  {
    id: "15",
    name: "Haltères Ajustables",
    price: 95000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Set d'haltères ajustables de 5 à 25 kg",
    category: "sports",
    rating: 4.6,
    stock: 15,
    seller: "FitnessPro",
    featured: true,
    tags: ["haltères", "musculation", "fitness"],
    attributes: {
      "Poids": "5-25 kg par haltère",
      "Réglage": "Rapide",
      "Matière": "Fonte + Caoutchouc",
      "Garantie": "2 ans"
    },
    createdAt: "2023-12-28"
  },
  {
    id: "16",
    name: "Vélo d'Appartement",
    price: 180000,
    originalPrice: 220000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Vélo d'appartement pliable avec écran LCD",
    category: "sports",
    rating: 4.4,
    stock: 7,
    seller: "HomeFit",
    featured: false,
    tags: ["vélo", "cardio", "maison"],
    attributes: {
      "Écran": "LCD",
      "Pliable": "Oui",
      "Résistance": "Magnétique",
      "Poids max": "120 kg"
    },
    createdAt: "2023-12-25"
  }
];