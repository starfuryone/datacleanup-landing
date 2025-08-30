const API_BASE =
  location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://api.datacleanup.pro';

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const download = document.getElementById("download");

  if (!fileInput.files.length) {
    status.innerText = "Please select a file.";
    return;
  }
  const file = fileInput.files[0];
  status.innerText = "Uploading...";

  try {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_BASE}/v1/clean`, {
      method: "POST",
      body: form
    });

    if (!res.ok) throw new Error("Upload failed");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    download.innerHTML = `<a href="${url}" download="cleaned_${file.name}">Download cleaned file</a>`;
    status.innerText = "Done!";
  } catch (err) {
    console.error(err);
    status.innerText = "Error: " + err.message;
  }
});
