import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, updateDoc, doc, deleteDoc, query, where } from '@angular/fire/firestore';
import { collectionData, docData } from 'rxfire/firestore';


import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private userId!: string;

  constructor(private firestore: AngularFirestore, private firestore2: Firestore, private authService : AuthService) {
    this.authService.getProfile().then(user => {
      this.userId = user.uid;  // Set userId from the auth service
    });
  }

  // allBooks: Array<{ id: number; title: string; author: string; description: string; pages: number; categoryId: number, file?: File }> = [
  //   { id: 1, title: 'Fiction Book 1', author: 'Auteur 1', description: 'Description du livre 1', pages: 250, categoryId: 1 },
  //   { id: 2, title: 'Science Book 1', author: 'Auteur 2', description: 'Description du livre 2', pages: 300, categoryId: 2 },
  //   { id: 3, title: 'History Book 1', author: 'Auteur 3', description: 'Description du livre 3', pages: 400, categoryId: 3 },
  //   { id: 4, title: 'Fiction Book 2', author: 'Auteur 4', description: 'Description du livre 4', pages: 150, categoryId: 1 },
  // ];


  // Fetch categories from Firestore
  getCategories() {

    const bookRef = collection(this.firestore2, 'categories');
    return collectionData( bookRef, { idField: 'id' }) ;
  }

  // Add a new category to Firestore
  addCategory(category: any) {
    return this.firestore.collection('categories').add(category);
  }

  // Delete a category from Firestore
deleteCategory(categoryId: string): Promise<void> {
  const categoryDocRef = doc(this.firestore2, `categories/${categoryId}`);
  return deleteDoc(categoryDocRef);
}

  // Fetch books for a specific category
  getBooksByCategory(categoryId: string): Observable<any[]> {
    return this.firestore
      .collection('books', ref => ref.where('categoryId', '==', categoryId ).where('userId', '==', this.userId))
      .valueChanges({ idField: 'id' });

  }

  // Fetch books for a specific category
  getAllBooks(): Observable<any[]> {
    return this.firestore
      .collection('books')
      .valueChanges({ idField: 'id' });

  }

  // Add a new book
  addBook(book: any) {
    book.userId = this.userId;  // Ensure the userId is added
    const bookRef = collection(this.firestore2, 'books');
    return addDoc(bookRef, book);
  }

  // Delete a book
  deleteBook(bookId: string) {
    // return this.firestore.collection('books').doc(bookId).delete();

    const bookRef = doc(this.firestore2, `books/${bookId}`);
    return deleteDoc(bookRef);
  }
}
