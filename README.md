# Dot Phoenix Solutions - Container Tracking Dashboard

A modern, high-performance tracking and logistics dashboard built for **Dot Phoenix Solutions**. This platform empowers administrators and operators to monitor transports, orders, Proof of Delivery (PODs), routes, and analytics globally with a stunning, dynamically scalable interface.

---

## 🚀 Tech Stack & Core Libraries

This application is built as a highly optimized Monorepo environment using `pnpm` workspaces, running at the absolute cutting edge of the modern web stack.

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Version 16+)
- **UI Library**: [React 19](https://react.dev/) + [React DOM 19](https://react.dev/)
- **Styling**: Vanilla CSS Modules with strict Global `rem` responsiveness constraints.
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **PDF Generation**: `jspdf` & `html2canvas` for offline invoices.
- **Date Handling**: `date-fns` & `react-datepicker`
- **Compiler Optimizations**: `babel-plugin-react-compiler`

## 📦 Features & Architecture

| Module                      | Description                                                                                                                                                |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Transports**              | Track live, idle, and starting states for Trucks, Ships, Flights, and Trains. View container allocations, empty spaces, and active drivers.                |
| **Orders**                  | Manage incoming client orders, item quantities, and status ("ACTIVE", "CLOSED", "UPCOMING", "CANCELLED") across a globally unique mocked database.         |
| **POD (Proof of Delivery)** | Verification-First workflow. Drivers submit PODs starting in `VERIFICATION` status before admin pushes them to `APPROVED`, `CANCELED`, or `HOLD`.          |
| **Invoicing**               | Instantly generates dynamic offline-first invoices **ONLY** for PODs verified and mapped as `APPROVED`. Features automated math calculations & PDF saving. |
| **Analytics Dashboard**     | Custom donut & bar charts mapping 14-day shipment/revenue trends, built 100% from scratch with pure CSS and SVGs (zero heavy charting libraries).          |
| **Tracking Module**         | Ready-for-integration framework. Currently disabled pending future releases.                                                                               |

---

## 🛠️ Installation & Setup

1. **Clone & Install Dependencies**
   The project strictly uses `pnpm`. Avoid using `npm` or `yarn` to prevent lockfile conflicts.

   ```bash
   npm i -g pnpm
   pnpm install
   ```

2. **Development Server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

3. **Production Build**
   ```bash
   pnpm build
   pnpm start
   ```

---

## 👨‍💻 Maintainer Conventions (Internal Knowledge Transfer)

To preserve the elite level of codebase cleanliness and senior-level architectural choices, please adhere to the following when contributing:

1. **Responsive Scaling (`rem` vs `px`)**
   - **DO NOT** use absolute pixels (`px`) in CSS files.
   - We enforce a strict scalable design system using `rem` for margins, padding, fonts, and dimensions. `1rem = 16px` at the root.

2. **Codebase Cleanliness (No Comment Banners)**
   - The codebase is self-documenting.
   - **Avoid** bulky block comments (`/* ... */`) or section separators (`// ================= `). Keep your files concise, modular, and readable.

3. **Component Modularity**
   - Keep shared pieces extracted into `src/components`. (e.g., `<Sidebar />`, custom charts).
   - Use CSS modules for isolating styles safely (`foo.module.css`).

4. **Data Uniqueness**
   - The dummy data (`src/data/dummyData.ts`) is generated synthetically to establish strictly unique user information (100% globally un-colliding IDs, phone numbers, customer emails). Do NOT duplicate data objects when expanding testing suites.

---

_Created and optimized for future scalability._
