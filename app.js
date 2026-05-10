
/* ===== AUTO GALLERY ===== */

function buildGallery(folder, total = 20){

    let html = `
        <div class="auto-gallery">
    `;

    for(let i = 1; i <= total; i++){

        html += `
            <img src="images/${folder}/${i}.jpg"
                 onclick="openImage(this.src)">
        `;
    }

    html += `</div>`;

    return html;
}

function openImage(src){

    const viewer = document.getElementById("image-viewer");

    viewer.innerHTML = `
        <div class="viewer-bg" onclick="closeViewer()">
            <img src="${src}">
        </div>
    `;

    viewer.style.display = "flex";
}

function closeViewer(){

    document.getElementById("image-viewer").style.display = "none";
}
