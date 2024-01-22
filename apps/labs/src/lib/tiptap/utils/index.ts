// TODO:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function randomElement(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export * from './css-var';
export * from './get-connection-text';
export * from './get-render-container';
export * from './is-custom-node-selected';
export * from './is-text-selected';
