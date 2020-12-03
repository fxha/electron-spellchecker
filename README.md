# electron-spellchecker

> Modified version of electron-spellchecker that is used in Mark Text.

electron-spellchecker is a library to help you implement spellchecking in your Electron applications. This library intends to solve the problem of spellchecking in a production-ready, international-friendly way.

electron-spellchecker:

* Spell checks in all of the languages that Chromium supports by reusing its dictionaries.
* Support for native macOS and Windows 10 spell checker that are prefered by default.
* Automatically detects the language the user is typing in and silently switches on the fly.
* Handles locale correctly and automatically (i.e. users who are from Australia should not be corrected for 'colour', but US English speakers should)
* Checks very quickly, doesn't introduce input lag which is extremely noticable
* Only loads one Dictionary at a time which saves a significant amount of memory
* Passive mode: don't underline spelling mistakes but you are still able to test for spelling mistakes.
* Custom user dictionary for both Hunspell and macOS.
* Option to ignore a word at runtime only.
* Attach spellchecker to a custom DOM element instead `document.body`.

**Features removed:**

- Dropped support for \<=Electron 4.
- Removed context menus.
- Dropped automatic dictionary download and management.

## Quick Start

```js
import {SpellCheckHandler} from 'electron-spellchecker';

const cacheDir = '';

window.spellCheckHandler = new SpellCheckHandler(cacheDir);
window.spellCheckHandler.attachToInput();

// Start off as US English, America #1 (lol)
window.spellCheckHandler.switchLanguage('en-US');
```

## Language Auto-Detection

The spell checker will attempt to automatically check the language that the user is typing in and switch on-the fly. However, giving it an explicit hint by calling `switchLanguage`, or providing it a block of sample text via `provideHintText` will result in much better results.

Sample text should be text that is reasonably likely to be in the same language as the user typing - for example, in an Email reply box, the original Email text would be a great sample, or in the case of Slack, the existing channel messages are used as the sample text.

## About node-spellchecker

This module uses a fork of Atom's excellent `node-spellchecker` with few modifications. You can find the source [here](https://github.com/fxha/node-spellchecker).
