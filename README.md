# 🥗 Calorie Tracker

A clean and intuitive calorie tracking web application built with **React** and **Vite**. Track your daily meals, monitor calorie intake by date, and log new food entries through a smooth modal interface.

---

## 📸 Project Overview

Calorie Tracker allows users to:

- View all meal records filtered by a selected date
- Add new food entries (date, meal type, food content, calories) via a modal form
- See records sorted chronologically
- See a **daily calorie total** at the bottom of each day's records
- **Persist data across sessions** via localStorage — records survive page refresh
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
│   ├── calorie.svg                         # Custom fork & knife favicon
│   └── vite.svg                            # Default Vite asset (unused)
├── src/
│   ├── assets/
│   │   └── react.svg                       # Default React asset (unused)
│   ├── Component/
│   │   ├── CalorieRecordSection/
│   │   │   ├── CalorieRecord.jsx           # Single meal row — date badge, meal pill, cal badge
│   │   │   ├── CalorieRecord.module.css
│   │   │   ├── CalorieRecordDate.jsx       # Legacy date cell (unused, superseded by CalorieRecord)
│   │   │   ├── CalorieRecordDate.module.css
│   │   │   ├── ListingSection.jsx          # Date picker + filtered record list
│   │   │   ├── ListingSection.module.css
│   │   │   ├── RecoridList.jsx             # Table with header and daily total footer
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
├── index.html                              # Page title: "Calorie Tracker", favicon: calorie.svg
├── package.json
├── vite.config.js
└── LICENSE                                 # MIT License
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

The root component. Manages global state:

- `records` — list of all calorie entries, initialized from `localStorage` on mount. Each stored record's date ISO string is re-hydrated into a `Date` object via `getDateFromString`.
- `isModalOpen` — controls modal visibility.

New records use `crypto.randomUUID()` for unique IDs — no manual counter needed. Records are persisted to `localStorage` via `useEffect` on every change, and sorted by date on every insert.

---

### `ListingSection.jsx`

Displays a date picker and filters records to show only entries matching the selected date. Initializes to today using UTC. The picker value is built manually from UTC parts to avoid timezone-driven day shifts.

---

### `RecoridList.jsx`

Renders filtered records in a `<table>` with a fixed-width `<colgroup>`, a header row, and a `<tfoot>` that sums all valid calories for the day. Shows a friendly empty state when no records match.

---

### `CalorieRecord.jsx`

Renders a single `<tr>` with four symmetric columns. Reads date using UTC methods to stay consistent with storage and filtering:

- **Date** — compact badge (month / day / year)
- **Meal** — color-coded pill (Breakfast → blue, Lunch → green, Dinner → purple, Snack → amber)
- **Food** — text content, or "Invalid entry" for bad records
- **Calories** — monospace badge with `kcal` label, or `—` for invalid values

---

### `CalorieRecordDate.jsx`

Legacy component — still in the codebase but no longer used by the table layout. Date display is now handled inline inside `CalorieRecord.jsx`.

---

### `CalorieRecordEdit.jsx`

The modal form with four fields: date picker, meal dropdown, content text input, and calorie number input. The submit button stays disabled until all fields are filled and calories are `≥ 0`. Resets to default values on submit or cancel.

---

### `StyledRecordCell.jsx`

A reusable bordered, rounded cell wrapper. Still used by the legacy `CalorieRecordDate` component; the main table layout no longer depends on it directly.

---

### `utils.js`

A single utility — `getDateFromString(dateString)` — converts a `YYYY-MM-DD` string into a UTC-midnight `Date` object, preventing timezone-driven off-by-one date bugs.

```js
export default function getDateFromString(dateString) {
  const tokens = dateString.split("-");
  return new Date(
    Date.UTC(Number(tokens[0]), Number(tokens[1]) - 1, Number(tokens[2]))
  );
}
```

---

## 🎨 Theming & CSS Variables

All design tokens are defined in `src/index.css` and consumed across every component via CSS custom properties. Changing the theme requires editing only one file.

```css
/* Background scale */
--theme-background-ultraLight: #effaff;
--theme-background-normal:     #a0d2eb;
--theme-background-light:      #e5eaf5;

/* Brand purple */
--theme-color-light:           #d0bdf4;
--theme-color-normal:          #8458b3;
--theme-color-dark:            #494d5f;

/* Button */
--btn-primary-bg:              #534ab7;
--btn-primary-hover:           #3c3489;
--btn-primary-text:            #eeedfe;
--btn-primary-disabled-bg:     #eeedfe;
--btn-primary-disabled-text:   #afa9ec;
--btn-primary-disabled-border: #cecbf6;

/* Badges & dates */
--badge-bg:                    #f5f0ff;
--badge-border:                1px solid var(--theme-color-light);
--date-month-color:            darkred;
--date-year-color:             #999;
--kcal-label-color:            #aaa;

/* Meal pills */
--meal-breakfast-bg / text:    #dbeafe / #1e40af;
--meal-lunch-bg / text:        #dcfce7 / #166534;
--meal-dinner-bg / text:       #ede9fe / #5b21b6;
--meal-snack-bg / text:        #fef3c7 / #92400e;

/* Border radius scale */
--radius-sm: 6px  |  --radius-md: 8px  |  --radius-lg: 12px
--radius-xl: 14px |  --radius-pill: 20px

/* Font size scale */
--font-xs: 11px  |  --font-sm: 12px  |  --font-md: 14px
--font-base: 16px  |  --font-lg: 18px
```

---

## 🐛 Bug Fixes

### Dates displaying one day behind (UTC+ timezones)

**Problem:** `new Date(year, month, day)` creates a local-midnight date. UTC methods used elsewhere shifted the display back one day in timezones east of UTC (e.g. Cairo UTC+2).

**Fix:** All dates are created with `Date.UTC()` in `utils.js`, compared with UTC methods in `ListingSection.jsx`, and displayed with UTC methods in `CalorieRecord.jsx`.

---

### localStorage dates losing one day after reload

**Problem:** `JSON.stringify` turns `Date` objects into ISO strings. `JSON.parse` returns plain strings — not `Date` objects. The timezone offset would then shift the restored date back one day.

**Fix:** On load, stored records are mapped through `.map(r => ({ ...r, date: getDateFromString(r.date.split("T")[0]) }))`, rebuilding each date as a UTC-midnight `Date` object.

---

### Date picker showing wrong selected day

**Problem:** `toISOString().split("T")[0]` can return the previous calendar day in UTC+ timezones.

**Fix:** The picker value is built manually from UTC parts inside `formatDate()` in `ListingSection.jsx`:

```js
const formatDate = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
```

---

## ✨ UI Improvements

### Custom favicon & page title

The browser tab shows **"Calorie Tracker"** with a custom purple fork & knife SVG icon (`public/calorie.svg`) instead of the default Vite logo.

### Symmetric table layout

Records render in a `<table>` with a `<colgroup>` defining fixed column widths — 28% date / 20% meal / 30% food / 22% calories — so every row aligns perfectly regardless of content.

### Color-coded meal pills

| Meal      | Background | Text        |
| --------- | ---------- | ----------- |
| Breakfast | Blue       | Dark blue   |
| Lunch     | Green      | Dark green  |
| Dinner    | Purple     | Dark purple |
| Snack     | Amber      | Dark amber  |

### Daily calorie total

A `<tfoot>` row sums all valid calories for the selected day and displays the result in a highlighted badge.

### Polished button system

All buttons share a consistent purple design with smooth hover and active transitions:

- **Primary** — `#534AB7` fill, darkens on hover, scale(0.97) on press
- **Secondary (Cancel)** — transparent with purple border and text
- **Disabled** — muted purple fill, `not-allowed` cursor, no transform on hover

### UUID-based record IDs

Records now use `crypto.randomUUID()` instead of a manual incrementing counter, eliminating the need for a persisted `nextId` in state and localStorage.

### Plus icon on Track Food button

The main CTA includes an inline SVG `+` circle icon for clearer affordance.

---

## ⚠️ Known Issues

- `public/vite.svg` and `src/assets/react.svg` are default Vite/React assets that are no longer used and can be safely deleted.
- `CalorieRecordDate.jsx` and its CSS module are legacy files no longer used by the table layout — they can be removed in a future cleanup.
- The favicon path in `index.html` is set to `./public/calorie.svg`. In Vite, files in `public/` are served from the root, so the correct path is `/calorie.svg`.

---

## 🗺️ Roadmap & Future Updates

- [ ] **Edit & delete records** — modify or remove existing entries
- [ ] **Weekly / monthly charts** — visualize intake over time
- [ ] **Nutritional info** — protein, carbs, fat breakdown per entry
- [ ] **User authentication** — personal accounts and cloud sync
- [ ] **Dark mode** — theme toggle support
- [ ] **Mobile responsiveness improvements** — enhanced small-screen UX
- [ ] **Export to CSV** — download your records
- [ ] **Cleanup** — remove unused legacy files (`CalorieRecordDate`, `vite.svg`, `react.svg`)

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
