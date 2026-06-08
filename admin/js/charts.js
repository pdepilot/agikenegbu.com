/* CMS Chart.js Initialization */
(function () {
    'use strict';

    var gold = 'rgba(212, 168, 44, 0.8)';
    var goldFill = 'rgba(212, 168, 44, 0.15)';
    var blue = 'rgba(59, 130, 246, 0.8)';
    var blueFill = 'rgba(59, 130, 246, 0.12)';
    var green = 'rgba(34, 197, 94, 0.8)';
    var greenFill = 'rgba(34, 197, 94, 0.12)';
    var sdtgGold = 'rgba(212, 175, 55, 0.8)';

    var defaults = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#8b95a8', font: { family: 'Inter', size: 11 }, boxWidth: 12 }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.04)' },
                ticks: { color: '#5c6678', font: { size: 11 } }
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.04)' },
                ticks: { color: '#5c6678', font: { size: 11 } }
            }
        }
    };

    function makeChart(id, config) {
        var canvas = document.getElementById(id);
        if (!canvas || typeof Chart === 'undefined') return;
        new Chart(canvas, config);
    }

    function init() {
        makeChart('chartAttendance', {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{
                    label: 'Sunday Service',
                    data: [420, 445, 438, 462, 451, 478],
                    borderColor: gold,
                    backgroundColor: goldFill,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: gold
                }, {
                    label: 'Midweek',
                    data: [180, 195, 188, 210, 202, 218],
                    borderColor: blue,
                    backgroundColor: blueFill,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: blue
                }]
            },
            options: Object.assign({}, defaults, { plugins: { legend: defaults.plugins.legend } })
        });

        makeChart('chartRegistrations', {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'SDTG Registrations',
                    data: [42, 68, 95, 120, 186, 248],
                    backgroundColor: sdtgGold,
                    borderRadius: 6
                }]
            },
            options: Object.assign({}, defaults, { scales: { x: defaults.scales.x, y: Object.assign({}, defaults.scales.y, { beginAtZero: true }) } })
        });

        makeChart('chartDonations', {
            type: 'doughnut',
            data: {
                labels: ['Church Tithes', 'Building Fund', 'SDTG Crusade', 'Missions', 'Welfare'],
                datasets: [{
                    data: [35, 22, 18, 15, 10],
                    backgroundColor: [gold, blue, sdtgGold, green, 'rgba(139,92,246,0.8)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: defaults.plugins.legend.labels } }
            }
        });

        makeChart('chartDeptAttendance', {
            type: 'bar',
            data: {
                labels: ['Youth', 'Choir', 'Children', 'Ushering', 'Media', 'Prayer'],
                datasets: [{
                    label: 'Avg. Attendance',
                    data: [142, 68, 95, 45, 22, 38],
                    backgroundColor: green,
                    borderRadius: 6
                }]
            },
            options: Object.assign({}, defaults, { indexAxis: 'y', scales: { x: Object.assign({}, defaults.scales.x, { beginAtZero: true }), y: defaults.scales.y } })
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
