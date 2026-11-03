# Peter Oladeji — Brand & Communications Strategist Portfolio

A state-of-the-art, high-converting portfolio website designed for **Peter Oladeji**, Brand & Communications Strategist and Digital Marketer.

---

## 🌟 Key Highlights & Upgrades

- **Zero-Dependency Architecture**: Built with modern semantic HTML5, Tailwind CSS, and Vanilla ES6. No complex Node.js build pipelines or compile steps required. Blazing fast load times.
- **Self-Hosted Verified Evidence**: All 48 authentic profile photos, analytics snapshots (Mavo Health, RICO Construction, Thirstify, Kickoff Trends, Oyo Informer), certificate scans (HubSpot, Terra, DBN, ICSMP), and graphic design creatives are downloaded and hosted locally in `assets/`.
- **Interactive Evidence Lightbox**: Visitors can click on any proof snapshot or certificate to inspect full-resolution data and credentials with zoom, captions, and keyboard arrows (`←`, `→`, `Esc`).
- **Interactive Multi-Slide Carousels**: Branded social media carousels (e.g. RICO Construction 7-part slide series) feature swipeable, interactive previous/next slide navigation with pagination counters.
- **Multi-Category Design Gallery**: Instant client-side filtering for *All Work*, *Social Media Carousels*, *Education Marketing*, *Brand & Event Campaigns*, and *Celebration Tributes*.
- **Dynamic Inquiry Assistant**: Visitors can pick their desired services (Brand Strategy, Growth Marketing, Paid Campaigns, Full-time Role) to auto-generate personalized WhatsApp or Email messages with 1 click, plus 1-click clipboard copy with toast notifications.
- **Theme Persistence**: Light and Dark mode with smooth color transitions, luminous ambient background orbs, and local storage state memory.

---

## 🚀 How to Run & Preview

### Option 1: Double-Click (Immediate Local Preview)
Simply double-click `index.html` in Windows File Explorer, or right-click `index.html` and choose **Open with > Google Chrome** (or Edge, Firefox, Safari).

### Option 2: Local HTTP Server
If you prefer running through a local web server:
```powershell
# Using Python (if installed)
python -m http.server 3000

# Using Node (if installed)
npx serve .
```
Then visit `http://localhost:3000`.

---

## 🌐 1-Click Free Hosting & Deployment

This project is completely static and ready for instant deployment:

### 1. GitHub Pages (Free)
1. Initialize git in this folder: `git init`, `git add .`, `git commit -m "Initial portfolio commit"`.
2. Create a new GitHub repository (e.g., `portfolio`).
3. Push your repository: `git remote add origin <your-repo-url>`, `git push -u origin main`.
4. In GitHub Repo Settings > **Pages**, set branch to `main` / `root` and click **Save**.

### 2. Netlify (Free Drag-and-Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the entire `peter-pelumi-portfolio` folder.
3. Your website is live worldwide with free SSL in 10 seconds!

### 3. Vercel (Free)
1. Install Vercel CLI or import via GitHub on [vercel.com](https://vercel.com).
2. Deploy as a static project.

---

## 📁 Project Directory Structure

```
peter-pelumi-portfolio/
├── index.html                   # Master single-page application
├── README.md                    # Documentation & deployment guide
├── css/
│   └── style.css                # Custom themes, glassmorphism, orbs, and animations
├── js/
│   ├── app.js                   # Theme controller, mobile menu, counters, scroll spy
│   ├── lightbox.js              # High-res evidence & artwork inspection modal
│   ├── gallery.js               # Category filtering and interactive slide carousels
│   └── contact.js               # Inquiry builder, WhatsApp/Email link generator & toasts
└── assets/
    ├── images/                  # Profile portraits & brand favicons
    ├── evidence/                # Verified analytics proof screenshots
    │   ├── mavo-health/
    │   ├── rico-construction/
    │   ├── thirstify/
    │   ├── kickoff-trends/
    │   └── oyo-informer/
    ├── certificates/            # Verified certificates (HubSpot, Terra, DBN, ICSMP)
    ├── gallery/                 # Graphic design creatives & carousel slides
    └── oladeji-peter-pelumi-cv.pdf  # Downloadable resume
```

---

## 📝 Updating Your Portfolio

- **Adding a new case study or role**: Open `index.html` and duplicate one of the `<article class="glass-panel">` blocks inside `#experience`.
- **Adding new graphic design pieces**: Add the image into `assets/gallery/` and add a `<div class="gallery-item">` card with `data-category="..."` in `index.html`.
- **Updating contact details**: Edit the phone or email in `js/contact.js` and in `#contact` inside `index.html`.
