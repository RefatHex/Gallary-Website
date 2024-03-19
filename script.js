document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter_buttons button");
  const filterableCards = document.querySelector(".filterable_cards");

  const filterCards = (e) => {
    const targetName = e.target.dataset.name;

    filterButtons.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");

    filterableCards.innerHTML = "";

    if (targetName === "all") {
      fetch(`images/all`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(data, "text/html");
          const links = htmlDocument.querySelectorAll("#files a.icon-image");

          links.forEach((link) => {
            const imageURL = link.getAttribute("href");
            const card = document.createElement("div");
            card.classList.add("card", "tall-card");
            card.innerHTML = `
                <img src="${imageURL}" alt="" />
              `;
            filterableCards.appendChild(card);
          });
        })
        .catch((error) => {
          console.error("Error fetching or parsing images:", error);
        });
    } else {
      // Fetch images based on the selected category
      fetch(`images/${targetName}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(data, "text/html");
          const links = htmlDocument.querySelectorAll("#files a.icon-image");

          links.forEach((link) => {
            const imageURL = link.getAttribute("href");
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${imageURL}" alt="${targetName}" />
                <div class="card_body">
                <h6 class="card_title">${
                  targetName === "cards"
                    ? "Gift Card"
                    : targetName.charAt(0).toUpperCase() + targetName.slice(1)
                }</h6>
                <p class="card_text">Lorem ipsum dolor sit amet</p>
              </div>
              `;
            filterableCards.appendChild(card);
          });
        })
        .catch((error) => {
          console.error("Error fetching or parsing images:", error);
        });
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", filterCards);
  });

  filterButtons[0].click();
});
