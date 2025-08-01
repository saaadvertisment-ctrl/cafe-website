document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("admin")) return;

  let isAdmin = false;
  const password = localStorage.getItem("admin-pass");

  function enableEditMode() {
    document.querySelectorAll("[contenteditable]").forEach(el => {
      el.contentEditable = true;
    });
    isAdmin = true;
  }

  if (password === "admin123") {
    enableEditMode();
  } else {
    const input = prompt("Enter admin password to edit:");
    if (input === "admin123") {
      localStorage.setItem("admin-pass", "admin123");
      enableEditMode();
    }
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("admin-pass");
    location.reload();
  });

  window.addEventListener("beforeunload", () => {
    if (isAdmin) {
      document.querySelectorAll("[contenteditable]").forEach(el => {
        localStorage.setItem("saved-" + el.innerText.slice(0, 10), el.innerHTML);
      });
    }
  });
});