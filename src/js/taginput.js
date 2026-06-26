/**
 * oat - TagInput Component
 * Uses a native <input> to manage a list of tags and a native <datalist> for optional autocomplete.
 * Type a word and press Enter or comma to turn it into a tag.
 *
 * Usage:
 * <ot-taginput value="apple, mango"><input placeholder="Add tags ..." maxlength="20" /></ot-taginput>
 *
 * Attributes:
 *   value              - comma-separated initial tags
 *
 * Properties:
 *   .value             - read/write array of tags
 *
 * Events:
 *   input              - dispatched (bubbles) when a tag is added or removed.
 *                        detail = string[] (the current array of tags)
 */

import { OtBase } from './base.js';

const h = t => document.createElement(t);

class OtTaginput extends OtBase {
  init() {
    this.input = this.querySelector('input');
    if (!this.input) return;

    if (!this.input.readOnly) {
      this.input.addEventListener('keydown', this);
      this.input.addEventListener('input', e => {
        e.stopPropagation();

        const val = this.input.value;
        const list = this.input.list;
        const picked = list && (e.inputType === 'insertReplacementText' || val.length - (this.prev || '').length > 1);
        this.prev = val;

        if (picked && [...list.options].some(o => o.value === val)) {
          return requestAnimationFrame(() => this.add(val));
        }
      });

      this.input.addEventListener('change', e => e.stopPropagation());
      this.addEventListener('click', this);
    }

    const val = this.getAttribute('value');
    if (val) this.value = [val];
  }

  // Enter / command triggers tag addition, backspace removes the last tag.
  onkeydown(e) {
    if (e.key === 'Backspace' && !this.input.value) {
      return this.remove(this.input.previousElementSibling);
    }

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      this.add(this.input.value);
    }
  }

  // Click a tag's 'x' to remove it.
  onclick(e) {
    const x = e.target.closest('button');
    x ? this.remove(x.parentElement) : this.input.focus();
  }

  add(val, silent) {
    val = val.trim();
    const vals = this.value;
    if (!val || vals.includes(val)) {
      return;
    }

    // Render the tag as an oat 'badge'.
    const t = h('span');
    t.className = 'badge';
    t.dataset.variant = 'secondary';
    t.textContent = val;

    if (!this.input.readOnly) {
      // Append the 'x' button.
      const x = h('button');
      x.type = 'button';
      x.ariaLabel = `Remove ${val}`;
      x.textContent = '×';
      t.appendChild(x);

      this.insertBefore(t, this.input);
      this.input.value = this.prev = '';
      this.input.list?.replaceChildren();
    } else {
      this.insertBefore(t, this.input);
    }

    if (!silent) this.emit('input', this.value);
  }

  // `el` is a tag element.
  remove(el) {
    if (!el) return;

    el.remove();
    this.emit('input', this.value);
  }

  get value() {
    return [...this.querySelectorAll('.badge')].map(t => t.firstChild.data);
  }

  // Set tag values.
  set value(tags) {
    this.input ??= this.querySelector('input');

    this.querySelectorAll('.badge').forEach(b => b.remove());

    (Array.isArray(tags) ? tags : []).forEach(t => String(t).split(',').forEach(v => this.add(v, true)));
  }
}

customElements.define('ot-taginput', OtTaginput);
