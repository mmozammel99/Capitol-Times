// catagories list 

const loadedCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const displayCategory = (catagories) => {
    const categoryList = document.getElementById('category');

    catagories.forEach(category => {

        document.getElementById('ctg-nm').innerText =category.category_name; 

        const categoryUl = document.createElement('li');
        categoryUl.classList.add('nav-item')

        categoryUl.innerHTML = ` 
            <a class="nav-link  btn btn-outline-danger text-center p-3 mt-3 me-2 border-0 fw-semibold" onclick="selectCategory('${category.category_id}')">${category.category_name}</a>`

        categoryList.appendChild(categoryUl);
    });
}


// news section 
const loadedNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        newsField(data.data);
    }

    catch (error) {
        console.log(error);

    }
}



const newsField = (newses) => {
    newses.sort((a, b) => {
        return b.total_view - a.total_view;
    })
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
        newsCard.classList.add('my-4');
        newsCard.innerHTML = `
        <div class="row rounded ">
        <div class="col-md-3 ps-3 py-1">
            <img src="${thumbnail_url}" class=" w-100 rounded-start" alt="">
        </div>
        <div class="col-md-9  px-4 d-flex flex-column">
                <div class="card-body col-12">
                <h4 class="card-title">${title}</h4>
                <p class="card-text">${details.length > 700 ? details.slice(0, 700) + ' ...' : details}</p>
                </div>
          
                <div class="card-text row d-flex card-footer  ">
                    <div class="col-4 d-flex pt-3">
                        <img class="rounded-circle pe-2" style="width: auto; height:30px ;" src="${author.img}"
                         alt="">
                        <p>${author.name !== null ? author.name : 'No Data Available'} </p>
                    </div>
                    
                
                   <div class="col-4"><i class="fa-sharp fa-solid fa-eye pt-4 me-3"></i>${news.total_view === null ? 'No Data Available' : news.total_view}</div>

                   <div class="col-4 pt-3"><button class="btn btn-danger " id="btn-details" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="selectModal('${news._id}')"><i class="fa-solid fa-circle-right fa-lg"></i></button></div>
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
    <img class=" w-100 mb-5" src="${info.image_url}" alt="">
    <h2 class="text-canter fw-bold">${info.title}</h2> 
    <div class="card-body align-items-center">
                <div class="card-text row ">
                   <div class="col-5 col-md-4 d-flex ">
                    <div class="col-4 col-md-2">
                        <img class="rounded-circle" style="width: 30px; height:auto ;" src="${info.author.img}"
                         alt="">
                    </div>
                    <div class="col-8 col-md-10 ">
                        <p>${info.author.name !== null ? info.author.name : 'No Data Available'} </p>
                    </div>
                   </div>
                   <div class="col-5 col-md-6 ps-5 "><i class="fa-sharp fa-solid fa-eye me-3"></i>${info.total_view === null ? 'No Data Available' : info.total_view}</div>
                </div>
            </div>
          <p>${info.details}</p>
        `;




}

const selectModal = id => {
    loadedModal(id);
};

loadedCategory()
loadedNews('08')
