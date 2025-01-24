import "../component/categories-section.js";
import "../component/drink-item.js";
import "../component/drink-list.js";
import "../component/search-bar.js";
import "../component/detail-section.js";
import DataSource from "../data/data-source.js";

const main = async () => {
  await customElements.whenDefined("drink-list");
  await customElements.whenDefined("search-bar");
  await customElements.whenDefined("detail-section");

  const searchElement = document.querySelector("search-bar");
  const drinkListElement = document.querySelector("drink-list");
  const logoElement = document.querySelector(".home");
  const loadingElement = document.getElementById("loading");

  if (!drinkListElement || !searchElement || !logoElement || !loadingElement) {
    console.error("Required elements not found");
    return;
  }

  const showLoading = () => {
    loadingElement.style.display = "block";
  };

  const hideLoading = () => {
    loadingElement.style.display = "none";
  };

  const loadDefaultDrinks = async () => {
    try {
      showLoading(); 
      const drinks = await DataSource.getfilterdrink();

      if (drinks && drinks.length > 0) {
        drinkListElement.drinks = drinks;
        drinkListElement.style.display = "block";
      } else {
        drinkListElement.renderError("No drinks found");
      }
    } catch (error) {
      drinkListElement.renderError(error.message || "Error loading drinks");
    } finally {
      hideLoading(); 
    }
  };

  const onButtonSearchClicked = async () => {
    try {
      showLoading(); 
      const keyword = searchElement.value;
      const result = await DataSource.searchDrink(keyword);

      if (result === null || result.length === 0) {
        drinkListElement.renderError("No drinks found for your search");
      } else {
        drinkListElement.drinks = result;
        drinkListElement.style.display = "block";
      }
    } catch (error) {
      drinkListElement.renderError(error.message);
    } finally {
      hideLoading(); 
    }
  };

  searchElement.clickEvent = onButtonSearchClicked;

  logoElement.addEventListener("click", (event) => {
    event.preventDefault();
    loadDefaultDrinks();
  });

  await loadDefaultDrinks();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

export default main;
