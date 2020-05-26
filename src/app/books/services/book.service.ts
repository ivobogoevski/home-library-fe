import { IBookModel } from './../book.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private API_URL = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) { }

  addBook(body){
    const formData = new FormData();
    formData.append('Title', body.Title);
    formData.append('Author', body.Author);
    formData.append('image', body.image);
    formData.append('Description', body.Description);
    formData.append('Pages', body.Pages);
    formData.append('PagesRead', body.PagesRead);
    formData.append('UserID', body.UserID);

    return this.http.post<IBookModel>(this.API_URL, formData);
  }

  getBooks(userId) {
    return this.http.get<IBookModel[]>(`${this.API_URL}/user/${userId}`);
  }

  getSelectedBook(bookId) {
    return this.http.get<IBookModel>(`${this.API_URL}/${bookId}`);
  }

  editSelectedBook(body) {
    return this.http.put<IBookModel>(this.API_URL, body);
  }

  deleteSelectedBook(bookId) {
    return this.http.delete<IBookModel>(`${this.API_URL}/${bookId}`);
  }
}
