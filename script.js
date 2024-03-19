document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter_buttons button");
  const filterableCards = document.querySelectorAll(".filterable_cards .card");

  console.log(filterableCards, filterButtons);

  const filterCards = (e) => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    const targetName = e.target.dataset.name;

    Array.from(filterableCards).forEach((card) => {
      card.classList.add("hide");

      if (targetName === "all" || card.dataset.name === targetName) {
        card.classList.remove("hide");
      }
    });
  };

  Array.from(filterButtons).forEach((button) => {
    button.addEventListener("click", filterCards);
  });
});
