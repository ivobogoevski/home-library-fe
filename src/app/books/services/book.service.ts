import { IBookModel } from './../book.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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

    return this.http.post<IBookModel>(`${config.apiUrl}/books`, formData);
  }

  getBooks(userId) {
    return this.http.get<IBookModel[]>(`${config.apiUrl}/books/user/${userId}`);
  }

  getSelectedBook(bookId) {
    return this.http.get<IBookModel>(`${config.apiUrl}/books/${bookId}`);
  }

  editSelectedBook(body) {
    return this.http.put<IBookModel>(`${config.apiUrl}/books`, body);
  }

  deleteSelectedBook(bookId) {
    return this.http.delete<IBookModel>(`${config.apiUrl}/books/${bookId}`);
  }
}
