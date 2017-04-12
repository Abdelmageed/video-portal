export default function getDocWidth() {
  let ratio = window.devicePixelRatio || 1;
  return document.documentElement.clientWidth / ratio;
}