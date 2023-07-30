let data_name = "data-gopenInNewTabExtensionSetting";

document.addEventListener("mousedown", (e) => {
    try {
        let counter = 0;
        let element = e.target;

        let pageOrigin = (new URL(location.href)).origin;
        //whether parent element contains "A" tag
        while (element != null && counter <= 1000) {
            counter++;
            if (element instanceof HTMLElement) {
                if (element.tagName == "A") {
                    if (element.hasAttribute("href")) {
                        let url_absolute = element.href;
                        if ((new URL(url_absolute)).origin != pageOrigin) {
                            element.setAttribute(data_name, "true");
                        }

                        break;
                    }
                }
                element = element.parentElement;
            }
        }
    } catch (ex) {
        console.log(ex);
    }
}, true);

document.addEventListener("click", (e) => {
    try {
        let counter = 0;
        let element = e.target;

        //whether parent element contains "A" tag
        while (element != null && counter <= 1000) {
            counter++;
            if (element instanceof HTMLElement) {
                if (element.tagName == "A") {
                    if (element.hasAttribute(data_name)) {
                        //open link in new tab
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        chrome.runtime.sendMessage(
                            {
                                action: "openInNewTab",
                                targeturl: element.href
                            }
                        ).catch(() => { });
                        break;
                    }
                }
                element = element.parentElement;
            }
        }
    } catch (ex) {
        console.log(ex);
    }
}, true);