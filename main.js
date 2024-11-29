const checkboxesForm = document.getElementById('checkboxesForm');
const payloadsDiv = document.getElementById("payloads")

const enc = encodeURIComponent;

for (const tag of Object.values(TAGS)) {
    let feature = document.createElement('div');
    feature.className = "feature";

    checkboxesForm.append(feature);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = 1;
    checkbox.id = tag;
    feature.appendChild(checkbox);

    let label = document.createElement('label');
    label.htmlFor = tag;
    label.innerHTML = tag;
    feature.appendChild(label);

}

function execute_payload(payload, type = "reflected") {

    const XSS_URL_BASE = 'https://terjanq.me/xss.php'
    let name = '';
    let hash = '';
    let contentType = '';
    let referrer = '';

    const csp_dict = {
        'default-src': [`'none'`],
    };

    function add_to_csp(key, value) {
        if (!csp_dict[key]) csp_dict[key] = [];
        csp_dict[key].push(value);
    }

    function construct_csp() {
        let csp_string = "";
        for (let key in csp_dict) {
            csp_string += `${key} ${csp_dict[key].join(' ')};`;
        }
        return csp_string;
    }

    function construct_xss_url(query_dict, hash = '') {
        const url = new URL(XSS_URL_BASE);
        for (let key in query_dict) {
            if (query_dict[key] === '') continue;
            url.searchParams.append(key, query_dict[key]);
        }
        if (hash !== '') {
            url.hash = hash
        }
        return url.toString();
    }

    if (payload.tags.includes(TAGS.controlsName)) {
        name = 'javascript:alert(document.domain)//'
    }
    if (payload.tags.includes(TAGS.inlineStyleAllow)) {
        add_to_csp('style-src', "'unsafe-inline'");
    }
    if (payload.tags.includes(TAGS.scripts)) {
        add_to_csp('script-src', "http: https:");
    }
    if (payload.tags.includes(TAGS.unsafeEval)) {
        add_to_csp('script-src', `'unsafe-eval'`)
    }
    if (payload.tags.includes(TAGS.unsafeInline)) {
        add_to_csp('script-src', `'unsafe-inline'`)
    }
    if (payload.tags.includes(TAGS.iframes)) {
        add_to_csp('frame-src', 'http: https:');
        referrer = 'origin';
    }
    if (payload.tags.includes(TAGS.controlsURL)) {
        hash = `#/*<iframe/onload="/*'/**/;alert(document.domain)//">`
    }
    // add content-type to the page so the nj.rs will display appriopriate content-type
    if (payload.tags.includes(TAGS.scripts)) {
        contentType = 'application/javascript;charset=UTF-8'
    }

    let html = payload.html;
    let dynamic_script = '';
    if(payload.tags.includes(TAGS.requiresRelativeScript)){
        dynamic_script = `
const script = document.createElement('script');
script.src = '/empty'
document.head.appendChild(script);
`
        html += '<script src="/empty"></script>'
    }
    let dom_xss = ''

    if (type === 'DOM') {
        add_to_csp('script-src', "data:");
        
        let payload_content = `
onload = () => {
    url = new URL(location.href);
    payload.innerHTML = url.searchParams.get('dom_xss');${dynamic_script}
};`
        let payload_src = `data:text/javascript,${encodeURIComponent(payload_content)}`
        html = `<html><head></head><body><div id=payload></div></body></html><script src="${payload_src}"></script>`;
        dom_xss = payload.html
    }

    const xss_url = construct_xss_url({
        dom_xss: dom_xss,
        html: html,
        csp: construct_csp(),
        '__content-type': contentType,
        referrer: referrer
    }, hash)

    x = open(xss_url, name);
}


function createPayloads(payloads) {
    payloads.sort((x, y) => x.html.length - y.html.length)
    for (let payload of payloads) {
        let div = document.createElement('div');
        div.className = "payload";

        let pre = document.createElement('pre');
        let code = document.createElement('code')
        pre.appendChild(code)
        div.appendChild(pre)

        code.innerText = payload.html;
        code.classList.add('xml', 'hljs');

        hljs.highlightBlock(code);

        let counter = document.createElement('span');
        counter.className = 'counter';
        counter.innerText = payload.html.length;
        div.appendChild(counter);

        let pocs = document.createElement('div');
        pocs.className = 'pocs';

        div.appendChild(pocs);

        let pocReflected = document.createElement('span');
        pocReflected.className = 'poc-reflected';
        pocs.appendChild(pocReflected);

        let pocDOM = document.createElement('span');
        pocDOM.className = 'poc-dom';
        pocs.appendChild(pocDOM);

        pocReflected.onclick = _ => execute_payload(payload, 'reflected')
        pocDOM.onclick = _ => execute_payload(payload, 'DOM')

        let tags = document.createElement('div');
        tags.className = "tags"
        div.appendChild(tags);

        for (let tag of payload.tags) {
            let span = document.createElement('span');
            span.className = "tag";
            span.innerText = tag;
            tags.appendChild(span)
        }
        payloadsDiv.appendChild(div)
    }

}

function process(e) {
    payloadsDiv.innerHTML = '';

    const checkboxes = checkboxesForm.querySelectorAll('input[type=checkbox]')
    let tags = []
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            tags.push(checkbox.id)
        }
    }

    let payloads = []

    for (const payload of PAYLOADS) {
        if (payload.tags.every(t => tags.includes(t))) {
            payloads.push(payload)
        }
    }

    createPayloads(payloads);
}

process()