
const data = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];

const carousel = document.getElementsByClassName("carousel")[0];
var activeIndex = Math.floor(data.length/2);


function renderCards() {

    carousel.innerHTML = "";
    var windowWidth = window.innerWidth;
    console.log(windowWidth);
    var cardWidth = 350;
    
    // item = text on the card
    data.forEach( (item, index) => {
        const length = data.length;
        let div = document.createElement('div');
        div.classList.add("box");
    
        if( index < activeIndex){
            div.classList.add("left");
            const offset = windowWidth/2 - cardWidth/2 - index * 10;
            div.style.transform = `translateX(${-offset}px)`;
            //div.style.left = `${index*10}px`;
            //div.style.transform+=` scale(${ Math.pow(0.9, length-index+1)})`;
        }
        else if(index === activeIndex)
        {
            div.classList.add("active");
        }
        else {
            div.classList.add("right");
            const offset = windowWidth/2 - cardWidth/2 - (length - index+1) * 10;
            console.log(offset)
            div.style.transform = `translateX(${offset}px)`;
            div.style.zIndex = (length - index);
        }
    
        div.innerHTML = `${index} ${item}`
    
        carousel.appendChild(div);
    
    });
}

renderCards();

window.addEventListener("resize", renderCards);


document.getElementById("prevButton").addEventListener("click", ()=>{
    activeIndex--;
    renderCards();
});

document.getElementById("nextButton").addEventListener("click", ()=>{
    activeIndex++;
    renderCards();
});