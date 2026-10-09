function showInvitation() {
  const code = new URLSearchParams(location.hash.slice(1)).get("code");
  history.replaceState(null, "", location.pathname + location.search);
  const valid = /^[a-f0-9]{64}$/.test(code ?? "");
  document.getElementById("fallback").hidden = !valid;
  document.getElementById("code").value = valid ? code : "";
  document.getElementById("status").textContent = "";
}
showInvitation();
window.addEventListener("hashchange", showInvitation);
document.getElementById("copy").addEventListener("click", async () => {
  const code = document.getElementById("code").value;
  if (!/^[a-f0-9]{64}$/.test(code)) return;
  try { await navigator.clipboard.writeText(code); document.getElementById("status").textContent = "Code copié."; }
  catch { document.getElementById("code").select(); document.getElementById("status").textContent = "Sélectionnez et copiez le code."; }
});
