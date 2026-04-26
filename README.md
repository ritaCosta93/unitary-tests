# 🧪 Unit Testing Practice (React + Jest)

This repository contains my hands-on practice with **unit and integration testing** in React applications using modern testing tools.

The goal is to build a strong understanding of testing concepts, patterns, and real-world scenarios — from simple components to more complex async flows and custom hooks.

---

## 🚀 Tech Stack

* **React**
* **Jest**
* **React Testing Library**
* **TypeScript**
* **user-event**

---

## 📚 What I Practiced

### ✅ Component Testing

* Rendering elements correctly
* User interactions (click, type)
* Conditional rendering

### ✅ Async Testing

* Handling API calls (`fetch`)
* Testing loading, success, and error states
* Using `findBy`, `waitFor`

### ✅ Custom Hooks

* Testing hooks with `renderHook`
* Managing side effects (`useEffect`)
* State transitions

### ✅ Mocking

* Mocking `fetch`
* Controlling async behavior
* Simulating different API responses

### ✅ Edge Cases

* Empty results
* Error handling
* Preventing unwanted state updates

---

## 🧩 Example Features Tested

* Counter component (increment/decrement + validation)
* Login form (validation + submission)
* API-driven components
* Search with async results
* Custom hooks for data fetching

---

## 🧠 Key Learnings

* Test **behavior, not implementation**
* Prefer **user-centric testing**
* Use async utilities correctly (`findBy`, `waitFor`)
* Avoid unnecessary `act`
* Keep tests **isolated and deterministic**

---

## 📦 Scripts

```bash
npm run test
npm run test:coverage
```

---

## 📊 Coverage

The project includes test coverage reports to help track tested logic:

```bash
npm run test:coverage
```

---

## 🎯 Goals

* Improve testing confidence in React apps
* Write maintainable and scalable tests
* Simulate real-world scenarios (API, async flows)
* Move towards **advanced testing patterns**

---

## 📌 Notes

This repository is focused on **learning and experimentation**, so you may find multiple approaches to similar problems as I explore best practices.
