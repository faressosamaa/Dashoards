console.log("JS LOADED ✅");

document.addEventListener("click", (e) => {
  const b1 = e.target.closest("#goBtn");
  if (b1) {
    window.location.href = "ListOfAssets.html";
    return;
  }

  const b2 = e.target.closest("#goBtn2");
  if (b2) {
    window.location.href = "ListOfTickets.html";
    return;
  }
});


document.addEventListener("click", () => {
  const options = document.querySelector(".options");
  if (options) options.style.display = "none";
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-parent");
    if (!btn) return;

    const group = btn.closest(".nav-group");
    if (!group) return;

    group.classList.toggle("open");
  });



  document.addEventListener("click", (e) => {
    // open/close
    const btn = e.target.closest(".dd-btn");
    if (btn) {
      const dd = btn.closest(".dd");
      // close others
      document.querySelectorAll(".dd.open").forEach(x => x !== dd && x.classList.remove("open"));
      dd.classList.toggle("open");
      return;
    }

    // choose option
    const item = e.target.closest(".dd-item");
    if (item) {
      const dd = item.closest(".dd");
      const value = item.dataset.value || item.textContent.trim();

      dd.querySelectorAll(".dd-item").forEach(x => x.classList.remove("active"));
      item.classList.add("active");

      const valueEl = dd.querySelector(".dd-value");
      valueEl.textContent = value;
      valueEl.classList.remove("is-placeholder");

      const hidden = dd.querySelector(".dd-hidden");
      if (hidden) hidden.value = value;

      dd.classList.remove("open");
      return;
    }

    // click outside -> close
    document.querySelectorAll(".dd.open").forEach(x => x.classList.remove("open"));
  });

  // placeholder state on load
  document.querySelectorAll(".dd").forEach(dd => {
    const valueEl = dd.querySelector(".dd-value");
    if (!valueEl) return;
    const ph = valueEl.dataset.placeholder;
    if (valueEl.textContent.trim() === ph) valueEl.classList.add("is-placeholder");
  });

   const refreshBtn = document.getElementById("refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".side-search input");
  const groups = document.querySelectorAll(".nav-group");

  if (!input) return;

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();

    groups.forEach(g => {
      const parent = g.querySelector(".nav-parent");
      const subs = g.querySelectorAll(".submenu-item");

      // لو البحث فاضي: رجّع كله
      if (!q) {
        if (parent) parent.style.display = "";
        subs.forEach(s => (s.style.display = ""));
        g.classList.remove("open");
        return;
      }

      // parent match؟
      const parentMatch = parent && parent.textContent.toLowerCase().includes(q);

      // submenu match؟
      let subMatch = false;
      subs.forEach(s => {
        const ok = s.textContent.toLowerCase().includes(q);
        s.style.display = ok ? "" : "none";
        if (ok) subMatch = true;
      });

      // إظهار / إخفاء + فتح الجروب لو فيه subMatch
      if (parent) parent.style.display = (parentMatch || subMatch) ? "" : "none";
      g.classList.toggle("open", subMatch || parentMatch);
    });
  });
});
