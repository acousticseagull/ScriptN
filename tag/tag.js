const tag = new Proxy(
  (name, ...args) => {
    const node = document.createElement(name);

    const [props, ...children] =
      args[0] && args[0].constructor === Object ? args : [{}, ...args];

    for (const [k, v] of Object.entries(props)) {
      if (typeof v === 'function' && k.startsWith('on'))
        node.addEventListener(k.substring(2, k.length), v);
      if (typeof v === 'boolean' && v) node.setAttribute(k, '');
      if (typeof v === 'string') node.setAttribute(k, v);
    }

    node.append(...children);

    return node;
  },
  {
    get: (tag, name) => tag.bind(null, name),
  }
);

export default tag;
