export function set100vh() {
    setProperty()

    $(window).resize(() => {
        setProperty()
    })
}

function setProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}