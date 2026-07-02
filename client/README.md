# IfyWigatechz Site & Academy

A high-performance, production-ready Full-Stack platform featuring an E-learning Academy, Real Estate Listing, E-commerce, and AI-powered interactions.

## 🚀 Project Architecture

The project follows a modular Architecture:
- **Backend:** Node.js, Express, MongoDB (Mongoose).
- **Security:** JWT via HTTP-only Cookies, Helmet, Rate Limiting, and XSS sanitization.
- **Cloud Storage:** Cloudinary (for images and authenticated video delivery).
- **Payments:** Paystack integration with Webhook support for automated enrollments.
- **Deployment:** PM2 for process management and GitHub Actions for CI/CD.

## 🧠 Special Features & Logic

### 1. Hybrid Course Model
The platform handles two types of courses seamlessly:
- **Dynamic DB Courses:** Managed via the Admin dashboard and stored in MongoDB.
- **Hardcoded Academy Courses:** High-value certifications (AI, Cybersecurity, PPMVS, Data Analytics) defined in `src/data/` for rapid frontend delivery while still tracking progress in the database.

### 2. Secure Content Delivery
To prevent piracy, lesson videos are secured using:
- **Redaction:** `videoUrl` is stripped from the API response unless the user is an **Admin** or an **Enrolled Student**.
- **URL Signing:** Authenticated Cloudinary URLs are generated on-the-fly with a 1-hour expiration, preventing link sharing.

### 3. Smart Enrollment & Payments
The `paymentController.js` uses an **idempotent fulfillment logic**. Whether a payment is verified via a frontend redirect or a backend webhook, the system ensures the user is granted access exactly once, preventing duplicate enrollments.

### 4. Advanced Security & Auditing
- **Rate Limiting:** Specific limits for Login, Chat (Groq API cost control), and Contact forms.
- **Audit Logging:** Every sensitive auth action (Login, Logout) is recorded in the `AuditLog` collection with IP and User-Agent tracking.
- **Global Error Handling:** Centralized `errorHandler` that masks system details in production while providing full stacks in development.

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vite, React, Axios (with Interceptors) |
| **Backend** | Node.js, Express, ES Modules |
| **Database** | MongoDB Atlas |
| **Monitoring** | Sentry (Error Tracking), Winston (Logging) |
| **DevOps** | PM2, Nginx, GitHub Actions |

## 📂 Project Structure (Backend)

```text
server/
├── config/          # DB, Cloudinary, and Env loaders
├── controllers/     # Business logic (The "Brain")
├── middleware/      # Auth, Rate Limits, Audit Logs, Error Handlers
├── models/          # Mongoose Schemas (User, Course, Enrollment, etc.)
├── routes/          # API Endpoint definitions
└── utils/           # Helpers, Loggers, and Backup scripts
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Paystack Secret Keys

### Installation
1. Clone the repository.
2. Create a `.env` in the `server/` directory (see `.env.example`).
3. Run the integration script:
   ```bash
   ./START_BACKEND.sh
   ```

## 🚢 Deployment (CI/CD)

The project is configured for automated deployment to a VPS:
1. **GitHub Action:** Triggers on push to `main`, connecting via SSH to the VPS.
2. **Deployment Script:** `DEPLOY_VPS.sh` pulls the latest code and installs dependencies.
3. **Process Manager:** `ecosystem.config.cjs` manages PM2 cluster mode for zero-downtime reloads.

## 📅 Automated Tasks
- **Backups:** Daily MongoDB backups at midnight.
- **Cleanups:** Hourly removal of expired "Featured" property statuses.

---
*Developed by Ify Wigatap - Tech Instructor & Developer*