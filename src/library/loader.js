import sono from "sono";

import library from "./library";

export function load(name) {
  const sound = library[name];
  const { wrapper, url } = sound;

  if (wrapper) {
    return Promise.resolve(sound);
  }

  return new Promise((resolve, reject) => {
    sono.load({
      id: name,
      src: url,
      onComplete: data => {
        sound.wrapper = data;
        resolve(sound);
      }
    });
  });
}

export function loadFew(names) {
  const promises = names.map(name => load(name));
  return Promise.all(promises);
}
