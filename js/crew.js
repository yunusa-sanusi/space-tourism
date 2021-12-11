const contentContainer = document.querySelector(".content-container");
const navigatorContainer = document.querySelector(".navigator-container");
const imageContainer = document.querySelector(".image-container");
const content = document.querySelector(".content");

async function getData() {
  const response = await fetch("../data.json");
  const { crew } = await response.json();

  const data = crew[0];

  populateFields(data);

  crew.map((person) => {
    const buttonNav = document.createElement("button");
    buttonNav.classList.add("navigator");

    navigatorContainer.appendChild(buttonNav);
  });

  imageController(crew);
}

function imageController(data) {
  const buttonNavs = Array.from(document.querySelectorAll(".navigator"));

  buttonNavs[0].classList.add("active");

  navigatorContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("navigator")) {
      const btnIndex = buttonNavs
        .map((btn, index) => {
          btn.classList.remove("active");
          if (btn === e.target) {
            return index;
          }
        })
        .filter((index) => index !== undefined);

      buttonNavs[btnIndex].classList.add("active");
      content.innerHTML = "";
      imageContainer.innerHTML = "";
      populateFields(data[btnIndex]);
    }
  });
}

function populateFields(data) {
  const div = document.createElement("div");
  div.innerHTML = `
    <h4>${data.role}</h4>
    <h3>${data.name}</h3>
    <p class="description">${data.bio}</p>
  `;
  content.appendChild(div);

  const image = document.createElement("img");
  image.setAttribute("src", `${data.images.png}`);
  imageContainer.appendChild(image);
}

getData();
