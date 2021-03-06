import { SharedService, DialogService, ToastsService } from 'src/app/service'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { Validators, FormBuilder, NgForm } from '@angular/forms'
import { Category } from 'src/app/api/category/category'
import { CategoryService } from 'src/app/api/category/category.service'
import { Product } from 'src/app/api/product/product'
import { ProductService } from 'src/app/api/product/product.service'
import { AddProductComponent } from './add-product/add-product.component'

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {
  products: Product[] = []
  temp_products: Product[] = []
  failed: boolean
  categorys: Category[]
  newDate: any = new Date().getTime()
  filterArray: Product[] = []
  timeStamp: any = new Date().getTime()
  initializeValue = {
    id: 0,
    name: '',
    description: '',
    imageurl: '',
    price: 0,
    createAt: undefined,
    lastUpdated: undefined,
    catagory: {
      id: 0,
      name: '',
      createAt: undefined,
      lastUpdated: undefined
    }
  }
  loading:boolean = true;
  constructor (
    private productService: ProductService,
    private dialogService: DialogService,
    private sharedService: SharedService,
    private toast: ToastsService
  ) {}
  ngOnInit (): void {
    this.sharedService.invokeSendDataAfterSubmit.subscribe((data: Product) => {
      let index = this.products.findIndex(item => item.id === data.id)

      if (index == -1) {
        this.filterArray.push(data)
      } else {
        this.filterArray = this.products
          .map(preData => {
            if(preData.id === data.id){
              preData = data
            }
            this.timeStamp = new Date().getTime()
            return preData
          })
      }
    })

    this.getAllProduct()
  }
  @Input() response: any
  getAllProduct (): void {
    this.productService.getAllProduct().subscribe(
      (response: Product[]) => {
        this.loading = false
        for (let i = 0; i < response.length; i++) {
          const element = response[i]
          response[i].price = response[i].price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});

          // element.createAt = new Date(element.createAt).toUTCString()
          // if(element.lastUpdated!=undefined){
          //   element.lastUpdated = new Date(element.lastUpdated).toUTCString()
          // }
        }
        this.filterArray = response
        this.products = response
      },
      (error: HttpErrorResponse) => {
        this.loading = true
        this.failed = true
      }
    )
  }

  onDeleteProduct (cateid: number): void {
    this.productService.deleteProduct(cateid).subscribe(
      (response: void) => {
        this.toast.showSuccess('X??a th??nh c??ng')
        this.getAllProduct()
      },
      (error: HttpErrorResponse) => {
        this.toast.showError('Kh??ng th??? x??a khi, vui l??ng ki???m tr??? l???i')
      }
    )
  }
  openDialog (sendData: any, type: any) {
    this.dialogService.openDialog(
      {
        width: '50%',
        // disableClose:true,
        data: { data: sendData, type }
      },
      AddProductComponent
    )
  }

  searchProduct (key: string) {
    this.filterArray = this.sharedService.searchAny(this.products, key)
  }

  public getLinkPicture (linkPicture: any) {
    if (this.timeStamp) {
      return linkPicture + '?' + this.timeStamp
    }
    return linkPicture
  }

}
