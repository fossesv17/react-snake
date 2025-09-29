export function Randint(max) {
    return Math.floor(Math.random()*max);
}

export function objectIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}