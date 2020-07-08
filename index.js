// Primera parte | First part
(function init() {
  const tools = {
    show: function() {
      const livePrimary = document.querySelector(".Live-primary");
      const liveChatContent = document.querySelector(".Live-chat-content");
      const btnFullScreen = document.querySelector(
        ".vjs-fullscreen-control.vjs-control.vjs-button"
      );
      const videoMaterialLayout = document.querySelector(
        ".Live.VideoMaterialLayout-background"
      );

      const btnNormal = document.createElement("BUTTON");
      const btnRecommended = document.createElement("BUTTON");
      const btnFullWidth = document.createElement("BUTTON");

      btnNormal.innerHTML = "Normal";
      btnRecommended.innerHTML = "Recomendado";
      btnFullWidth.innerHTML = "Toda ancho";

      const normal = () => {
        livePrimary.style = "width: 60%;";
        liveChatContent.style = "width: 40%;flex: 1 1 auto;";
        videoMaterialLayout.style = "flex-wrap: nowrap;";
      };

      const recommended = () => {
        livePrimary.style = "width: 70%;";
        liveChatContent.style = "width: 30%;flex: 1 1 auto;";
        videoMaterialLayout.style = "flex-wrap: nowrap;";
      };

      const fullScreen = () => {
        livePrimary.style = "width: 100%;";
        videoMaterialLayout.style = "flex-wrap: wrap;";
      };

      btnNormal.addEventListener("click", normal);
      btnRecommended.addEventListener("click", recommended);
      btnFullWidth.addEventListener("click", fullScreen);

      const newContainer = document.createElement("DIV");
      newContainer.setAttribute("class", "custom-container-by-EHL");

      const wrapper = document.createDocumentFragment();
      [btnNormal, btnRecommended, btnFullWidth].forEach(btn => {
        wrapper.append(btn);
      });

      const elementStyle = document.createElement("STYLE");
      const styles = `
      .custom-container-by-EHL {
        display: flex;
        justify-content: space-around;
      }
      .custom-container-by-EHL button {
        cursor: pointer;
      }
      .custom-container-by-EHL button:hover {
        text-shadow: 2px 2px 5px #fff
      }
      `;
      elementStyle.setAttribute("type", "text/css");
      elementStyle.append(styles);
      document.head.append(elementStyle);

      btnFullScreen.insertAdjacentElement("beforebegin", newContainer);
      newContainer.append(wrapper);
    }
  };

  localStorage.setItem(
    "platzi-tools",
    JSON.stringify(tools, function(_, value) {
      if (typeof value === "function") return value.toString();
      return value;
    })
  );
})();

// Segunda parte | Second part
(function start() {
  const platziTools = JSON.parse(localStorage.getItem("platzi-tools"));
  if (!!platziTools) eval(`(${platziTools.show})`)();
})();
