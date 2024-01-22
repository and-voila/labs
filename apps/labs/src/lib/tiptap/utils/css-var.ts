export const cssVar = (name: string, value?: string) => {
  let currentName = name;
  // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
  if (name.substring(0, 2) !== '--') {
    currentName = `--${currentName}`;
  }

  if (value) {
    document.documentElement.style.setProperty(currentName, value);
  }

  return getComputedStyle(document.body).getPropertyValue(currentName);
};

export default cssVar;
