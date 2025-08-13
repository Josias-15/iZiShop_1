import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-izishop-600 to-izishop-700 bg-clip-text text-transparent">
                iZiShop
              </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Votre destination shopping en ligne pour tous vos besoins quotidiens. Qualité, prix et livraison rapide garantis.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-izishop-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-izishop-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-izishop-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-izishop-600">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-izishop-600">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-izishop-600">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-muted-foreground hover:text-izishop-600">
                  Mon Compte
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-izishop-600">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-izishop-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-izishop-600">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-izishop-600">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-izishop-600">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-izishop-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-izishop-600" />
                <span className="text-muted-foreground">contact@izishop.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-izishop-600" />
                <span className="text-muted-foreground">+33 1 23 45 67 89</span>
              </li>
              <li className="text-muted-foreground">
                123 Rue du Commerce,<br />
                75001 Paris, France
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} iZiShop. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
              alt="Visa" 
              className="h-8 w-auto"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
              alt="MasterCard" 
              className="h-8 w-auto"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
              alt="PayPal" 
              className="h-8 w-auto"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196559.png" 
              alt="American Express" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}