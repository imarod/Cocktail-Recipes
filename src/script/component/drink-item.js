class DrinkItem extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: "open" })
  }

  set drink(drink) {
    this._drink = drink
    this.render()
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .card {
          width: 200px;
          transition: transform 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-8px);
        }

        .image-container {
          width: 200px;
          height: 300px;
          margin-bottom: 8px;
          border-radius: 8px;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .drink-info {
          padding: 8px 4px;
        }

        .drink-name {
          color: #fff;
          font-size: 16px;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .drink-date {
          color: #888;
          font-size: 14px;
        }
      </style>

      <div class="card">
        <div class="image-container">
          <img src="${this._drink.strDrinkThumb}" alt="${this._drink.strDrink}">
        </div>
        <div class="drink-info">
          <h3 class="drink-name">${this._drink.strDrink}</h3>
          <div class="drink-date">Added ${new Date().toLocaleDateString()}</div>
        </div>
      </div>
    `
  }
}

customElements.define("drink-item", DrinkItem)

