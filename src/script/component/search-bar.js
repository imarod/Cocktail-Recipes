class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchElement').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
          <style>
           .search-container {
              display: flex;
              align-items: center;           
              border-radius: 15px;
              overflow: hidden;
              max-width: 100%;
              width: 400px;
              background-color: #fff;
              transition: all 0.3s ease-in-out;
              }           

              .search-input {
                flex: 1;
                border: none;
                padding: 12px 15px;
                font-size: 16px;
                color: #4a0060;
                min-width: 0; /* Agar fleksibel di layar kecil */
              }

              .search-input:focus {
                outline: none;
              }

              .search-button {
                background-color: #ff8c00;
                color: #fff;
                border: none;
                padding: 12px 20px;
                font-size: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.3s ease-in-out;
              }

              .search-button:hover {
                background-color: #ff9900;
              }

              .search-button:focus {
                outline: none;
              }

              
              .search-text {
                display: inline-block; 
              }

              .search-icon {
                display: none; 
              }

              /* Responsiveness */
              @media (max-width: 768px) {
                .search-container {
                  width: 100%;
                }
            
                .search-input {
                  padding: 10px 12px;
                  font-size: 14px;
                }

                
                .search-button {
                  padding: 10px 15px;
                  font-size: 14px;
                }
              }

              @media (max-width: 576px) {
                .search-container {
                  flex-direction: row;
                }

                .search-text {
                  display: none; 
                }

               .search-icon {
                display: inline-block; 
                font-size: 2px;
                background-color: white; 
                color: #ff8c00; 
                padding: 7px; 
                border-radius: 50%; 
              }
              .search-input {
                padding: 10px;
                font-size: 12px;
              }

              .search-button {
                font-size: 14px;
                width: 50px; 
                }
              }

              @media (max-width: 375px) {
                .search-input {
                  font-size: 12px;
                  padding: 8px;
                }

                .search-button {
                  font-size: 12px;
                  padding: 8px;
                }
              }


              </style>

                <div id="search-container" class="search-container">
                    <input class="search-input" placeholder="Search cocktail recipes..." id="searchElement" type="search">
                      <button class="search-button" id="searchButtonElement" type="submit">
                      <span class="search-text">Search</span>
                      <i class="fas fa-search search-icon"></i></button>
              </div>     
            `;

            this.shadowDOM.querySelector('#searchButtonElement').addEventListener('click', () => {
              this._clickEvent();
            
              const drinkList = document.querySelector("detail-section");
              if (drinkList) {
                drinkList.style.display = "none";
              }
            });                 
    
  }
}

customElements.define('search-bar', SearchBar);