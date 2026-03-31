<script type="ts">
  import TimeDifference from './TimeDifference.svelte';
  import { timeDifference } from '../utils';
  import { fade, fly } from 'svelte/transition';
  import type { TodoItem } from '../types/item';

  export let item: TodoItem;
  export let highlighted = false;
  export let styleVariant = 1;
</script>

<style>
  .entry {
    display: grid;
    grid-template-columns: 1rem minmax(0, 1fr);
    column-gap: 0.65rem;
    user-select: none;
    align-items: start;
    padding: 0.65rem 0.85rem;
    margin-bottom: 0.75rem;
    border: 3px solid var(--item-border, rgba(255, 255, 255, 0.28));
    background: var(--item-bg, rgba(255, 255, 255, 0.08));
    color: var(--item-text, #ffffff);
    box-shadow: 4px 4px 0 var(--shadow-color, rgba(0, 0, 0, 0.4));
    font-size: var(--item-font-size, 1rem);
    border-radius: var(--item-radius, 0);
    transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
  }

  .entry-done,
  .entry-fade {
    opacity: 0.55;
  }

  .entry-done .label {
    text-decoration: line-through;
  }

  .label-with-number {
    min-width: 0;
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.9rem;
  }

  .label-main {
    min-width: 0;
    flex: 1 1 auto;
    display: inline-flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .label {
    min-width: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .timer-inline {
    flex: 0 0 auto;
    align-self: flex-start;
    color: var(--badge-text, #ffffff);
    white-space: nowrap;
    text-align: right;
    font-size: 0.92em;
    opacity: 0.95;
  }

  .timer-inline :global(.nes-badge) {
    display: inline !important;
    border-image-source: none !important;
    border-image-slice: 0 !important;
    border-image-width: 0 !important;
    border-image-outset: 0 !important;
    border-image-repeat: stretch !important;
    border-width: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
    vertical-align: baseline !important;
  }

  .timer-inline :global(.nes-badge.is-splited) {
    display: inline !important;
  }

  .timer-inline :global(.nes-badge span) {
    display: inline !important;
    padding: 0 !important;
    margin: 0 !important;
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    color: inherit !important;
    vertical-align: baseline !important;
  }

  .timer-inline :global(.nes-badge.is-splited > span:first-child) {
    display: none;
  }

  .entry-highlighted {
    box-shadow: 0 0 0 3px var(--highlight-ring, #f7d51d), 4px 4px 0 var(--shadow-color, rgba(0, 0, 0, 0.4));
  }

  .style-2-entry {
    backdrop-filter: blur(6px);
  }

  .style-2-entry .label {
    letter-spacing: 0.03em;
  }

  .style-3-entry {
    border-style: solid;
    border-width: 3px;
  }

  .style-3-entry .label {
    letter-spacing: 0.015em;
  }

  .style-4-entry {
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    align-items: center;
  }

  .style-4-entry.entry-highlighted {
    box-shadow: 0 0 0 3px var(--highlight-ring, #2563eb), 0 8px 24px rgba(15, 23, 42, 0.1);
  }

  .style-4-entry .item-number,
  .style-4-entry .checkbox-slot {
    color: var(--item-text, #111827) !important;
  }

  .style-4-entry .label {
    font-weight: 700;
    letter-spacing: 0.015em;
  }

  .style-4-entry .label.default-style-4-label {
    color: var(--item-text, #111827) !important;
  }

  .style-6-entry .label {
    letter-spacing: 0.01em;
  }

  .style-7-entry {
    backdrop-filter: blur(4px);
  }

  .style-7-entry .label {
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .style-8-entry {
    box-shadow: 0 6px 18px rgba(120, 53, 15, 0.08);
  }

  .style-8-entry .label.default-style-8-label {
    color: var(--item-text, #422006) !important;
  }

  .style-9-entry .label {
    letter-spacing: 0.02em;
  }

  .style-10-entry {
    border-style: solid;
    box-shadow: none;
  }

  .style-10-entry.entry-highlighted {
    box-shadow: 0 0 0 2px var(--highlight-ring, #ffffff);
  }

  .style-10-entry .label {
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .text-only-entry {
    padding: 0.22rem 0;
    margin-bottom: 0.45rem;
    border: 0;
    background: transparent;
    box-shadow: none;
    align-items: center;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65);
  }

  .text-only-entry.entry-highlighted {
    box-shadow: none;
    filter: none;
  }

  .checkbox-slot {
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
    display: grid;
    place-items: center;
    align-self: center;
  }

  .text-check {
    width: 0.95rem;
    height: 0.95rem;
    display: block;
  }

  .text-check rect,
  .text-check path {
    vector-effect: non-scaling-stroke;
  }

  .content-slot {
    min-width: 0;
    align-self: center;
  }

  .text-only-entry .label-with-number {
    max-width: 100%;
  }

  .text-only-entry .label {
    font-size: 1em;
  }

  .item-number {
    font-size: var(--number-font-size, 1rem);
    color: var(--number-color, #f7d51d);
  }

  .text-only-entry .timer-inline {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65);
  }
</style>

<div
  in:fade={{ duration: 500 }}
  out:fly={{ x: -500, duration: 500 }}
  class="entry"
  class:style-2-entry={styleVariant === 2}
  class:style-3-entry={styleVariant === 3}
  class:style-4-entry={styleVariant === 4}
  class:style-6-entry={styleVariant === 6}
  class:style-7-entry={styleVariant === 7}
  class:style-8-entry={styleVariant === 8}
  class:style-9-entry={styleVariant === 9}
  class:style-10-entry={styleVariant === 10}
  class:text-only-entry={styleVariant === 5}
  class:entry-highlighted={highlighted}
  class:entry-done={item.done}
  class:entry-fade={item.fade}>
  <span class="checkbox-slot" aria-hidden="true">
    <svg class="text-check" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="var(--check-color, #ffffff)" stroke-width="2" />
      {#if item.done}
        <path d="M4.2 8.2L6.8 10.8L11.8 5.6" stroke="var(--check-color, #ffffff)" stroke-width="2.1" stroke-linecap="square" stroke-linejoin="miter" />
      {/if}
    </svg>
  </span>
  <div class="content-slot">
    <span class="label-with-number">
      <span class="label-main">
      <span
        class="nes-text label is-{item.colorName}"
        class:default-style-4-label={styleVariant === 4 && !item.colorName && !item.colorStyle}
        class:default-style-8-label={styleVariant === 8 && !item.colorName && !item.colorStyle}
        style={item.colorStyle}>
        {item.label}
      </span>
      <span class="nes-text is-warning">
        <span class="item-number"> [#{item.id}] </span>
      </span>
      </span>
      {#if item.startTime || item.spentTime}
        <span class="timer-inline">
          {#if item.startTime}
            <TimeDifference startDate={item.startTime} baseSeconds={item.spentTime || 0} />
          {:else if item.spentTime}
            {timeDifference(item.spentTime).string}
          {/if}
        </span>
      {/if}
    </span>
  </div>
</div>
