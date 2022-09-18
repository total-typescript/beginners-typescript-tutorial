import { Equal, Expect } from "./helpers/type-utils";

/**
 * How do we type onFocusChange?
 */
// On peut typer une fonction reçu en param (ses params et son retour)
const addListener = (onFocusChange: (isFocused: boolean) => void) => {
  window.addEventListener("focus", () => {
    onFocusChange(true);
  });

  window.addEventListener("blur", () => {
    onFocusChange(false);
  });
};

addListener((isFocused) => {
  console.log({ isFocused });

  type tests = [Expect<Equal<typeof isFocused, boolean>>];
});
