const contentContainer = document.querySelector(".content-container");
const tabItemsList = document.getElementById("tab-items-list");
const content = document.querySelector(".content");

async function getData() {
  const response = await fetch("../data.json");
  const { destinations } = await response.json();

  tabItemsList.innerHTML = "";

  destinations.map((destination) => {
    const tabItem = document.createElement("li");
    tabItem.classList.add("tab-item");
    tabItem.textContent = `${destination.name}`;
    tabItemsList.appendChild(tabItem);
  });

  content.innerHTML = populateContent(destinations[0]);

  tabFunctionality(destinations);
}

function tabFunctionality(destinations) {
  const tabItems = document.querySelectorAll(".tab-item");
  const tabItemsArr = Array.from(tabItems);
  tabItemsArr[0].classList.toggle("active");

  tabItemsList.addEventListener("click", (e) => {
    const getItemClicked = tabItemsArr
      .map((item) => {
        item.classList.remove("active");
        return item;
      })
      .filter((item) => item.textContent === e.target.textContent);

    getItemClicked[0].classList.toggle("active");

    const dst = destinations
      .filter((dst) => dst.name === getItemClicked[0].textContent)
      .map((dst) => {
        const divContainer = document.createElement("div");
        content.innerHTML = populateContent(dst);
        contentContainer.appendChild(divContainer);
      });
  });
}

function populateContent(data) {
  return `
    <h1>${data.name}</h1>
    <p class="description">${data.description}</p>
    <div class="divider"></div>
    <div class="distance-time">
      <div class="distance">
        <p class="subheading2">Avg. distance</p>
        <p class="subheading1">${data.distance}</p>
      </div>
      <div class="travel-time">
        <p class="subheading2">Est. travel time</p>
        <p class="subheading1">${data.travel}</p>
      </div>
    </div>
  `;
}

getData();
