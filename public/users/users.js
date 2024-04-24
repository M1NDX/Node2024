let usersArray = []
let selectedUserId = -1

async function loadData(){
    let inputUserId = document.querySelector('#userid')
    console.log("value" , inputUserId.value);
    let id = inputUserId.value;

    let pathProps = id? '/'+id: '?pageSize=10';


    console.log("inside");
    let resp = await fetch('/api/users'+pathProps,{
        method :'GET',
        headers: {
            'x-auth':23423
        }
    })

    console.log(resp.status);
    let data = await resp.json()
    console.log(data);
    sessionStorage.setItem('users', JSON.stringify(data.users))
    usersArray=data.users;
    showUsersTable(data.users)
    
}


function showUsersTable(userArray) {
  let html = /*html*/ `

            
            <table id="userList"> 
            <tr> 
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
            </tr> 
            ${userArray
              .map((user) => /*html*/ `
                <tr> 
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <a
                            class="btn btn-primary"
                            href="#"
                            role="button"
                            onclick = "editUser('${user.id}')"
                            ><i class="bi bi-pencil-fill"></i>
                        </a>

                        <a
                            class="btn btn-primary"
                            href="#"
                            role="button"
                            onclick = "deleteUserV2('${user.id}')"
                            ><i class="bi bi-trash3-fill"></i>
                        </a>
   
                    </td>
                </tr>
                `
              )
              .join("")}
            </table>
           `;

  document.querySelector("#info").innerHTML = html;
  let tableList = document.querySelector('#userList');
  tableList.addEventListener('click', (e)=> {
    if(e.target.nodeName!='A' && e.target.nodeName!='I'){
      return;
    }
    console.log(e.target.nodeName);
  })
}


function editUser(id){
    let users = JSON.parse(sessionStorage.getItem('users'))
    let userData = users.find(u => u.id == id)

    console.log("user to edit: ",id);
    let modalId = document.getElementById('userModal');
    console.log(modalId);
    console.log(usersArray);
    
    let myModal = new bootstrap.Modal(modalId, {});

    document.querySelector("#id").value = userData.id;
    document.querySelector("#name").value = userData.name;
    document.querySelector("#email").value = userData.email;
    myModal.show();
    
}

function deleteUser(id){
    selectedUserId = id
    console.log("user to delete: ",id);
    let userData = usersArray.find(u => u.id == id)
    console.log(userData);
    let modalId = document.getElementById('confirmModal');
    let userNameModal = document.getElementById('userName')
    userNameModal.innerText = userData.name;
    userNameModal.setAttribute('data-userId',userData.id)
    let myModal = new bootstrap.Modal(modalId, {});
    myModal.show()

    //show a confirmation modal with the name of the user to delete
      //if yes 
        // send a delete request to the server
          //if deleted show a message "user deleted"
            //update data (withouth refresh page)
          //error: show the error

}

async function deleteUserV2(id){
  let userData = usersArray.find(u => u.id == id)
  selectedUserId = id;
  // https://sweetalert.js.org/
    swal({
        title: "Are you sure?",
        text: "User to delete: "+userData.name,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async (willDelete) => {
        if (willDelete) {
          await confirmDelete()
        } else {
          swal("The user is safe!");
        }
      });
}

async function confirmDelete(){
  let userNameModal = document.getElementById('userName')
  let uid = userNameModal.getAttribute('data-userId')
  let id = selectedUserId;
  console.log('id to delete', id);
  selectedUserId= -1;
  let userData = usersArray.find(u => u.id == id)

  let resp = await fetch('/api/users/'+id, {
    headers: {
      'x-auth': '23423'
    },
    method: 'DELETE'
  })

  let data = await resp.json()

  if(!data.error){
    //https://sweetalert.js.org/
    swal("User deleted", "User:"+ userData.name + " deleted" , "success");
    loadData()
  }else{
    swal("Error", data.error , "error");
  }
  

}

async function storeEditedUser(){
    let id = document.querySelector("#id").value 
    let name = document.querySelector("#name").value
    let email = document.querySelector("#email").value
    
    let userData = {name, email}

    let resp = await fetch('/api/users/'+id,{
        headers:{
            'x-auth':'23432',
            'content-type': 'Application/json'
        },
        method: 'PUT',
        body: JSON.stringify(userData)
    })

    let data = await resp.json()


    if(!data.error){
        //https://sweetalert.js.org/
        swal("Data Updated", "User:"+ data.name + " updated" , "success");
        loadData()
    }else{
        swal("Error", data.error , "error");
    }

    console.log(data);


}