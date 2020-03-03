# Lit Notify

Lit Notify is a simple class extension for Lit Element that hooks in to the `updated` method and notifies callback methods (if defined) for changes to properties. Using Lit-Notify makes it eassier to listen to change. To illustrate how it works, have a look at the example.

Lit Notify is really lightweight and zero dependencies.

## Example

```javascript
import { LitElement, html } from 'lit-element';
import { Notify } from 'lit-notify';

class AppComponents extends Notify(LitElement) {
    static get properties() {
        return {
            timestamp: {
                type: Number,
                changeCallback: 'timestampChanged'
            },
            reset: {
                type: 
            }
            difference: Number
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.interval = setInterval(() => {
            this.timestamp = Date.now();
        }, 6000 );
    }
    updated(changedProperties) {
        if (changedPropeties.has('timestamp')) {
            console.log('timestamp has changed');
        }
    }
    timestampChanged(next, prev, key) {
        this.difference = prev ? next-prev : 0;
    }
    __timestampChanged(next, prev, key) {
        // If you do not specify a callback in the properties
        // this will be the default method name that is being used.
        // If the method is not defined, it will not be called.
    }
    render() {
        return html`<p>Timestamp difference: ${this.difference}</p>`;
    }
}
```

In the exmple above you see that in the properties you can specify a callback method for when 
the property **timestamp** has changed. If you do not specify it a default name for a callback
method will be used like `__<propertyName>Changed`, in our example its **__timestampChanged**

If you want to implement the updated method in your component class, you can still do so. 
Lit-Notify is only extending behaviour, not overriding your implementation.

## Changelog

| Version | Change description |
| ------- | ------------------ |
| 1.0.0   | Initial verison    |
| 1.0.1   | Added repository details |
| 1.1.0   | Improved performance and added key as last param for debugging purposes |