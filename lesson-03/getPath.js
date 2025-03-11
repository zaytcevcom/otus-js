function getPath(element) {
    if (!(element instanceof HTMLElement)) {
        throw new Error('Argument must be an HTMLElement');
    }

    const path = [];

    while (element !== null && element !== document.documentElement) {
        let selector = element.tagName.toLowerCase();

        if (element.id) {
            selector += `#${element.id}`;
        } else {
            const classes = Array.from(element.classList);
            if (classes.length > 0) {
                selector += `.${classes.join('.')}`;
            }

            const siblings = Array.from(element.parentNode.children);
            const sameTagSiblings = siblings.filter((sibling) => sibling.tagName === element.tagName);
            if (sameTagSiblings.length > 1) {
                const nth = sameTagSiblings.indexOf(element) + 1;
                selector += `:nth-child(${nth})`;
            }
        }

        path.unshift(selector);
        element = element.parentNode;
    }

    if (element === document.body) {
        path.unshift('body');
    }

    return path.join(' ');
}

module.exports = { getPath };
