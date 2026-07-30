const container = document.getElementById("quotes");

fetch("quotes.json")
    .then(response => response.json())
    .then(quotes => {

        container.innerHTML = "";

        quotes.forEach((quote, index) => {

            const card = document.createElement("div");
            card.className = "quote-card";

            card.innerHTML = `
                <h3>📖 ${quote.title}</h3>

                <p class="text">${quote.text}</p>

                <div class="info">
                    <span>👤 ${quote.author}</span>
                    <span>📅 ${quote.date}</span>
                </div>

                <button class="reflection-btn">
                    ❤️ Эта мысль помогла мне
                </button>

                <div class="reflection">
                    ${quote.reflection}
                </div>
            `;

            container.appendChild(card);

            setTimeout(() => {
                card.classList.add("show");
            }, index * 150);

            const button = card.querySelector(".reflection-btn");
            const reflection = card.querySelector(".reflection");

            button.addEventListener("click", () => {
                reflection.classList.toggle("open");
            });

        });

    });
