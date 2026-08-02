const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll("section").forEach(section=>{
    observer.observe(section);
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
        header.style.background = "rgba(0,0,0,.82)";
        header.style.padding = "18px 60px";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.45)";
    }else{
        header.style.background = "rgba(0,0,0,.45)";
        header.style.padding = "25px 60px";
        header.style.boxShadow = "none";
    }
});
