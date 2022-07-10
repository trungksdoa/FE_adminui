import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Category } from 'src/app/api/category/category'
import { CategoryService } from 'src/app/api/category/category.service'
import { Product, ProductWithoutDate } from 'src/app/api/product/product'
import { ProductService } from 'src/app/api/product/product.service'
import { SharedService, ToastsService } from 'src/app/service'

export const initValue: Product = {
  id: 0,
  name: '',
  description: '',
  imageurl: '',
  price: 0,
  CreateAt: undefined,
  LastUpdated: undefined,
  slogan:'',
  catagory: {
    id: 0,
    name: '',
    slogan:'',
    CreateAt: undefined,
    LastUpdated: undefined
  }
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  //Old
  categorys: Category[]
  uploadedFiles: File
  failed = false
  isLoading = false
  imageDataUrl: any = undefined
  formType: string = 'add'
  // fileSelected: File
  productContent: Product = initValue

  style = {
    'border-radius': '5px',
    height: '327px',
    width: '100%',
    'object-fit': 'cover',
    background: 'rgb(217, 156, 0,0.34)',
    border: '1px solid white'
  }
  showError: any
  @ViewChild('inputImage', { static: false }) inputImage
  constructor (
    private productService: ProductService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private toast: ToastsService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Product; type: string }
  ) {}

  urlToObject = async () => {
    if (this.uploadedFiles) {
      return this.uploadedFiles
    } else {
      const response = await fetch(this.imageDataUrl)
      // here image is url/location of image
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: blob.type })
      return file
    }
  }

  ngOnInit (): void {
    this.formType = this.data.type
    this.productContent = this.data.data
    this.imageDataUrl = this.productContent.imageurl
    this.getAllCategory()
  }

  getAllCategory (): void {
    this.categoryService.getAllCategory().subscribe(
      (response: Category[]) => {
        this.categorys = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  onUploadImageButtonClick () {
    this.inputImage.nativeElement.click()
  }

  onFileChange () {
    const target = this.inputImage.nativeElement
    if (target.files && target.files.length) {
      const [file] = target.files
      this.uploadedFiles = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = _event => {
        this.imageDataUrl = reader.result
      }
    }
  }

  formValidate (value: Product) {
    const error: any = {}

    if (
      value.name.trim().length === 0 ||
      value.name === undefined ||
      value.name === null
    ) {
      error.name = 'Tên không được để trống'
    } else if (
      value.description.trim().length === 0 ||
      value.description === undefined ||
      value.description === null
    ) {
      error.description = 'Mô tả không được để trống'
    } else if (
      value.price === undefined ||
      value.price === 0 ||
      value.price === null
    ) {
      error.price = 'Giá không được để trống'
    } else if (value.catagory === undefined) {
      error.catagory = 'Danh mục không được để trống'
    }

    return error
  }

  clearForm () {
    this.productContent = initValue
  }

  setSendValue (value: Product) {
    const requestValue: ProductWithoutDate = {
      id: value.id,
      name: value.name,
      description: value.description,
      imageurl: value.imageurl,
      price: value.price,
      catagory: {
        id:value.catagory.id,
        name:''
      }
    }
    return JSON.stringify(requestValue)
  }
  onSubmit = () => {
    // this.setSendValue(this.productContent)
    if (Object.keys(this.formValidate(this.productContent)).length === 0) {
      this.isLoading = true
      this.failed = false
      const formData: any = new FormData()

      this.urlToObject().then(file => {
        formData.append('image', file)
        if (this.formType === 'add') {
          formData.append('product', this.setSendValue(this.productContent))
          this.productService.createProductWithFileUpload(formData).subscribe(
            (response: Product) => {
              this.toast.showSuccess('Thành công')

              this.sharedService.submitFormProduct(response)
              this.dialogRef.close()
              this.clearForm()
            },
            (error: HttpErrorResponse) => {
              this.toast.showError('Thất bại')
            }
          )
        } else {
          const imageId = this.productContent.imageurl.split("/")[8];
          formData.append('product', this.setSendValue(this.productContent))
          formData.append('imageID', imageId)
          this.productService.updateProductWithFileUpload(formData).subscribe(
            (response: Product) => {
              this.toast.showSuccess('Thành công')
              this.sharedService.submitFormProduct(response)
              this.dialogRef.close()
            },
            (error: HttpErrorResponse) => {
              this.toast.showError('Thất bại')
            }
          )
        }
      })
    } else {
      this.showError = this.formValidate(this.productContent)
    }
  }
}
