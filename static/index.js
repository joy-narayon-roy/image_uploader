const inputArea = document.getElementById("inputArea");
let fileName = document.getElementById("upfina");
let fileProgress = document.getElementById("upfipo");

inputArea.addEventListener("click", (e) => {
  let input = document.createElement("input");
  // <input type="file" name="img" accept="image/*">
  input.setAttribute("type", "file");
  input.setAttribute("name", "img");
  input.setAttribute("accept", "image/*");
  input.click();

  input.addEventListener("change", (e) => {
    uploadImage(e.target.files[0]);
  });
});

async function uploadImage(file) {
  const { name, size } = file;

  let form = new FormData();
  form.append("file", file);

  fileName.innerHTML = name;
  fileProgress.setAttribute("max", size);
  fileProgress.setAttribute("value", 5);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/upload");
  xhr.upload.addEventListener("progress", (e) => {
    fileProgress.setAttribute("value", e.loaded);
  });

  xhr.onreadystatechange = function(){
    if (this.status==200) {
      alert("Done")
    }
    console.log(this);
  }

  xhr.send(form);
}
