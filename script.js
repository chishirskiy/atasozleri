fetch("quotes.json")
    .then(res => res.json())
    .then(data => {

        const featured = document.getElementById("featured");
        const quotes = document.getElementById("quotes");
        const search = document.getElementById("search");
        const randomBtn = document.getElementById("randomQuote");

        function preview(text) {
            return "";
        }

        function render(list) {

            quotes.innerHTML = "";

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

                    <h2>${list[0].title}</h2>

                    <p>
                        ${preview(list[0].text)}
                    </p>

                    <button
                        class="btn btn-primary mt-3"
                        onclick="showQuote(${0})">
                        📖 Читать полностью
                    </button>
                </div>
            `;

            // Остальные карточки
            list.slice(1).forEach((quote, index) => {

                quotes.innerHTML += `
                    <div class="col-md-6">

                        <div class="card p-4 h-100">

                            <h4>${quote.title}</h4>

                            <p>
                                ${preview(quote.text)}
                            </p>

                            <button
                                class="btn btn-outline-light mt-auto"
                                onclick="showQuote(${index + 1})">

                                Читать полностью →

                            </button>

                        </div>

                    </div>
                `;

            });

        }

        window.showQuote = function(index){

            document.getElementById("modalTitle").textContent =
                data[index].title;

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

        
        render(data);
        
        randomBtn.addEventListener("click", () => {

            const randomIndex = Math.floor(Math.random() * data.length);

            window.showQuote(randomIndex);

        });

        search.addEventListener("input", function () {

            const value = this.value.toLowerCase();

            const filtered = data.filter(q =>
                q.title.toLowerCase().includes(value) ||
                q.text.toLowerCase().includes(value)
            );

            render(filtered);

        });

    });
// ===========================
// Открытие книги
// ===========================

const openBookBtn = document.getElementById("openBook");
const book = document.getElementById("book");

openBookBtn.addEventListener("click", () => {

    // скрываем кнопку
    openBookBtn.style.display = "none";

    // показываем книгу
    book.style.display = "block";

    // плавное появление
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

    // плавно прокручиваем к книге
    book.scrollIntoView({
        behavior: "smooth"
    });

});
