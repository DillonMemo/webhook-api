export const removeTag = (str: string): string =>
  str.replace(/(<b>|<\/b>)/gi, '**').replace(/(<([^>]+)>)/gi, '');

/** Global Incoming Url */
export const SEARCH_INCOMING_URL =
  'https://wh.jandi.com/connect-api/webhook/20585156/f1467d35d19c3f901491ac4184ec4d15';
export const NEWS_INCOMING_URL =
  'https://wh.jandi.com/connect-api/webhook/20585156/b9a02a271d4be5fa7ab5d920b22c904f';
export const CREATE_MENU_INCOMING_URL =
  'https://wh.jandi.com/connect-api/webhook/20585156/3c4daf13c6c593bcb72822440fb3fa7b';
