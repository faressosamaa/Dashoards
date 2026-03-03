const allAssetTickets = {
  all: {
    Computers: 12, Monitors: 3, PDUs: 25, Softwares: 8,
    Phones: 18, Enclosures: 1, Racks: 14, NetworkDevices:23,
    Licenses:17, Printers:4
  },
  mon: {
    Computers: 10, Monitors: 9, PDUs: 8, Softwares: 7,
    Phones: 6, Enclosures: 5, Racks: 4, NetworkDevices:3,
    Licenses:2, Printers:1
  },
  tue: {
    Computers: 3, Monitors: 1, PDUs: 8, Softwares: 2,
    Phones: 6, Enclosures: 1, Racks: 5, NetworkDevices:6,
    Licenses:4, Printers:1
  },
  wed: {
    Computers: 5, Monitors: 1, PDUs: 7, Softwares: 3,
    Phones: 7, Enclosures: 0, Racks: 2, NetworkDevices:7,
    Licenses:3, Printers:1
  }
};

// ===== STATE =====
let currentDay = 'all';

// ===== HELPERS =====
function getAssetData(day) {
  const data = allAssetTickets[day] || allAssetTickets['all'];
  return {
    labels: Object.keys(data),
    values: Object.values(data)
  };
}

function getBarColors(values) {
  const maxValue = Math.max(...values) || 1;
  return values.map(v => {
    const ratio = v / maxValue; 
    const lightBlue = [173, 216, 230]; 
    const darkBlue  = [27, 58, 139];   
    const r = Math.round(lightBlue[0] + (darkBlue[0] - lightBlue[0]) * ratio);
    const g = Math.round(lightBlue[1] + (darkBlue[1] - lightBlue[1]) * ratio);
    const b = Math.round(lightBlue[2] + (darkBlue[2] - lightBlue[2]) * ratio);

    return `rgb(${r},${g},${b})`;
  });
}



// ===== INIT CHART =====
const ctxAssets = document.getElementById("assets3D").getContext("2d");
const { labels, values } = getAssetData(currentDay);

const assetsChart = new Chart(ctxAssets, {
  type: 'bar',
  data: {
    labels,
    datasets: [{
      data: values,
      borderRadius: 14,
      barThickness: 45,
      backgroundColor: getBarColors(values,ctxAssets),
      hoverBackgroundColor: "#ff8c00"
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1500, easing: "easeOutElastic" },
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        callbacks: { label: ctx => `${ctx.raw} Tickets` }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#100c0c" } },
      y: { beginAtZero: true, ticks: { color: "#0d0606" }, grid: { color: "rgba(255,255,255,0.1)" }, ticks: {
        callback: value => Number(value).toLocaleString('en-US')
      } }
    },
    onHover: (evt, elements) => {
      evt.native.target.style.cursor = elements.length ? "pointer" : "default";
    }
  },
  plugins: [{
    id: "3dShadow",
    beforeDraw(chart) {
      const ctx = chart.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.45)";
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 14;
    },
    afterDraw(chart) {
      chart.ctx.restore();
    }
  }]
});

// ===== PULSE ANIMATION =====
let grow = false;
setInterval(() => {
  assetsChart.options.animation.duration = 800;
  assetsChart.data.datasets[0].barThickness = grow ? 45 : 52;
  grow = !grow;
  assetsChart.update();
}, 2200);

// ===== DROPDOWN HANDLING =====
// ===== CUSTOM DROPDOWN =====
const customDropdown = document.querySelector('.custom-dropdown');

if(customDropdown) {
  const selected = customDropdown.querySelector('.selected');
  const options = customDropdown.querySelector('.options');
  let currentDay = 'all';  // default

  // فتح / غلق options عند الضغط على selected
  selected.addEventListener('click', () => {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });

  // اختيار يوم
  options.querySelectorAll('div').forEach(opt => {
    opt.addEventListener('click', () => {
      selected.textContent = opt.textContent;
      options.style.display = 'none';

      currentDay = opt.dataset.value; // يوم مختار
      const { labels, values } = getAssetData(currentDay);
      assetsChart.data.labels = labels;
      assetsChart.data.datasets[0].data = values;
      assetsChart.data.datasets[0].backgroundColor = getBarColors(values);
      assetsChart.update();
    });
  });

  // إغلاق إذا ضغطت بره
  document.addEventListener('click', e => {
    if(!customDropdown.contains(e.target)){
      options.style.display = 'none';
    }
  });
}
 document.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-parent");
    if (!btn) return;

    const group = btn.closest(".nav-group");
    if (!group) return;

    group.classList.toggle("open");
  });

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



document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".top-search input[type='search']");
  const tiles = Array.from(document.querySelectorAll(".tile"));
  if (!input || tiles.length === 0) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();

    tiles.forEach(tile => {
      const text = tile.innerText.toLowerCase();
      tile.style.display = text.includes(q) || q === "" ? "" : "none";
    });
  });
});