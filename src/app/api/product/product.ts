import { Category } from "../category/category";
import { FileDB } from "./fileDB";

export interface Product extends Category {

    id: number;
    name: string;
    description: string;
    imageurl: FileDB;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    catagory: Category;
  }




