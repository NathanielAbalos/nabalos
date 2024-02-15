const burger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const robot = document.querySelector(".robot");
const chatInput = document.querySelector(".chatInput");
const sendButton = document.querySelector(".sendButton");
const botReplyBox = document.querySelector(".botReply");
const speechBox = document.querySelector(".speechBox");
const inputBox = document.querySelector(".inputBox");
const robotBox = document.querySelector(".robotBox");
const card = document.querySelectorAll(".service");

const smartEndpoint = "https://xju.yjd.temporary.site/your_php_file.php";
const loadingIndicator="loading...";
let newText=false;
let susi;
let conversation =[
    {
        "role": "system",
        "content": "You are an assistant answering potential clients' questions about my web development services. Please tell them that your name is Lilac. You are an assistant built in to my protfolio website, where clients interact with you. Please reply short sentences only. one to four sentences. That is important to make keep your replies short. Anyways, Here are some information about me. Use it to answer their questions.-------- Hi, I'm Nathaniel Full-Stack Web Developer. I'm a Full Stack Web Developer. I buil custom websites, integrate APIs and ensuring top-notch user experiences, I offer a comprehensive range of services. I'm proficient in HTML, CSS, JavaScript, and related technologies, such as bootsrap and react. I have 2 years of education in Information Technology from the University of Cebu and ongoing studies in Artificial Intelligence Software Engineering at Centennial College, Some of my skills include 🌟 Proficient in HTML, CSS, and JavaScript, as well as related frameworks, including React, Bootstrap 🌟 Experience in building dynamic websites and applications🌟 WordPress development for seamless content management🌟 API integration using Node.js and Express.js🌟 Payment gateway implementation with gateways, such as PayPal and Stripe APIs🌟 Database management with MongoDB🌟 Game development using JavaScript🌟 Responsive web design for optimal user experiences across devices🌟 UI design for visually appealing and intuitive interfaces🌟 SEO optimization and analytics implementation for enhanced online visibility. The services I offer include creating custom websites using coding or wordpress, integrating APIs, creating responsive designs, creating custom web applications with javascript, creating e commerce solutions, and maintenance or updates on websites. About my projects, I created a site for Cebu Technological University's Main Scholarship Office. The project is shown in the projects section of my page. About my pricing, I charge $200 CAD for every project I do for any clients. About my contact info, my information is found in the contact section of the page as well as in the footer. The contact section has a form where they can send me a message after entering their name and email"
    },
];


window.onload = function(){
  
    speechBox.style.visibility = "hidden";
    
    for(let x=0; x<card.length; x++){
        card[x].addEventListener("click",()=>{

            card[x].classList.toggle("flip");
            card[x].firstElementChild.classList.toggle("gone");
            card[x].lastElementChild.firstElementChild.classList.toggle("gone");
            
            if(card[x].lastElementChild.lastElementChild.style.display==="block"){
                card[x].lastElementChild.lastElementChild.style.display="none";
            }
            else{
                card[x].lastElementChild.lastElementChild.style.display="block";
            }

        
        })
    }
}


burger.addEventListener("click", (event)=>{
 
    nav.classList.toggle("show");     
 
    
});

sendButton.addEventListener("click", ()=>{
    sendMessage(chatInput.value);
    chatInput.value="";
})

chatInput.addEventListener("keyup", (event)=>{
    if(event.code==="Enter"){
        sendMessage(chatInput.value);
        chatInput.value="";
    }
})

robot.addEventListener("click", ()=>{
    inputBox.classList.toggle("chatShow");
    robotBox.classList.toggle("robotTalk");
    
    speechBox.style.visibility="hidden";
    
})

function sendMessage(UserMessage){
    speechBox.style="max-width: 400px; transform: rotate(0deg);";
    if(speechBox.style.visibility==="hidden"){
        speechBox.style.visibility="visible";
    }
    botReplyBox.innerHTML="loading...";
    let newMessage={
        "role": "user",
        "content": UserMessage
    };
    conversation.push(newMessage);
     

    let message = {
    "model": "gpt-3.5-turbo",
    "messages": conversation       
    
    }
    
    console.log(conversation);
    console.log(JSON.stringify(message));
    console.log(JSON.parse(JSON.stringify(message)))

    fetch(smartEndpoint, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(conversation)
    })
    .then((response)=> {return response.text()})
    .then((data)=>{
        botReplyBox.innerHTML = data;

        let newBotMessage={
        "role": "assistant",
        "content": botReplyBox.innerHTML
        };
        conversation.push(newBotMessage);
        console.log(conversation);
    })
    .catch((error)=>{
        loadingIndicator.remove();
        botReplyBox.innerHTML=error;
    })
}


