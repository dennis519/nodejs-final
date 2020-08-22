const cross = document.querySelectorAll('#cross-family')
const form = document.querySelector("#add-books-form");
for(let i = 0 ; i < cross.length; i ++){
    cross[i].addEventListener('click', async (test) => {
        //test.stopPropagation();
        let id = cross[i].getAttribute('cross-id');
        console.log(id);
        // call delete api
        let apiUrl = `https://nodebooklist.herokuapp.com/API/deleteBook?id=${id}`
        let res = await fetch(apiUrl, {method:'GET'});
        let text = await res.text();
        console.log(text);
        console.log("in the cross, id = ", id);
        
    });
}
// add data
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // call add api
    name    = form.name.value,
    author  = form.author.value,
    ISBN     = form.ISBN.value
    let apiUrl = `https://nodebooklist.herokuapp.com/API/addBook?name=${name}&author=${author}&ISBN=${ISBN}`
    let res = await fetch(apiUrl, {method:'GET'});
    let text = await res.text();
    console.log(text);
    
    //form.name.value = '';
    //form.author.value = '';
    //form.ISBN.value = '';
});