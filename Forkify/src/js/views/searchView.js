import { Elements } from "./base";

export const getInput = () => {
    // console.log('searchInput : '+Elements.searchInput.value);
    return Elements.searchInput.value;
};

export const clearInput = () => {
    Elements.searchInput.value = '';
};

export const clearResults = () => {
    Elements.searchRecList.innerHTML = '';
};

export const clearBtn = () => {
    Elements.searchResPages.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => { //////// <========= work n understand properly.
    const newTitle = [];
    if (title.length > limit) {

        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(" ")}...`;
    }
    return title;
}

const renderRecipe = recipe => {

    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`

    document.querySelector('.results__list').insertAdjacentHTML("beforeend", markup); // TODO

};


const createBtn = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        // Only goto next button 
        button = createBtn(page, 'next');
    }
    else if (page < pages) {
        button = `
        ${button = createBtn(page, 'prev')}
        ${button = createBtn(page, 'next')}
        `
    }
    else if (page === pages && pages > 1) {
        // Only goto prev button
        button = createBtn(page, 'prev');

    }

    Elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    /// render results of current page 
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render the pagination button
    renderButtons(page, recipes.length, resPerPage);
};









