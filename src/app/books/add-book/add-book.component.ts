import { NotificationService } from '../../shared/services/notification.service';
import { IBookModel } from './../book.model';
import { BookService } from './../services/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroupDirective
} from '@angular/forms';
import { AuthenticationService } from 'src/app/login/services/authentication.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  @ViewChild('addBookModal') addBookModal;
  closeResult: string;
  modalOptions: NgbModalOptions;
  book: IBookModel;
  selectedImage: any = null;

  submitted = false;
  formData = {
    title: '',
    author: '',
    image: '',
    description: '',
    pages: null,
  };
  constructor(
    private bookService: BookService,
    private router: Router,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  onImageChange(e) {
    this.selectedImage = e.target.files[0];
    this.formData.image = e.target.files[0];
  }

  onSubmit(form) {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
    const body = {
      Title: this.formData.title,
      Author: this.formData.author,
      image: this.formData.image,
      Description: this.formData.description,
      Pages: this.formData.pages,
      PagesRead: 0,
      UserID: this.authService.getUserId(),
    };

    this.bookService.addBook(body).subscribe(
      (res) => {
        this.submitted = false;
        this.open(this.addBookModal);
        this.book = res;
      },
      (error) => {
        this.submitted = false;
        this.notificationService.showError(error.error.message);
      }
    );
  }

  open(content) {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  navigateToBook() {
    this.closeModal();
    this.router.navigateByUrl(`/books/details/${this.book.BookID}`);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
