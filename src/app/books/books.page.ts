import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  categoryId: number | undefined;
  searchTerm: string = ''; // Terme de recherche pour les livres
  filteredBooks: Array<{ id: number; title: string; author: string; description: string; pages: number; categoryId: number, file?: File }> = [];
  
  // Définition des livres associés aux catégories
  allBooks: Array<{ id: number; title: string; author: string; description: string; pages: number; categoryId: number, file?: File }> = [
    { id: 1, title: 'Fiction Book 1', author: 'Auteur 1', description: 'Description du livre 1', pages: 250, categoryId: 1 },
    { id: 2, title: 'Science Book 1', author: 'Auteur 2', description: 'Description du livre 2', pages: 300, categoryId: 2 },
    { id: 3, title: 'History Book 1', author: 'Auteur 3', description: 'Description du livre 3', pages: 400, categoryId: 3 },
    { id: 4, title: 'Fiction Book 2', author: 'Auteur 4', description: 'Description du livre 4', pages: 150, categoryId: 1 },
  ];

  // Propriétés pour ajouter un nouveau livre
  newBook: any = { title: '', author: '', description: '', pages: 0, categoryId: 0, file: null };
  showAddBookForm: boolean = false; // Pour afficher/masquer le formulaire d'ajout de livre

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer l'ID de la catégorie sélectionnée
    const id = +this.route.snapshot.paramMap.get('categoryId')!;

    // Vérifier si l'ID est un nombre valide
    if (!isNaN(id)) {
      this.categoryId = id;
      this.filterBooks(); // Filtrer les livres en fonction de la catégorie
    }
  }

  // Méthode pour filtrer les livres selon la catégorie et le terme de recherche
  filterBooks() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    
    // Filtrer les livres par catégorie et titre
    this.filteredBooks = this.allBooks.filter(book => 
      book.categoryId === this.categoryId && 
      book.title.toLowerCase().includes(searchTermTrimmed)
    );
  }

  // Méthode pour ajouter un livre à la catégorie actuelle
  addBook() {
    if (this.newBook.title.trim() && this.newBook.author.trim() && this.newBook.description.trim() && this.newBook.pages > 0 && this.newBook.file) {
      const newBookId = this.allBooks.length + 1;
      const bookToAdd = { ...this.newBook, id: newBookId, categoryId: this.categoryId };

      // Ajouter le livre à la liste
      this.allBooks.push(bookToAdd);
      this.filterBooks(); // Réactualiser la liste filtrée

      // Réinitialiser le formulaire
      this.newBook = { title: '', author: '', description: '', pages: 0, categoryId: 0, file: null };
      this.showAddBookForm = false; // Masquer le formulaire après l'ajout
    } else {
      alert("Veuillez remplir tous les champs et uploader un fichier.");
    }
  }

  // Méthode pour supprimer un livre
  deleteBook(book: any) {
    this.allBooks = this.allBooks.filter(b => b.id !== book.id);
    this.filterBooks(); // Mettre à jour la liste filtrée
  }

  // Méthode pour télécharger un livre (simulée ici)
  downloadBook(book: any) {
    if (book.file) {
      // Simuler un téléchargement (vous pouvez adapter pour une vraie logique de téléchargement)
      alert(`Téléchargement de ${book.title} en cours...`);
    } else {
      alert('Aucun fichier disponible pour ce livre.');
    }
  }

  // Méthode pour gérer la sélection d'un fichier de livre
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newBook.file = file;
    }
  }

  // Méthode pour afficher/masquer le formulaire d'ajout de livre
  toggleAddBookForm() {
    this.showAddBookForm = !this.showAddBookForm; // Inverser l'état d'affichage
  }
}