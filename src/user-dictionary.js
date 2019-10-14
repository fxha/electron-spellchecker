const path = require('path');
const fs = require('fs-extra');

let d = require('debug')('electron-spellchecker:user-dictionary');

module.exports = class UserDictionary {
  /**
   * Create a user dictionary.
   *
   * @param  {String}    cacheDir The path to a directory to store dictionaries.
   * @param  {[Boolean]} inMemory Whether this dictionary should be in-memory only.
   */
  constructor(cacheDir, inMemory=false) {
    this.dict = null;
    this.lang = '';
    this.inMemory = inMemory;
    this.userDictPath = cacheDir;
  }

  /**
   * Override the default logger for this class. You probably want to use
   * {{setGlobalLogger}} instead
   *
   * @param {Function} fn   The function which will operate like console.log
   */
  static setLogger(fn) {
    d = fn;
  }

  isInitialized() {
    return this.lang && this.dict;
  }

  unload() {
    this.dict = null;
    this.lang = '';
  }

  loadForLanguage(lang) {
    if (this.inMemory) {
      this.dict = {};
      this.lang = 'memory';
      return true;
    }

    const fullname = path.join(this.userDictPath, `${lang}.json`);
    if (fs.existsSync(fullname)) {
      try {
        const dict = JSON.parse(fs.readFileSync(fullname));
        this.dict = dict;
      } catch (e) {
        d(`Failed to load directory for language  ${lang}: ${e.message}`);

        // Invalidate dictionary.
        this.dict = {};
        this.lang = lang;
        return false;
      }
    } else {
      this.dict = {};
    }
    this.lang = lang;
    return true;
  }

  save() {
    if (!this.isInitialized()) {
      return false;
    } else if (this.inMemory) {
      return true;
    }

    try {
      const fullname = path.join(this.userDictPath, `${this.lang}.json`);
      fs.outputFileSync(fullname, JSON.stringify(this.dict), 'utf-8');
      return true;
    } catch (e) {
      d(`Failed to save directory for language ${this.lang}: ${e.message}`);
      return false;
    }
  }

  add(word) {
    if (!this.isInitialized()) {
      return false;
    }

    this.dict[word] = true;
    return this.save();
  }

  remove(word) {
    if (!this.isInitialized()) {
      return false;
    } else if (!this.match(word)) {
      return true;
    }

    delete this.dict[word];
    return this.save();
  }

  match(word) {
    return this.isInitialized() && !!this.dict.hasOwnProperty(word);
  }
};
