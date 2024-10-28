import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Liste des catégories
  categories = [
    { id: 1, name: 'Fiction', description: 'Explorez notre collection de romans de fiction captivants.' },
    { id: 2, name: 'Science', description: 'Découvrez des livres sur la science et les innovations.' },
    { id: 3, name: 'Histoire', description: 'Plongez dans le monde fascinant de l\'histoire.' },
    // Ajoutez d'autres catégories ici
  ];

  // Propriété pour stocker la catégorie sélectionnée
  selectedCategory: any = null;

  // Propriétés pour gérer l'ajout de catégorie
  isAddingCategory = false;
  newCategoryName: string = '';
  newCategoryDescription: string = '';

  // Propriétés pour gérer la recherche
  searchTerm: string = '';
  filteredCategories: any[] = [];

  constructor(private router: Router) {
    // Initialiser les catégories filtrées avec toutes les catégories
    this.filteredCategories = [...this.categories];
  }

  // Méthode pour sélectionner une catégorie
  selectCategory(category: any) {
    this.selectedCategory = category;
  }

  // Méthode pour naviguer vers la page des livres disponibles pour une catégorie
  goToBooks(categoryId: number) {
    this.router.navigate(['/books', categoryId]);
  }

  // Méthode pour afficher le formulaire d'ajout de catégorie
  showAddCategoryForm() {
    this.isAddingCategory = true;
  }

  // Méthode pour annuler l'ajout d'une nouvelle catégorie
  cancelAddCategory() {
    this.isAddingCategory = false;
    this.newCategoryName = '';
    this.newCategoryDescription = '';
  }

  // Méthode pour ajouter une nouvelle catégorie à la liste
  addCategory() {
    if (this.newCategoryName.trim() && this.newCategoryDescription.trim()) {
      const newCategory = {
        id: this.categories.length + 1, // Générer un nouvel ID
        name: this.newCategoryName,
        description: this.newCategoryDescription,
      };

      this.categories.push(newCategory); // Ajouter la nouvelle catégorie à la liste
      this.filterCategories(); // Mettre à jour la liste filtrée
      this.cancelAddCategory(); // Réinitialiser le formulaire
    }
  }

  // Méthode pour filtrer les catégories en fonction du terme de recherche
  filterCategories() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase(); // Supprimer les espaces en trop
    if (searchTermTrimmed) {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(searchTermTrimmed)
      );
    } else {
      this.filteredCategories = [...this.categories]; // Si la recherche est vide, afficher toutes les catégories
    }
  }

  // Méthode pour supprimer la catégorie sélectionnée
  deleteSelectedCategory() {
    if (this.selectedCategory) {
      this.categories = this.categories.filter(category => category.id !== this.selectedCategory.id);
      this.filterCategories(); // Mettre à jour la liste filtrée après suppression
      this.selectedCategory = null; // Réinitialiser la catégorie sélectionnée après suppression
    }
  }
}