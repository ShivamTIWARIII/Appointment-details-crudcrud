let form=document.querySelector("form")
let main=document.querySelector('#main')
form.addEventListener("submit",(event)=>{
   // alert("hello")
   event.preventDefault()
    let name=event.target.txt.value;

    let email=event.target.email.value;

    let ph=event.target.contact.value;



    var userData=JSON.parse(localStorage.getItem("userDetails"))??[]

    userData.push({
        'name':name,
        'email':email,
        'ph':ph,
    })

    localStorage.setItem("userDetails",JSON.stringify(userData))
    event.target.reset();
    displayData();
})

function removeData(i){
    var userData=JSON.parse(localStorage.getItem("userDetails"))??[]
    userData.splice(i,1)
    localStorage.setItem("userDetails",JSON.stringify(userData))
    displayData()
}

function editData(i) {
    var userData = JSON.parse(localStorage.getItem("userDetails")) || [];
    var element = userData[i];

    // Pre-fill the form with the selected data for editing
    form.txt.value = element.name;
    form.email.value = element.email;
    form.contact.value = element.ph;

    // Remove the old data
    userData.splice(i, 1);
    localStorage.setItem("userDetails", JSON.stringify(userData));

    // Change the form submit event to update the data
    form.removeEventListener("submit", formSubmissionHandler);
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let name = event.target.txt.value;
        let email = event.target.email.value;
        let ph = event.target.contact.value;

        userData.push({
            'name': name,
            'email': email,
            'ph': ph,
        });

        localStorage.setItem("userDetails", JSON.stringify(userData));
        event.target.reset();
        displayData();
    });
}

let displayData=()=>{

    var userData=JSON.parse(localStorage.getItem("userDetails"))??[];
    var finalData=''
    userData.forEach((element,i)=>{
        finalData+=`<div class="inner">
        ${element.name}----${element.email}----${element.ph}
        <button onclick='removeData(${i})'>Delete</button>
        <button onclick='editData(${i})'>Edit</button>
    </div>`
    })
    main.innerHTML=finalData;
}

displayData()