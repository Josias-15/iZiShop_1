import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product/ProductCard";
import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { products, categories } from "@/data/products";

export default function HomePage() {
  // Get featured and new products
  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = [...products].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);

  useEffect(() => {
    // Set page title
    document.title = "iZiShop - Votre boutique en ligne";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-izishop-700 to-izishop-500 py-16 md:py-24 text-white overflow-hidden">
        <div className="container relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Des produits de qualité à des prix incroyables
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Découvrez notre sélection de produits tendance pour tous les budgets. Livraison rapide et service client exceptionnel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-izishop-700 hover:bg-white/90">
                <Link to="/products">
                  Commencer à Magasiner
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-izishop-700">
                <Link to="/about">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2670"
              alt="iZiShop Hero"
              className="w-full h-auto rounded-lg shadow-xl transform md:translate-y-4 md:translate-x-4"
            />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 translate-x-1/4"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Catégories Populaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="group"
              >
                <Card className="overflow-hidden h-full border-none shadow-md transition-all duration-300 group-hover:shadow-lg">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                      <h3 className="text-white font-medium">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Produits à la Une</h2>
            <Button asChild variant="outline">
              <Link to="/products">
                Voir tous les produits
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-izishop-900 to-izishop-700 text-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Offre Spéciale</h2>
            <p className="text-lg mb-6">
              10% de réduction sur votre première commande
            </p>
            <Button asChild size="lg" className="bg-white text-izishop-700 hover:bg-white/90">
              <Link to="/products">
                En Profiter Maintenant
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Nouveautés</h2>
            <Button asChild variant="outline">
              <Link to="/products">
                Voir tout
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Pourquoi Nous Choisir</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="border-none shadow-md text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-izishop-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-izishop-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Produits de Qualité</h3>
                <p className="text-muted-foreground">
                  Tous nos produits sont soigneusement sélectionnés pour leur qualité exceptionnelle.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-izishop-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-izishop-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Livraison Rapide</h3>
                <p className="text-muted-foreground">
                  Livraison sous 48h sur tous nos produits disponibles en stock.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-izishop-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-izishop-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Paiement Sécurisé</h3>
                <p className="text-muted-foreground">
                  Transactions sécurisées et multiples options de paiement disponibles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-izishop-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-izishop-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Support Client</h3>
                <p className="text-muted-foreground">
                  Notre équipe est disponible 7j/7 pour répondre à toutes vos questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-izishop-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="text-muted-foreground mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et nos dernières nouveautés.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <Button className="bg-izishop-600 hover:bg-izishop-700 text-white">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}