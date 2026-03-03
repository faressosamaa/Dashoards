const TOTAL = 202;

// مثال القيم
const data = {
  opened: 33,
  assigned: 12,
  solved: 32,
  closed: 66
};

const data2 = {
  Low: 20,
  Medium: 40,
  High: 30,
  Critical: 10
};







// تحديث القيم في الـ HTML
document.getElementById("openedValue").innerText = data.opened;
document.getElementById("assignedValue").innerText = data.assigned;
document.getElementById("solvedValue").innerText = data.solved;
document.getElementById("closedValue").innerText = data.closed;

// فانكشن الشارت الدونات
function createChart(id, value, color) {
  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: ['Current', 'Remaining'],
      datasets: [{ data: [value, TOTAL - value], backgroundColor: [color, '#ecf0f1'] }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false },   legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const val = context.parsed;
              return `Tickets: ${val.toLocaleString('en-US')}`;
            }
          }
        } }
    }
  });
}

// إنشاء الشارتات
createChart("chart1", data.opened, "#1f8d5f");
createChart("chart2", data.assigned, "#6aaa85");
createChart("chart3", data.solved, "#868e9861");
createChart("chart4", data.closed, "#b61a1a");

// Bar chart
const ctx = document.getElementById("ticketsChart").getContext("2d");
const ticketsChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [{
      label: 'Tickets',
      data: [data2.Low, data2.Medium, data2.High, data2.Critical],
      backgroundColor: ['#1f8d5f','#ffc107c3','#FF9800','#b61a1a'],
      borderRadius: 10,
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
        label: function(context) {
        const value = context.parsed.y;
        return `Tickets: ${value.toLocaleString('en-US')}`;
      }
    }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#eee' } , grid: { color: '#eee' },
    ticks: {
      callback: function(value) {
        return value.toLocaleString('en-US');
      }
    } }
    }
  }
});


const usersData = [
  {
    name: 'Ahmed',
    opened: 5,
    assigned: 8,
    solved: 20,
    closed: 1
  },
  {
    name: 'Sara',
    opened: 3,
    assigned: 6,
    solved: 7,
    closed: 0
  },
  {
    name: 'Omar',
    opened: 7,
    assigned: 4,
    solved: 6,
    closed: 2
  },
  {
    name: 'Mona',
    opened: 2,
    assigned: 5,
    solved: 9,
    closed: 1
  }
];




// Horz chart
const labels = usersData.map(u => u.name);

const openedData   = usersData.map(u => u.opened);
const assignedData = usersData.map(u => u.assigned);
const solvedData   = usersData.map(u => u.solved);
const closedData   = usersData.map(u => u.closed);

const ctx2 = document.getElementById('usersTicketsChart');

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      {
        label: 'Opened Tickets',
        data: openedData,
        backgroundColor: '#1f8d5f'
      },
      {
        label: 'Assigned Tickets',
        data: assignedData,
        backgroundColor: '#6aaa85'
      },
      {
        label: 'Solved Tickets',
        data: solvedData,
        backgroundColor: '#bcb6b6'
      },
      {
        label: 'Closed Tickets',
        data: closedData,
        backgroundColor: '#b61a1a',
        borderRadius: {
          topRight: 10,
          bottomRight: 10
        },
        borderSkipped: false
      }
    ]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: v => v.toLocaleString('en-US')
        }
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.x.toLocaleString('en-US')}`
        }
      }
    }
  }
});



// Heatmap
const ticketData = {
  mon: [2,5,3,6,7,1,0,4,8,3,2,1,0,0,2,3,5,2,1,0,0,1,0,0],
  tue: [1,2,0,3,5,6,2,1,0,1,0,2,3,2,1,0,0,0,0,0,0,0,0,0],
  wed: [0,0,1,2,3,4,5,2,1,0,1,2,3,0,0,1,2,3,4,5,1,0,0,0]
};

let currentDay = "all";


// فانكشن تجيب بيانات اليوم
function getHeatmapData(day) {
  if(day === "all") {
    const sum = Array(24).fill(0);
    Object.values(ticketData).forEach(arr => arr.forEach((v,i)=>sum[i]+=v));
    return sum;
  } else {
    return ticketData[day];
  }
}

// إعداد chart
const ctx3 = document.getElementById("ticketsHeatmap").getContext("2d");
const heatmapChart = new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: Array.from({length:24}, (_,i)=>i+":00"),
    datasets: [{
      label: 'Tickets per Hour',
      data: getHeatmapData(currentDay),
      backgroundColor: function(ctx) {
        const value = ctx.raw;
        const max = Math.max(...getHeatmapData(currentDay));
        const ratio = value / (max || 1);
        return `rgba(${255*ratio}, ${200-100*ratio}, 50, 0.8)`;
      },
      borderRadius: 5
    }]
  },
 options: {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        callback: value => Number(value).toLocaleString('en-US')
      }
    },
    y: {
      stacked: true,
      ticks: {
        callback: value => value // أسماء، مش أرقام
      }
    }
  },
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: ctx =>
          `${ctx.dataset.label}: ${Number(ctx.parsed.x).toLocaleString('en-US')}`
      }
    }
  }
}

});

// =====================
// Dropdown logic
// =====================
const dropdown = document.getElementById("dayDropdown");
const selected = dropdown.querySelector(".selected");
const options = dropdown.querySelector(".options");

// فتح / غلق عند الضغط على selected
selected.addEventListener("click", (e)=>{
  e.stopPropagation(); // عشان الضغط ما يوصلش للـ document
  options.style.display = options.style.display === "block" ? "none" : "block";
});

// عند اختيار أي يوم
options.querySelectorAll("div").forEach(opt=>{
  opt.addEventListener("click", ()=>{
    selected.textContent = opt.textContent;
    options.style.display = "none";
    currentDay = opt.dataset.value;
    heatmapChart.data.datasets[0].data = getHeatmapData(currentDay);
    heatmapChart.update();
  });
});

// إغلاق الـ dropdown عند الضغط خارج
document.addEventListener("click", ()=>{
  options.style.display = "none";
});
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


