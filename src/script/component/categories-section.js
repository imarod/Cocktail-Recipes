import DataSource from "../data/data-source.js"
class CategorySection extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: "open" })
    this._category = ""
    this._drinks = []
    this._currentPage = 1
    this._drinksPerPage = 12
  }

  set category(category) {
    this._category = category
    this.render()
  }

  set drinks(drinks) {
    this._drinks = drinks || []
    this._currentPage = 1 // Reset to first page when new drinks are set
    this.render()
  }

  get paginatedDrinks() {
    const start = (this._currentPage - 1) * this._drinksPerPage
    const end = start + this._drinksPerPage
    return this._drinks.slice(start, end)
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
          .category-section {
            margin: 32px 8px;
          }
  
          .category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding: 0 16px;
          }
  
          .category-title-container {
            display: flex;
            align-items: center;
            gap: 8px;
          }
  
          .category-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            color: #FF8C00;
          }
  
          .drink-count {
            color: #8796AE;
            font-size: 14px;
          }
  
          .navigation-buttons {
            display: flex;
            gap: 8px;
          }
  
          .nav-button {
            background: white;
            color: #041530;
            border: 1px solid purple;
            border-radius: 4px;
            width: 32px;
            height: 32px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
          }
  
          .nav-button:hover {
            background: rgba(255, 255, 255, 0.2);
          }
  
          .drink-scroll {
            position: relative;
            padding: 0 16px;
          }
  
          .scroll-container {
            display: flex;
            overflow-x: auto;
            gap: 16px;
            scroll-behavior: smooth;
            -ms-overflow-style: none;
            scrollbar-width: none;
            padding: 4px 0;
          }
  
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
  
          .drink-grid {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }
  
          .drink-card {
            width: 200px;
            flex-shrink: 0;
          }
  
          .drink-image-container {
            overflow: hidden;
            border-radius: 8px;
            aspect-ratio: 2/3;
            height: 300px;
          }
  
          .drink-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }
  
          .drink-image:hover {
            transform: scale(1.05);
          }
  
          .drink-info {
            margin-top: 8px;
          }
  
          .drink-name {
            color: #041530;
            font-size: 16px;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
  
          .drink-category {
            color: #8796AE;
            font-size: 14px;
            margin: 4px 0 0 0;
          }
  
          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 16px;
          }
  
          .page-button {
            background: #041530;
            color: white;
            border: 1px solid #041530;
            border-radius: 4px;
            width: 32px;
            height: 32px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
            margin: 0 4px;
          }
  
          .page-button:hover {
            background: #224274 ;
          }
  
          .page-button[disabled] {
            cursor: not-allowed;
            opacity: 0.5;
          }
  
          /* Responsivitas */
          @media (max-width: 1024px) {
            .drink-card {
              width: 180px; /* Sedikit lebih kecil untuk layar tablet */
            }
  
            .category-title {
              font-size: 20px; /* Sesuaikan ukuran font */
            }
  
            .drink-image-container {
              height: 260px; /* Tinggi gambar berkurang */
            }
          }
  
          @media (max-width: 768px) {
            .drink-card {
              width: 150px; /* Ukuran lebih kecil untuk perangkat kecil */
            }
  
            .category-title {
              font-size: 18px; /* Ukuran font lebih kecil */
            }
  
            .drink-image-container {
              height: 200px; /* Sesuaikan tinggi gambar */
            }
  
            .category-header {
              flex-direction: column; /* Header berganti menjadi kolom */
              align-items: flex-start;
            }
  
            .scroll-container {
              gap: 8px; /* Kurangi jarak antar elemen */
            }
          }
  
          @media (max-width: 480px) {
            .drink-card {
              width: 100px; /* Lebar minimum kartu untuk ponsel */
            }
  
            .category-title {
              font-size: 16px; /* Ukuran font lebih kecil lagi */
            }
  
            .drink-image-container {
              height: 150px; /* Tinggi gambar untuk layar ponsel */
            }
          }
        </style>
  
        <section class="category-section">
          <div class="category-header">
            <div class="category-title-container">
              <h2 class="category-title">${this._category ? this._category.replace("_", " / ") : ""}</h2>
              <span class="drink-count">(${this._drinks.length})</span>
            </div>
          </div>
          <div class="drink-scroll">
            <div class="scroll-container">
              <div class="drink-grid">
                ${this.paginatedDrinks
        .map(
          (drink) => `
                  <div class="drink-card" data-id="${drink.idDrink}">
                    <div class="drink-image-container">
                      <img 
                        class="drink-image" 
                        src="${drink.strDrinkThumb || "placeholder.jpg"}" 
                        alt="${drink.strDrink}"
                      >
                    </div>
                    <div class="drink-info">
                      <h3 class="drink-name">${drink.strDrink}</h3>
                      <p class="drink-category">${drink.strCategory || this._category.replace("_", " / ")}</p>
                    </div>
                  </div>
                `,
        )

        .join("")}
              </div>
            </div>
          </div>
          <div class="pagination">
            <button class="page-button prev-page" ${this._currentPage === 1 ? "disabled" : ""}>←</button>
            <button class="page-button next-page" ${this._currentPage === this.totalPages ? "disabled" : ""}>→</button>
          </div>
        </section>
      `

    // Add pagination functionality
    const prevPageButton = this.shadowDOM.querySelector(".prev-page")
    const nextPageButton = this.shadowDOM.querySelector(".next-page")

    prevPageButton.addEventListener("click", () => {
      if (this._currentPage > 1) {
        this._currentPage--
        this.render()
      }
    })

    nextPageButton.addEventListener("click", () => {
      if (this._currentPage < this.totalPages) {
        this._currentPage++
        this.render()
      }
    })

this.shadowDOM.querySelectorAll(".drink-card").forEach((card) => {
  card.addEventListener("click", async () => {
    const drinkId = card.dataset.id
    try {
      const drinkDetails = await DataSource.getDrinkDetails(drinkId)
      
      const drinkList = document.querySelector("drink-list")
      if (drinkList) {
        drinkList.style.display = "none"
      }

      const mainContent = document.querySelector("main");
      const existingDetailSection = mainContent.querySelector("detail-section");
      if (existingDetailSection) {
        existingDetailSection.remove();
      }

      const detailSection = document.createElement("detail-section");
      detailSection.drink = drinkDetails;
      mainContent.appendChild(detailSection);
    } catch (error) {
      console.error("Error loading drink details:", error);
    }
  })
})
  }

  get totalPages() {
    return Math.ceil(this._drinks.length / this._drinksPerPage)
  }
}

customElements.define("category-section", CategorySection)

