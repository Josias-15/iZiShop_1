import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

// Get min and max prices from products
const minPrice = Math.min(...products.map(p => p.price));
const maxPrice = Math.max(...products.map(p => p.price));

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search));
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [sort, setSort] = useState(searchParams.get('sort') || "featured");
  const [inStock, setInStock] = useState(searchParams.get('stock') === "true");
  const [onSale, setOnSale] = useState(searchParams.get('sale') === "true");
  
  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Set page title
  useEffect(() => {
    document.title = "Tous nos produits | iZiShop";
  }, []);

  // Update filtered products when filters change
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter in-stock only
    if (inStock) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Filter on sale only
    if (onSale) {
      result = result.filter(product => !!product.originalPrice);
    }
    
    // Sort products
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchQuery) params.set("q", searchQuery);
    if (sort !== "featured") params.set("sort", sort);
    if (inStock) params.set("stock", "true");
    if (onSale) params.set("sale", "true");
    
    setSearchParams(params);
    
    // Update URL without reloading
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState(null, '', newUrl);
    
  }, [selectedCategory, priceRange, searchQuery, sort, inStock, onSale, location.pathname]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([minPrice, maxPrice]);
    setSearchQuery("");
    setSort("featured");
    setInStock(false);
    setOnSale(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <CartDrawer />
      
      <div className="container py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">Tous nos produits</h1>
        
        {/* Mobile Filter Button */}
        <div className="flex lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="font-medium mb-2">Catégories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="all-mobile" 
                        checked={!selectedCategory} 
                        onCheckedChange={() => setSelectedCategory("")}
                      />
                      <label htmlFor="all-mobile" className="text-sm ml-2">
                        Toutes les catégories
                      </label>
                    </div>
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox 
                          id={`${category.id}-mobile`} 
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => setSelectedCategory(category.id)}
                        />
                        <label htmlFor={`${category.id}-mobile`} className="text-sm ml-2">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Prix</h3>
                  <div className="px-2">
                    <Slider 
                      value={priceRange} 
                      min={minPrice}
                      max={maxPrice}
                      step={(maxPrice - minPrice) / 100}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium mb-2">Disponibilité</h3>
                  <div className="flex items-center">
                    <Checkbox 
                      id="in-stock-mobile" 
                      checked={inStock}
                      onCheckedChange={(checked) => setInStock(checked === true)}
                    />
                    <label htmlFor="in-stock-mobile" className="text-sm ml-2">
                      En stock uniquement
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="on-sale-mobile" 
                      checked={onSale}
                      onCheckedChange={(checked) => setOnSale(checked === true)}
                    />
                    <label htmlFor="on-sale-mobile" className="text-sm ml-2">
                      En promotion uniquement
                    </label>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  <X className="mr-2 h-4 w-4" />
                  Effacer les filtres
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div>
              <h3 className="font-medium mb-2">Rechercher</h3>
              <div className="relative">
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear</span>
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Catégories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox 
                    id="all" 
                    checked={!selectedCategory} 
                    onCheckedChange={() => setSelectedCategory("")}
                  />
                  <label htmlFor="all" className="text-sm ml-2">
                    Toutes les catégories
                  </label>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={category.id} 
                      checked={selectedCategory === category.id}
                      onCheckedChange={() => setSelectedCategory(category.id)}
                    />
                    <label htmlFor={category.id} className="text-sm ml-2">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Prix</h3>
              <div className="px-2">
                <Slider 
                  value={priceRange} 
                  min={minPrice}
                  max={maxPrice}
                  step={(maxPrice - minPrice) / 100}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium mb-2">Disponibilité</h3>
              <div className="flex items-center">
                <Checkbox 
                  id="in-stock" 
                  checked={inStock}
                  onCheckedChange={(checked) => setInStock(checked === true)}
                />
                <label htmlFor="in-stock" className="text-sm ml-2">
                  En stock uniquement
                </label>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="on-sale" 
                  checked={onSale}
                  onCheckedChange={(checked) => setOnSale(checked === true)}
                />
                <label htmlFor="on-sale" className="text-sm ml-2">
                  En promotion uniquement
                </label>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              Effacer les filtres
            </Button>
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort and results count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-muted-foreground">
                {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
              </p>
              <Select
                value={sort}
                onValueChange={setSort}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="featured">Produits à la une</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="newest">Nouveautés</SelectItem>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile search */}
            <div className="relative lg:hidden">
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </button>
              )}
            </div>
            
            {/* Active filters */}
            {(selectedCategory || searchQuery || inStock || onSale || 
              priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <div className="bg-muted text-xs rounded-full px-3 py-1 flex items-center gap-1">
                    <span>
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </span>
                    <button onClick={() => setSelectedCategory("")}>
                      <X className="h-3 w-3"/>
                    </button>
                  </div>
                )}
                
                {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                  <div className="bg-muted text-xs rounded-full px-3 py-1 flex items-center gap-1">
                    <span>
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                    <button onClick={() => setPriceRange([minPrice, maxPrice])}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {searchQuery && (
                  <div className="bg-muted text-xs rounded-full px-3 py-1 flex items-center gap-1">
                    <span>Recherche: {searchQuery}</span>
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {inStock && (
                  <div className="bg-muted text-xs rounded-full px-3 py-1 flex items-center gap-1">
                    <span>En stock</span>
                    <button onClick={() => setInStock(false)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {onSale && (
                  <div className="bg-muted text-xs rounded-full px-3 py-1 flex items-center gap-1">
                    <span>En promotion</span>
                    <button onClick={() => setOnSale(false)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Aucun produit trouvé</h2>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.
                </p>
                <Button onClick={clearFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}