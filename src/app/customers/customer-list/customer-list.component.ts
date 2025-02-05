import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CustomerService} from '../../services/customer.service';
import {ToastService} from '../../services/toast.service';
import {catchError, EMPTY} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})

export class CustomerListComponent implements OnInit, AfterViewInit {
  customers: any[] = [];
  customerForm!: FormGroup;
  isEditing = false;
  currentCustomerId: number | null = null;
  modalFormInstance: any;
  modalConfirmDeleteInstance: any;

  searchTerm: string = '';

  @ViewChild('customerModal') customerModalRef!: ElementRef;
  @ViewChild('deleteConfirmModal', { static: false }) deleteConfirmModalRef!: ElementRef;

  constructor(private customerService: CustomerService,
              private toastService: ToastService) {}

  ngOnInit() {
    this.loadCustomers();
    this.initForm();
  }

  ngAfterViewInit() {
    this.modalFormInstance = new bootstrap.Modal(this.customerModalRef.nativeElement);
    this.modalConfirmDeleteInstance = new bootstrap.Modal(this.deleteConfirmModalRef.nativeElement);
  }

  loadCustomers() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
    });
  }

  initForm() {
    this.customerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  openModal() {
    this.isEditing = false;
    this.currentCustomerId = null;
    this.customerForm.reset();
    this.modalFormInstance.show();
  }

  editCustomer(id: number) {
    this.isEditing = true;
    this.currentCustomerId = id;
    this.customerService.getById(id).subscribe((data) => {
      this.customerForm.patchValue(data);
    });
    this.modalFormInstance.show();
  }

  closeModal() {
      this.modalFormInstance.hide();
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      if (this.isEditing) {
        this.customerService.update(this.currentCustomerId!, this.customerForm.value)
          .subscribe(() => {
            this.loadCustomers();
            this.toastService.showToast('success', 'Customer updated successfully!');
            this.closeModal();
          });
      } else {
        this.customerService.create(this.customerForm.value)
          .subscribe(() => {
            this.loadCustomers();
            this.toastService.showToast('success', 'Customer added successfully!');
            this.closeModal();
          });
      }
    }
  }

  deleteCustomer() {
    if (this.currentCustomerId) {
      this.customerService.delete(this.currentCustomerId).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.toastService.showToast('info', `Error ${error.status}: No permission to delete customer.`);
          } else {
            this.toastService.showToast('info', `Error ${error.status}: Unable to delete customer.`);
          }
          return EMPTY;
        })
      ).subscribe({
        next: () => {
          this.toastService.showToast('success', 'Customer delete successfully!');
          this.loadCustomers();
          this.closeConfirmDeleteModal();
        },
      });
    }
  }

  openConfirmDelete(id: number) {
    this.currentCustomerId = id;
    this.modalConfirmDeleteInstance.show();
  }

  closeConfirmDeleteModal() {
    this.currentCustomerId = null;
    this.modalConfirmDeleteInstance.hide();
  }

  filteredCustomers() {
    return this.customers.filter(customer =>
      `${customer.firstname} ${customer.lastname} ${customer.email} ${customer.phone}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }


}


