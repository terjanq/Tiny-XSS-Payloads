const checkboxesForm = document.getElementById('checkboxesForm');
const payloadsDiv = document.getElementById("payloads")

const enc = encodeURIComponent;

for(const tag of Object.values(TAGS)){
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = 1;
    checkbox.id=tag;
    checkboxesForm.appendChild(checkbox);

    let label = document.createElement('label');
    label.htmlFor=tag;
    label.innerHTML=tag;
    checkboxesForm.appendChild(label);
    
}

function execute_payload(payload){
    hash = `/*<iframe/onload="/*'/**/;alert(document.domain)//">`
    let iframe = document.createElement('iframe');
    let meta = ''

    if(payload.tags.includes(TAGS.inlineStyleBlock)) {
        meta += `<meta http-equiv="content-security-policy" content="style-src 'none'">`
    }

    x = open(`https://terjanq.ml/xss.php?html=${enc(meta)}${enc(payload.html)}#${hash}`, 'javascript:alert(document.domain)//')
}

function createPayloads(payloads){
    payloads.sort((x,y) => x.html.length - y.html.length)
    for(let payload of payloads){
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

        let poc = document.createElement('span');
        poc.className = 'poc';
        div.appendChild(poc);

        poc.onclick = _ => execute_payload(payload)
        for(let tag of payload.tags){
            let span = document.createElement('span');
            span.className = "tag";
            span.innerText = tag;
            div.appendChild(span)
        }
        payloadsDiv.appendChild(div)
    }
    
}

function process(e){
    payloadsDiv.innerHTML = '';

    const checkboxes = checkboxesForm.querySelectorAll('input[type=checkbox]')
    let tags = []
    for(let checkbox of checkboxes){
        if(checkbox.checked){
            tags.push(checkbox.id)
        }
    }

    let payloads = []

    for(const payload of PAYLOADS){
        if(payload.tags.every(t=>tags.includes(t))){
            payloads.push(payload)
        }
    }
    
    createPayloads(payloads);
}

process()