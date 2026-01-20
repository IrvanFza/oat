+++
title = "Toast"
weight = 160
description = "Notification toasts with placement and stacking."
+++

Show toast notifications with `lm.toast(message, options?)`.

{% demo() %}
```html
<button onclick="lm.toast('Action completed successfully', 'All good', { variant: 'success' })">Success</button>
<button onclick="lm.toast('Something went wrong', 'Oops', { variant: 'danger', placement: 'top-left' })">Danger</button>
<button onclick="lm.toast('Please review this warning', 'Warning', { variant: 'warning', placement: 'bottom-right' })">Warning</button>
<button onclick="lm.toast('New notification', 'For your attenton', { placement: 'top-center' })">Info</button>
```
{% end %}

## Placement

```js
lm.toast('Top left', '', { placement: 'top-left' })
lm.toast('Top center', '',{ placement: 'top-center' })
lm.toast('Top right', '',{ placement: 'top-right' })  // default
lm.toast('Bottom left', '', { placement: 'bottom-left' })
lm.toast('Bottom center', '', { placement: 'bottom-center' })
lm.toast('Bottom right', '',{ placement: 'bottom-right' })
```

## Options

| Option      | Default       | Description                          |
| ----------- | ------------- | ------------------------------------ |
| `variant`   | `''`          | `'success'`, `'danger'`, `'warning'` |
| `placement` | `'top-right'` | Position on screen                   |
| `duration`  | `5000`        | Auto-dismiss in ms (0 = persistent)  |

## Custom markup

Use `lm.toastEl(element, options?)` to show toasts with custom HTML content.

{% demo() %}
```html
<template id="undo-toast">
  <output class="toast" data-variant="success">
    <h6 class="toast-title">Changes saved</h6>
    <p>Your document has been updated.</p>
    <button class="secondary small" onclick="this.closest('.toast').remove()">Okay</button>
  </output>
</template>

<button onclick="lm.toastEl(document.querySelector('#undo-toast'), { duration: 8000 })">
  Toast with action
</button>
```
{% end %}

**From a template:**

```js
lm.toastEl(document.querySelector('#my-template'))
lm.toastEl(document.querySelector('#my-template'), { duration: 8000, placement: 'bottom-center' })
```

**Dynamic element:**

```js
const el = document.createElement('output');
el.className = 'toast';
el.setAttribute('data-variant', 'warning');
el.innerHTML = '<h6 class="toast-title">Warning</h6><p>Custom content here</p>';
lm.toastEl(el);
```

The element is cloned before display, so templates can be reused.

## Clear toasts

```js
lm.toast.clear()              // Clear all
lm.toast.clear('top-right')   // Clear specific placement
```
