export const replaceLineBreaksWithHTML = string => {
  return string !== undefined ? string.replace(/<br \/>/gi, '') : '';
};
