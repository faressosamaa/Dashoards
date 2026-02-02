function toggleAssetsMenu() {
  const menu = document.getElementById("assetsMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleLogoMenu() {
  const menu = document.getElementById("logoMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Simple Search Filter
document.getElementById("searchInput").addEventListener("keyup", function () {
  const value = this.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});

// Close dropdowns on outside click
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("arrow")) {
    document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
  }
});

document.querySelectorAll('.custom-dropdown').forEach(drop => {
  const selected = drop.querySelector('.selected');
  const options = drop.querySelector('.options');

  selected.addEventListener('click', () => {
    options.style.display =
      options.style.display === 'block' ? 'none' : 'block';
  });

  options.querySelectorAll('div').forEach(opt => {
    opt.addEventListener('click', () => {
      selected.textContent = opt.textContent;
      options.style.display = 'none';

      const value = opt.dataset.value;

      if (drop.previousElementSibling.textContent === "Day") {
        currentDay = value;
      } 
      // تحديث الداتا
      heatmapChart.data.datasets[0].data =
        getHeatmapData(currentDay);

      heatmapChart.update();
    });
  });

  document.addEventListener('click', e => {
    if (!drop.contains(e.target)) options.style.display = 'none';
  });
});







const TOTAL = 202;

// القيم جاية من السيستم (مثال)
const data = {
  opened: 33,
  assigned: 12,
  solved: 32,
  closed: 66
};

// نحط القيم في الـ HTML
document.getElementById("openedValue").innerText = data.opened;
document.getElementById("assignedValue").innerText = data.assigned;
document.getElementById("solvedValue").innerText = data.solved;
document.getElementById("closedValue").innerText = data.closed;


// فانكشن الشارت
function createChart(id, value, color) {
  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: ['Current', 'Remaining'],
      datasets: [{
        data: [value, TOTAL - value],
        backgroundColor: [color, '#ecf0f1']
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// إنشاء الشارتات بالقيم من الـ data
createChart("chart1", data.opened, "#2ed573");
createChart("chart2", data.assigned, "#f1c40f");
createChart("chart3", data.solved, "#a4b0be");
createChart("chart4", data.closed, "#e74c3c");


const ctx = document.getElementById("ticketsChart").getContext("2d");

const ticketsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Opened", "Assigned", "Solved", "Closed"],
        datasets: [{
            label: 'Tickets',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(46, 213, 115, 0.8)',
                'rgba(241, 196, 15, 0.8)',
                'rgba(189, 195, 199, 0.8)',
                'rgba(231, 76, 60, 0.8)'
            ],
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
                        return context.raw; // keep numbers English in tooltip
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 14, weight: 'bold' } }
            },
            y: {
                beginAtZero: true,
                grid: { color: '#eee' },
                ticks: {
                    font: { size: 14 },
                    callback: function(value) {
                        return value.toString(); // force English numbers
                    }
                }
            }
        }
    }
});
const ctx2 = document.getElementById("ticketsChart2").getContext("2d");

// Create gradient for line
const gradient = ctx2.createLinearGradient(0, 0, 1300, 0);
gradient.addColorStop(0, '#2ed573'); 
gradient.addColorStop(1, '#e74c3c'); 

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ["Opened", "Assigned", "Solved", "Closed"], // English labels
        datasets: [{
            label: 'Tickets',
            data: [12, 19, 3, 5],
            fill: true,                // fill area under the line
            backgroundColor: gradient, // gradient fill
            borderColor: '#6a11cb',   // line color
            borderWidth: 3,
            tension: 0.4,              // smooth curve
            pointBackgroundColor: '#fff',
            pointBorderColor: '#6a11cb',
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return context.raw; // numbers in English
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 14, weight: '600' } }
            },
            y: {
                beginAtZero: true,
                grid: { color: '#eee' },
                ticks: {
                    font: { size: 14 },
                    callback: function(value) { return value.toString(); } // English numbers
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        }
    }
});







// مثال بيانات Tickets حسب اليوم والساعة
const ticketData = {
  mon: [2,5,3,6,7,1,0,4,8,3,2,1,0,0,2,3,5,2,1,0,0,1,0,0],
  tue: [1,2,0,3,5,6,2,1,0,1,0,2,3,2,1,0,0,0,0,0,0,0,0,0],
  wed: [0,0,1,2,3,4,5,2,1,0,1,2,3,0,0,1,2,3,4,5,1,0,0,0]
};
const ctx3 = document.getElementById("ticketsHeatmap").getContext("2d");

let currentDay = "all";
function getHeatmapData(day) {
    if(day === "all") {
        // جمع كل الأيام مع بعض
        const sum = Array(24).fill(0);
        Object.values(ticketData).forEach(arr => {
            arr.forEach((val, idx) => sum[idx] += val);
        });
        return sum;
    } else {
        return ticketData[day];
    }
}

const heatmapChart = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: Array.from({length:24}, (_,i) => i + ":00"),
        datasets: [{
            label: 'Tickets per Hour',
            data: getHeatmapData("all"),
            backgroundColor: function(context) {
                const value = context.raw;
                // أكثر = أحمر، أقل = أخضر
                const max = Math.max(...getHeatmapData(currentDay));
                const ratio = value / (max || 1);
                return `rgba(${255 * ratio}, ${200 - 100*ratio}, ${50}, 0.8)`;
            },
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.raw} Tickets at ${context.label}`;
                    }
                }
            }
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { color: '#eee' } }
        }
    }
});

// تغيير البيانات حسب الفلتر
document.getElementById("daySelect").addEventListener("change", function() {
    const day = this.value;
    currentDay = day;
    heatmapChart.data.datasets[0].data = getHeatmapData(day);
    heatmapChart.update();
});












