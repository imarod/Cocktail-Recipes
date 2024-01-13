
class AppBar extends HTMLElement {
    constructor() {
      super();
      this.shadowDOM = this.attachShadow({mode: 'open'});
    }
   
    connectedCallback(){
      this.render();
    }
   
    render() {
      this.shadowDOM.innerHTML = `
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            margin-left: 45%;
          }
          :host {
            display: block;
            width: 100%;
            background-color: #160040;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          }
         
          h2 {
            margin-top: 0;
            padding: 16px;
            color : #ff960b;
          }
          @media screen and (max-width: 552px) {
            * {
                margin-left: 45%;
           }
           h2 {
            font-size : 17px
           }
           

           @media screen and (max-width: 325px) {
            * {
              margin-left: 50%;
            }
            h2 {
              font-size : 10px;
              padding: 15px;
            }
           }

           @media screen and (max-width: 325px){
            h2 {
              font-size : 15px;
           }
          }
        </style>
        
        <h2>Cocktail Recipes</h2>
      `;
    }
  }
   
  customElements.define('app-bar', AppBar);