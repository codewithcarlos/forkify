import { elements } from "./base";
import { Fraction } from "fractional";
import fracty from "fracty";

export const clearRecipe = () => {
  elements.recipe.innerHTML = "";
};

const formatCount = count => {
  if (count) {
    return `${fracty(count)}`;
  }
  return "?";
};

// const formatCount = count => {
//     if (count) {
//         // count === 2.5 --> 2 1/2

//         // const newCount = Math.round(count * 10000) / 10000;

//         const [int, dec] = count.toString().split('.').map(el => parseInt(el));

//         if (!dec) return count;

//         if (int === 0 && dec.toString().length < 4) {
//             // console.log(`int = ${int}`);
//             // console.log(`dec = ${dec}`);
//             // console.log(`lenght of dec = ${dec.toString().length}`);
//             const fr = new Fraction(count);
//             return `${fr.numerator}/${fr.denominator}`;

//         } else if (int === 0 && dec.toString().length >= 4) {
//             /* You can convert decimal part of count to a fraction using 10 x - x, where x is the count.
//             for example, 1 + 1/3 in javascript evaluates to 1.3333333. Decimal part of this = 0.33333 = x.

//             1) Multiply by 10x = 3.333333 = newNumerator.
//             2) Then subtract this by x, which gives 3. 10x - x = 9 = the new denominator
//             3) Insert the new numerator and the new denominator=9 to into the Fraction function
//             */

//             var newDec = count;
//             var numer = newDec * 10 - newDec;
//             var newNumerator = Math.round(numer * 10) / 10;

//             const fr = new Fraction(newNumerator, 9);
//             return `${fr.numerator}/${fr.denominator}`;
//         } else if (int !== 0 && dec.toString().length >= 4) {

//             var newDec = count - 1;
//             var numer = newDec * 10 - newDec;
//             var newNumerator = Math.round(numer * 10) / 10;

//             const fr = new Fraction(newNumerator, 9);
//             return `${int} ${fr.numerator}/${fr.denominator}`
//         } else {
//             // console.log(`int = ${int}`);
//             // console.log(`dec = ${dec}`);
//             // console.log(`lenght of dec = ${dec.toString().length}`);
//             const fr = new Fraction(count - int);
//             return `${int} ${fr.numerator}/${fr.denominator}`
//         }
//     }
//     return '?';
// };

const createIngredient = ingredient => `
    <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
    </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.time
                }</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  recipe.servings
                }</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${
                      isLiked ? "" : "-outlined"
                    }"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join("")}
            </ul>    

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${
                  recipe.author
                }</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${
              recipe.url
            }" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
  elements.recipe.insertAdjacentHTML("afterbegin", markup);
};

export const updateServingsIngredients = recipe => {
  // Update servings
  document.querySelector(".recipe__info-data--people").textContent =
    recipe.servings;
  // Update ingredients
  const countElements = Array.from(document.querySelectorAll(".recipe__count"));
  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
