export default function tag(...args) {
  let node;

  function compose(item, i) {
    if (i === 0) {
      node = document.createElement(item);
      if (item === 'a') node.setAttribute('href', '#');
    } else if (['string', 'number'].includes(typeof item)) {
      node.appendChild(document.createTextNode(item));
    } else if (item.tagName) {
      node.appendChild(item);
    } else if (Array.isArray(item)) {
      for (let i = 0, l = item.length; i < l; i++) compose(item[i]);
    } else {
      for (let p in item) {
        if (p.startsWith('on')) {
          node.addEventListener(p.substring(2, p.length), item[p]);
        } else if (typeof item[p] === 'boolean') {
          if (item[p]) node.setAttribute(p, '');
        } else {
          node.setAttribute(p, item[p]);
        }
      }
    }
  };

  for (let i = 0, l = args.length; i < l; i++) compose(args[i], i);

  return node;
}
