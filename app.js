
let newsData = [];

async function loadNews(){

    const res = await fetch("news.json?v=" + Date.now());

    newsData = await res.json();

    renderFeatured(newsData[0]);

    renderNews(newsData);
}

function renderFeatured(news){

    document.getElementById("featured-news").innerHTML = `
        <img src="${news.image}">

        <div class="featured-content">
            <h3>${news.title}</h3>
            <p>${news.summary}</p>
        </div>
    `;
}

function renderNews(list){

    const html = list.map((item,index)=>`

        <div class="news-card" onclick="openNews(${index})">

            <img src="${item.image}">

            <div class="news-info">

                <div class="news-date">
                    ${item.date}
                </div>

                <div class="news-category">
                    ${item.category}
                </div>

                <h3>${item.title}</h3>

                <p>${item.summary}</p>

            </div>

        </div>

    `).join("");

    document.getElementById("news-list").innerHTML = html;
}

function openNews(index){

    const item = newsData[index];

    let videoHtml = "";

    if(item.youtube){

        videoHtml = `
            <div class="video-box">
                <iframe src="https://www.youtube.com/embed/${item.youtube}"
                        allowfullscreen>
                </iframe>
            </div>
        `;
    }

    document.getElementById("modal-body").innerHTML = `

        <img src="${item.image}"
             style="width:100%;max-height:450px;object-fit:cover;">

        <div style="padding:25px">

            <h1 style="margin-bottom:15px;color:#0d47a1">
                ${item.title}
            </h1>

            <div style="margin-bottom:20px;color:#666">
                ${item.date} | ${item.category}
            </div>

            ${videoHtml}

            <div style="
                margin-top:25px;
                line-height:1.8;
                font-size:17px;
            ">
                ${item.content}
            </div>

        </div>

    `;

    document.getElementById("news-modal")
        .classList.remove("hidden");

    increaseViews();
}

function closeModal(){

    document.getElementById("news-modal")
        .classList.add("hidden");
}

function increaseViews(){

    let views = localStorage.getItem("school_views") || 0;

    views++;

    localStorage.setItem("school_views", views);

    document.getElementById("visitor-count")
        .innerText = views;
}

function loadViews(){

    let views = localStorage.getItem("school_views") || 0;

    document.getElementById("visitor-count")
        .innerText = views;
}

loadViews();
loadNews();
