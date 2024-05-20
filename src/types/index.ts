export interface Product {
    id: number;
    title: string;
    category: Category;
    price: number;
    description: string;
    image: string;
    quantity: number;
  }
  
export interface Category {
    name: string;
}