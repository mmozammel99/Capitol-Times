// catagories list 

const loadedCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = (catagories) => {
    const categoryList = document.getElementById('category');
    catagories.forEach(category => {
        const categoryUl = document.createElement('li');
        categoryUl.classList.add('nav-item')
        categoryUl.innerHTML = ` 
            <a class="nav-link  btn btn-outline-danger text-center ps-2 mt-3 me-2 border-0 fw-semibold" onclick="selectCategory('${category.category_id}')">${category.category_name}</a>`


        categoryList.appendChild(categoryUl);
    });
}


// news section 
const loadedNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    newsField(data.data);
}



const newsField = (newses) => {
    const newsField = document.getElementById('news-field');
    newsField.textContent = '';


    document.getElementById('found-news').innerText = newses.length;
    // news count
    const notFound = document.getElementById('not-found-msg')
    // not found msg 
    if (newses.length === 0) {
        notFound.classList.remove('d-none');
        toggleSpend(false);
        return;
    }
    else {
        notFound.classList.add('d-none');
    }
    // news card 

    newses.forEach(news => {
        const { thumbnail_url, title, details, author } = news;

        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('my-2');
        newsCard.innerHTML = `
        <div class="row rounded ">
        <div class="col-md-3 p-1">
            <img src="${thumbnail_url}" class="img-fluid rounded-start ms-3" alt="">
        </div>
        <div class="col-md-9 p-3">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.length > 700 ? details.slice(0, 700) + ' ...' : details}</p>
            <div class="card-body align-items-center">
                <div class="card-text row ">
                   <div class="col-5 col-md-4 d-flex ">
                    <div class="col-4 col-md-2">
                        <img class="rounded-circle" style="width: 30px; height:auto ;" src="${author.img}"
                         alt="">
                    </div>
                    <div class="col-8 col-md-10 ">
                        <p>${author.name !== null ? author.name : 'No Data Available'} </p>
                    </div>
                    
                   </div>
                   <div class="col-5 col-md-6 ps-5 "><img class="me-3" style="width: auto; height: 20px;" src="eye.svg"
                   alt="">${news.total_view === null ? 'No Data Available' : news.total_view}</div>
                   <div class="col-2 "><button class="btn border-danger " id="btn-details" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="selectModal('${news._id}')"><img style="width: auto; height: 20px;" src="right-arrows.png" alt=""></button></div>
                </div>
            </div>
        </div>
    </div>
    `;
        newsField.appendChild(newsCard)

    });
    toggleSpend(false);
}



const selectCategory = id => {
    toggleSpend(true);
    loadedNews(id);
};



// lodging

const toggleSpend = isLodging => {
    const lodging = document.getElementById('lodging')
    if (isLodging) {
        lodging.classList.remove('d-none')
    }
    else {
        lodging.classList.add('d-none')
    }
}

// modal 

const loadedModal = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModal(data.data[0]);
}

const displayModal = (info) => {
    const modelBody = document.getElementById('modal-Body');
    modelBody.innerHTML = `
        <div><h2 class="text-canter fw-bold">${info.title}</h2> </div> 
        <img class="align-canter w-100 mb-5" src="${info.image_url}" alt="">
        
          <p>${info.details}</p>
        `




}

const selectModal = id => {
    loadedModal(id);
};

loadedCategory()
loadedNews('08')
