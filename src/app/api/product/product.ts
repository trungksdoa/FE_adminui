import { Category, CategoryWithoutDate } from "../category/category";

export interface Product {

    id: number;
    name: string;
    description: string;
    imageurl: string;
    price: number;
    CreateAt: any;
    LastUpdated: any;
    catagory: Category;
  }


  export interface ProductWithoutDate {
    id: number;
    name: string;
    description: string;
    imageurl: string;
    price: number;
    catagory: CategoryWithoutDate;
  }




