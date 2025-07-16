
# 🍕 Pizza Pal

**Live Demo:** 👉 [https://divyanshi910.github.io/YourPizzaPal-/](https://divyanshi910.github.io/YourPizzaPal-/)

**Pizza Pal** is a modular, JavaScript-based pizza ordering app with Razorpay payment simulation. It follows the MVC (Model-View-Controller) architecture and uses dynamic rendering for a smooth, interactive experience.

---

## 🎯 Features

- 🍕 View pizza menu dynamically (fetched from live API)
- 🛒 Add pizzas to cart
- 💵 View live cart total
- 💳 Simulated payment via Razorpay
- 📱 Responsive UI with Bootstrap
- 🧠 MVC architecture: clear separation of concerns

---

## ⚙️ Tech Stack

| Area        | Technology                    |
|-------------|-------------------------------|
| Frontend    | HTML, CSS, JavaScript (ES6+)  |
| UI Framework| Bootstrap 5                   |
| Payments    | Razorpay JS SDK               |
| Data Source | GitHub-hosted JSON            |
| Architecture| MVC (Model-View-Controller)   |

---

## 📁 Folder Structure

```
YourPizzaPal-/
├── index.html
├── scripts/
│   ├── models/
│   │   └── product.js
│   ├── services/
│   │   ├── api-client.js
│   │   ├── payment.js
│   │   └── product-operations.js
│   └── controllers/
│       └── product-controller.js
├── style.css (optional)
└── README.md
```

---

## 🧠 MVC Overview

| Component | Description |
|----------|-------------|
| **Model** (`product.js`) | Defines the Product class |
| **Controller** (`product-controller.js`) | Handles UI rendering and user actions |
| **Service** (`product-operations.js`) | Loads and manages product data |
| **API Client** (`api-client.js`) | Fetches pizza data from remote JSON |
| **Payment** (`payment.js`) | Handles Razorpay test checkout |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/divyanshi910/YourPizzaPal-.git
cd YourPizzaPal-
```

### 2. Run the App

Open `index.html` in your browser.

> No server setup required

---

## 🌐 API Used

Pizza data fetched from:
```
https://raw.githubusercontent.com/divyanshi910/pizza.json/refs/heads/main/pizza.json
```

---

## 💳 Razorpay Integration

Click **Pay** to simulate a test transaction.  
Razorpay test key: `rzp_test_z4Cdx4jOBtqais`

Includes both:
- Success alert
- Failure alert

---

## 🧾 To-Do / Future Enhancements

- User login system
- Real-time order tracking
- Backend database (Firebase/MongoDB)
- Filtering & search

---

## 🙌 Contributing

Contributions are welcome! Fork the repo, make changes, and open a PR.

---

## 📃 License

This project is licensed under the [MIT License](LICENSE)

---

> Made with 🍕 and ❤️ by [Divyanshi Verma](https://github.com/divyanshi910)
