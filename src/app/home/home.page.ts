import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  books: any[] = [];
  categories: any[] = [];
  filteredCategories: any[] = [];
  selectedCategory: any = null;
  isAddingCategory = false;
  newCategoryName = '';
  newCategoryDescription = '';
  searchTerm = '';

  constructor(
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Initialize with default categories
    this.categories = [
      { id: 1, name: 'Science Fiction', description: 'Books about futuristic technology and science' },
      { id: 2, name: 'Fantasy', description: 'Books about magical worlds and creatures' },
      { id: 3, name: 'Mystery', description: 'Books full of suspense and plot twists' },
    ];
    this.filteredCategories = [...this.categories];
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books: ', error);
      }
    );
  }

  // Select a category
  selectCategory(category: any) {
    this.selectedCategory = category;
  }

  // Navigate to books based on category
  async goToBooks(categoryId: number) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/books', categoryId]);
    } else {
      alert('Connexion requise');
    }
  }

  // Show the add category form
  showAddCategoryForm() {
    this.isAddingCategory = true;
  }

  // Cancel adding a category
  cancelAddCategory() {
    this.isAddingCategory = false;
    this.newCategoryName = '';
    this.newCategoryDescription = '';
  }

  // Add a new category to Firestore and locally
  addCategory() {
    if (this.newCategoryName.trim() && this.newCategoryDescription.trim()) {
      const newCategory = {
        id: this.categories.length + 1, // Generate a unique ID
        name: this.newCategoryName,
        description: this.newCategoryDescription,
      };

      this.bookService.addCategory(newCategory).then(() => {
        this.categories.push(newCategory);
        this.filteredCategories = [...this.categories];
        this.cancelAddCategory();
        alert('Category added successfully!');
      }).catch(error => {
        console.error('Error adding category:', error);
        alert('Failed to add category. Please try again.');
      });
    } else {
      alert('Please fill in both category name and description.');
    }
  }

  // Filter categories based on search term
  filterCategories() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredCategories = searchTermTrimmed
      ? this.categories.filter(category =>
          category.name.toLowerCase().includes(searchTermTrimmed)
        )
      : [...this.categories];
  }

  async deleteSelectedCategory() {
    if (this.selectedCategory) {
      // Confirm deletion with the user
      const alert = await this.alertController.create({
        header: 'Delete Category',
        message: `Are you sure you want to delete the category "${this.selectedCategory.name}"?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Deletion cancelled');
            }
          },
          {
            text: 'Delete',
            handler: async () => {
              try {
                // Call service to delete category
                await this.bookService.deleteCategory(this.selectedCategory.id);
                
                // Update local categories after deletion
                this.categories = this.categories.filter(c => c.id !== this.selectedCategory.id);
                this.filteredCategories = [...this.categories];
                this.selectedCategory = null; // Reset selected category

                // Show success message
                const successAlert = await this.alertController.create({
                  header: 'Success',
                  message: 'Category deleted successfully!',
                  buttons: ['OK']
                });
                await successAlert.present();
              } catch (error) {
                console.error('Error deleting category:', error);

                // Show error message using AlertController
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'Failed to delete category. Please try again.',
                  buttons: ['OK']
                });
                await errorAlert.present();
              }
            }
          }
        ]
      });
      
      await alert.present();
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
