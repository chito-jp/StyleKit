(function(){
    class StyleKit{
        static get color(){return new Proxy({},{get(target,prop){
            if(String(prop).startsWith("#")||typeof prop=="number")return prop;
            return {
                black:"#111",
                white:"#fff"
            }[prop];
        }})}
        static size(input){
            if(input.match(/^[0-9]*$/)){
                if(input==0)return 0;
                return input+"px"
            }else{
                const match=input.match(/^([0-9]+)(px|%|em|rem|pt|vw|vh)/);
                if(match)return input;
                return null;
            }
        }
        static get propertys(){
            return {
                flex:{
                    name:"display:flex",
                    type:"no-value"
                },
                c:{
                    name:"color",
                    type:"color",
                },
                bg:{
                    name:"background-color",
                    type:"color",
                },
                m:{
                    name:"margin",
                    type:"size"
                },
                p:{
                    name:"padding",
                    type:"size"
                }
            }
        }
        static typeHandler(dt){
            const {value,cls,name,type}=dt;
            if(!type||!cls||!name)return null;
            switch(type){
                case"color":return StyleKit.color[value];
                case"size":return StyleKit.size(value);
                case"no-value":return `.${cls}{${name}}`;
            };
        }
        static toStyle(cls){
            let [property,value]=cls.split("-");
            if(!property)return null;
            const styleData=StyleKit.propertys[property];
            if(typeof styleData=="undefined")return null;
            value=StyleKit.typeHandler({cls,value,type:styleData.type,name:styleData.name});
            if(!value&&value!=0)return null;
            if(styleData.type=="no-value")return value;
            property=styleData.name;
            return `.${cls}{${property}:${value}}`
        }
    }
    const classList=new Set();
    document.querySelectorAll("*").forEach(el=>el.classList.forEach(cls=>classList.add(cls)));
    const generatedStyles=Array.from(classList).map(cls=>StyleKit.toStyle(cls)).filter(Boolean).join("");
    const styleSheet=document.createElement("style");
    styleSheet.innerHTML=``+generatedStyles;
    document.head.appendChild(styleSheet);
})();
