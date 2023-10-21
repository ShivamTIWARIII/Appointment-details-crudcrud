let form = document.querySelector("form");
let main = document.querySelector("#main");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = event.target.txt.value;
    const email = event.target.email.value;
    const ph = event.target.contact.value;

    const newUser = {
        name,
        email,
        ph
    }

    axios.post("https://crudcrud.com/api/917d1c98775940e3ae4b7055ed5ac7bb/userDetail", newUser)
    .then(() => {
        event.target.reset();
        console.log("Data posted successfully");
        displayData();
    })
    .catch((err) => {
        console.log("Error posting data:", err);
    });
});

function removeData(id) {
    axios.delete(`https://crudcrud.com/api/917d1c98775940e3ae4b7055ed5ac7bb/userDetail/${id}`)
    .then(() => {
        displayData();
    })
    .catch((err) => {
        console.log(err);
    });
}

function editData(id) {
    axios.get(`https://crudcrud.com/api/917d1c98775940e3ae4b7055ed5ac7bb/userDetail/${id}`)
    .then((res) => {
       const updateDetail = res.data;
       form.txt.value = updateDetail.name;
       form.email.value = updateDetail.email;
       form.contact.value = updateDetail.ph;

       form.addEventListener("submit", (event) => {
           event.preventDefault();

           const updateName = event.target.txt.value;
           const updateEmail = event.target.email.value;
           const updatePh = event.target.contact.value;

           const editValue = {
               name: updateName,
               email: updateEmail,
               ph: updatePh
           };

           axios.put(`https://crudcrud.com/api/917d1c98775940e3ae4b7055ed5ac7bb/userDetail/${id}`, editValue)
           .then(() => {
               displayData();
           })
           .catch((err) => {
               console.log("Error editing data:", err);
           });
       });
    })
    .catch((err) => {
       console.log(err);
   });
}

function displayData() {
    axios.get("https://crudcrud.com/api/917d1c98775940e3ae4b7055ed5ac7bb/userDetail")
        .then((res) => {
            const userData = res.data;
            console.log("Data from API:", userData);
            var finalData = '';
            userData.forEach((element, i) => {
                finalData += `
                <div class="inner">
                ${element.name}----${element.email}----${element.ph}
                <button onclick='removeData("${element._id}")'>Delete</button>
                <button onclick='editData("${element._id}")'>Edit</button>
                </div>`;
            });
            main.innerHTML = finalData;
        })
        .catch((err) => {
            console.log("Error fetching data:", err);
        });
}

// Call displayData() when the page loads initially
displayData();
