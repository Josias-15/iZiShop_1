import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(products.find(p => p.id === productId));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Related products (same category)
  const relatedProducts = products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  const discount = product?.originalPrice 
    ? calculateDiscount(product.price, product.originalPrice) 
    : 0;

  // Set page title based on product
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | iZiShop`;
    } else {
      document.title = "Produit non trouvé | iZiShop";
    }
  }, [product]);

  // Redirect to 404 if product not found
  useEffect(() => {
    if (!product && productId) {
      navigate('/404', { replace: true });
    }
  }, [product, productId, navigate]);

  if (!product) {
    return null; // Will redirect to 404
  }

  const handlePrevImage = () => {
    setSelectedImage(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <CartDrawer />
      
      <main className="flex-grow py-8">
        <div className="container">
          {/* Back button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden bg-muted rounded-lg">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Image précédente</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                      <span className="sr-only">Image suivante</span>
                    </Button>
                  </>
                )}
                {discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    -{discount}%
                  </Badge>
                )}
              </div>

              {/* Thumbnail images */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-auto pb-1">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-izishop-600' 
                          : 'border-transparent hover:border-izishop-300'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image}
                        alt={`${product.name} - Vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex justify-between">
                <Badge variant="outline" className="mb-2">
                  {product.seller}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Ajouter aux favoris</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Partager</span>
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold">{product.name}</h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating})
                </span>
              </div>

              {/* Price */}
              <div className="mt-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <Badge className="bg-red-500 hover:bg-red-600">
                      Économisez {formatPrice(product.originalPrice! - product.price)}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Prix TTC incluant la TVA
                </p>
              </div>

              {/* Stock Status */}
              <div className="mt-4">
                {product.stock > 10 ? (
                  <p className="text-green-600 flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"></span>
                    En stock et prêt à être expédié
                  </p>
                ) : product.stock > 0 ? (
                  <p className="text-amber-600 flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-600 mr-2"></span>
                    Stock limité, plus que {product.stock} disponibles
                  </p>
                ) : (
                  <p className="text-red-600 flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></span>
                    Actuellement indisponible
                  </p>
                )}
              </div>

              <Separator className="my-6" />

              {/* Short Description */}
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Attributes / Specs */}
              {product.attributes && (
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-sm text-muted-foreground">{key}: </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Add to Cart */}
              {product.stock > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Diminuer</span>
                    </Button>
                    <span className="w-10 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Augmenter</span>
                    </Button>
                  </div>
                  <Button 
                    className="flex-1 bg-izishop-600 hover:bg-izishop-700 text-white"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ajouter au panier
                  </Button>
                </div>
              )}

              {/* Shipping and returns */}
              <div className="mt-8 space-y-4">
                <div className="flex gap-3">
                  <Truck className="h-5 w-5 text-izishop-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Livraison gratuite</p>
                    <p className="text-sm text-muted-foreground">
                      Pour les commandes de plus de 100€
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-izishop-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Garantie satisfaction</p>
                    <p className="text-sm text-muted-foreground">
                      Garantie de remboursement pendant 30 jours
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCcw className="h-5 w-5 text-izishop-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Retours faciles</p>
                    <p className="text-sm text-muted-foreground">
                      Retours sous 14 jours après réception
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product details, features, reviews tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="w-full max-w-md mb-6">
              <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
              <TabsTrigger value="features" className="flex-1">Caractéristiques</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Avis</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-muted-foreground">
              <p className="mb-4">{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget 
                ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. 
                Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl 
                sit amet nisl.
              </p>
              <p className="mt-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto 
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
                odit aut fugit.
              </p>
            </TabsContent>
            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-izishop-100 flex items-center justify-center text-izishop-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{key}</h3>
                      <p className="text-muted-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-6">
              {/* Sample Reviews */}
              <div className="flex items-start gap-4 p-4 bg-muted/40 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-izishop-100 flex items-center justify-center text-izishop-600 font-semibold">
                  JD
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Jean Dupont</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Il y a 2 semaines</p>
                  <p>
                    Très satisfait de mon achat. Le produit est conforme à la description et 
                    de bonne qualité. Je recommande !
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-muted/40 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-izishop-100 flex items-center justify-center text-izishop-600 font-semibold">
                  ML
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Marie Lefebvre</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Il y a 1 mois</p>
                  <p>
                    Excellente qualité, livraison rapide et emballage soigné. 
                    Je suis très contente de mon achat et n'hésiterai pas à commander à nouveau.
                  </p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Voir tous les avis
              </Button>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}