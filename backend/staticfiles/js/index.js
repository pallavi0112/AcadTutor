
document.addEventListener("DOMContentLoaded", async () => {

    const csrf = Cookies.get('csrftoken');
    const createButton = document.querySelector("#create-blank-form");
    if(createButton){
    createButton.addEventListener('click',()=>{
            fetch('/forms/create', {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    title: "Untitled Form"
                })
            })
            .then((response) => {
                if (response.ok) {
                  return response.json();
                } 
                return response.json().then((text) => {throw Error(text.message)});
              })
              .then((result) => {
                window.location = `${result.code}/edit`
              }).catch((error) => {
                console.log(error);
              });
            
        })
    }
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener("click", function(){
            window.location = `${this.dataset.id}/edit`
        })
    })

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener("click", function(){
            fetch('delete_form', {
                method: "DELETE",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "id": this.dataset.id
                })
            })
            .then(() => {
                this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode)
            })

        })
    })
  
})

