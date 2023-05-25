
document.addEventListener("DOMContentLoaded", async () => {

    const csrf = Cookies.get('csrftoken');
    const addMarks = () => {
        document.querySelectorAll(".marks").forEach(option =>{
            option.addEventListener("input", function(){
                const href = window.location.href;
                const arr = href.split("response/");
                const resp_id = arr.pop();
                const form_id = arr[0].split("forms/").pop()
                 fetch(`/forms/${form_id}add_marks/${resp_id}`,{
                    method: "POST",
                    headers: {'X-CSRFToken': csrf},
                    body: JSON.stringify({
                        "qid": this.dataset.qid,
                        "score": this.value
                    })
                })
                
            })
        })
    }
    addMarks()
    
  
})

