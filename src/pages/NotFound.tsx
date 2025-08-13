import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-center">
        <h1 className="text-8xl font-bold text-izishop-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page non trouvée</h2>
        <p className="max-w-lg mt-4 text-muted-foreground">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-izishop-600 hover:bg-izishop-700">
            <Link to="/">
              Retour à l'accueil
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">
              Parcourir les produits
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}