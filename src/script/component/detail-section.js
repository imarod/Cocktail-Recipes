class DetailSection extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    if (this._drink) {
      this.render()
    }
  }

  set drink(drink) {
    this._drink = drink
    this.render()
  }

  render() {
    if (!this._drink) return

    const ingredients = []
    for (let i = 1; i <= 15; i++) {
      if (this._drink[`strIngredient${i}`]) {
        ingredients.push(`${this._drink[`strIngredient${i}`]} - ${this._drink[`strMeasure${i}`] || ""}`)
      }
    }

    this.shadowDOM.innerHTML = `
      <style>
        .detail-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .drink-title {
          font-size: 32px;
          color: #FF8C00;
          margin-bottom: 24px;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .drink-image {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .info-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .info-title {
          font-size: 24px;
          color: #FF8C00;
          margin-bottom: 16px;
        }
        .info-grid {
          display: grid;
          gap: 12px;
          margin-bottom: 24px;
        }
        .info-item {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 16px;
        }
        .info-label {
          font-weight: 500;
          color: #666;
        }
        .info-value {
          color: #333;
        }
        .ingredients-list {
          display: grid;
          gap: 8px;
        }
        .ingredient-item {
          padding: 8px;
          background: #FFECD4;
          border-radius: 6px;
        }
        .back-button {
          background: #041530;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
          
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .drink-title {
            font-size: 1.8rem;
          }
          .info-title {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .drink-title {
            font-size: 1.5rem;
          }
          .info-title {
            font-size: 1.2rem;
          }
          .info-item {
            grid-template-columns: 100px 1fr;
          }
        }

        @media (max-width: 480px) {
          .detail-container {
            padding: 16px;
          }
          .drink-title {
            font-size: 1.2rem;
          }
          .info-title {
            font-size: 1rem;
          }
          .info-item {
            grid-template-columns: 90px 1fr;
            gap: 8px;
          }
          .back-button {
            padding: 6px 12px;
          }
        }
      </style>
      <div class="detail-container">
        <button class="back-button">← Back</button>
        <h1 class="drink-title">${this._drink.strDrink}</h1>
        <div class="content-grid">
          <img class="drink-image" src="${this._drink.strDrinkThumb}" alt="${this._drink.strDrink}">
          <div class="info-section">
            <h2 class="info-title">Information:</h2>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Category:</span>
                <span class="info-value">${this._drink.strCategory}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Glass:</span>
                <span class="info-value">${this._drink.strGlass}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Type:</span>
                <span class="info-value">${this._drink.strAlcoholic}</span>
              </div>
            </div>
            
            <h2 class="info-title">Ingredient :</h2>
            <div class="ingredients-list">
              ${ingredients
        .map(
          (ingredient) => `
                <div class="ingredient-item">${ingredient}</div>
              `,
        )
        .join("")}
            </div>
            
            <h2 class="info-title">How to make:</h2>
            <p>${this._drink.strInstructions}</p>
          </div>
        </div>
      </div>
    `

    this.shadowDOM.querySelector(".back-button").addEventListener("click", async () => {
      try {
        this.remove()
        const drinkListElement = document.querySelector("drink-list")
        if (drinkListElement) {
          drinkListElement.style.display = "block"
          
          const mainScript = await import("../view/main.js")
          await mainScript.default()
        }
      } catch (error) {
        console.error("Error returning to drink list:", error)
      }
    })
    
  }
}

customElements.define("detail-section", DetailSection)

