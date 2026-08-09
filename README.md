
# the-holy-bible-api-client
A lightweight, type-safe JavaScript/TypeScript client for the **Bible API** [bible-api.com](https://bible-api.com/), built specifically around its **Parameterized API**. This package wraps the identifier-based `/data` endpoints with a clean, promise-based interface, predictable error handling and zero runtime configuration.

### 📦 Installation

```console
npm install the-holy-bible-api-client
```
💡 Note: This client is powered by the official [Bible API](https://bible-api.com/). No API keys are required. The package targets the **Parameterized API** (`/data/...`) rather than the free-text "User Input API" (`/BOOK+CHAPTER:VERSE`).

⚠️ Please check directly with the source for the applicable rate limits before making requests. The service may impose limits on request frequency and may not be intended for bulk-downloading an entire translation.

### 📘 Features
1. TypeScript-first with full type definitions
2. Covers the full Parameterized API surface: translations, books, chapters and random verses
3. Dedicated helpers for random Old Testament and New Testament verses
4. Zero runtime dependencies
5. Clean, promise-based API - Works in both Node.js and modern browsers

### 🔤 Example Usage

1. 📁 Get Available Translations
```javascript
/* node modules */
import { getAvailableTranslations } from 'the-holy-bible-api-client';

async function myFunc() {
  const response = await getAvailableTranslations();
  console.log(response);
}
await myFunc();

/*
{
  code: "api-ok", // if err then - "api-fail"
  message: "Success. Check Payload.",
  payload: {
    translations: [
      { identifier: "web", name: "World English Bible", language: "English", ... },
      { identifier: "kjv", name: "King James Version", language: "English", ... },
      ...
    ]
  }
}
*/
```

2. 📁 Get List of Book Ids for a Translation
```javascript
/* node modules */
import { getListOfBookIds } from 'the-holy-bible-api-client';

async function myFunc() {
  const response = await getListOfBookIds({ id: 'web' });
  console.log(response);
}
await myFunc();

/*
{
  code: "api-ok", // if err then - "api-fail"
  message: "Success. Check Payload.",
  payload: {
    translation: { identifier: "web", name: "World English Bible", ... },
    books: [
      { id: "GEN", name: "Genesis", url: "https://bible-api.com/data/web/GEN" },
      { id: "EXO", name: "Exodus", url: "https://bible-api.com/data/web/EXO" },
      ...
    ]
  }
}
*/
```

3. 📁 Get a Translation by Params (Book / Chapter)
Note: Calling `getTranslationByParams()` with no arguments falls back to the full **World English Bible** (`web`) book listing.
```javascript
/* node modules */
import { getTranslationByParams } from 'the-holy-bible-api-client';

async function myFunc() {
  const response = await getTranslationByParams({
    translationId: 'web',
    bookId: 'JHN' /* bookId part in the input props is optional */,
    chapterId: 3 /* chapterId part in the input props is optional, requires bookId */,
  });
  console.log(response);
}
await myFunc();

/*
{
  code: "api-ok", // if err then - "api-fail"
  message: "Success. Check Payload.",
  payload: {
    translation: { identifier: "web", name: "World English Bible", ... },
    verses: [
      { book_id: "JHN", book: "John", chapter: 3, verse: 1, text: "Now there was a man..." },
      { book_id: "JHN", book: "John", chapter: 3, verse: 16, text: "For God so loved the world..." },
      ...
    ]
  }
}
*/
```
4. 📁 Get a Random Verse
Note: Calling `getRandomVerse()` with no arguments falls back to a random verse from the **World English Bible** (`web`) across the whole book.
```javascript
/* node modules */
import { getRandomVerse } from 'the-holy-bible-api-client';

async function myFunc() {
  const response = await getRandomVerse({
    translationId: 'web',
    bookId: 'JHN' /* bookId part in the input props is optional */,
  });
  console.log(response);
}
await myFunc();

/*
{
  code: "api-ok", // if err then - "api-fail"
  message: "Success. Check Payload.",
  payload: {
    translation: { identifier: "web", name: "World English Bible", ... },
    random_verse: {
      book_id: "JHN",
      book: "John",
      chapter: 3,
      verse: 16,
      text: "For God so loved the world..."
    }
  }
}
*/
```

5. 📁 Get a Random Verse from the Old Testament
```javascript
/* node modules */
import { getRandomVerseOldTestament } from 'the-holy-bible-api-client';

async function myFunc() {
  const response = await getRandomVerseOldTestament({ id: 'web' });
  console.log(response);
}
await myFunc();

/*
{
  code: "api-ok", // if err then - "api-fail"
  message: "Success. Check Payload.",
  payload: {
    translation: { identifier: "web", name: "World English Bible", ... },
    random_verse: {
      book_id: "JOB",
      book: "Job",
      chapter: 12,
      verse: 7,
      text: "But ask the animals, now, and they shall teach you..."
    }
  }
}
*/
```

6. 📁 Get a Random Verse from the New Testament
```javascript
/* node modules */
import { getRandomVerseNewTestament } from 'the-holy-bible-api-client';

async function myFunc() {
  const response = await getRandomVerseNewTestament({ id: 'web' });
  console.log(response);
}
await myFunc();

/*
{
  code: "api-ok", // if err then - "api-fail"
  message: "Success. Check Payload.",
  payload: {
    translation: { identifier: "web", name: "World English Bible", ... },
    random_verse: {
      book_id: "ROM",
      book: "Romans",
      chapter: 8,
      verse: 28,
      text: "We know that all things work together for good..."
    }
  }
}
*/
```

### 📘 Contributing
Contributions, suggestions, and improvements are welcome.
Feel free to open issues or pull requests.

### 🔒 Security & Privacy
1. This package is open source and intended to provide reusable utilities for application development. It does not collect, store, transmit, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection mechanisms.
2. All requests are made directly from the consuming application to `bible-api.com`; this package does not proxy, cache, or persist any response data on its own.

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
