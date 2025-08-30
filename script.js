document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) return;

  const file = fileInput.files[0];
  document.getElementById("status").innerText = "Requesting upload URL...";

  try {
    // Step 1: Ask API for pre-signed upload URL
    const initRes = await fetch("https://api.datacleanup.pro/v1/clean:init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const initData = await initRes.json();
    const uploadUrl = initData.upload_url;
    const jobId = initData.job_id;
    const keyIn = initData.key_in;

    document.getElementById("status").innerText = "Uploading file...";

    // Step 2: Upload file directly to Spaces/S3
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": "text/csv" },
      body: file,
    });

    // Step 3: Enqueue cleaning job
    const enqueueRes = await fetch("https://api.datacleanup.pro/v1/clean:enqueue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: jobId, key_in: keyIn }),
    });
    const enqueueData = await enqueueRes.json();
    const keyOut = enqueueData.key_out;

    document.getElementById("status").innerText = "Processing... please wait";

    // Step 4: Poll job status until complete
    let downloadUrl = null;
    while (!downloadUrl) {
      const statusRes = await fetch(`https://api.datacleanup.pro/v1/jobs/${jobId}?key_out=${keyOut}`);
      const statusData = await statusRes.json();
      if (statusData.status === "done") {
        downloadUrl = statusData.download_url;
        break;
      }
      await new Promise((r) => setTimeout(r, 3000)); // wait 3s before retry
    }

    document.getElementById("status").innerText = "Done!";
    document.getElementById("downloadLink").innerHTML =
      `<a href="${downloadUrl}" target="_blank" class="btn">Download cleaned CSV</a>`;
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error: " + err.message;
  }
});
