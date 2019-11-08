import { SHOW_PREVIEW, HIDE_PREVIEW } from './events';
import { createElement, getEmojiName } from './util';

const safeInnerHTML = require('safeinnerhtml');
const CLASS_PREVIEW = 'emoji-picker__preview';
const CLASS_PREVIEW_EMOJI = 'emoji-picker__preview-emoji';
const CLASS_PREVIEW_NAME = 'emoji-picker__preview-name';

export class EmojiPreview {
  constructor(events) {
    this.events = events;
  }

  render() {
    const preview = createElement('div', CLASS_PREVIEW);

    this.emoji = createElement('div', CLASS_PREVIEW_EMOJI);
    preview.appendChild(this.emoji);

    this.name = createElement('div', CLASS_PREVIEW_NAME);
    preview.appendChild(this.name);

    this.events.on(SHOW_PREVIEW, emoji => this.showPreview(emoji));
    this.events.on(HIDE_PREVIEW, () => this.hidePreview());

    return preview;
  }

  showPreview(emoji) {
    safeInnerHTML(this.emoji, emoji.e);
    safeInnerHTML(this.name, getEmojiName(emoji));
  }

  hidePreview() {
    this.emoji.innerHTML = '';
    this.name.innerHTML = '';
  }
}
