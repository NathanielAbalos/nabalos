const burger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const robot = document.querySelector(".robot");
const chatInput = document.querySelector(".chatInput");
const sendButton = document.querySelector(".sendButton");
const botReplyBox = document.querySelector(".botReply");
const speechBox = document.querySelector(".speechBox");
const inputBox = document.querySelector(".inputBox");
const robotBox = document.querySelector(".robotBox");

const smartEndpoint = "https://chatapp-401002.wm.r.appspot.com";
const loadingIndicator="loading...";
let newText=false;
let susi;
let conversation =[
    {
        "role": "system",
        "content": "You are an assistant answering potential clients' questions about my web development services. Please tell them that your name is Lilac. You are an assistant built in to my protfolio website, where clients interact with you. Please reply short sentences only. one to four sentences. That is important to make it short. Anyways, Here are some information about me. Use it to answer their questions.-------- Hi, I'm Nathaniel Full-Stack Web Developer. I'm a Full Stack Web Developer dedicated to delivering high-quality, responsive, and interactive web solutions tailored to clients' needs. From building custom websites to integrating APIs and ensuring top-notch user experiences, I offer a comprehensive range of services. Let's collaborate to bring your web projects to life! a passionate and skilled web developer with a strong foundation in HTML, CSS, JavaScript, and related technologies. I bring fresh creativity and technical expertise to every project I undertake. With 2 years of education in Information Technology from the University of Cebu and ongoing studies in Artificial Intelligence Software Engineering at Centennial College, I am continuously expanding my knowledge to deliver innovative solutions. 🌟 Proficient in HTML, CSS, and JavaScript, as well as related frameworks, including React, Bootstrap 🌟 Experience in building dynamic websites and applications🌟 WordPress development for seamless content management🌟 API integration using Node.js and Express.js🌟 Payment gateway implementation with gateways, such as PayPal and Stripe APIs🌟 Database management with MongoDB🌟 Game development using JavaScript🌟 Responsive web design for optimal user experiences across devices🌟 UI design for visually appealing and intuitive interfaces🌟 SEO optimization and analytics implementation for enhanced online visibility"
    },
];


window.onload = function(){
    setTimeout(()=>{
        speechBox.style.visibility = "hidden";
    }, 100);
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${susi}`
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


