import { writable } from 'svelte/store';
import type { TodoItem } from './types/item';
import type { TodoList } from './types/list';

const previousOptionsKey = 'options';
const previousItemsKey = 'items';

function getStorageNamespace(channelName: string, command: string) {
  const normalizedChannelName = (channelName || 'default').trim().toLowerCase();
  return `${normalizedChannelName}_${command}`;
}

export function createStore(channelName: string, command: string) {
  const storageNamespace = getStorageNamespace(channelName, command);
  const commandOptionsKey = `${storageNamespace}_options`;
  const commandItemsKey = `${storageNamespace}_items`;

  let commandOptionsValue = normalizeTaskListOptions(readJsonFromStorage(commandOptionsKey, null));

  if (commandOptionsValue === null) {
    // if the command store is empty, use the previous one
    commandOptionsValue = normalizeTaskListOptions(readJsonFromStorage(previousOptionsKey, {
      name: `!${command} new Title`
    } as TodoList));


    console.info({ commandOptionsValue });

    // reset the old one
    writeJsonToStorage(previousOptionsKey, null);
  }

  let commandItemsValue = readJsonFromStorage(commandItemsKey, null);

  if (commandItemsValue === null) {
    // if the command store is empty, use the previous one
    commandItemsValue = readJsonFromStorage(previousItemsKey, []);

    // reset the old one
    writeJsonToStorage(previousItemsKey, null);
  }

  const taskListOptions = writable<TodoList>(commandOptionsValue);
  taskListOptions.subscribe(val => writeJsonToStorage(commandOptionsKey, val));

  const items = writable<TodoItem[]>(commandItemsValue);
  items.subscribe(val => writeJsonToStorage(commandItemsKey, val));

  return {
    taskListOptions,
    items,
    currentHighlight: writable(-1),  // these are still IndexIDs, TODO change to GUID
    currentTimer: writable(-1),
  };
}

function readJsonFromStorage(key: string, defaultValue: any) {
  const valueFromStorage = localStorage.getItem(key);

  if (valueFromStorage && valueFromStorage !== 'null') {
    return JSON.parse(valueFromStorage);
  }

  return defaultValue;
}

function writeJsonToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeTaskListOptions(value: TodoList | null) {
  if (value === null) {
    return null;
  }

  return {
    styleVariant: 1,
    fontVariant: null,
    ...value
  };
}
