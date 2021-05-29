export const removeTag = (str: string): string =>
  str.replace(/(<b>|<\/b>)/gi, '**').replace(/(<([^>]+)>)/gi, '');
