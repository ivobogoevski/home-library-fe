import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { BookService } from './../services/book.service';
import { IBookModel } from './../book.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/login/services/authentication.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
})
export class AllBooksComponent implements OnInit {
  isLoading = true;
  books: IBookModel[];
  modifiedBooks = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.bookService.getBooks(this.authService.getUserId()).subscribe(
      (res) => {
        this.books = res;
        this.books.forEach((book, index) => {
          if ((index + 1) % 3 === 0) {
            this.modifiedBooks.push(book);
            this.modifiedBooks.push({ title: 'shelf' });
          } else if (index === this.books.length - 1) {
            this.modifiedBooks.push(book);
            this.modifiedBooks.push({ title: 'shelf' });
          } else {
            this.modifiedBooks.push(book);
          }
        });
        this.isLoading = false;
      },
      (error) => {
        this.notificationService.showError(error.error.message);
        this.isLoading = false;
      }
    );
  }

  addBook(){
    this.router.navigateByUrl('books/add');
  }

  goToDetails(id) {
    this.router.navigateByUrl('books/details/' + id);
  }
}
