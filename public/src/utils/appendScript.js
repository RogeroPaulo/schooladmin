export const appendScript = (scriptToAppend, handle) => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = scriptToAppend;
    script.async = true;
    script.onload = () => handle();
    document.body.appendChild(script);
}