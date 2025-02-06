(function(){
    let style=`*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;line-height:1.5;}
.flex{display:flex;}`;
    const classList=new Set();
    document.querySelectorAll("*").forEach(el=>el.classList.forEach(cls=>classList.add(cls)));
    style=Array.from(classList).map(cls=>{
    }).join("");
    const styleSheet=document.createElement("style");
    styleSheet.innerHTML=style;
    document.head.appendChild(styleSheet);
    function match(str,reg){
        const match=str.match(reg);
        if(match)return match;
        return null;
    }
})();