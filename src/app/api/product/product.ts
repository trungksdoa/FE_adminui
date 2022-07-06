import { Category, CategoryWithoutDate } from "../category/category";

export interface Product {

    id: number;
    name: string;
    description: string;
    imageurl: string;
    price: any;
    CreateAt: any;
    LastUpdated: any;
    catagory: Category;
    slogan:string;
  }


  export interface ProductWithoutDate {
    id: number;
    name: string;
    description: string;
    imageurl: string;
    price: any;
    catagory: CategoryWithoutDate;
  }




