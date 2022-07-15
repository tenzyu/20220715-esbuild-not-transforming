"use strict";
(() => {
  // node_modules/ts-pattern/dist/index.modern.js
  var e = Symbol("@ts-pattern/matcher"), t = "@ts-pattern/anonymous-select-key", n = (e2) => Boolean(e2 && typeof e2 == "object"), r = (t2) => t2 && !!t2[e], o = (t2, c, a) => {
    if (n(t2)) {
      if (r(t2)) {
        let n2 = t2[e](), { matched: r2, selections: o2 } = n2.match(c);
        return r2 && o2 && Object.keys(o2).forEach((e2) => a(e2, o2[e2])), r2;
      }
      if (!n(c))
        return !1;
      if (Array.isArray(t2))
        return !!Array.isArray(c) && t2.length === c.length && t2.every((e2, t3) => o(e2, c[t3], a));
      if (t2 instanceof Map)
        return c instanceof Map && Array.from(t2.keys()).every((e2) => o(t2.get(e2), c.get(e2), a));
      if (t2 instanceof Set) {
        if (!(c instanceof Set))
          return !1;
        if (t2.size === 0)
          return c.size === 0;
        if (t2.size === 1) {
          let [e2] = Array.from(t2.values());
          return r(e2) ? Array.from(c.values()).every((t3) => o(e2, t3, a)) : c.has(e2);
        }
        return Array.from(t2.values()).every((e2) => c.has(e2));
      }
      return Object.keys(t2).every((n2) => {
        let s = t2[n2];
        return (n2 in c || r(i = s) && i[e]().matcherType === "optional") && o(s, c[n2], a);
        var i;
      });
    }
    return Object.is(c, t2);
  };
  function f(t2) {
    return { [e]: () => ({ match: (e2) => ({ matched: Boolean(t2(e2)) }) }) };
  }
  var m = f(function(e2) {
    return !0;
  });
  var d = f(function(e2) {
    return typeof e2 == "string";
  }), g = f(function(e2) {
    return typeof e2 == "number";
  }), p = f(function(e2) {
    return typeof e2 == "boolean";
  }), b = f(function(e2) {
    return typeof e2 == "bigint";
  }), w = f(function(e2) {
    return typeof e2 == "symbol";
  }), A = f(function(e2) {
    return e2 == null;
  });
  var K = (e2) => new O(e2, []), O = class {
    constructor(e2, t2) {
      this.value = void 0, this.cases = void 0, this.value = e2, this.cases = t2;
    }
    with(...e2) {
      let n2 = e2[e2.length - 1], r2 = [e2[0]], c = [];
      return e2.length === 3 && typeof e2[1] == "function" ? (r2.push(e2[0]), c.push(e2[1])) : e2.length > 2 && r2.push(...e2.slice(1, e2.length - 1)), new O(this.value, this.cases.concat([{ match: (e3) => {
        let n3 = {}, a = Boolean(r2.some((t2) => o(t2, e3, (e4, t3) => {
          n3[e4] = t3;
        })) && c.every((t2) => t2(e3)));
        return { matched: a, value: a && Object.keys(n3).length ? t in n3 ? n3[t] : n3 : e3 };
      }, handler: n2 }]));
    }
    when(e2, t2) {
      return new O(this.value, this.cases.concat([{ match: (t3) => ({ matched: Boolean(e2(t3)), value: t3 }), handler: t2 }]));
    }
    otherwise(e2) {
      return new O(this.value, this.cases.concat([{ match: (e3) => ({ matched: !0, value: e3 }), handler: e2 }])).run();
    }
    exhaustive() {
      return this.run();
    }
    run() {
      let e2, t2 = this.value;
      for (let n2 = 0; n2 < this.cases.length; n2++) {
        let r2 = this.cases[n2], o2 = r2.match(this.value);
        if (o2.matched) {
          t2 = o2.value, e2 = r2.handler;
          break;
        }
      }
      if (!e2) {
        let e3;
        try {
          e3 = JSON.stringify(this.value);
        } catch {
          e3 = this.value;
        }
        throw new Error(`Pattern matching error: no pattern matches value ${e3}`);
      }
      return e2(t2, this.value);
    }
  };

  // input.ts
  K("a");
})();
