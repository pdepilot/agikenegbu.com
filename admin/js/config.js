/* CMS Navigation & Mock Data */
window.CMS_CONFIG = {
    brand: {
        name: 'AG IKENEGBU',
        subtitle: 'Church Management System',
        agVideo: '../videos/3D_video.mp4',
        sdtgVideo: '../sdgt/videos/3d-logo.mp4'
    },

    nav: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high', href: 'admin-dashboard.html' },
        {
            id: 'ag', label: 'AG IKENEGBU', type: 'group', children: [
                { id: 'members', label: 'Members', icon: 'fa-users', href: 'members.html' },
                { id: 'attendance', label: 'Attendance', icon: 'fa-clipboard-check', href: 'attendance.html' },
                { id: 'departments', label: 'Departments', icon: 'fa-sitemap', href: 'departments.html' },
                { id: 'events', label: 'Events', icon: 'fa-calendar-days', href: 'events.html' },
                { id: 'donations', label: 'Donations', icon: 'fa-hand-holding-heart', href: 'donations.html' },
                { id: 'reports', label: 'Reports', icon: 'fa-chart-pie', href: 'reports.html' },
                { id: 'messages', label: 'Messages', icon: 'fa-envelope', href: 'messages.html' }
            ]
        },
        {
            id: 'sdtg', label: 'SEND DOWN THY GLORY', type: 'group', sdtg: true, children: [
                { id: 'speakers', label: 'Speakers', icon: 'fa-microphone', href: 'sdtg/speakers.html' },
                { id: 'registrations', label: 'Registrations', icon: 'fa-ticket', href: 'sdtg/registrations.html', badge: '248' },
                { id: 'gallery', label: 'Gallery', icon: 'fa-images', href: 'sdtg/gallery.html' },
                { id: 'livestream', label: 'Livestream', icon: 'fa-tower-broadcast', href: 'sdtg/livestream.html' },
                { id: 'volunteers', label: 'Volunteers', icon: 'fa-hands-helping', href: 'sdtg/volunteers.html' },
                { id: 'testimonies', label: 'Testimonies', icon: 'fa-quote-left', href: 'sdtg/testimonies.html' },
                { id: 'sdtg-donations', label: 'Donations', icon: 'fa-coins', href: 'sdtg/donations.html' },
                { id: 'media', label: 'Media Library', icon: 'fa-photo-film', href: 'sdtg/media.html' }
            ]
        },
        {
            id: 'website', label: 'WEBSITE MANAGEMENT', type: 'group', children: [
                { id: 'pages', label: 'Pages', icon: 'fa-file-lines', href: 'website/pages.html' },
                { id: 'media-library', label: 'Media Library', icon: 'fa-folder-open', href: 'website/media-library.html' },
                { id: 'seo', label: 'SEO Manager', icon: 'fa-magnifying-glass-chart', href: 'website/seo.html' }
            ]
        },
        {
            id: 'system', label: 'SYSTEM', type: 'group', children: [
                { id: 'settings', label: 'Settings', icon: 'fa-gear', href: 'settings.html' },
                { id: 'activity-logs', label: 'Activity Logs', icon: 'fa-clock-rotate-left', href: 'system/activity-logs.html' }
            ]
        }
    ],

    notifications: [
        { icon: 'gold', title: 'New SDTG Registration', text: 'Emmanuel O. registered from Ghana', time: '2 min ago' },
        { icon: 'blue', title: 'Attendance Submitted', text: 'Youth Department — 142 present', time: '18 min ago' },
        { icon: 'green', title: 'Donation Received', text: '₦50,000 — Building Fund', time: '1 hr ago' },
        { icon: 'gold', title: 'SEO Audit Complete', text: 'Score improved to 87/100', time: '3 hrs ago' }
    ],

    members: [
        { id: 'M001', name: 'Pastor Emmanuel Nwosu', email: 'emmanuel@agikenebgu.org', dept: 'Leadership', status: 'active', joined: '2018-03-12' },
        { id: 'M002', name: 'Grace Okonkwo', email: 'grace.o@email.com', dept: 'Choir', status: 'active', joined: '2019-07-22' },
        { id: 'M003', name: 'David Eze', email: 'david.eze@email.com', dept: 'Youth', status: 'active', joined: '2020-01-15' },
        { id: 'M004', name: 'Blessing Adeyemi', email: 'blessing.a@email.com', dept: 'Ushering', status: 'inactive', joined: '2021-05-08' },
        { id: 'M005', name: 'Chioma Ibe', email: 'chioma.ibe@email.com', dept: 'Children', status: 'active', joined: '2022-09-30' },
        { id: 'M006', name: 'Samuel Uche', email: 'samuel.u@email.com', dept: 'Media', status: 'active', joined: '2023-02-14' }
    ],

    speakers: [
        { name: 'Dr. Paul Enenche', ministry: 'Dunamis International', country: 'Nigeria', year: '2025', bio: 'Founder of Dunamis International Gospel Centre.' },
        { name: 'Bishop David Oyedepo', ministry: 'Living Faith Church', country: 'Nigeria', year: '2024', bio: 'Chancellor of Covenant University and renowned preacher.' },
        { name: 'Rev. Dr. Cindy Trimm', ministry: 'Trim Ministries', country: 'USA', year: '2024', bio: 'International speaker and bestselling author.' },
        { name: 'Pastor Matthew Ashimolowo', ministry: 'KICC London', country: 'UK', year: '2023', bio: 'Senior Pastor of Kingsway International Christian Centre.' }
    ],

    registrations: [
        { id: 'R-1042', name: 'John Mensah', country: 'Ghana', type: 'General', volunteer: 'Yes', date: '2025-05-28' },
        { id: 'R-1041', name: 'Sarah Johnson', country: 'USA', type: 'VIP', volunteer: 'No', date: '2025-05-27' },
        { id: 'R-1040', name: 'Peter Okafor', country: 'Nigeria', type: 'General', volunteer: 'Yes', date: '2025-05-27' },
        { id: 'R-1039', name: 'Mary Wanjiku', country: 'Kenya', type: 'Group', volunteer: 'No', date: '2025-05-26' }
    ]
};
