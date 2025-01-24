class DrinkList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
    this._drinks = []; 
  }

  set drinks(drinks) {
    this._drinks = drinks;
    this.render();
  }

  get drinks() {
    return this._drinks;
  }

  renderError(message) {
    
    this.shadowDOM.innerHTML = `
      <style>
        .placeholder {
          font-weight: lighter;
          color: red;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          text-align: center;
          padding: 20px;
        }
          
      </style>
      <h2 class="placeholder">${message}</h2>
    `;
  }

  render() {    

    this.shadowDOM.innerHTML = `
      <style>
        :host {
            display: block;
            min-height: 100vh;
            border-radius: 24px;
        }
            
      </style>
      <div class="drink-container"></div>
    `;

    const container = this.shadowDOM.querySelector('.drink-container');

    if (!this._drinks || this._drinks.length === 0) {
      this.renderError('No drinks available');
      return;
    }

    const categories = ["Cocktail", "Shot", "Punch", "Homemade_Liqueur", "Soft_Drink", "Ordinary_Drink"];

    categories.forEach(category => {
      const categoryDrinks = this._drinks.filter(
        drink => drink.strCategory === category.replace("_", " / ")
      );

      if (categoryDrinks.length > 0) {
        const categorySection = document.createElement('category-section');
        categorySection.category = category;
        categorySection.drinks = categoryDrinks;
        container.appendChild(categorySection);
      }
    });
  }
}

customElements.define("drink-list", DrinkList);