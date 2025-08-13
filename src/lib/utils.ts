import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export function calculateDiscount(price: number, originalPrice: number) {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function generateSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function getRelatedProducts(product: Product, allProducts: Product[], count = 4): Product[] {
  const sameCategoryProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
  
  if (sameCategoryProducts.length >= count) {
    return shuffleArray(sameCategoryProducts).slice(0, count)
  }
  
  const otherProducts = allProducts
    .filter(p => p.category !== product.category && p.id !== product.id)
  
  return [
    ...sameCategoryProducts,
    ...shuffleArray(otherProducts).slice(0, count - sameCategoryProducts.length)
  ]
}