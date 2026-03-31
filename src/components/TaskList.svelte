<script lang="ts">
  import type { TodoItem } from '../types/item';
  import * as animateScroll from 'svelte-scrollto';
  import { onMount } from 'svelte';
  import ListItem from './ListItem.svelte';

  export let taskListName: string;
  export let items: TodoItem[];
  export let highlightItemIndex = -1;
  export let showOnlyItemIndex = -1;
  export let scrollingInterval = 5000;
  export let scrollingDuration = 2000;
  export let layout = 'full';
  export let styleVariant = 1;
  export let fontVariant = 0;

  // TODO Either add scrolling up / down
  // TODO or reverse items list

  let itemsListElement;

  const getBottomScrollTarget = () => {
    if (!itemsListElement) return 0;

    const lastItem = itemsListElement.lastElementChild as HTMLElement | null;
    if (!lastItem) return 0;

    return Math.max(
      0,
      lastItem.offsetTop + lastItem.offsetHeight - itemsListElement.clientHeight
    );
  };

  onMount(() => {
    var scrollToTop = false;

    setInterval(() => {
      if (scrollToTop) {
        animateScroll.scrollToTop({
          container: itemsListElement,
          duration: scrollingDuration
        });
      } else {
        animateScroll.scrollTo({
          container: itemsListElement,
          y: getBottomScrollTarget(),
          duration: scrollingDuration
        });
      }

      scrollToTop = !scrollToTop;
    }, scrollingInterval);
  });
</script>

<style>
  .nes-container {
    height: calc(100vh - 8px);
  }

  .transparent-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 8px);
    overflow: hidden;
    box-sizing: border-box;
  }

  .panel-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 8px);
    overflow: hidden;
    box-sizing: border-box;
  }

  .nes-container.auto-layout {
    height: 100%;
    max-height: 100vh;
  }

  .transparent-container.auto-layout {
    height: 100%;
    max-height: 100vh;
  }

  .panel-container.auto-layout {
    height: 100%;
    max-height: 100vh;
  }

  .items-holder {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    margin-left: 0;
    box-sizing: border-box;
  }

  .items-holder :global(.entry:last-child) {
    margin-bottom: 0;
    box-shadow: none;
  }

  .items-holder :global(.entry:last-child.entry-highlighted) {
    box-shadow: 0 0 0 3px var(--highlight-ring, #f7d51d);
  }

  .nes-container.with-title > .title {
    display: inline-block;
    flex: 0 0 auto;
    margin: 0 0 0.75rem 0;
    position: relative;
    left: 0;
    top: 0;
  }

  .transparent-container.with-title > .title {
    display: inline-block;
    flex: 0 0 auto;
    margin: 0 0 0.75rem 0;
    position: relative;
    left: 0;
    top: 0;
  }

  .panel-container.with-title > .title {
    display: inline-block;
    flex: 0 0 auto;
    margin: 0 0 0.75rem 0;
    position: relative;
    left: 0;
    top: 0;
  }

  .theme-shell {
    --panel-bg: rgb(33, 37, 41);
    --panel-border: #ffffff;
    --title-bg: #212529;
    --title-color: #ffffff;
    --item-bg: rgba(255, 255, 255, 0.08);
    --item-border: rgba(255, 255, 255, 0.28);
    --item-text: #ffffff;
    --number-color: #f7d51d;
    --check-color: #ffffff;
    --badge-bg: rgba(0, 0, 0, 0.28);
    --badge-text: #ffffff;
    --highlight-ring: #f7d51d;
    --shadow-color: rgba(0, 0, 0, 0.4);
    --list-font: 'Press Start 2P', Arial, sans-serif;
    --title-font-size: 1rem;
    --item-font-size: 1rem;
    --number-font-size: 1rem;
    --title-letter-spacing: 0;
    --title-text-transform: none;
    --panel-radius: 0;
    --item-radius: 0;
    --panel-padding: 0.5rem;
  }

  .theme-shell :global(.nes-container) {
    background: var(--panel-bg);
    border-color: var(--panel-border);
    box-shadow: 8px 8px 0 var(--shadow-color);
    border-radius: var(--panel-radius);
    padding: var(--panel-padding);
  }

  .theme-shell .panel-container {
    background: var(--panel-bg);
    border: 4px solid var(--panel-border);
    box-shadow: none;
    border-radius: var(--panel-radius);
    padding: var(--panel-padding);
    box-sizing: border-box;
  }

  .theme-shell,
  .theme-shell * {
    font-family: var(--list-font);
  }

  .theme-shell :global(.title),
  .theme-shell :global(.nes-text),
  .theme-shell :global(.nes-badge span) {
    font-family: var(--list-font) !important;
  }

  .theme-shell :global(.nes-container.with-title > .title),
  .theme-shell .transparent-container.with-title > .title,
  .theme-shell .panel-container.with-title > .title {
    background: var(--title-bg);
    color: var(--title-color);
    font-size: var(--title-font-size);
    letter-spacing: var(--title-letter-spacing);
    text-transform: var(--title-text-transform);
    white-space: nowrap;
    padding: 0.28rem 0.5rem;
  }

  .theme-shell.style-2 {
    --panel-bg: linear-gradient(180deg, rgb(7, 16, 31), rgb(11, 37, 64));
    --panel-border: #69e2ff;
    --title-bg: linear-gradient(90deg, #69e2ff, #38bdf8);
    --title-color: #03131c;
    --item-bg: rgba(20, 65, 108, 0.36);
    --item-border: rgba(105, 226, 255, 0.55);
    --item-text: #e6fbff;
    --number-color: #8bff9f;
    --check-color: #69e2ff;
    --badge-bg: rgba(14, 116, 144, 0.35);
    --badge-text: #e0f7ff;
    --highlight-ring: #8bff9f;
    --shadow-color: rgba(56, 189, 248, 0.3);
    --list-font: 'Oxanium', Arial, sans-serif;
    --title-font-size: 1.15rem;
    --item-font-size: 1.02rem;
    --number-font-size: 0.98rem;
    --title-letter-spacing: 0.08em;
    --title-text-transform: uppercase;
    --panel-radius: 10px;
    --item-radius: 10px;
    --panel-padding: 0.75rem;
  }

  .theme-shell.style-3 {
    --panel-bg: rgb(47, 20, 58);
    --panel-border: #ffcf5a;
    --title-bg: #ff5ea8;
    --title-color: #fff7d1;
    --item-bg: rgba(255, 94, 168, 0.24);
    --item-border: rgba(255, 207, 90, 0.62);
    --item-text: #fff7d1;
    --number-color: #ffcf5a;
    --check-color: #fff7d1;
    --badge-bg: rgba(255, 207, 90, 0.18);
    --badge-text: #fff4bf;
    --highlight-ring: #7df9ff;
    --shadow-color: rgba(255, 94, 168, 0.38);
    --list-font: 'Fredoka', Arial, sans-serif;
    --title-font-size: 1.1rem;
    --item-font-size: 1.04rem;
    --number-font-size: 1rem;
    --title-letter-spacing: 0.04em;
    --panel-radius: 18px;
    --item-radius: 14px;
    --panel-padding: 0.8rem;
  }

  .theme-shell.style-4 {
    --panel-bg: rgb(244, 247, 250);
    --panel-border: #d4dee8;
    --title-bg: #1f2937;
    --title-color: #f9fafb;
    --item-bg: rgba(255, 255, 255, 0.86);
    --item-border: rgba(148, 163, 184, 0.45);
    --item-text: #111827;
    --number-color: #2563eb;
    --check-color: #1f2937;
    --badge-bg: rgba(226, 232, 240, 0.95);
    --badge-text: #1f2937;
    --highlight-ring: #2563eb;
    --shadow-color: rgba(15, 23, 42, 0.12);
    --list-font: 'Rajdhani', Arial, sans-serif;
    --title-font-size: 1.15rem;
    --item-font-size: 1.08rem;
    --number-font-size: 1.02rem;
    --title-letter-spacing: 0.06em;
    --title-text-transform: uppercase;
    --panel-radius: 14px;
    --item-radius: 12px;
    --panel-padding: 0.8rem;
  }

  .theme-shell.style-5 {
    --panel-bg: transparent;
    --panel-border: transparent;
    --title-bg: rgba(255, 77, 166, 0.92);
    --title-color: #ffffff;
    --item-bg: transparent;
    --item-border: rgba(255, 255, 255, 0.42);
    --item-text: #ffffff;
    --number-color: #ffd84d;
    --check-color: #ffffff;
    --badge-bg: rgba(15, 23, 42, 0.62);
    --badge-text: #f8fafc;
    --highlight-ring: rgba(255, 77, 166, 0.95);
    --shadow-color: transparent;
    --list-font: 'Chakra Petch', Arial, sans-serif;
  }

  .theme-shell.style-6 {
    --panel-bg: linear-gradient(180deg, rgb(31, 12, 46), rgb(66, 18, 74));
    --panel-border: #f472b6;
    --title-bg: linear-gradient(90deg, #fb7185, #f472b6);
    --title-color: #fff7fb;
    --item-bg: rgba(251, 113, 133, 0.24);
    --item-border: rgba(244, 114, 182, 0.48);
    --item-text: #fff1f8;
    --number-color: #fde68a;
    --check-color: #f9a8d4;
    --badge-bg: rgba(190, 24, 93, 0.24);
    --badge-text: #ffe4f1;
    --highlight-ring: #f9a8d4;
    --shadow-color: rgba(190, 24, 93, 0.32);
    --list-font: 'Libre Baskerville', Georgia, serif;
    --title-font-size: 1.14rem;
    --item-font-size: 1.02rem;
    --number-font-size: 1rem;
    --panel-radius: 16px;
    --item-radius: 16px;
    --panel-padding: 0.85rem;
  }

  .theme-shell.style-7 {
    --panel-bg: rgb(17, 24, 39);
    --panel-border: #a3e635;
    --title-bg: #a3e635;
    --title-color: #111827;
    --item-bg: rgba(163, 230, 53, 0.18);
    --item-border: rgba(163, 230, 53, 0.32);
    --item-text: #f3f4f6;
    --number-color: #bef264;
    --check-color: #d9f99d;
    --badge-bg: rgba(163, 230, 53, 0.14);
    --badge-text: #ecfccb;
    --highlight-ring: #bef264;
    --shadow-color: rgba(163, 230, 53, 0.18);
    --list-font: 'Space Grotesk', Arial, sans-serif;
    --title-font-size: 1.08rem;
    --item-font-size: 1rem;
    --number-font-size: 0.98rem;
    --title-letter-spacing: 0.08em;
    --title-text-transform: uppercase;
    --panel-radius: 22px;
    --item-radius: 999px;
    --panel-padding: 0.9rem;
  }

  .theme-shell.style-8 {
    --panel-bg: rgb(247, 242, 231);
    --panel-border: #b45309;
    --title-bg: #92400e;
    --title-color: #fff7ed;
    --item-bg: rgba(255, 251, 235, 0.96);
    --item-border: rgba(180, 83, 9, 0.35);
    --item-text: #422006;
    --number-color: #b45309;
    --check-color: #78350f;
    --badge-bg: rgba(251, 191, 36, 0.18);
    --badge-text: #78350f;
    --highlight-ring: #d97706;
    --shadow-color: rgba(146, 64, 14, 0.14);
    --list-font: 'DM Serif Display', Georgia, serif;
    --title-font-size: 1.08rem;
    --item-font-size: 0.98rem;
    --number-font-size: 1rem;
    --panel-radius: 8px;
    --item-radius: 8px;
    --panel-padding: 0.85rem;
  }

  .theme-shell.style-9 {
    --panel-bg: linear-gradient(180deg, rgb(5, 46, 22), rgb(15, 84, 49));
    --panel-border: #86efac;
    --title-bg: linear-gradient(90deg, #86efac, #4ade80);
    --title-color: #052e16;
    --item-bg: rgba(134, 239, 172, 0.24);
    --item-border: rgba(134, 239, 172, 0.4);
    --item-text: #f0fdf4;
    --number-color: #fef08a;
    --check-color: #bbf7d0;
    --badge-bg: rgba(74, 222, 128, 0.18);
    --badge-text: #dcfce7;
    --highlight-ring: #fef08a;
    --shadow-color: rgba(34, 197, 94, 0.26);
    --list-font: 'Exo 2', Arial, sans-serif;
    --title-font-size: 1.1rem;
    --item-font-size: 1rem;
    --number-font-size: 0.98rem;
    --title-letter-spacing: 0.06em;
    --title-text-transform: uppercase;
    --panel-radius: 12px;
    --item-radius: 6px;
    --panel-padding: 0.82rem;
  }

  .theme-shell.style-10 {
    --panel-bg: rgba(10, 10, 10, 0.97);
    --panel-border: #e5e7eb;
    --title-bg: #ffffff;
    --title-color: #0a0a0a;
    --item-bg: rgba(43, 46, 51, 0.82);
    --item-border: rgba(229, 231, 235, 0.24);
    --item-text: #fafafa;
    --number-color: #facc15;
    --check-color: #fafafa;
    --badge-bg: rgba(255, 255, 255, 0.08);
    --badge-text: #f3f4f6;
    --highlight-ring: #ffffff;
    --shadow-color: rgba(255, 255, 255, 0.04);
    --list-font: 'Bebas Neue', Arial, sans-serif;
    --title-font-size: 1.18rem;
    --item-font-size: 1.04rem;
    --number-font-size: 1rem;
    --title-letter-spacing: 0.14em;
    --title-text-transform: uppercase;
    --panel-radius: 0;
    --item-radius: 0;
    --panel-padding: 0.9rem;
  }

  .theme-shell.style-5 :global(.nes-container) {
    background: transparent !important;
    background-image: none !important;
    opacity: 1 !important;
    padding: 0;
    border-image-repeat: stretch;
    border-image-slice: 0;
    border-image-width: 0;
    border-image-outset: 0;
    border-width: 0;
    border-color: transparent !important;
    box-shadow: none;
  }

  .theme-shell.style-5 :global(.nes-container.with-title > .title) {
    display: inline-block;
    margin: 0 0 0.75rem 0;
    padding: 0.3rem 0.55rem;
    text-shadow: none;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.35);
  }

  .theme-shell.style-5 .items-holder {
    margin-left: 0;
    padding-top: 0;
  }

  .theme-shell.style-5 .transparent-container {
    padding: 0.2rem 0.1rem 0 0.1rem;
  }

  .theme-shell.style-5 .transparent-container.with-title > .title {
    color: #ffffff;
    background: transparent;
    padding: 0;
    box-shadow: none;
  }

  .theme-shell.style-2 :global(.nes-container.with-title > .title) {
    border-radius: 999px;
    box-shadow: 0 0 0 2px rgba(105, 226, 255, 0.28);
  }

  .theme-shell.style-3 :global(.nes-container.with-title > .title) {
    border-radius: 999px;
    box-shadow: 6px 6px 0 rgba(98, 28, 72, 0.45);
  }

  .theme-shell.style-4 :global(.nes-container.with-title > .title) {
    border-radius: 8px;
    box-shadow: none;
  }

  .theme-shell.style-6 :global(.nes-container.with-title > .title) {
    border-radius: 14px;
    box-shadow: 0 10px 24px rgba(190, 24, 93, 0.22);
  }

  .theme-shell.style-7 :global(.nes-container.with-title > .title) {
    border-radius: 999px;
    box-shadow: none;
  }

  .theme-shell.style-8 :global(.nes-container.with-title > .title) {
    border-radius: 4px;
    box-shadow: 6px 6px 0 rgba(120, 53, 15, 0.18);
  }

  .theme-shell.style-9 :global(.nes-container.with-title > .title) {
    border-radius: 999px;
    box-shadow: 0 0 0 2px rgba(187, 247, 208, 0.22);
  }

  .theme-shell.style-10 :global(.nes-container.with-title > .title) {
    border-radius: 0;
    box-shadow: none;
  }

  .theme-shell.style-10 .transparent-container {
    padding: var(--panel-padding);
  }

  /* Font command overrides style defaults. */
  .theme-shell.font-1 {
    --list-font: 'Press Start 2P', Arial, sans-serif;
    --title-font-size: 1rem;
    --item-font-size: 1rem;
    --number-font-size: 1rem;
  }

  .theme-shell.font-2 {
    --list-font: 'Russo One', Arial, sans-serif;
    --title-font-size: 1.05rem;
    --item-font-size: 1.02rem;
    --number-font-size: 1rem;
  }

  .theme-shell.font-3 {
    --list-font: 'Oxanium', Arial, sans-serif;
    --title-font-size: 1.08rem;
    --item-font-size: 1.05rem;
    --number-font-size: 1rem;
  }

  .theme-shell.font-4 {
    --list-font: 'Rajdhani', Arial, sans-serif;
    --title-font-size: 1.12rem;
    --item-font-size: 1.08rem;
    --number-font-size: 1.02rem;
  }

  .theme-shell.font-5 {
    --list-font: 'Chakra Petch', Arial, sans-serif;
    --title-font-size: 1.08rem;
    --item-font-size: 1.05rem;
    --number-font-size: 1rem;
  }

  .theme-shell.font-6 {
    --list-font: 'Libre Baskerville', Georgia, serif;
    --title-font-size: 1.08rem;
    --item-font-size: 1.01rem;
    --number-font-size: 0.98rem;
  }

  .theme-shell.font-7 {
    --list-font: 'Space Grotesk', Arial, sans-serif;
    --title-font-size: 1.08rem;
    --item-font-size: 1rem;
    --number-font-size: 0.98rem;
  }

  .theme-shell.font-8 {
    --list-font: 'DM Serif Display', Georgia, serif;
    --title-font-size: 1.08rem;
    --item-font-size: 1rem;
    --number-font-size: 0.98rem;
  }

  .theme-shell.font-9 {
    --list-font: 'Exo 2', Arial, sans-serif;
    --title-font-size: 1.08rem;
    --item-font-size: 1rem;
    --number-font-size: 0.98rem;
  }

  .theme-shell.font-10 {
    --list-font: 'Bebas Neue', Arial, sans-serif;
    --title-font-size: 1.18rem;
    --item-font-size: 1.08rem;
    --number-font-size: 1rem;
    --title-letter-spacing: 0.08em;
    --title-text-transform: uppercase;
  }

  .theme-shell.font-2 :global(.nes-container.with-title > .title),
  .theme-shell.font-2 .transparent-container.with-title > .title,
  .theme-shell.font-2 .panel-container.with-title > .title {
    font-size-adjust: 0.56;
  }

  .theme-shell.font-3 :global(.nes-container.with-title > .title),
  .theme-shell.font-3 .transparent-container.with-title > .title,
  .theme-shell.font-3 .panel-container.with-title > .title {
    font-size-adjust: 0.58;
  }

  .theme-shell.font-4 :global(.nes-container.with-title > .title),
  .theme-shell.font-4 .transparent-container.with-title > .title,
  .theme-shell.font-4 .panel-container.with-title > .title {
    font-size-adjust: 0.6;
  }

  .theme-shell.font-5 :global(.nes-container.with-title > .title),
  .theme-shell.font-5 .transparent-container.with-title > .title,
  .theme-shell.font-5 .panel-container.with-title > .title {
    font-size-adjust: 0.57;
  }

  .theme-shell.font-6 :global(.nes-container.with-title > .title),
  .theme-shell.font-6 .transparent-container.with-title > .title,
  .theme-shell.font-6 .panel-container.with-title > .title {
    font-size-adjust: 0.52;
  }

  .theme-shell.font-7 :global(.nes-container.with-title > .title),
  .theme-shell.font-7 .transparent-container.with-title > .title,
  .theme-shell.font-7 .panel-container.with-title > .title {
    font-size-adjust: 0.56;
  }

  .theme-shell.font-8 :global(.nes-container.with-title > .title),
  .theme-shell.font-8 .transparent-container.with-title > .title,
  .theme-shell.font-8 .panel-container.with-title > .title {
    font-size-adjust: 0.49;
  }

  .theme-shell.font-9 :global(.nes-container.with-title > .title),
  .theme-shell.font-9 .transparent-container.with-title > .title,
  .theme-shell.font-9 .panel-container.with-title > .title {
    font-size-adjust: 0.56;
  }

  .theme-shell.font-10 :global(.nes-container.with-title > .title),
  .theme-shell.font-10 .transparent-container.with-title > .title,
  .theme-shell.font-10 .panel-container.with-title > .title {
    font-size-adjust: 0.54;
  }
</style>

<div
  class="theme-shell style-{styleVariant}"
  class:font-1={fontVariant === 1}
  class:font-2={fontVariant === 2}
  class:font-3={fontVariant === 3}
  class:font-4={fontVariant === 4}
  class:font-5={fontVariant === 5}
  class:font-6={fontVariant === 6}
  class:font-7={fontVariant === 7}
  class:font-8={fontVariant === 8}
  class:font-9={fontVariant === 9}
  class:font-10={fontVariant === 10}
  data-style-variant={styleVariant}>
  {#if styleVariant === 5 || styleVariant === 10}
    <div class="transparent-container with-title" class:auto-layout={layout === 'auto'}>
      <p class="title">{taskListName}</p>

      <div
        class="items-holder"
        class:currently-highlighting={highlightItemIndex !== -1}
        bind:this={itemsListElement}>
        {#each items as item, _index}
          {#if showOnlyItemIndex === -1 || showOnlyItemIndex === _index}
            <ListItem
              styleVariant={styleVariant}
              highlighted={(highlightItemIndex !== -1 && _index === highlightItemIndex) || !!item.startTime}
              item={{ ...item, id: _index + 1, fade: highlightItemIndex != -1 && _index != highlightItemIndex }} />
          {/if}
        {/each}
      </div>
    </div>
  {:else}
    <div
      class="panel-container with-title"
      class:auto-layout={layout === 'auto'}>
      <p class="title">{taskListName}</p>

      <div
        class="items-holder"
        class:currently-highlighting={highlightItemIndex !== -1}
        bind:this={itemsListElement}>
        {#each items as item, _index}
          {#if showOnlyItemIndex === -1 || showOnlyItemIndex === _index}
            <ListItem
              styleVariant={styleVariant}
              highlighted={(highlightItemIndex !== -1 && _index === highlightItemIndex) || !!item.startTime}
              item={{ ...item, id: _index + 1, fade: highlightItemIndex != -1 && _index != highlightItemIndex }} />
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
