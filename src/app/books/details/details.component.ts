import { NotificationService } from '../../shared/services/notification.service';
import { IBookModel } from './../book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './../services/book.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('editBookModal') editBookModal;
  @ViewChild('deleteBookModal') deleteBookModal;
  book : IBookModel;
  hideDetails : boolean = false;
  editedBook : IBookModel;
  progress: String = '0';
  isLoading : boolean = true;
  modalSpinner : boolean = false;
  disableBtn : boolean = false;

  constructor(
    private bookService : BookService,
    private router : Router,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private notificationService : NotificationService,
    private changeDetector : ChangeDetectorRef) { }

  ngOnInit() {
    this.bookService.getSelectedBook(this.activeRoute.snapshot.params['id']).subscribe(
      res => {
        this.book = res;
        this.calculateProgress();
        this.editedBook = {...this.book};
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.notificationService.showError(error.message);
      }
    );
  }

  ngAfterViewInit(){
    this.changeDetector.detectChanges();
  }

  editBook() {
    this.modalService.open(this.editBookModal, { centered: true });
  }

  onEdit(form) {
    if(form.valid && this.editedBook.PagesRead <= this.editedBook.Pages){
      this.modalSpinner = true;
      this.bookService.editSelectedBook(this.editedBook).subscribe(
        res => {
          this.closeModal();
          this.book = res;
          this.calculateProgress();
          this.modalSpinner = false;
        },
        error => {
          this.modalSpinner = false;
          this.notificationService.showError(error.error.message);
        }
      );
    }
  }
  deleteBook() {
    this.open(this.deleteBookModal);
  }

  confirmDeleteBook() {
    this.disableBtn = true;
    this.bookService.deleteSelectedBook(this.activeRoute.snapshot.params['id']).subscribe(
      res => {
        this.hideDetails = true;
        this.closeModal();
        this.notificationService.showSuccess(this.book.Title + 'has been successfully deleted.')
        this.router.navigateByUrl('/books');
      },
      error => {
        this.disableBtn = false;
        this.notificationService.showError(error.error.message);
      }
    )
  }

  open(content) {
    this.modalService.open(content, { centered: true, backdrop: 'static', keyboard: false });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  calculateProgress(){
    this.progress = (this.book.PagesRead / this.book.Pages * 100).toFixed(2).toString() + '%';
  }

}
