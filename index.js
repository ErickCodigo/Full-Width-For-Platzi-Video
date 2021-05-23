// Primera parte | First part
(function init() {
    const tools = {
        hydrate: function () {
            const sizeVideo = "530px";
            const xs = {
                gridLayoutContainer: {
                    selector: ".MaterialView.MaterialView-type--video", styles: [
                        "grid-template-columns:100%!important",
                        "grid-template-rows:1fr 1.5fr!important",
                        "grid-template-areas:'video''community'!important"
                    ]
                },
                videoContainer: {
                    selector: ".MaterialView-video", styles: [
                        "height: 450px!important",
                        `min-height: ${sizeVideo}!important`
                    ]
                },
                videoItem: {
                    selector: ".MaterialView-video-item", styles: [
                        "max-width: 100vw!important"
                    ]
                },
                videoContent: {
                    selector: ".MaterialView-content", styles: [
                        "display: none!important"
                    ]
                },
                videoFrame: {
                    selector: ".VideoPlayer > div", styles: [
                        "padding-bottom:0!important",
                        `height: ${sizeVideo}!important`
                    ]
                },
                chatsWrapper: {
                    selector: ".InfinityScrollLayout", styles: [
                        "padding-bottom:5rem!important"
                    ]
                },
                communityWrapper: {
                    selector: ".MaterialView-community-wrapper", styles: [
                        "max-width: 50%!important",
                        "margin: 0 auto!important"
                    ]
                },
            };
            const attrNameIsInjected = "isInjected";

            function iterate(callback) {
                Object.keys(xs).forEach(key => callback(xs[key]))
            }

            function injectCssStyles() {
                let styles = "";
                iterate(element => {
                    const selector = element.selector;
                    const content = element.styles.toString().replaceAll(",", ";");

                    styles += `${selector}{${content}}`;
                })

                const styleElement = document.createElement("STYLE");
                styleElement.setAttribute("type", "text/css");
                styleElement.setAttribute("data", "location");
                styleElement.append(styles);
                document.head.append(styleElement);

                localStorage.setItem(attrNameIsInjected, "true");
            }

            function revertInjection() {
                const headTag = document.querySelector("style[data=location]");
                if (headTag) {
                    headTag.parentElement.removeChild(headTag);

                    localStorage.setItem(attrNameIsInjected, "false");
                }
            }

            function isInjected() {
                return localStorage.getItem(attrNameIsInjected) === "true";
            }

            function toggleInjection() {
                const is = isInjected();

                if (is) revertInjection();
                else injectCssStyles();
            }

            function main() {
                const btnAction = document.createElement("BUTTON");
                btnAction.style = "background:#33b1ff;box-sizing:border-box;border:1px solid #33b1ff;font-size:1em;padding:.5rem;border-radius:8px;color:#fff;font-weight:bold;"
                btnAction.innerHTML = "Ser genial! &#9996;"
                btnAction.addEventListener("click", toggleInjection);

                const menuTag = document.querySelector(".Menu-content div ul");
                menuTag.insertAdjacentElement("afterbegin", btnAction);
            }

            main();
        }
    };

    localStorage.setItem(
        "platzi-tools",
        JSON.stringify(tools, function (_, value) {
            if (typeof value === "function") return value.toString();
            return value;
        })
    );
})();

// Segunda parte | Second part
(function start() {
    const platziTools = JSON.parse(localStorage.getItem("platzi-tools"));

    if (!!platziTools) eval(`(${platziTools.hydrate})`)();
})();
