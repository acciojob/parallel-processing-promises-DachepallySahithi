//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", () => {
  downloadImages(images);
});

function downloadImages(imageArray) {
  loading.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

   const imagePromises = imageArray.map((image) =>
    fetch(image.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load image's URL: ${image.url}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        img.alt = "Downloaded image";
        output.appendChild(img);
      })
      .catch((error) => {
        return Promise.reject(error); 
      })
  );

  Promise.all(imagePromises)
    .then(() => {
      loading.style.display = "none";
    })
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.textContent = error.message;
    });
}