let allQuotes = [];

const quotesContainer = document.getElementById("quotes");
const featuredContainer = document.getElementById("featured");
const searchInput = document.getElementById("search");
const totalCount = document.getElementById("totalCount");
const favoriteCount = document.getElementById("favoriteCount");
const randomBtn = document.getElementById("randomBtn");

fetch("quotes.json")
    .then(res => res.json())
    .then(data => {

        allQuotes = data;

        totalCount.textContent = data.length;
        favoriteCount.textContent = data.filter(q => q.favorite).length;

        render(data);

    });

function render(quotes){

    quotesContainer.innerHTML = "";
    featuredContainer.innerHTML = "";

    if(quotes.length === 0){

        quotesContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    Ничего не найдено 😔
                </div>
            </div>
        `;

        return;
    }

    // Главная мудрость

    const featured = quotes[0];

    featuredContainer.innerHTML = `
        <div class="card shadow-lg mb-5 border-0">

            <div class="card-body p-5">

                <span class="badge bg-warning text-dark mb-3">
                    🌟 Главная мудрость
                </span>

                <h2 class="mb-3">${featured.title}</h2>

                <p class="fs-5">${featured.text}</p>

                <hr>

                <p>
                    ❤️ <strong>Что она дала мне:</strong>
                </p>

                <p>${featured.reflection}</p>

                <small class="text-secondary">

                    ${featured.author} • ${featured.date}

                </small>

            </div>

        </div>
    `;

    // Остальные карточки

    quotes.slice(1).forEach(quote=>{

        quotesContainer.innerHTML += `

        <div class="col-md-6">

            <div class="card h-100 shadow-sm border-0">

                <div class="card-body">

                    <h4>${quote.title}</h4>

                    <p>

                    ${
                        quote.text.length > 220
                        ? quote.text.substring(0,220)+"..."
                        : quote.text
                    }

                    </p>

                </div>

                <div class="card-footer bg-white border-0">

                    ⭐ ${quote.favorite ? "Избранная" : "Обычная"}

                </div>

            </div>

        </div>

        `;

    });

}

searchInput.addEventListener("input",()=>{

    const value = searchInput.value.toLowerCase();

    const filtered = allQuotes.filter(q=>

        q.title.toLowerCase().includes(value) ||

        q.text.toLowerCase().includes(value)

    );

    render(filtered);

});

randomBtn.addEventListener("click",()=>{

    if(allQuotes.length===0) return;

    const random = allQuotes[Math.floor(Math.random()*allQuotes.length)];

    alert(
`${random.title}

${random.text}`
    );

});
