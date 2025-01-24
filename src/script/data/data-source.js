class DataSource {
  static cache = new Map()
  static async getfilterdrink() {
    const categories = ["Cocktail", "Shot", "Homemade_Liqueur", "Soft_Drink", "Ordinary_Drink"]
    let allDrinks = []

    for (const category of categories) {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        const responseJson = await response.json()

        if (responseJson.drinks && Array.isArray(responseJson.drinks)) {
          // Add category to each drink
          const drinksWithCategory = responseJson.drinks.map((drink) => ({
            ...drink,
            strCategory: category.replace("_", " / "),
          }))
          allDrinks = [...allDrinks, ...drinksWithCategory]
        } else {
          console.warn(`No drinks found for category: ${category}`)
        }
      } catch (error) {
        console.error(`Error fetching ${category}:`, error)
      }
    }

    if (allDrinks.length === 0) {
      throw new Error("No drinks found")
    }

    return allDrinks
  }

  
  static async searchDrink(keyword) {
    try {
      if (!keyword.trim()) {
        return null
      }
      if (this.cache.has(keyword)) {
        return this.cache.get(keyword)
      }

      let result = await this.searchByName(keyword)
      if (result.length === 0) {
        result = await this.searchByFirstLetter(keyword[0])
      }
      result = this.fuzzySearch(result, keyword)
      this.cache.set(keyword, result)

      return result
    } catch (error) {
      throw new Error("An error occurred while searching for drinks")
    }
  }


  static async getDrinkDetails(id) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    const responseJson = await response.json()
    if (responseJson.drinks) {
      return Promise.resolve(responseJson.drinks[0])
    } else {
      return Promise.reject('Drink not found')
    }
  }

  static async searchByName(keyword) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`)
    const responseJson = await response.json()
    return responseJson.drinks || []
  }

  static async searchByFirstLetter(letter) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    const responseJson = await response.json()
    return responseJson.drinks || []
  }

  static fuzzySearch(drinks, keyword) {
    const lowercaseKeyword = keyword.toLowerCase()
    return drinks.filter(
      (drink) =>
        drink.strDrink.toLowerCase().includes(lowercaseKeyword) ||
        this.levenshteinDistance(drink.strDrink.toLowerCase(), lowercaseKeyword) <= 2,
    )
  }

  static levenshteinDistance(a, b) {
    if (a.length === 0) return b.length
    if (b.length === 0) return a.length

    const matrix = []

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        }
      }
    }

    return matrix[b.length][a.length]
  }


  static async searchIngredient(id) {
    const response = await fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`)
    const responseJson = await response.json()

    if (responseJson.drinks) {
      return responseJson.drinks
    } else {
      throw new Error(`${id} is not found`)
    }
  }
}

export default DataSource

