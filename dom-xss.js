onload = () => {
    url = new URL(location.href);
    payload.innerHTML = url.searchParams.get('dom_xss');
}