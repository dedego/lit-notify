const isFN = fn => typeof fn === "function";
const isSTR = str => typeof str === "string";

/**
 * Notifying class decorator for Lit Element
 * @param {*} base class for Lit Element
 */
const Notify = base =>
  class extends base {
    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      const originalUpdated = this.updated;
      const props = this.constructor.properties;
      this.updated = changedProperties => {
        if (isFN(originalUpdated)) originalUpdated(changedProperties);
        changedProperties.forEach((val, key) => {
          const changeCallback =
            props && props[key] && props[key].changeCallback;
          const callbackName =
            isSTR(changeCallback) && isFN(this[changeCallback])
              ? changeCallback
              : `__${key}Changed`;
          if (isFN(this[callbackName])) {
            this[callbackName](this[key], val, key);
          }
        });
      };
    }
  };

export default Notify;
export { Notify };
