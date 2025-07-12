# 🚀 Starship Comparison App

Compare your favorite starships from the Star Wars universe!  
This web app allows users to **search**, **filter**, **sort**, and **compare up to 3 starships** side by side in a clean, responsive interface.

---

## 🖼️ Preview
<img width="1868" height="917" alt="image" src="https://github.com/user-attachments/assets/a8364b4f-32d3-46b5-bcd5-d3ad685e16f2" />


---

## 🔧 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **State Management:** [Jotai](https://jotai.org/)
- **Server State:** [React Query (TanStack Query)](https://tanstack.com/query/v4)
- **Table Management:** [TanStack Table v8](https://tanstack.com/table)
- **UI Kit:** [ShadCN UI](https://ui.shadcn.dev/)
- **Styling:** Tailwind CSS
- **Notifications:** [Sonner Toasts](https://sonner.emilkowal.ski/)
- **API Layer:** `ts-rest` contract-based services

---

## ✨ Features

✅ Search starships with live query  
✅ Pagination & sorting  
✅ Filter by crew size and hyperdrive rating  
✅ Select & compare up to 3 starships  
✅ Responsive UI with dark mode  
✅ Optimistic updates with React Query  
✅ Persist selected ships using Jotai  
✅ Glassmorphic headers for modern feel  

---

## 📦 Installation

```bash
git clone https://github.com/your-username/starship-comparator.git
cd starship-comparator
pnpm install
pnpm dev
```

> You can use `npm` or `yarn` if you're not using `pnpm`.

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                # Main page using the table
│   └── layout.tsx              # Global layout and theming
├── components/
│   ├── StarshipTable/          # Table logic with sorting/filtering
│   ├── ComparisonGridModal/    # Modal for comparing selected ships
│   ├── StarshipCard/           # Card for each starship in the modal
│   └── ui/                     # ShadCN components
├── lib/
│   ├── atoms/                  # Jotai atoms for state
│   ├── services/               # ts-rest API service logic
```

---

## 🧠 Development Tips

- To **add new filters**, update `filterSettingsAtom` and extend `applyFilters()`.
- To **customize comparison**, update `StarshipCard` with more fields.
- **Pagination** is handled via React Query’s `useQuery` with `page` state.

---

## 🧪 Future Enhancements

- ⏳ Add debounce to search bar  
- ⏳ Add favorites/bookmarks feature  
- ⏳ Add starship images  
- ⏳ Add unit and integration tests

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo and submit a PR.

---

## 📄 License

MIT © 2025 — [Your Name](https://github.com/your-username)
