import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Category } from '../api/category/category'
import { CategoryService } from '../api/category/category.service'

import { SharedService, ToastsService } from '../service'
@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {
  categorys: Category[]
  filterArray: Category[] = []
  editCate: Category
  deleteCate: Category
  constructor (
    private categoryService: CategoryService,
    private toastService: ToastsService,
    private sharedService: SharedService
  ) {}

  ngOnInit () {
    this.getAllCategory()
  }
  public getAllCategory (): void {
    this.categoryService.getAllCategory().subscribe(
      (response: Category[]) => {
        this.categorys = response
        this.filterArray = response
      },
      (error: HttpErrorResponse) => {
        this.toastService.showError('Thất bại')
      }
    )
  }
  public onAddCategory (addForm: NgForm): void {
    document.getElementById('add-employee-form').click()
    this.categoryService.addCategory(addForm.value).subscribe(
      (response: Category) => {
        this.toastService.showSuccess('Thành công')
        this.getAllCategory()
        addForm.reset()
      },
      (error: HttpErrorResponse) => {
        this.toastService.showError('Thất bại')
      }
    )
  }

  public onUpdateCategory (cate: Category): void {
    this.categoryService.updateCategory(cate).subscribe(
      (response: Category) => {
        this.toastService.showSuccess('Thành công')
        this.getAllCategory()
      },
      (error: HttpErrorResponse) => {
        this.toastService.showError('Thất bại')
      }
    )
  }

  public onDeleteCategory (cateid: number): void {
    this.categoryService.deleteCategory(cateid).subscribe(
      (response: void) => {
        this.toastService.showSuccess('Thành công')
        this.getAllCategory()
      },
      (error: HttpErrorResponse) => {
        this.toastService.showError('Thất bại')
      }
    )
  }

  searchCategory (key: string) {
    this.filterArray = this.sharedService.searchAny(this.categorys, key)
  }

  public onOpenModal (cate: Category, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button')
    button.type = 'button'
    button.style.display = 'none'
    button.setAttribute('data-toggle', 'modal')
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    if (mode === 'edit') {
      this.editCate = cate
      button.setAttribute('data-target', '#updateEmployeeModal')
    }
    if (mode === 'delete') {
      this.deleteCate = cate
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }
    container.appendChild(button)
    button.click()
  }
}
