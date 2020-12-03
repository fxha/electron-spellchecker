# Changelog

### 2.0.0

- Updated native modules to N-API.
- Removed Electrons `remote` API.

**Breaking change:**

- `SpellCheckHandler` expects a directory to store Hunspell dictionaries, otherwise an exception is thrown.

### Initial release

This is a breaking change from the original `electron-spellchecker`.

**Features removed:**

- Dropped support for \<=Electron 4.
- Removed context menus.
- Dropped automatic dictionary download and management.
