# 🚚 TransitOps — Intelligent Transport ERP & Fleet Analytics Engine

> **A Hackathon-Winning Enterprise Resource Planner (ERP)** designed to optimize mid-to-large scale freight fleets, fuel telemetry, shipment routing, driver safety compliance, and comprehensive return-on-investment (ROI) diagnostics.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)

---

## 🌟 Pitch & Core Value Proposition

In the commercial freight logistics sector, operational margins are paper-thin. A fleet manager's success depends on three volatile factors: **asset utilization, fuel efficiency, and crew compliance.** 

**TransitOps** is a zero-latency, full-suite logistics ERP that consolidates raw telematics and enterprise operations. By coupling a relational schema compiled with **Prisma ORM** alongside robust simulation modules, it transforms dark metadata into active commercial insight:

1. **Enterprise Fleet Control**: Manage high-tonnage machinery with detailed licensing, odometer logs, and real-time maintenance trackers.
2. **Dynamic Shipment Dispatches**: Automatically validate shipments against weight limits and driver rest hours using built-in constraint algorithms before routing.
3. **Smart Fuel & Expense Module**: Calculate active fuel efficiency ($km/L$), track fuel purchase receipts, and categorize operational costs instantly.
4. **Intelligence & ROI Analytics Dashboard**: Interactive charts tracking Revenue, Profit Margin Trends, Fleet Utilization, and Driver Performance with custom export functionality (CSV/PDF) and heuristic AI Insights.

---

## 🛠️ Software Architecture & Database Schema

TransitOps is built with a client-side architecture using React 19, TypeScript, and Tailwind CSS. The schema is compiled utilizing **Prisma (MySQL connector)**, making the front-end highly portable while maintaining strict compliance with production databases.

### 💾 Schema Definition

The application includes real-world database definitions (`/prisma/schema.prisma` and `/src/db/schema.ts`):

- **User**: System identities secured with standard JSON Web Token (JWT) payloads.
- **Vehicle**: Heavy, medium, light, and refrigerated assets tracking fuel level, mileage, capacity, and current driver.
- **Driver**: Crew members monitoring commercial license expiry, safety compliance ratings, emergency contacts, and active duty states.
- **Shipment**: Trip orders specifying weight (metric tons), distance, origin, destination, financial values, and status.
- **Maintenance**: Scheduled, completed, or overdue vehicle repair logs syncing statuses to the fleet dashboard.
- **ExpenseLog**: Operational overhead logs (Fuel, Tolls, Salaries, Insurance, Repair) linked to financial metrics.
- **FuelLog**: Granular fuel purchase logs monitoring litrage, costs, and efficiency statistics.

---

## 🚀 Key Modules & Developer Guide

### 1. **Intelligence & ROI Analytics Dashboard**
- **Dynamic Charts**: Powered by `recharts`. Visualizes revenue vs. expenses, maintenance cost distributions, fleet utilization, and vehicle profit margins.
- **Interactive Filtering**: Filter the entire analytical scope by Vehicle, Driver, Region, and Date Range using React `useMemo` hooks for sub-millisecond calculation speeds.
- **Heuristic AI Engine**: Analyzes fleet logs to generate instant recommendations for fuel conservation, overdue inspections, and driver safety optimization.
- **Reports Export**: Allows operators to download active tabular data in CSV format or print formatted PDF monthly audits directly from their terminal.

### 2. **Auto-Dispatch Validation Engine**
- Built-in business rules validate shipment payloads:
  - **Overload Protection**: Blocks dispatches exceeding the vehicle's licensed loading capacity.
  - **Compliance Check**: Prevents dispatching to drivers with expired commercial licenses or suspended statuses.
  - **Rest Hour Monitoring**: Prompts warnings if a driver is currently resting or off-duty.

### 3. **Fuel & Cost Optimization Console**
- Seamlessly log refuels and track vehicle parameters.
- Instantly estimates efficiency curves:
  $$\text{Fuel Efficiency} = \frac{\Delta \text{Distance}}{\text{Litres Refueled}}$$

---

## 💻 Tech Stack & Dependencies

- **Frontend Core**: React 19 (Functional Hooks, `useMemo`, `Context`), TypeScript
- **Bundler & Tooling**: Vite 6.x, PostCSS, `@tailwindcss/vite`
- **Animations**: `motion/react` (staggered transitions, hover scales, sliding panel drawers)
- **Data Visualizations**: Recharts 3.x
- **Icons**: Lucide React
- **Validation**: Zod (for cryptographic auth validation)

---

## 🏁 Getting Started & Local Setup

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will boot on `http://localhost:3000` with hot-reloaded assets.

### 3. Build for Production
```bash
npm run build
```
The bundle compiles into the static `dist/` folder ready for CDN delivery.

### 4. Running Schema Migrations (Production SQL Clusters)
To synchronize the Prisma schema directly to a production MySQL or MariaDB database:
```bash
npx prisma db push
```

---

## 👑 Hackathon Presentation Guide & Quick Demo Roles

TransitOps includes active **Sandbox Role Presets** on the Authentication login gate to allow judges to immediately access pre-seeded operational profiles:

| Role Preset | Demo Account | Key Responsibilities Shown |
| :--- | :--- | :--- |
| **System Administrator** | `admin@transitops.com` | Unlimited operations, database query playground, full sandbox logging logs. |
| **Logistics Dispatcher** | `dispatcher@transitops.com` | Route corridor creation, shipment allocation, cargo validation gates. |
| **Fleet Manager** | `fleet@transitops.com` | Fleet asset registrations, license certifications, odometer audits. |
| **Safety Officer** | `safety@transitops.com` | Crew compliance ratings, emergency contacts, medical expiries. |
| **Financial Analyst** | `finance@transitops.com` | Expense auditing, revenue margins, vehicle ROI reports. |

---

*TransitOps is designed to make commercial fleet management intuitive, safe, and highly profitable. Built with 100% responsive dark mode grids and crisp display typography.*
