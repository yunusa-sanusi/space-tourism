const contentNumberContainer = document.querySelector(
  ".content-number-container",
);
const contentContainer = document.querySelector(".content-container");
const contentTextContainer = document.querySelector(".content-text-container");
const imageContainer = document.querySelector(".image-container");

async function getData() {
  const response = await fetch("../data.json");
  const { technology } = await response.json();

  const data = technology[0];

  populateFields(data);

  technology.map((person, index) => {
    const contentNumber = document.createElement("button");
    contentNumber.classList.add("content-number");
    contentNumber.textContent = `${index + 1}`;

    contentNumberContainer.appendChild(contentNumber);
  });

  contentChange(technology);
}

function contentChange(data) {
  const numberNavs = Array.from(document.querySelectorAll(".content-number"));

  numberNavs[0].classList.add("active");

  contentNumberContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("content-number")) {
      const btnIndex = numberNavs
        .map((btn, index) => {
          btn.classList.remove("active");
          if (btn === e.target) {
            return index;
          }
        })
        .filter((index) => index !== undefined);

      numberNavs[btnIndex].classList.add("active");
      contentTextContainer.innerHTML = "";
      imageContainer.innerHTML = "";
      populateFields(data[btnIndex]);
    }
  });
}

function populateFields(data) {
  contentTextContainer.innerHTML = `
    <h5 class="subheading2">The terminology...</h5>
    <h4>${data.name}</h4>
    <p class="description">${data.description}</p>
  `;

  const image = document.createElement("img");
  if (window.innerWidth < 768) {
    image.setAttribute("src", `${data.images.landscape}`);
  } else {
    image.setAttribute("src", `${data.images.portrait}`);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      image.setAttribute("src", `${data.images.landscape}`);
    } else {
      image.setAttribute("src", `${data.images.portrait}`);
    }
  });
  imageContainer.appendChild(image);
}

getData();
