# 🥗 Calorie Tracker

A clean and intuitive calorie tracking web application built with **React** and **Vite**. Track your daily meals, monitor calorie intake by date, and log new food entries through a smooth modal interface.

---

## 📸 Project Overview

Calorie Tracker allows users to:

- View all meal records filtered by a selected date
- Add new food entries (date, meal type, content, calories) via a modal form
- See records sorted chronologically
- See a **daily calorie total** at the bottom of each day's records
- **Persist data across sessions** via localStorage — records survive page refresh
- Handle invalid calorie values gracefully

---

## 🚀 Tech Stack

| Technology                                             | Version | Purpose                                      |
| ------------------------------------------------------ | ------- | -------------------------------------------- |
| [React](https://react.dev/)                            | 18.2.0  | UI component library                         |
| [Vite](https://vitejs.dev/)                            | 4.5.x   | Build tool & dev server                      |
| [Styled Components](https://styled-components.com/)    | 6.3.x   | CSS-in-JS styling (available for future use) |
| [React Modal](https://reactcommunity.org/react-modal/) | 3.16.x  | Accessible modal dialog                      |
| CSS Modules                                            | —       | Scoped component styling                     |

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
│   │   │   ├── CalorieRecord.jsx           # Single meal row — date badge, meal pill, cal badge
│   │   │   ├── CalorieRecord.module.css
│   │   │   ├── CalorieRecordDate.jsx       # UTC-safe date display (month / day / year)
│   │   │   ├── CalorieRecordDate.module.css
│   │   │   ├── ListingSection.jsx          # Date picker + filtered record list
│   │   │   ├── ListingSection.module.css
│   │   │   ├── RecoridList.jsx             # Table with header row and daily total footer
│   │   │   └── RecordList.module.css
│   │   ├── Comm/
│   │   │   ├── StyledRecordCell.jsx        # Reusable bordered cell wrapper
│   │   │   └── StyledRecordCell.module.css
│   │   └── Edit/
│   │       ├── CalorieRecordEdit.jsx       # Modal form with live validation
│   │       └── CaloriesRecordForm.module.css
│   ├── App.jsx                             # Root component, state, localStorage, modal
│   ├── App.module.css
│   ├── index.css                           # Global styles & CSS variables
│   ├── main.jsx                            # App entry point
│   └── utils.js                            # UTC-safe date string parser
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

- `records` — list of all calorie entries, initialized from `localStorage`
- `nextId` — auto-incremented ID for new records, persisted in `localStorage`
- `isModalOpen` — controls modal visibility

Persists records and ID to `localStorage` via `useEffect` on every state change. On load, restores records and correctly re-hydrates ISO date strings back into `Date` objects.

---

### `ListingSection.jsx`

Displays a date picker and filters the full records list to show only entries matching the selected date. The date picker initializes to today using UTC to prevent timezone-driven day shifts. The input value is built manually from UTC parts to stay consistent across all timezones.

---

### `RecoridList.jsx`

Renders all filtered records inside a `<table>` with a fixed-width column header and a daily total row in the `<tfoot>`. Shows a friendly empty state message if no records match the selected date.

---

### `CalorieRecord.jsx`

Renders a single `<tr>` with four symmetric columns:

- **Date** — compact badge showing month, day, year using UTC methods
- **Meal** — color-coded pill (Breakfast → blue, Lunch → green, Dinner → purple, Snack → amber)
- **Food** — plain text content, or "Invalid entry" for bad records
- **Calories** — monospace badge with `kcal` label, or `—` for invalid values

---

### `CalorieRecordDate.jsx`

Displays month, day, and year using `getUTCMonth`, `getUTCDate`, and `getUTCFullYear` to match how dates are stored and filtered — preventing the off-by-one display bug in UTC+ timezones.

---

### `CalorieRecordEdit.jsx`

The form inside the modal. Fields include:

- Date (date picker)
- Meal (dropdown: Breakfast, Lunch, Dinner, Snack)
- Content (text input)
- Calories (number input, minimum 0, with error styling for negative values)

The submit button is disabled until all fields are valid. On submission the form resets to its default state.

---

### `StyledRecordCell.jsx`

A shared reusable component that wraps content in a bordered, rounded cell. Still used internally but the main record layout has migrated to a semantic `<table>` structure for full column symmetry.

---

### `utils.js`

Contains `getDateFromString(dateString)` which converts a `YYYY-MM-DD` string into a UTC-midnight `Date` object using `Date.UTC` — preventing timezone-driven off-by-one date bugs.

```js
export default function getDateFromString(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
```

---

## 🎨 Theming & CSS Variables

Global CSS variables are defined in `src/index.css`:

```css
--theme-background-ultraLight: #effaff;
--theme-background-normal: #a0d2eb;
--theme-background-light: #e5eaf5;
--theme-color-light: #d0bdf4;
--theme-color-normal: #8458b3; /* Primary purple */
--theme-color-dark: #494d5f; /* Dark text */
```

To change the app's color scheme, update these variables in `index.css` — all components consume them automatically.

---

## 🐛 Bug Fixes

### Dates displaying one day behind (UTC+ timezones)

**Problem:** `new Date(year, month, day)` creates a date at local midnight. When compared or displayed using UTC methods, timezones east of UTC (e.g. Cairo UTC+2, Dubai UTC+4) would show the date one day earlier than expected.

**Fix:** All dates are now created with `Date.UTC(year, month, day)` in `utils.js`, compared with UTC methods in `ListingSection.jsx`, and displayed with UTC methods in `CalorieRecordDate.jsx`.

---

### localStorage dates losing one day after reload

**Problem:** `JSON.stringify` serializes `Date` objects to ISO strings (UTC midnight). `JSON.parse` returns plain strings, not `Date` objects. Combined with timezone offset, the restored date would shift back one day.

**Fix:** On load, records from `localStorage` are mapped through `.map(r => ({ ...r, date: new Date(r.date) }))`. Since dates are stored as UTC midnight ISO strings and parsed back with `new Date(isoString)`, the restored value is identical to the original — no offset occurs.

---

### Date picker showing wrong selected day

**Problem:** `currentDate.toISOString().split("T")[0]` uses UTC midnight but the local date could be the previous day in UTC+ zones, causing the picker to show the wrong date.

**Fix:** The picker value is now built manually from UTC parts:

```jsx
value={`${currentDate.getUTCFullYear()}-${String(currentDate.getUTCMonth() + 1).padStart(2, "0")}-${String(currentDate.getUTCDate()).padStart(2, "0")}`}
```

---

## ✨ UI Improvements

### Symmetric table layout

Records are now rendered in a proper `<table>` with a `<colgroup>` defining fixed column widths (28% date / 20% meal / 30% food / 22% calories). Every row is perfectly aligned regardless of content length.

### Color-coded meal pills

Each meal type renders as a rounded pill badge with a unique color:

| Meal      | Color  |
| --------- | ------ |
| Breakfast | Blue   |
| Lunch     | Green  |
| Dinner    | Purple |
| Snack     | Amber  |

### Daily calorie total

A `<tfoot>` row sums all valid calories for the selected day and displays the total in a highlighted badge at the bottom of the table.

### Polished button design

The "Track food" button and all modal buttons share a consistent purple design system with hover darkening and active press scale transitions:

- **Primary** — solid purple `#534AB7`, darkens to `#3C3489` on hover
- **Secondary (Cancel)** — transparent with purple border and text
- **Disabled** — muted purple fill, `not-allowed` cursor, no transform

### Plus icon in the Track Food button

The main CTA button includes an inline SVG `+` circle icon for clearer affordance and a more polished look.

---

## 🗺️ Roadmap & Future Updates

- [ ] **Edit & delete records** — modify or remove existing entries
- [ ] **Weekly / monthly charts** — visualize intake over time
- [ ] **Nutritional info** — protein, carbs, fat breakdown per entry
- [ ] **User authentication** — personal accounts and cloud sync
- [ ] **Dark mode** — theme toggle support
- [ ] **Mobile responsiveness improvements** — enhanced small-screen UX
- [ ] **Export to CSV** — download your records

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
