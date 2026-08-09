![Banner](https://github.com/user-attachments/assets/9a9a60bf-59f8-49bc-ae59-f25fd5af0629)
![npm](https://img.shields.io/npm/v/the-holy-bible-api)
![downloads](https://img.shields.io/npm/dw/the-holy-bible-api)
![license](https://img.shields.io/npm/l/the-holy-bible-api)
![Security Policy](https://img.shields.io/badge/security-policy-brightgreen)
![npm_provenance](https://img.shields.io/badge/npm-provenance-brightgreen?logo=npm)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/the-holy-bible-api)

# the-holy-bible-api
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

3. 📁 Get a Translation by Params (Book / Chapter)<br/>
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
4. 📁 Get a Random Verse<br/>
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

### 📗 Test Coverage
```console
PASS  src/shared/tests/index.test.ts
  Root File Test
    ✓ base-api URL is as expected

PASS  src/get-available-translations/tests/get-available-translations.test.ts
  Get Available Translations
    ✓ fetch gets called with expected parameters
    ✓ returns 200-OK response
    ✓ returns 4xx-Err response

PASS  src/get-random-verse/tests/get-random-verse.test.ts
  Get Random Verse
    ✓ random verse: translation-id = mock-value; 200-ok
    ✓ random verse: translation-id = mock-value; 4xx-er
    ✓ random verse: translation-id = web; 200-ok
    ✓ random verse: translation-id = web; 4xx-er
    ✓ random verse: translation-id = mock-value, book-id = mock-value; 200-ok
    ✓ random verse: translation-id = mock-value, book-id = mock-value; 4xx-er

PASS  src/get-random-verse-new-testament/tests/get-random-verse-new-testament.test.ts
   Get Random Verse: New Testament
    ✓ throws error when fields are invalid
    ✓ fetch gets called with expected paramters
    ✓ returns 200-OK response
    ✓ returns 4xx-Err response

PASS  src/get-list-of-book-ids/tests/get-list-of-book-ids.test.ts
  Get List Of Book Ids
    ✓ fails when invalid props are passed
    ✓ fetch gets called with expected parameters
    ✓ return 200OK response
    ✓ returns 4xx-Err response

 PASS  src/get-translation-by-params/tests/get-translation-by-params.test.ts
  Get Translation By Params
    ✓ fetch gets called with expected parameters for translation-only
    ✓ fetch gets called with expected parameters for translation + book id
    ✓ returns 200-OK response for translation-only
    ✓ returns 200-OK response for translation + book id
    ✓ returns 200-OK response for translation + book id + chapter id
    ✓ returns 200-OK response for web default endpoint
    ✓ returns 4xx-Err response

PASS  src/get-random-verse-old-testament/tests/get-random-verse-old-testament.test.ts
  Get Random Verse: Old Testament
    ✓ throws err when fields are invalid
    ✓ fetch gets called with expected parameters
    ✓ returns 200-OK response
    ✓ return 4xx-Err response

--------------------------------------|---------|----------|---------|---------|-------------------
File                                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------------|---------|----------|---------|---------|-------------------
All files                             |   97.13 |    90.76 |     100 |   97.13 |                   
 get-available-translations           |   91.66 |       75 |     100 |   91.66 |                   
  index.ts                            |   91.66 |       75 |     100 |   91.66 | 29-31             
 get-available-translations/tests     |     100 |      100 |     100 |     100 |                   
  msw-handlers.ts                     |     100 |      100 |     100 |     100 |                   
 get-list-of-book-ids                 |   93.18 |    83.33 |     100 |   93.18 |                   
  index.ts                            |   93.18 |    83.33 |     100 |   93.18 | 36-38             
 get-list-of-book-ids/tests           |     100 |      100 |     100 |     100 |                   
  msw-handlers.ts                     |     100 |      100 |     100 |     100 |                   
 get-random-verse                     |   93.87 |     87.5 |     100 |   93.87 |                   
  index.ts                            |   93.87 |     87.5 |     100 |   93.87 | 42-44             
 get-random-verse-new-testament       |   93.18 |    83.33 |     100 |   93.18 |                   
  index.ts                            |   93.18 |    83.33 |     100 |   93.18 | 36-38             
 get-random-verse-new-testament/tests |     100 |      100 |     100 |     100 |                   
  msw-handler.ts                      |     100 |      100 |     100 |     100 |                   
 get-random-verse-old-testament       |   93.18 |    83.33 |     100 |   93.18 |                   
  index.ts                            |   93.18 |    83.33 |     100 |   93.18 | 36-38             
 get-random-verse-old-testament/tests |     100 |      100 |     100 |     100 |                   
  msw-handlers.ts                     |     100 |      100 |     100 |     100 |                   
 get-random-verse/tests               |     100 |      100 |     100 |     100 |                   
  msw-handlers.ts                     |     100 |      100 |     100 |     100 |                   
 get-translation-by-params            |   94.64 |     90.9 |     100 |   94.64 |                   
  index.ts                            |   94.64 |     90.9 |     100 |   94.64 | 49-51             
 get-translation-by-params/tests      |     100 |      100 |     100 |     100 |                   
  msw-handlers.ts                     |     100 |      100 |     100 |     100 |                   
 shared                               |     100 |      100 |     100 |     100 |                   
  index.ts                            |     100 |      100 |     100 |     100 |                   
  msw-mock-server.ts                  |     100 |      100 |     100 |     100 |                   
--------------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 7 passed, 7 total
Tests:       29 passed, 29 total
Snapshots:   0 total
Time:        43.377 s
Ran all test suites.

```

### 📘 Contributing
Contributions, suggestions, and improvements are welcome.
Feel free to open issues or pull requests.

### 🔒 Security & Privacy
1. This package is open source and intended to provide reusable utilities for application development. It does not collect, store, transmit, sell, or share user data and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection mechanisms.
2. All requests are made directly from the consuming application to `bible-api.com`; this package does not proxy, cache, or persist any response data on its own. For more information, [click here](https://github.com/NPM-Workbench/the-holy-bible-api/blob/feature/dev/SECURITY.md)

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
