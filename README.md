# 🥗 Calorie Tracker

A clean and intuitive calorie tracking web application built with **React** and **Vite**. Track your daily meals, monitor calorie intake by date, and log new food entries through a smooth modal interface.

---

## 📸 Project Overview

Calorie Tracker allows users to:

- View all meal records filtered by a selected date
- Add new food entries (date, meal type, content, calories) via a modal form
- See records sorted chronologically
- Handle invalid calorie values gracefully

---

## 🚀 Tech Stack

| Technology                                             | Version | Purpose                                                 |
| ------------------------------------------------------ | ------- | ------------------------------------------------------- |
| [React](https://react.dev/)                            | 18.2.0  | UI component library                                    |
| [Vite](https://vitejs.dev/)                            | 4.5.x   | Build tool & dev server                                 |
| [Styled Components](https://styled-components.com/)    | 6.3.x   | CSS-in-JS styling (installed, available for future use) |
| [React Modal](https://reactcommunity.org/react-modal/) | 3.16.x  | Accessible modal dialog                                 |
| CSS Modules                                            | —       | Scoped component styling                                |

---

## 📁 Project Structure

```
calorie-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── Component/
│   │   ├── CalorieRecordSection/
│   │   │   ├── CalorieRecord.jsx          # Single meal record row
│   │   │   ├── CalorieRecord.module.css
│   │   │   ├── CalorieRecordDate.jsx      # Date display cell (month/day/year)
│   │   │   ├── CalorieRecordDate.module.css
│   │   │   ├── ListingSection.jsx         # Date picker + filtered record list
│   │   │   ├── ListingSection.module.css
│   │   │   ├── RecordList.jsx             # Maps records to CalorieRecord items
│   │   │   └── RecordList.module.css
│   │   ├── Comm/
│   │   │   ├── StyledRecordCell.jsx       # Reusable bordered cell wrapper
│   │   │   └── StyledRecordCell.module.css
│   │   └── Edit/
│   │       └── CalorieRecordEdit.module.css
│   │       └── CaloriesRecordForm.module.css
│   ├── App.jsx                            # Root component, state management
│   ├── App.module.css
│   ├── index.css                          # Global styles & CSS variables
│   ├── main.jsx                           # App entry point
│   └── utils.js                           # Date string parser utility
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14.18.0 or higher
- npm v8.0.0 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/calorie-tracker.git

# 2. Navigate into the project directory
cd calorie-tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🧩 Component Breakdown

### `App.jsx`

The root component. Manages global state including:

- `records` — the list of all calorie entries
- `nextId` — auto-incremented ID for new records
- `isModalOpen` — controls modal visibility

Handles `onFormSubmit` to add and sort new records by date.

---

### `ListingSection.jsx`

Displays a date picker input and filters the full records list to show only entries matching the selected date.

---

### `RecordList.jsx`

Renders the filtered list of records. Shows a friendly empty state message if no records match the selected date.

---

### `CalorieRecord.jsx`

Displays a single meal row with: **date**, **meal type**, **content**, and **calories**. Handles negative calorie values by showing an "Invalid calories" message.

---

### `CalorieRecordDate.jsx`

A styled date cell that displays month, day, and year separately using UTC methods to avoid timezone issues.

---

### `CalorieRecordEdit.jsx`

The form used inside the modal to add a new record. Fields include:

- Date (date picker)
- Meal (dropdown: Breakfast, Lunch, Dinner, Snack)
- Content (text input)
- Calories (number input with error styling for negative values)

---

### `StyledRecordCell.jsx`

A shared reusable component that wraps content in a bordered, rounded cell — used for date and calorie display.

---

### `utils.js`

Contains a single utility function `getDateFromString(dateString)` that converts a `YYYY-MM-DD` string into a JavaScript `Date` object without timezone offset issues.

---

## 🎨 Theming & CSS Variables

Global CSS variables are defined in `src/index.css` and used across all components:

```css
--theme-background-ultraLight: #effaff;
--theme-background-normal: #a0d2eb;
--theme-background-light: #e5eaf5;
--theme-color-light: #d0bdf4;
--theme-color-normal: #8458b3; /* Primary purple */
--theme-color-dark: #494d5f; /* Dark text */
```

To change the app's color scheme, simply update these variables in `index.css`.

---

## 🗺️ Roadmap & Future Updates

This project is actively being developed. Planned features include:

- [ ] **Edit & Delete records** — modify or remove existing entries
- [ ] **Daily calorie summary** — total calorie count per day
- [ ] **Weekly/monthly charts** — visualize intake over time
- [ ] **Local storage persistence** — data survives page refresh
- [ ] **User authentication** — personal accounts and data
- [ ] **Nutritional info** — protein, carbs, fat breakdown
- [ ] **Dark mode** — theme toggle support
- [ ] **Mobile responsiveness improvements** — enhanced small-screen UX
- [ ] **Export to CSV** — download your records

---

## 🐛 Known Issues

- The `console.log({ currentDate })` statement in `ListingSection.jsx` is a development leftover and should be removed from the code to avoid confusion for contributors.
- File name typo: `RecordList.jsx` (should be `RecordList.jsx`) — to be fixed in a future refactor.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Youssef Jameel Adal-Latif**

Built as part of the React Fundamentals course on [Almdrasa](https://almdrasa.com) — instructed by **أحمد علي**.

---

> _"The journey doesn't stop here — this project will keep growing!"_ 🚀
