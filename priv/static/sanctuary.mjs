// build/dev/javascript/prelude.mjs
var CustomType = class {
  withFields(fields) {
    let properties = Object.keys(this).map(
      (label) => label in fields ? fields[label] : this[label]
    );
    return new this.constructor(...properties);
  }
};
var List = class {
  static fromArray(array3, tail) {
    let t = tail || new Empty();
    for (let i = array3.length - 1; i >= 0; --i) {
      t = new NonEmpty(array3[i], t);
    }
    return t;
  }
  [Symbol.iterator]() {
    return new ListIterator(this);
  }
  toArray() {
    return [...this];
  }
  // @internal
  atLeastLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return true;
      desired--;
    }
    return desired <= 0;
  }
  // @internal
  hasLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return false;
      desired--;
    }
    return desired === 0;
  }
  countLength() {
    let length3 = 0;
    for (let _ of this)
      length3++;
    return length3;
  }
};
function prepend(element2, tail) {
  return new NonEmpty(element2, tail);
}
function toList(elements, tail) {
  return List.fromArray(elements, tail);
}
var ListIterator = class {
  #current;
  constructor(current) {
    this.#current = current;
  }
  next() {
    if (this.#current instanceof Empty) {
      return { done: true };
    } else {
      let { head, tail } = this.#current;
      this.#current = tail;
      return { value: head, done: false };
    }
  }
};
var Empty = class extends List {
};
var NonEmpty = class extends List {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
};
var Result = class _Result extends CustomType {
  // @internal
  static isResult(data) {
    return data instanceof _Result;
  }
};
var Ok = class extends Result {
  constructor(value) {
    super();
    this[0] = value;
  }
  // @internal
  isOk() {
    return true;
  }
};
var Error = class extends Result {
  constructor(detail) {
    super();
    this[0] = detail;
  }
  // @internal
  isOk() {
    return false;
  }
};
function makeError(variant, module, line, fn, message, extra) {
  let error = new globalThis.Error(message);
  error.gleam_error = variant;
  error.module = module;
  error.line = line;
  error.fn = fn;
  for (let k in extra)
    error[k] = extra[k];
  return error;
}

// build/dev/javascript/gleam_stdlib/gleam/option.mjs
var Some = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var None = class extends CustomType {
};

// build/dev/javascript/gleam_stdlib/gleam/list.mjs
function do_reverse(loop$remaining, loop$accumulator) {
  while (true) {
    let remaining = loop$remaining;
    let accumulator = loop$accumulator;
    if (remaining.hasLength(0)) {
      return accumulator;
    } else {
      let item = remaining.head;
      let rest$1 = remaining.tail;
      loop$remaining = rest$1;
      loop$accumulator = prepend(item, accumulator);
    }
  }
}
function reverse(xs) {
  return do_reverse(xs, toList([]));
}
function do_map(loop$list, loop$fun, loop$acc) {
  while (true) {
    let list = loop$list;
    let fun = loop$fun;
    let acc = loop$acc;
    if (list.hasLength(0)) {
      return reverse(acc);
    } else {
      let x = list.head;
      let xs = list.tail;
      loop$list = xs;
      loop$fun = fun;
      loop$acc = prepend(fun(x), acc);
    }
  }
}
function map(list, fun) {
  return do_map(list, fun, toList([]));
}

// build/dev/javascript/gleam_stdlib/gleam/string_builder.mjs
function from_string(string2) {
  return identity(string2);
}
function to_string(builder) {
  return identity(builder);
}
function split2(iodata, pattern) {
  return split(iodata, pattern);
}

// build/dev/javascript/gleam_stdlib/gleam/string.mjs
function split3(x, substring) {
  if (substring === "") {
    return graphemes(x);
  } else {
    let _pipe = x;
    let _pipe$1 = from_string(_pipe);
    let _pipe$2 = split2(_pipe$1, substring);
    return map(_pipe$2, to_string);
  }
}

// build/dev/javascript/gleam_stdlib/gleam/dynamic.mjs
function from(a2) {
  return identity(a2);
}

// build/dev/javascript/gleam_stdlib/dict.mjs
var tempDataView = new DataView(new ArrayBuffer(8));
var SHIFT = 5;
var BUCKET_SIZE = Math.pow(2, SHIFT);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// build/dev/javascript/gleam_stdlib/gleam_stdlib.mjs
function identity(x) {
  return x;
}
function graphemes(string2) {
  const iterator = graphemes_iterator(string2);
  if (iterator) {
    return List.fromArray(Array.from(iterator).map((item) => item.segment));
  } else {
    return List.fromArray(string2.match(/./gsu));
  }
}
function graphemes_iterator(string2) {
  if (Intl && Intl.Segmenter) {
    return new Intl.Segmenter().segment(string2)[Symbol.iterator]();
  }
}
function split(xs, pattern) {
  return List.fromArray(xs.split(pattern));
}
var unicode_whitespaces = [
  " ",
  // Space
  "	",
  // Horizontal tab
  "\n",
  // Line feed
  "\v",
  // Vertical tab
  "\f",
  // Form feed
  "\r",
  // Carriage return
  "\x85",
  // Next line
  "\u2028",
  // Line separator
  "\u2029"
  // Paragraph separator
].join();
var left_trim_regex = new RegExp(`^([${unicode_whitespaces}]*)`, "g");
var right_trim_regex = new RegExp(`([${unicode_whitespaces}]*)$`, "g");

// build/dev/javascript/gleam_stdlib/gleam/uri.mjs
var Uri = class extends CustomType {
  constructor(scheme, userinfo, host, port, path, query, fragment) {
    super();
    this.scheme = scheme;
    this.userinfo = userinfo;
    this.host = host;
    this.port = port;
    this.path = path;
    this.query = query;
    this.fragment = fragment;
  }
};
function do_remove_dot_segments(loop$input, loop$accumulator) {
  while (true) {
    let input = loop$input;
    let accumulator = loop$accumulator;
    if (input.hasLength(0)) {
      return reverse(accumulator);
    } else {
      let segment = input.head;
      let rest = input.tail;
      let accumulator$1 = (() => {
        if (segment === "") {
          let accumulator$12 = accumulator;
          return accumulator$12;
        } else if (segment === ".") {
          let accumulator$12 = accumulator;
          return accumulator$12;
        } else if (segment === ".." && accumulator.hasLength(0)) {
          return toList([]);
        } else if (segment === ".." && accumulator.atLeastLength(1)) {
          let accumulator$12 = accumulator.tail;
          return accumulator$12;
        } else {
          let segment$1 = segment;
          let accumulator$12 = accumulator;
          return prepend(segment$1, accumulator$12);
        }
      })();
      loop$input = rest;
      loop$accumulator = accumulator$1;
    }
  }
}
function remove_dot_segments(input) {
  return do_remove_dot_segments(input, toList([]));
}
function path_segments(path) {
  return remove_dot_segments(split3(path, "/"));
}

// build/dev/javascript/gleam_stdlib/gleam/bool.mjs
function guard(requirement, consequence, alternative) {
  if (requirement) {
    return consequence;
  } else {
    return alternative();
  }
}

// build/dev/javascript/lustre/lustre/effect.mjs
var Effect = class extends CustomType {
  constructor(all) {
    super();
    this.all = all;
  }
};
function from2(effect) {
  return new Effect(toList([(dispatch, _) => {
    return effect(dispatch);
  }]));
}
function none() {
  return new Effect(toList([]));
}

// build/dev/javascript/lustre/lustre/internals/vdom.mjs
var Text = class extends CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
};
var Element = class extends CustomType {
  constructor(key, namespace, tag, attrs, children, self_closing, void$) {
    super();
    this.key = key;
    this.namespace = namespace;
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.self_closing = self_closing;
    this.void = void$;
  }
};
var Attribute = class extends CustomType {
  constructor(x0, x1, as_property) {
    super();
    this[0] = x0;
    this[1] = x1;
    this.as_property = as_property;
  }
};

// build/dev/javascript/lustre/lustre/attribute.mjs
function attribute(name, value) {
  return new Attribute(name, from(value), false);
}
function property(name, value) {
  return new Attribute(name, from(value), true);
}
function class$(name) {
  return attribute("class", name);
}
function href(uri) {
  return attribute("href", uri);
}
function target(target2) {
  return attribute("target", target2);
}
function src(uri) {
  return attribute("src", uri);
}
function height(val) {
  return property("height", val);
}
function width(val) {
  return property("width", val);
}
function alt(text3) {
  return attribute("alt", text3);
}

// build/dev/javascript/lustre/lustre/element.mjs
function element(tag, attrs, children) {
  if (tag === "area") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "base") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "br") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "col") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "embed") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "hr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "img") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "input") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "link") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "meta") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "param") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "source") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "track") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "wbr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else {
    return new Element("", "", tag, attrs, children, false, false);
  }
}
function text(content) {
  return new Text(content);
}

// build/dev/javascript/lustre/lustre/internals/runtime.mjs
var Debug = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Dispatch = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Shutdown = class extends CustomType {
};
var ForceModel = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};

// build/dev/javascript/lustre/vdom.ffi.mjs
function morph(prev, next, dispatch, isComponent = false) {
  let out;
  let stack = [{ prev, next, parent: prev.parentNode }];
  while (stack.length) {
    let { prev: prev2, next: next2, parent } = stack.pop();
    if (next2.subtree !== void 0)
      next2 = next2.subtree();
    if (next2.content !== void 0) {
      if (!prev2) {
        const created = document.createTextNode(next2.content);
        parent.appendChild(created);
        out ??= created;
      } else if (prev2.nodeType === Node.TEXT_NODE) {
        if (prev2.textContent !== next2.content)
          prev2.textContent = next2.content;
        out ??= prev2;
      } else {
        const created = document.createTextNode(next2.content);
        parent.replaceChild(created, prev2);
        out ??= created;
      }
    } else if (next2.tag !== void 0) {
      const created = createElementNode({
        prev: prev2,
        next: next2,
        dispatch,
        stack,
        isComponent
      });
      if (!prev2) {
        parent.appendChild(created);
      } else if (prev2 !== created) {
        parent.replaceChild(created, prev2);
      }
      out ??= created;
    } else if (next2.elements !== void 0) {
      iterateElement(next2, (fragmentElement) => {
        stack.unshift({ prev: prev2, next: fragmentElement, parent });
        prev2 = prev2?.nextSibling;
      });
    } else if (next2.subtree !== void 0) {
      stack.push({ prev: prev2, next: next2, parent });
    }
  }
  return out;
}
function createElementNode({ prev, next, dispatch, stack }) {
  const namespace = next.namespace || "http://www.w3.org/1999/xhtml";
  const canMorph = prev && prev.nodeType === Node.ELEMENT_NODE && prev.localName === next.tag && prev.namespaceURI === (next.namespace || "http://www.w3.org/1999/xhtml");
  const el2 = canMorph ? prev : namespace ? document.createElementNS(namespace, next.tag) : document.createElement(next.tag);
  let handlersForEl;
  if (!registeredHandlers.has(el2)) {
    const emptyHandlers = /* @__PURE__ */ new Map();
    registeredHandlers.set(el2, emptyHandlers);
    handlersForEl = emptyHandlers;
  } else {
    handlersForEl = registeredHandlers.get(el2);
  }
  const prevHandlers = canMorph ? new Set(handlersForEl.keys()) : null;
  const prevAttributes = canMorph ? new Set(Array.from(prev.attributes, (a2) => a2.name)) : null;
  let className = null;
  let style = null;
  let innerHTML = null;
  for (const attr of next.attrs) {
    const name = attr[0];
    const value = attr[1];
    if (attr.as_property) {
      if (el2[name] !== value)
        el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    } else if (name.startsWith("on")) {
      const eventName = name.slice(2);
      const callback = dispatch(value);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      if (canMorph)
        prevHandlers.delete(eventName);
    } else if (name.startsWith("data-lustre-on-")) {
      const eventName = name.slice(15);
      const callback = dispatch(lustreServerEventHandler);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      el2.setAttribute(name, value);
    } else if (name === "class") {
      className = className === null ? value : className + " " + value;
    } else if (name === "style") {
      style = style === null ? value : style + value;
    } else if (name === "dangerous-unescaped-html") {
      innerHTML = value;
    } else {
      if (el2.getAttribute(name) !== value)
        el2.setAttribute(name, value);
      if (name === "value" || name === "selected")
        el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    }
  }
  if (className !== null) {
    el2.setAttribute("class", className);
    if (canMorph)
      prevAttributes.delete("class");
  }
  if (style !== null) {
    el2.setAttribute("style", style);
    if (canMorph)
      prevAttributes.delete("style");
  }
  if (canMorph) {
    for (const attr of prevAttributes) {
      el2.removeAttribute(attr);
    }
    for (const eventName of prevHandlers) {
      handlersForEl.delete(eventName);
      el2.removeEventListener(eventName, lustreGenericEventHandler);
    }
  }
  if (next.key !== void 0 && next.key !== "") {
    el2.setAttribute("data-lustre-key", next.key);
  } else if (innerHTML !== null) {
    el2.innerHTML = innerHTML;
    return el2;
  }
  let prevChild = el2.firstChild;
  let seenKeys = null;
  let keyedChildren = null;
  let incomingKeyedChildren = null;
  let firstChild = next.children[Symbol.iterator]().next().value;
  if (canMorph && firstChild !== void 0 && // Explicit checks are more verbose but truthy checks force a bunch of comparisons
  // we don't care about: it's never gonna be a number etc.
  firstChild.key !== void 0 && firstChild.key !== "") {
    seenKeys = /* @__PURE__ */ new Set();
    keyedChildren = getKeyedChildren(prev);
    incomingKeyedChildren = getKeyedChildren(next);
  }
  for (const child of next.children) {
    iterateElement(child, (currElement) => {
      if (currElement.key !== void 0 && seenKeys !== null) {
        prevChild = diffKeyedChild(
          prevChild,
          currElement,
          el2,
          stack,
          incomingKeyedChildren,
          keyedChildren,
          seenKeys
        );
      } else {
        stack.unshift({ prev: prevChild, next: currElement, parent: el2 });
        prevChild = prevChild?.nextSibling;
      }
    });
  }
  while (prevChild) {
    const next2 = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = next2;
  }
  return el2;
}
var registeredHandlers = /* @__PURE__ */ new WeakMap();
function lustreGenericEventHandler(event) {
  const target2 = event.currentTarget;
  if (!registeredHandlers.has(target2)) {
    target2.removeEventListener(event.type, lustreGenericEventHandler);
    return;
  }
  const handlersForEventTarget = registeredHandlers.get(target2);
  if (!handlersForEventTarget.has(event.type)) {
    target2.removeEventListener(event.type, lustreGenericEventHandler);
    return;
  }
  handlersForEventTarget.get(event.type)(event);
}
function lustreServerEventHandler(event) {
  const el2 = event.currentTarget;
  const tag = el2.getAttribute(`data-lustre-on-${event.type}`);
  const data = JSON.parse(el2.getAttribute("data-lustre-data") || "{}");
  const include = JSON.parse(el2.getAttribute("data-lustre-include") || "[]");
  switch (event.type) {
    case "input":
    case "change":
      include.push("target.value");
      break;
  }
  return {
    tag,
    data: include.reduce(
      (data2, property2) => {
        const path = property2.split(".");
        for (let i = 0, o = data2, e = event; i < path.length; i++) {
          if (i === path.length - 1) {
            o[path[i]] = e[path[i]];
          } else {
            o[path[i]] ??= {};
            e = e[path[i]];
            o = o[path[i]];
          }
        }
        return data2;
      },
      { data }
    )
  };
}
function getKeyedChildren(el2) {
  const keyedChildren = /* @__PURE__ */ new Map();
  if (el2) {
    for (const child of el2.children) {
      iterateElement(child, (currElement) => {
        const key = currElement?.key || currElement?.getAttribute?.("data-lustre-key");
        if (key)
          keyedChildren.set(key, currElement);
      });
    }
  }
  return keyedChildren;
}
function diffKeyedChild(prevChild, child, el2, stack, incomingKeyedChildren, keyedChildren, seenKeys) {
  while (prevChild && !incomingKeyedChildren.has(prevChild.getAttribute("data-lustre-key"))) {
    const nextChild = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = nextChild;
  }
  if (keyedChildren.size === 0) {
    iterateElement(child, (currChild) => {
      stack.unshift({ prev: prevChild, next: currChild, parent: el2 });
      prevChild = prevChild?.nextSibling;
    });
    return prevChild;
  }
  if (seenKeys.has(child.key)) {
    console.warn(`Duplicate key found in Lustre vnode: ${child.key}`);
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  seenKeys.add(child.key);
  const keyedChild = keyedChildren.get(child.key);
  if (!keyedChild && !prevChild) {
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild && prevChild !== null) {
    const placeholder = document.createTextNode("");
    el2.insertBefore(placeholder, prevChild);
    stack.unshift({ prev: placeholder, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild || keyedChild === prevChild) {
    stack.unshift({ prev: prevChild, next: child, parent: el2 });
    prevChild = prevChild?.nextSibling;
    return prevChild;
  }
  el2.insertBefore(keyedChild, prevChild);
  stack.unshift({ prev: keyedChild, next: child, parent: el2 });
  return prevChild;
}
function iterateElement(element2, processElement) {
  if (element2.elements !== void 0) {
    for (const currElement of element2.elements) {
      iterateElement(currElement, processElement);
    }
  } else if (element2.subtree !== void 0) {
    iterateElement(element2.subtree(), processElement);
  } else {
    processElement(element2);
  }
}

// build/dev/javascript/lustre/client-runtime.ffi.mjs
var LustreClientApplication2 = class _LustreClientApplication {
  #root = null;
  #queue = [];
  #effects = [];
  #didUpdate = false;
  #isComponent = false;
  #model = null;
  #update = null;
  #view = null;
  static start(flags, selector, init4, update2, view2) {
    if (!is_browser())
      return new Error(new NotABrowser());
    const root2 = selector instanceof HTMLElement ? selector : document.querySelector(selector);
    if (!root2)
      return new Error(new ElementNotFound(selector));
    const app = new _LustreClientApplication(init4(flags), update2, view2, root2);
    return new Ok((msg) => app.send(msg));
  }
  constructor([model, effects], update2, view2, root2 = document.body, isComponent = false) {
    this.#model = model;
    this.#update = update2;
    this.#view = view2;
    this.#root = root2;
    this.#effects = effects.all.toArray();
    this.#didUpdate = true;
    this.#isComponent = isComponent;
    window.requestAnimationFrame(() => this.#tick());
  }
  send(action) {
    switch (true) {
      case action instanceof Dispatch: {
        this.#queue.push(action[0]);
        this.#tick();
        return;
      }
      case action instanceof Shutdown: {
        this.#shutdown();
        return;
      }
      case action instanceof Debug: {
        this.#debug(action[0]);
        return;
      }
      default:
        return;
    }
  }
  emit(event, data) {
    this.#root.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        detail: data,
        composed: true
      })
    );
  }
  #tick() {
    this.#flush_queue();
    if (this.#didUpdate) {
      const vdom = this.#view(this.#model);
      const dispatch = (handler) => (e) => {
        const result = handler(e);
        if (result instanceof Ok) {
          this.send(new Dispatch(result[0]));
        }
      };
      this.#didUpdate = false;
      this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
    }
  }
  #flush_queue(iterations = 0) {
    while (this.#queue.length) {
      const [next, effects] = this.#update(this.#model, this.#queue.shift());
      this.#didUpdate ||= this.#model !== next;
      this.#model = next;
      this.#effects = this.#effects.concat(effects.all.toArray());
    }
    while (this.#effects.length) {
      this.#effects.shift()(
        (msg) => this.send(new Dispatch(msg)),
        (event, data) => this.emit(event, data)
      );
    }
    if (this.#queue.length) {
      if (iterations < 5) {
        this.#flush_queue(++iterations);
      } else {
        window.requestAnimationFrame(() => this.#tick());
      }
    }
  }
  #debug(action) {
    switch (true) {
      case action instanceof ForceModel: {
        const vdom = this.#view(action[0]);
        const dispatch = (handler) => (e) => {
          const result = handler(e);
          if (result instanceof Ok) {
            this.send(new Dispatch(result[0]));
          }
        };
        this.#queue = [];
        this.#effects = [];
        this.#didUpdate = false;
        this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
      }
    }
  }
  #shutdown() {
    this.#root.remove();
    this.#root = null;
    this.#model = null;
    this.#queue = [];
    this.#effects = [];
    this.#didUpdate = false;
    this.#update = () => {
    };
    this.#view = () => {
    };
  }
};
var start = (app, selector, flags) => LustreClientApplication2.start(
  flags,
  selector,
  app.init,
  app.update,
  app.view
);
var is_browser = () => globalThis.window && window.document;

// build/dev/javascript/lustre/lustre.mjs
var App = class extends CustomType {
  constructor(init4, update2, view2, on_attribute_change) {
    super();
    this.init = init4;
    this.update = update2;
    this.view = view2;
    this.on_attribute_change = on_attribute_change;
  }
};
var ElementNotFound = class extends CustomType {
  constructor(selector) {
    super();
    this.selector = selector;
  }
};
var NotABrowser = class extends CustomType {
};
function application(init4, update2, view2) {
  return new App(init4, update2, view2, new None());
}
function start3(app, selector, flags) {
  return guard(
    !is_browser(),
    new Error(new NotABrowser()),
    () => {
      return start(app, selector, flags);
    }
  );
}

// build/dev/javascript/modem/modem.ffi.mjs
var defaults = {
  handle_external_links: false,
  handle_internal_links: true
};
var initial_location = window?.location?.href;
var do_init = (dispatch, options = defaults) => {
  document.addEventListener("click", (event) => {
    const a2 = find_anchor(event.target);
    if (!a2)
      return;
    try {
      const url = new URL(a2.href);
      const uri = uri_from_url(url);
      const is_external = url.host !== window.location.host;
      if (!options.handle_external_links && is_external)
        return;
      if (!options.handle_internal_links && !is_external)
        return;
      event.preventDefault();
      if (!is_external) {
        window.history.pushState({}, "", a2.href);
        window.requestAnimationFrame(() => {
          if (url.hash) {
            document.getElementById(url.hash.slice(1))?.scrollIntoView();
          }
        });
      }
      return dispatch(uri);
    } catch {
      return;
    }
  });
  window.addEventListener("popstate", (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    const uri = uri_from_url(url);
    window.requestAnimationFrame(() => {
      if (url.hash) {
        document.getElementById(url.hash.slice(1))?.scrollIntoView();
      }
    });
    dispatch(uri);
  });
  window.addEventListener("modem-push", ({ detail }) => {
    dispatch(detail);
  });
  window.addEventListener("modem-replace", ({ detail }) => {
    dispatch(detail);
  });
};
var find_anchor = (el2) => {
  if (!el2 || el2.tagName === "BODY") {
    return null;
  } else if (el2.tagName === "A") {
    return el2;
  } else {
    return find_anchor(el2.parentElement);
  }
};
var uri_from_url = (url) => {
  return new Uri(
    /* scheme   */
    url.protocol ? new Some(url.protocol.slice(0, -1)) : new None(),
    /* userinfo */
    new None(),
    /* host     */
    url.hostname ? new Some(url.hostname) : new None(),
    /* port     */
    url.port ? new Some(Number(url.port)) : new None(),
    /* path     */
    url.pathname,
    /* query    */
    url.search ? new Some(url.search.slice(1)) : new None(),
    /* fragment */
    url.hash ? new Some(url.hash.slice(1)) : new None()
  );
};

// build/dev/javascript/modem/modem.mjs
function init2(handler) {
  return from2(
    (dispatch) => {
      return guard(
        !is_browser(),
        void 0,
        () => {
          return do_init(
            (uri) => {
              let _pipe = uri;
              let _pipe$1 = handler(_pipe);
              return dispatch(_pipe$1);
            }
          );
        }
      );
    }
  );
}

// build/dev/javascript/sanctuary/data/news.mjs
var News = class extends CustomType {
  constructor(date_published, text3) {
    super();
    this.date_published = date_published;
    this.text = text3;
  }
};
var sample_news = /* @__PURE__ */ toList([
  /* @__PURE__ */ new News("2024-02-24", "Piece of news"),
  /* @__PURE__ */ new News("2023-02-24", "Another piece of news")
]);

// build/dev/javascript/lustre/lustre/element/html.mjs
function text2(content) {
  return text(content);
}
function h1(attrs, children) {
  return element("h1", attrs, children);
}
function h2(attrs, children) {
  return element("h2", attrs, children);
}
function h3(attrs, children) {
  return element("h3", attrs, children);
}
function h4(attrs, children) {
  return element("h4", attrs, children);
}
function div(attrs, children) {
  return element("div", attrs, children);
}
function li(attrs, children) {
  return element("li", attrs, children);
}
function ol(attrs, children) {
  return element("ol", attrs, children);
}
function p(attrs, children) {
  return element("p", attrs, children);
}
function ul(attrs, children) {
  return element("ul", attrs, children);
}
function a(attrs, children) {
  return element("a", attrs, children);
}
function strong(attrs, children) {
  return element("strong", attrs, children);
}
function img(attrs) {
  return element("img", attrs, toList([]));
}

// build/dev/javascript/sanctuary/ui/content_box.mjs
function base_border() {
  return class$("border border-green-500 border-solid");
}
function content_box(attributes, title, content) {
  return div(
    attributes,
    toList([
      div(
        toList([
          base_border(),
          class$("rounded-t"),
          class$(
            "bg-green-700 py-2 px-4 text-center uppercase font-bold leading-tight"
          )
        ]),
        toList([text2(title)])
      ),
      div(
        toList([base_border(), class$("rounded-b"), class$("bg-gray-700 p-4")]),
        content
      )
    ])
  );
}

// build/dev/javascript/sanctuary/page/about.mjs
function page() {
  return content_box(
    toList([]),
    "About Jigoku Online - help and information",
    toList([
      h3(toList([]), toList([text2("What is this?")])),
      p(
        toList([]),
        toList([
          text2(
            "This site was setup to allow you to play Legend of the Five Rings, an LCG from Fantasy Flight Games (FFG) in your browser."
          )
        ])
      ),
      h3(
        toList([]),
        toList([text2("That's pretty cool! But how does any of this work?")])
      ),
      p(
        toList([]),
        toList([
          text2("Head on over to the "),
          a(
            toList([href("/how-to-play"), target("_blank")]),
            toList([text2("How To Play guide")])
          ),
          text2(" for a thorough explanation.")
        ])
      ),
      h3(
        toList([]),
        toList([text2("Everyone has a shiny avatar, how do I get one?")])
      ),
      p(
        toList([]),
        toList([
          text2("This is handled by the good people at "),
          a(
            toList([href("http://gravatar.com"), target("_blank")]),
            toList([text2("Gravatar")])
          ),
          text2(
            ". Sign up there with the same email address you did there and it should appear on the site after a short while. It will also use the avatar on any site that uses gravatar. Examples include github and jinteki."
          )
        ])
      ),
      h3(
        toList([]),
        toList([
          text2("The artwork on this site is pretty cool, where's that from?")
        ])
      ),
      p(toList([]), toList([text2("You're right, it is pretty nice isn't it?")])),
      p(
        toList([]),
        toList([
          text2("The background of the site is by an artist named "),
          a(
            toList([href("https://speeh.deviantart.com/"), target("_blank")]),
            toList([text2("Speeh")])
          ),
          text2(" and can be found "),
          a(
            toList([
              href("https://speeh.deviantart.com/art/L5R-Fu-Leng-575822238"),
              target("_blank")
            ]),
            toList([text2("here")])
          ),
          text2(".")
        ])
      ),
      p(
        toList([]),
        toList([
          text2("The in game backgrounds are by "),
          a(
            toList([href("https://alayna.deviantart.com/"), target("_blank")]),
            toList([text2("Alayna Lemmer-Danner")])
          ),
          text2(". She's very talented, you should check out her work!")
        ])
      ),
      p(
        toList([]),
        toList([
          text2("The tokens used for Spirit of the River are by "),
          a(
            toList([
              href("https://www.dojocreativedesign.com/l5r-cardgame"),
              target("_blank")
            ]),
            toList([text2("David Robotham")])
          ),
          text2(". He has a selection of L5R related merchandise, check it out "),
          a(
            toList([
              href("https://www.dojocreativedesign.com/shop"),
              target("_blank")
            ]),
            toList([text2("here")])
          ),
          text2(".")
        ])
      ),
      p(
        toList([]),
        toList([
          text2(
            "Don't want to be distracted by beautiful art during your games? In-game backgrounds can be disabled from your "
          ),
          a(toList([href("/profile")]), toList([text2("Profile")])),
          text2(".")
        ])
      ),
      h3(toList([]), toList([text2("Can I help?")])),
      p(
        toList([]),
        toList([
          text2(
            "Sure! The project is all written in Javascript. The server is node.js and the client is React.js. The source code can be found in the"
          ),
          a(
            toList([
              href("http://github.com/gryffon/ringteki"),
              target("_blank")
            ]),
            toList([text2("GitHub Repository")])
          ),
          text2("."),
          text2(
            "Check out the code and instructions on there on how to get started and hack away! See the card implementation status list above to have a look at what needs to be done. If you want to join the dev discord, there's a link on the "
          ),
          a(toList([href("/community")]), toList([text2("Community")])),
          text2(" page.")
        ])
      ),
      h3(toList([]), toList([text2("Donations")])),
      p(
        toList([]),
        toList([
          text2(
            "Since I've been asked a few times about where people can donate to the project, I thought I'd put up a small section about it here."
          )
        ])
      ),
      p(
        toList([]),
        toList([
          text2("You can use this link:"),
          a(
            toList([href("https://paypal.me/ringteki"), target("_blank")]),
            toList([text2("Paypal")])
          ),
          text2(
            " to donate to the project. Note: The account uses my name, but is completely separate from my personal Paypal account."
          )
        ])
      ),
      p(
        toList([]),
        toList([
          text2(
            "We may also look into creating a Patreon in the future, for those people who wish to make recurring donations."
          )
        ])
      ),
      p(
        toList([]),
        toList([
          text2(
            "Just to make things clear, I'm not doing this for any personal gain whatsoever, I'm happy to run the servers at my own expense, but any money raised via this link will be used towards paying the hosting fees for the server and related services such as error tracking. All money in this account will only go towards these expenses."
          )
        ])
      ),
      p(
        toList([]),
        toList([
          text2(
            "Also, this is not required to continue to use and enjoy the site and will not give anything of substance in return. I will also create an expense report that I will publish, so that you know where your donations are going."
          )
        ])
      ),
      p(
        toList([]),
        toList([
          text2(
            "If you wish to reward the devs in particular, feel free to thank them when you see them out at events. Sharing a cold beverage is always appreciated!"
          )
        ])
      ),
      h2(toList([]), toList([text2("Special Thanks")])),
      p(
        toList([]),
        toList([
          text2(
            "I'd like to thank mtgred, and the whole of the jinteki.net development team(except whoever decided to write the code in clojure, not you. - just kidding!) as without their work to use as a guide and as inspiration, this site would not be where it is today. To say jinteki is an inspiration is an understa                                                                     tement."
          )
        ])
      ),
      p(
        toList([]),
        toList([
          text2(
            "I'd also like to thank cryogen and his team for their work on creating throneteki, which i've based this particular application off of."
          )
        ])
      ),
      h2(toList([]), toList([text2("Additional Notes")])),
      p(
        toList([]),
        toList([
          text2(
            "The Legend of the Five Rings living card game, the artwork and many other things are all copyright Fantasy Flight Games and I make no claims of ownership or otherwise of any of the artwork or trademarks. This site exists for passionate fans to play a game they enjoy and augment, rather than replace, the in person LCG. FFG does not endorse, support, and is not involved with, this site in any way."
          )
        ])
      )
    ])
  );
}

// build/dev/javascript/sanctuary/routing.mjs
var Home = class extends CustomType {
};
var About = class extends CustomType {
};
var HowToPlay = class extends CustomType {
};
function route_of_uri(uri) {
  let $ = path_segments(uri.path);
  if ($.hasLength(1) && $.head === "about") {
    return new About();
  } else if ($.hasLength(1) && $.head === "how-to-play") {
    return new HowToPlay();
  } else {
    return new Home();
  }
}
function path_of_route(route) {
  if (route instanceof Home) {
    return "/";
  } else if (route instanceof About) {
    return "/about";
  } else {
    return "/how-to-play";
  }
}
function link_to_route(route, attrs, content) {
  return a(prepend(href(path_of_route(route)), attrs), content);
}

// build/dev/javascript/sanctuary/page/home.mjs
function side_illustration(url) {
  return img(toList([src(url), alt(""), class$("inline-block mr-4 mb-2")]));
}
function news_item(item) {
  return li(
    toList([]),
    toList([
      strong(
        toList([class$("inline-block min-w-[10ch]")]),
        toList([text2(item.date_published)])
      ),
      text2(item.text)
    ])
  );
}
function p_(content) {
  return p(toList([]), toList([text2(content)]));
}
function page2(news) {
  return div(
    toList([class$("space-y-8")]),
    toList([
      h1(
        toList([class$("text-3xl font-bold text-center bg-green-900 p-2")]),
        toList([text2("Legend of the Five Rings LCG")])
      ),
      content_box(
        toList([]),
        "Getting Started",
        toList([
          p_(
            "This site allows you to play the Legend of the Five Rings LCG in your browser."
          ),
          p(
            toList([]),
            toList([
              text2("If you're new, head on over to the "),
              link_to_route(
                new HowToPlay(),
                toList([]),
                toList([text2("How To Play guide")])
              ),
              text2(" for a thorough explanation on how to use the site!")
            ])
          )
        ])
      ),
      content_box(
        toList([]),
        "Latest site news",
        toList([ol(toList([class$("space-y-2")]), map(news, news_item))])
      ),
      content_box(
        toList([]),
        "Community Information",
        toList([
          div(
            toList([class$("grid grid-cols-2 gap-y-6 gap-x-12")]),
            toList([
              div(
                toList([]),
                toList([
                  h3(
                    toList([]),
                    toList([
                      side_illustration(
                        "/static/illustration/community_discord_icon.gif"
                      ),
                      text2("L5R Community Discord Server")
                    ])
                  ),
                  p(
                    toList([]),
                    toList([
                      a(
                        toList([
                          href("https://discord.gg/zPvBePb"),
                          target("_blank")
                        ]),
                        toList([text2("Invite Link")])
                      )
                    ])
                  ),
                  p_(
                    "Are you interested in the L5R LCG? Come and chat on our Discord server!"
                  ),
                  p_(
                    "The server was created by members of the L5R community, and is maintained by the community, so come and talk anything L5R related."
                  )
                ])
              ),
              div(
                toList([]),
                toList([
                  h3(
                    toList([]),
                    toList([
                      side_illustration(
                        "/static/illustration/event_discord_icon.webp"
                      ),
                      text2("L5R Event Discord Server")
                    ])
                  ),
                  p(
                    toList([]),
                    toList([
                      a(
                        toList([
                          href("https://discord.gg/mfpZTqxxah"),
                          target("_blank")
                        ]),
                        toList([text2("Invite Link")])
                      )
                    ])
                  ),
                  p_(
                    "This discord server is used by the community to coordinate community run events."
                  ),
                  p_(
                    "Whether you want to play in a sanctioned Emerald Legacy tournament, join the monthly Discord League, or find fellow beginners in the Beginner's League, this server has something for everyone, not just competitive players."
                  )
                ])
              ),
              div(
                toList([class$("col-start-1 col-end-3")]),
                toList([
                  img(
                    toList([
                      src("/static/illustration/emerald-legacy-logo.png"),
                      alt(""),
                      width(320),
                      height(83),
                      class$("block mx-auto")
                    ])
                  ),
                  h3(
                    toList([]),
                    toList([
                      a(
                        toList([
                          href("https://emeraldlegacy.org/"),
                          target("_blank")
                        ]),
                        toList([text2("Emerald Legacy")])
                      )
                    ])
                  ),
                  p_(
                    "The Emerald Legacy project is a fan-run nonprofit volunteer collective. Its mission is to provide a living and thriving continuation of the LCG after the end of official support for the game. Emerald Legacy is responsible for creating and releasing new cards, organizing tournaments, and maintaining the rules and balance of the game."
                  ),
                  p(
                    toList([]),
                    toList([
                      text2("Emerald Legacy provides the "),
                      a(
                        toList([
                          href("https://www.emeralddb.org/"),
                          target("_blank")
                        ]),
                        toList([text2("EmeraldDB")])
                      ),
                      text2(
                        " service, which is an online collection of all cards and rules for the LCG. EmeraldDB includes a deck builder for the LCG, as well as lists that have been made public by other players. Deck lists that you create are able to be directly imported into the Deckbuilder here!"
                      )
                    ])
                  )
                ])
              )
            ])
          )
        ])
      )
    ])
  );
}

// build/dev/javascript/sanctuary/ui/plain.mjs
function p2(content) {
  return p(toList([]), toList([text2(content)]));
}
function h32(content) {
  return h3(toList([]), toList([text2(content)]));
}
function h42(content) {
  return h4(toList([]), toList([text2(content)]));
}
function li2(content) {
  return li(toList([]), toList([text2(content)]));
}

// build/dev/javascript/sanctuary/page/how_to_play.mjs
function page3() {
  return content_box(
    toList([]),
    "How To Play on Jigoku Online",
    toList([
      p(
        toList([]),
        toList([
          text2(
            "This guide is aimed at players familiar with the Legend of the Five Rings: The Card Game who want to start playing online using the Jigoku Online platform. If you are new to this cardgame in general, there is a "
          ),
          a(
            toList([
              href("https://www.youtube.com/watch?v=wTtjYzq4T54"),
              target("_blank")
            ]),
            toList([text2("helpful tutorial video")])
          ),
          text2(", a "),
          a(
            toList([
              href(
                "https://images-cdn.fantasyflightgames.com/filer_public/74/46/7446c964-613e-4c01-8902-199257c5d4af/l5c01_learntoplay_web.pdf"
              ),
              target("_blank")
            ]),
            toList([text2("Learn To Play guide")])
          ),
          text2(", and a "),
          a(
            toList([
              href("https://www.emeralddb.org/rules/emerald"),
              target("_blank")
            ]),
            toList([text2("Rules Reference Guide")])
          ),
          text2(" to help you out.")
        ])
      ),
      h32("Topics"),
      ul(
        toList([]),
        toList([
          li(
            toList([]),
            toList([a(toList([href("#decks")]), toList([text2("Adding Decks")]))])
          ),
          li(
            toList([]),
            toList([
              a(toList([href("#profile")]), toList([text2("Profile Options")]))
            ])
          ),
          li(
            toList([]),
            toList([a(toList([href("#mmode")]), toList([text2("Manual Mode")]))])
          ),
          li(
            toList([]),
            toList([
              a(toList([href("#commands")]), toList([text2("Manual Commands")]))
            ])
          ),
          li(
            toList([]),
            toList([
              a(
                toList([href("#conceding")]),
                toList([text2("About Stats, Conceding and Leaving Games")])
              )
            ])
          )
        ])
      ),
      h32("Adding Decks"),
      p(
        toList([]),
        toList([
          text2(
            "Start by making sure you have created an account and are logged in. You must be logged in to add decks and spectate or play games. Jigoku Online has a functional "
          ),
          a(
            toList([href("/decks"), target("_blank")]),
            toList([text2("Deckbuilder")])
          ),
          text2(", although most people use the more fully featured "),
          a(
            toList([href("https://www.emeralddb.org/"), target("_blank")]),
            toList([text2("Emerald DB")])
          ),
          text2(
            " deckbuilder to build their decks. After building your deck on FiveRingsDB, copy the Permalink URL, paste it into popup window in the deckbuilder that is brought up when you click 'Import Deck'. You are now ready to start playing. Head over to the "
          ),
          a(toList([href("/play")]), toList([text2("Play")])),
          text2(" section to create, join or watch games.")
        ])
      ),
      h32("Profile Options"),
      p(
        toList([]),
        toList([
          text2("Clicking your "),
          a(toList([href("/profile")]), toList([text2("Profile")])),
          text2(
            " at the top right of the page allows you to tailor certain aspects of gameplay to your wishes."
          )
        ])
      ),
      h42("Action Windows"),
      p2(
        "Legend of the Five Rings has quite a large number of phases and their associated action windows, a number of which are not used regularly by all decks. Always prompting these action windows leads to a lot of tediously clicking \u2018Pass\u2019, while never prompting these action windows leads to certain cards not being able to be used to their fullest extent. To solve this issue you can check/uncheck any action windows in your profile to determine when you\u2019ll be prompted or not."
      ),
      h42("Timed Interrupt Window"),
      p2(
        "The combination of automated gameplay and the ability to play reactions or interrupts from hand has the potential to \u201Cleak\u201D information about what your opponent might hold in his or her hand. For example: if after playing an event there is a pause before it resolves, you might guess correctly that was due to your opponent being prompted to use Voice of Honor. To solve this issue, the Timed Interrupt Window was created. Depending on which options you have checked, you get a timed prompt during certain triggers asking for interrupts whether you are able to interrupt these triggers or not. Now your opponent experiences the same pause any time and won\u2019t be able to correctly guess whether you\u2019re holding certain cards anymore."
      ),
      p2(
        "There are a couple of options: you can decide whether you want to always be prompted for triggered card abilities , events or both. The timer duration can be modified too. Obviously, if you don\u2019t care about leaking cards from your hand (or you don\u2019t play these cards anyway) and just want a quick game, deselecting both options will allow for that. You will still get prompted to use the aforementioned cards, but only when you actually have them."
      ),
      h32("Manual Mode"),
      p2(
        "Most of the cards should be implemented, but if things go wrong, or someone misclicks, or you really hate automation, you can switch on Manual Mode by typing /manual in chat."
      ),
      p2(
        "In Manual Mode, the game will no longer resolve conflicts automatically - the attacking player will be asked to indicate who won the conflict. You will also get the option to use a Manual Action in action windows which puts an announcement in chat and passes priority to your opponent, but won't have any other in-game effect."
      ),
      p2(
        "In manual mode, clicking cards and rings will bring up a menu which allows you to easily change the game state. Most of the functions in these menus mirror the Manual Commands listed below, but there are a couple of things which can only be done in menus. The ring menu lets you flip a ring, which you can use to change the conflict type during conflicts. You can also change the contested ring by selecting the ring you want to switch to and choosing the appropriate menu button. Finally, there is also an option to initiate a conflict in case someone passed by accident. NB: Initiate Conflict can only be used during a pre-conflict action window, and it won't count against your conflict opportunities for the turn."
      ),
      h32("Manual Commands"),
      p2(
        "The following manual commands have been implemented in order to allow for a smoother gameplay experience:"
      ),
      ul(
        toList([]),
        toList([
          li2("/discard x - Discards x cards randomly from your hand"),
          li2("/draw x - Draws x cards from your deck to your hand"),
          li2(
            "/give-control - Give control of a card to your opponent. Use with caution"
          ),
          li2("/reveal - Reveal a facedown card."),
          li2("/duel - Initiates an honor bid for a duel."),
          li2(
            "/move-to-conflict - Moves one or more characters into a conflict."
          ),
          li2("/send-home - Sends a character home from a conflict."),
          li2(
            "/claim-favor x - Claims the Imperial favor. x should be 'military' or 'political'."
          ),
          li2("/discard-favor - Discards your Imperial favor."),
          li2(
            "/move-to-bottom-deck - Will prompt you to select a card to move it to the bottom of it's relevant deck."
          ),
          li2("/add-fate x - Add 'x' fate to a card."),
          li2("/rem-fate x - Remove 'x' fate from a card."),
          li2("/add-fate-ring ring x - Add 'x' fate to 'ring'."),
          li2("/rem-fate-ring ring x - Remove 'x' fate from 'ring'."),
          li2("/claim-ring ring - Claim 'ring'."),
          li2("/unclaim-ring ring - Set 'ring' as unclaimed."),
          li2("/honor - Move the state of a character towards honored."),
          li2("/dishonor - Move the state of a character towards dishonored."),
          li2(
            "/roll x - Displays a random number between 1 and x (4 by default)."
          ),
          li2("/manual - Activate or deactivate manual mode (see above).")
        ])
      ),
      h32("About Stats, Conceding, and Leaving Games"),
      p2(
        "Jigoku Online does not rank and/or match players by skill level in any way. There are three categories (beginner, casual and competitive) to be chosen when creating a game which gives an indication of what to expect, but it doesn't enforce anything. Even though personal stats are not being tracked, most players still very much appreciate a formal concede by clicking the \u2018Concede\u2019 button and typing \u2018gg\u2019 before leaving a game. The reality of quick and anonymous online games dictates this won\u2019t always happen though, as evidenced by regular complaining in the main lobby about people leaving without conceding. Our advice is to just move on to the next game since in the end, conceding or not doesn\u2019t really impact anything. Happy gaming!"
      )
    ])
  );
}

// build/dev/javascript/sanctuary/sanctuary.mjs
var OnRouteChange = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
function on_url_change(url) {
  return new OnRouteChange(route_of_uri(url));
}
function init3(_) {
  return [new Home(), init2(on_url_change)];
}
function update(_, msg) {
  {
    let route = msg[0];
    return [route, none()];
  }
}
function view(route) {
  if (route instanceof Home) {
    return page2(sample_news);
  } else if (route instanceof About) {
    return page();
  } else {
    return page3();
  }
}
function main() {
  let app = application(init3, update, view);
  let $ = start3(app, "#app", void 0);
  if (!$.isOk()) {
    throw makeError(
      "assignment_no_match",
      "sanctuary",
      13,
      "main",
      "Assignment pattern did not match",
      { value: $ }
    );
  }
  return void 0;
}

// build/.lustre/entry.mjs
main();
