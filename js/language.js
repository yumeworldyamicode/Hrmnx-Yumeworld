const text = {

ja:{
home:"ホーム",
about:"会社概要",
subs:"グループ",
artists:"アーティスト",
contact:"お問い合わせ",
partner:"パートナー"
},

en:{
home:"Home",
about:"About",
subs:"Subsidiaries",
artists:"Artists",
contact:"Contact",
partner:"Partners"
},

ko:{
home:"홈",
about:"회사소개",
subs:"계열사",
artists:"아티스트",
contact:"문의",
partner:"파트너"
},

zh:{
home:"首页",
about:"公司简介",
subs:"子公司",
artists:"艺人",
contact:"联系我们",
partner:"合作伙伴"
}

};

document.getElementById("language").addEventListener("change",function(){

let lang=this.value;

document.querySelectorAll("[data-lang]").forEach(item=>{

item.innerHTML=text[lang][item.dataset.lang];

});

});
