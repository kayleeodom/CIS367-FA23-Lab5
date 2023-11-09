const API_URL = "https://fhu-faculty-api.netlify.app/fhu-faculty.json"
const data = [];

const carousel = document.getElementsByClassName("carousel")[0];
var activeIndex = Math.floor(data.length/2);


async function addCards() {
    let response = await fetch(API_URL);
    let people = await response.json();

    people.forEach(person => {
        data.push(person);
    });

    data.forEach( (person) => {
        let div = document.createElement('div');
        div.classList.add("box");
    
        div.innerHTML = `<div class="whole">
        <div class="card">
            
            <div class="top">
                <div class="basic">
                    <p class="Rank">${person.Rank}</p>
                    <p class="Hp">HP${person.HitPoints}</p>
                </div>
                <div class="description">
                    <p class="title">${person.FirstName} '${person.NickName}' ${person.LastName}</p>
                    <p class="field">${person.FieldofStudy}</p>
                </div>
            </div>
            
            <div class="picture-holder">
            <img class="profile" src="https://fhu-faculty-api.netlify.app/images/headshots/${person.Image} " alt="${person.FirstName} ${person.LastName}">
                <p class="summary">NO.439 ${person.FirstName} ${person.LastName} HT:${person.Height}"</p>
            </div>
                    
            <div class="holder">
                <div class="skills">
                    <span class="material-symbols-outlined">stars</span>
                    <p class="attack">${person.Attack1}</p>
                    <p class="points">${person.Attack1Damage}+</p>
                </div>
                <p class="sentence">Prevent all damage done to this Pokemon by attacks from Basic Pokemon during 
                    your apponenets next turn.</p>
                            
                <div class="skillstwo">
                    <div class="stars">
                        <span class="material-symbols-outlined">stars</span>
                    </div>
                    <p class="attack">${person.Attack2}</p>
                    <p class="points">${person.Attack2Damage}+</p>
                </div>
                
                <p class="sentence">This attack does 30 more damage for each Prize Card 
                    your opponent has taken.
                </p>
            </div>
                                
            <div class="section">
                <div class="weakness-section ">
                    <span class="material-symbols-outlined">local_fire_department</span>
                    <p class="weakness">Weakness: ${person.Weaknesses}</p>
                </div>
                                
                <div class="resistance-section">
                    <span class="pb-2 material-symbols-outlined">mystery</span>
                    <p class="resistance">Resistance: ${person.Resistances}</p>
                </div>
                                
            </div>
                                
            <div class="bottom">
                <p class="year">@2023</p>
                <p class="hash">#CodeHard</p>
                <p class="designer">Kaylee Odom</p>
            </div>
                        
        </div>
        
        <div class="buttons">
            <button class="like-btn" id="like">
                <i class="material-icons liked-icon">favorite</i>
                <i class="material-icons unliked-icon">favorite_border</i>
            </button>
            <button class="comment-btn" id="comment">
                <i class="material-symbols-outlined">chat_bubble</i>
            </button>
            <button class="share-btn" id="share">
                <i class="material-symbols-outlined">share</i>
            </button>
        </div>
    </div>`
    
        carousel.appendChild(div);

        // Like controls
        const likebtn = div.querySelector('.like-btn');
        const likedIcon = div.querySelector('.liked-icon');
        const unlikedIcon = div.querySelector('.unliked-icon');
        likedIcon.style.display = 'none';
        let isLiked = false;

        // Download controls
        const commentbtn = div.querySelector('.comment-btn');
        
        // Share controls
        const sharebtn = div.querySelector('.share-btn');


        function likeCard() {
            if(!isLiked){
                isLiked = true;
                likedIcon.style.display = 'inline';
                unlikedIcon.style.display = 'none';
            }
            else{
                isLiked = false;
                likedIcon.style.display = 'none';
                unlikedIcon.style.display = 'inline';
            }
        }

        // comment on the card
        function commentCard(){
            const userComment = prompt("Enter your comment:");

            if (userComment !== null) {
                console.log("User's comment:", userComment);
            }
        }

        // Share a card through email
        function shareCard(){
            const subject = "Check out this amazing card";
            const body = "I think you would quite enjoy this card";

            const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
        }

        // Like a card
        likebtn.addEventListener("click", likeCard);
        // Comment on a card
        commentbtn.addEventListener("click", commentCard);
        // Share a card
        sharebtn.addEventListener("click", shareCard);
    });
}

addCards();
updateCards();

function updateCards() {

    var windowWidth = window.innerWidth;
    console.log(windowWidth);
    var cardWidth = 350;
    const length = data.length;

    const boxes = document.querySelectorAll(".carousel .box");
    
    boxes.forEach( (div, index) => {
    
        if( index < activeIndex){
            div.classList.remove("active");
            
            div.style.zIndex = index;
            const offset = 100+(length-index)*2;
            div.style.transform = `translateX(-${offset}%) scale(100%)`;
           
        }
        else if(index === activeIndex)
        {
            div.classList.add("active");
            div.style.zIndex = 300;
            div.style.transform = `translateX(0) scale(120%)`;

        }
        else {
            div.classList.remove("active");
            div.style.zIndex = (length - index);
            const offset = 100+(index)*2;

            div.style.transform = `translateX(${offset}%) scale(100%)`;
        }
    });

}

window.addEventListener("resize", updateCards);


document.getElementById("prevButton").addEventListener("click", ()=>{
    if( activeIndex >= 0)
    {
        activeIndex--;
        updateCards();
    }
    
});

document.getElementById("nextButton").addEventListener("click", ()=>{
    if( activeIndex < data.length)
    {
        activeIndex++;
        updateCards();
    }
    
});