import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  selectedFile !: File;
  categoryId: string | undefined;
  searchTerm: string = '';
  filteredBooks: any[] = [];
  
  newBook: any = { title: '', author: '', description: '', pages: 0, categoryId: '', file: null };
  showAddBookForm: boolean = false;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')!;
    if (this.categoryId) {
      this.loadBooks();
    }
  }

  // Load books for the selected category from Firestore
  loadBooks() {
    this.bookService.getBooksByCategory(this.categoryId!).subscribe(books => {
      this.filteredBooks = books;
    });
  }

  // Filter books based on search term
  filterBooks() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredBooks = this.filteredBooks.filter(book => 
      book.title.toLowerCase().includes(searchTermTrimmed)
    );
  }

  // Add a new book to Firestore
  addBook() {
    if (this.newBook.title.trim() && this.newBook.author.trim() && this.newBook.description.trim() && this.newBook.pages > 0) {
      const bookToAdd = { ...this.newBook, categoryId: this.categoryId };
      this.bookService.addBook(bookToAdd).then(() => {
        this.loadBooks();
        this.toggleAddBookForm(); // Hide form after adding
        this.newBook = { title: '', author: '', description: '', pages: 0, categoryId: '', file: null }; // Reset form
      });
    } else {
      alert("Please fill in all fields.");
    }
  }

  // Delete a book from Firestore
  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId).then(() => {
      console.log("deleted")
      this.loadBooks();  // Reload books after removal
    }).catch(err => {
      console.error('Error removing book', err);
      // Handle error, maybe show a message
    });
  }

  // Toggle the add book form
  toggleAddBookForm() {
    this.showAddBookForm = !this.showAddBookForm;
  }



  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
