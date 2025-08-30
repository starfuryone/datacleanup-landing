async function uploadSelectedFile(){
  const fileInput = document.getElementById('fileInput');
  if(!fileInput || !fileInput.files.length){ alert("Choose a CSV/XLSX file first."); return; }
  const file = fileInput.files[0];

  const { API_BASE } = window.DATA_CLEANUP_CONFIG || {};
  if(!API_BASE) return alert("Missing API_BASE in config.js");

  const form = new FormData();
  form.append("file", file);

  const token = sessionStorage.getItem('job_token') || '';
  try{
    const res = await fetch(`${API_BASE}/v1/clean`, {
      method:"POST",
      body: form,
      headers: token ? { "X-Job-Token": token } : {}
    });
    if(!res.ok) throw new Error("Upload failed");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = "cleaned.csv";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    document.getElementById('result').textContent = "✅ Cleaned file downloaded.";
  }catch(err){
    console.error(err);
    document.getElementById('result').textContent = "❌ Upload failed. Check console.";
  }
}
window.uploadSelectedFile = uploadSelectedFile;
