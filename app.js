// catagories list 

const loadedCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = (catagories) => {
    const categoryList = document.getElementById('category');
    for (const category of catagories) {
        const categoryUl = document.createElement('li');
        categoryUl.classList.add('nav-item')
        categoryUl.innerHTML = ` 
        <a class="nav-link text-danger btn btn-outline-dangertext-center ps-2 mt-3 me-2 border-0 fw-semibold" onclick="selectCategory('${category.category_id}')">${category.category_name}</a>`

        categoryList.appendChild(categoryUl);

    };
}



