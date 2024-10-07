import { generate } from 'random-words';

export const generateBoardID = (): string => {
  return generate({ exactly: 1, wordsPerString: 3, minLength: 3, maxLength: 5, separator: "-" })[0];
};
