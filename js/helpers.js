export function createElement(tag, content, props) {
  const element = document.createElement(tag);

  Object.assign(element, { ...props });

  if (content) {
    element.innerHTML = content;
  }

  return element;
}

export function hide(element) {
  if (element.classList.contains("hide")) {
    element.classList.remuve("hide");
  }
}

export function show(element) {
  if (!element.classList.contains("hide")) {
    element.classList.add("hide");
  }
}
