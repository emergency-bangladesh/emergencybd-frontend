# Emergency Bangladesh (Frontend)

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-brightgreen?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack](https://img.shields.io/badge/TanStack-ReactQuery%2CRouter%2CForm-yellow?logo=tanstack&logoColor=black)](https://tanstack.com/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

This is the frontend application for Emergency Bangladesh, a public social responsibility platform that helps manage emergency responses across Bangladesh. The system connects people with real-time support for urgent situations such as blood donation, fire incidents, missing persons, and other community emergencies. This frontend repository powers those features in a user-friendly interface.
Learn more at [https://emergencybd.com/about-us](https://emergencybd.com/about-us).

---

## Features

### Issue Reporting

- Multi-step forms for different emergency types (blood donation, lost & found, etc.)
- Support for uploading images, contact details, and location info
- Auto-validated forms powered by Zod + TanStack Form

### User & Volunteer Management

- Volunteer registration with NID/BRN support
- Profile picture upload with client-side compression
- Account settings for updating information & changing password

### Static Pages

- About Us, Contact, FAQ
- Privacy Policy & Terms & Conditions

### Other Highlights

- Responsive design with Tailwind + shadcn components
- Image compression before upload for performance
- Optimized routing and data fetching using TanStack Router & Query

---

## Tech Stack

**Core:**

- React + Vite
- Tailwind CSS + shadcn/ui
- TanStack Router + TanStack Query + TanStack Form
- Zod for schema validation

**UI & Components:**

- ShadCn UI (Dialog, Select, Popover, etc.)
- Lucide & Tabler Icons
- Date-fns & React Day Picker

**Utilities:**

- Browser Image Compressor
- clsx, tailwind-merge, class-variance-authority

**Dev Tools & Testing:**

- Vite Dev Server & Plugins
- ESLint + Prettier + TypeScript
- Vitest + Testing Library

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn (pnpm recommended)

### Installation

```bash
# clone the repo
git clone https://github.com/emergency-bangladesh/frontend.git

# enter repo
cd frontend

# install dependencies
pnpm install

# start dev server
pnpm dev
```

### Build

```bash
pnpm build
```

---

## Privacy Note

We are hiding the commit history intentionally to avoid exposing the personal identities of core team, the contributors of v0.1 release.
This project is open for collaboration, but we respect the privacy of our core team. You might see the regular commit histories for later on releases.

---

## Contributing

We welcome contributors.
If you are interested in joining the project, please contact us at:

## **[project.emergencybd@gmail.com](mailto:project.emergencybd@gmail.com)**

---

## License

This project is under MIT license – free to use completely.
