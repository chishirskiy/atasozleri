fetch("quotes.json?v=2")
    .then(res => res.json())
    .then(data => {

        const featured = document.getElementById("featured");
        const quotes = document.getElementById("quotes");
        const search = document.getElementById("search");
        const randomBtn = document.getElementById("randomQuote");
        const dailyBtn = document.getElementById("dailyQuote");
        const prevBtn = document.getElementById("prevQuote");
        const nextBtn = document.getElementById("nextQuote");
        const favoriteFilterBtn = document.getElementById("favoriteFilter");
        let favoritesOnly = false;
        const savedFavorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );

        data.forEach((quote, index) => {
            quote.favorite = savedFavorites[index] || false;
        });

        function preview(text) {
            if (text.length <= 180) return text;

            return text.substring(0, 180) + "...";
        }

        function render(list) {

            quotes.innerHTML = "";
            featured.innerHTML = "";

            if (list.length === 0) {
                quotes.innerHTML = `
                    <div class="text-center mt-5">
                        <h3>😔 Ничего не найдено</h3>
                    </div>
                `;
                return;
            }

            // Главная карточка
        featured.innerHTML = `
            <div class="card p-4">

                <span class="badge bg-warning text-dark mb-3">
                    🌟 Главная мудрость
                </span>

                <div class="d-flex justify-content-between align-items-center mb-2">

                <h2 class="mb-0">${list[0].title}</h2>
    
                <button
                    class="favorite-btn btn ${list[0].favorite ? "btn-warning" : "btn-outline-warning"}"
                    onclick="toggleFavorite(${data.indexOf(list[0])})">

                    ⭐

                </button>

            </div>

            <p>
                ${preview(list[0].text)}
            </p>

            <button
                class="btn btn-primary mt-3"
                onclick="showQuote(${data.indexOf(list[0])})">
                📖 Читать полностью
            </button>

        </div>
    `;

            // Остальные карточки
            list.slice(1).forEach((quote) => {

                const realIndex = data.indexOf(quote);

                quotes.innerHTML += `
                    <div class="col-md-6">

                        <div class="card p-4 h-100">

                            <div class="d-flex justify-content-between align-items-center mb-2">
    
                                <h4 class="mb-0">${quote.title}</h4>

                            <button
                                class="favorite-btn btn btn-sm ${quote.favorite ? "btn-warning" : "btn-outline-warning"}"
                                onclick="toggleFavorite(${realIndex})">

                                ⭐

                            </button>

                        </div>

                        <p>
                            ${preview(quote.text)}
                        </p>

                        <button
                            class="btn btn-outline-light mt-auto"
                            onclick="showQuote(${realIndex})">

                            Читать полностью →

                        </button>

                    </div>

                </div>
            `;

        });

        }

        function applyFilters() {

            const value = search.value.toLowerCase();

            let filtered = data.filter(q =>
                q.title.toLowerCase().includes(value) ||
                q.text.toLowerCase().includes(value)
            );

            if (favoritesOnly) {
                filtered = filtered.filter(q => q.favorite);
            }

            render(filtered);
        }
        
        let currentQuoteIndex = 0;

        window.showQuote = function(index){

            document.getElementById("modalTitle").textContent =
                data[index].title;
            
            const copyBtn = document.getElementById("copyQuote");

            copyBtn.onclick = () => {

                navigator.clipboard.writeText(
                    data[index].title +
                    "\n\n" +
                    data[index].text
                );

                copyBtn.innerHTML = "✅ Скопировано";

                setTimeout(() => {
                    copyBtn.innerHTML = "📋 Копировать";
                }, 2000);

            };

            document.getElementById("modalText").textContent =
                data[index].text;

            document.getElementById("wisdomDate").innerHTML =
                `📅 <strong>${data[index].date || "Не указана"}</strong>`;

            const modal =
                new bootstrap.Modal(
                    document.getElementById("quoteModal")
                );

        modal.show();

        };

        window.toggleFavorite = function(index){

            data[index].favorite = !data[index].favorite;

            localStorage.setItem(
                "favorites",
                JSON.stringify(
                    data.map(q => q.favorite)
                )
            );

            applyFilters();

        };

        
        render(data);
        
        randomBtn.addEventListener("click", () => {

            const randomIndex = Math.floor(Math.random() * data.length);

            window.showQuote(randomIndex);

        });

        dailyBtn.addEventListener("click", () => {

            const today = new Date();

            // Номер текущего дня
            const dayNumber = Math.floor(today.getTime() / 86400000);

            // Каждый день выбирается одна и та же мудрость
            const index = dayNumber % data.length;

            window.showQuote(index);

        });

        favoriteFilterBtn.addEventListener("click", () => {

            favoritesOnly = !favoritesOnly;

            if (favoritesOnly) {
    
                favoriteFilterBtn.innerHTML = "⭐ Показать все";

                favoriteFilterBtn.classList.remove("btn-outline-warning");
                favoriteFilterBtn.classList.add("btn-warning");

        } else {

            favoriteFilterBtn.innerHTML = "⭐ Только избранные";

            favoriteFilterBtn.classList.remove("btn-warning");
            favoriteFilterBtn.classList.add("btn-outline-warning");

        }

        applyFilters();

        });

        

        search.addEventListener("input", function () {
            applyFilters();
        });

    });
// ===========================
// Открытие книги
// ===========================

const openBookBtn = document.getElementById("openBook");
const book = document.getElementById("book");

openBookBtn.addEventListener("click", () => {

    openBookBtn.style.display = "none";

    book.style.display = "block";

    book.animate(
        [
            {
                opacity: 0,
                transform: "translateY(40px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 700,
            easing: "ease-out"
        }
    );

    book.scrollIntoView({
        behavior: "smooth"
    });

});


