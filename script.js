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

function downloadImage(image) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img); // Resolves if the image loads successfully
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Rejects if the image fails to load
        img.src = image.url;
      });
    }

    btn.addEventListener("click", () => {
      loading.style.display = "block";
      output.innerHTML = ''; // Clear any previous images
      errorDiv.innerHTML = ''; // Clear any previous error messages

      Promise.all(images.map(downloadImage))
        .then((imgs) => {
          loading.style.display = "none";

          imgs.forEach((img) => {
            output.appendChild(img);
          });
        })
        .catch((error) => {
          loading.style.display = "none";

          errorDiv.innerHTML = error; // Display the error in the error div
        });
    });