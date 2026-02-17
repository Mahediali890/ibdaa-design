# IBDA'A Design Studio

A premium architecture and interior design portfolio website showcasing modern residential and commercial projects.

**[View Live Site](https://mahediali890.github.io/ibdaa-design)**

## About

IBDA'A Design Studio is a full-service architecture and interior design firm based in Nadiad, Gujarat. This website serves as the studio's digital portfolio, featuring project showcases, service offerings, and a contact system for client inquiries.

## Features

- **Multi-Page Portfolio** — Home, About, Services, Projects, and Contact pages
- **Project Showcase** — Filterable gallery with detailed project views (Architecture, Interior, Renovation)
- **Smooth Animations** — Scroll-reveal effects, page transitions, and interactive hover states
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- **Contact Form** — Working email system with Gmail SMTP integration
- **Security Hardened** — Helmet.js, CSRF protection, rate limiting, input validation, and anti-spam honeypot

## Tech Stack

| Frontend | Backend | Styling | Animation |
|----------|---------|---------|-----------|
| React 19 | Express.js | Tailwind CSS 3 | Framer Motion |
| React Router | Nodemailer | Google Fonts | ScrollReveal |

**Additional:** Helmet.js, express-validator, express-rate-limit, react-icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Mahediali890/ibdaa-design.git
cd ibdaa-design

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the React development server
npm start

# Start the backend server (in a separate terminal)
npm run server

# Or run both together
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `server/.env` file for the contact form email service:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
CONTACT_EMAIL_RECIPIENT=recipient@example.com
CONTACT_PHONE=+91 XXXXX XXXXX
CONTACT_ADDRESS=Your Address Here
```

### Build & Deploy

```bash
# Create production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
ibdaa/
├── public/              # Static assets and index.html
├── server/              # Express.js backend
│   ├── controllers/     # Route handlers
│   ├── middleware/       # Validation, error handling
│   ├── services/        # Email service
│   └── server.js        # Server entry point
├── src/
│   ├── assets/          # Images and media
│   ├── components/
│   │   ├── common/      # ScrollReveal, PageTransition
│   │   ├── layout/      # Navbar, Footer, BottomNav
│   │   └── sections/    # Hero, About, Services, Projects, Contact
│   ├── data/            # Project data
│   ├── pages/           # Page components
│   ├── services/        # API service
│   └── App.js           # Root component with routing
└── package.json
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Charcoal / Navy | `#1A1A1A` | Backgrounds |
| Warm Gold | `#C9A96E` | Accents, CTAs |
| Warm White | `#F5F0EB` | Text, surfaces |

## Contact

**IBDA'A Design Studio**
- Phone: +91 84900 59240
- Email: mominfarmanali292@gmail.com
- Address: D2, City Centre Complex, Marida Bhagol, Nadiad, Gujarat 387001

## License

This project is proprietary. All rights reserved.
