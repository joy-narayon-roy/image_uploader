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

  document.getElementById("upprba").classList.remove("d-none")

  let form = new FormData();
  form.append("file", file);

  fileName.innerHTML = name;
  fileProgress.setAttribute("max", size);
  

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/upload");

  xhr.upload.addEventListener("progress", (e) => {
    fileProgress.setAttribute("value", e.loaded);
  });

  xhr.onreadystatechange=function(eve){
    if (eve.currentTarget.status==202) {
      document.getElementById("upprba").classList.add("d-none")
      location.reload();
    }
  }

  xhr.send(form);
}
