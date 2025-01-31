//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function loadImage(image) {
	return new Promise((resolve, reject) =>{
		const img = new Image();
		img.src = image.url;
		img.onload = () => resolve(img);
		img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
	});
}

function downloadImage() {
	output.innerHTML = "";
	const loading = document.createElement("div");
	loading.id = "loading";
	loading.innerText = "Loading...";
	output.appendChild(loading);

    Promise.all(images.map(loadImage))
    .then((loadedImages) => {
    loading.remove();
		loadedImages.forEach((img) => output.appendChild(img));
	})
	.catch((error) => {
		loading.remove();
		const errorDiv = document.createElement("div");
		errorDiv.id = "error";
		errorDiv.innerText = error;
	    output.appendChild(errorDiv);
	});
}
btn.addEventListener("click", downloadImages);