btn = document.getElementById('btn');

// storing the data in the localStorage
btn.addEventListener('click',getData);

let ul = document.getElementById('products');

function getData(){

    let id;
    let money = document.getElementById('money');
    let product = document.getElementById('product');

    let obj = {
        money :money.value,
        product : product.value
    }

    // using axios to push data to CrudCrud
    axios.post('https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails',obj)
    .then( reponse => {
        id = reponse._id;
        console.log("Posting data : ",reponse);
    })
    .catch( err => {
        document.body.innerHTML = "<h2 style='color:red;'>Something went wrong</h2>";
        console.error(err);
    })

    // Creating li tag
    let li = document.createElement('li');
    let data = document.createTextNode(obj.product+' - '+'Rs. '+obj.money);
    li.className = "list-group-item";
    li.appendChild(data);

    // creating edit button
    let edit = document.createElement('button');
    let editData = document.createTextNode('Edit');
    edit.className = "btn btn-outline-success float-end";
    edit.style="margin-right:3px";
    edit.appendChild(editData);

    // creating delete button
    let del = document.createElement('button');
    let deleteData = document.createTextNode('X');
    del.className = "btn btn-outline-danger float-end";
    del.style = "margin-left:3px";
    del.appendChild(deleteData);

    // appending delete to li 
    li.appendChild(del);
    li.appendChild(edit);

    // appending to ul tag
    ul.appendChild(li);

    // edit functionality
    edit.onclick = (e) => {
        axios.get('https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails')
        .then( (response) =>{
            let dataStr = e.target.parentElement.textContent;
            let strName = dataStr.substring(0,dataStr.indexOf('-')-1);

            for(let i of response.data){
                if(i.product == strName){
                    money.value = obj.money;
                    product.value = obj.product;

                    axios.delete(`https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails/${i._id}`)
                    .then( () => alert(`${obj.product} has been deleted at ${new Date()}`))
                    .catch( (err) => console.error(err));
                }
            }
        })
        .catch( err => console.error(err));
        ul.removeChild(e.target.parentElement);
    }

    // deleting li tag
    del.onclick = (e) => {

        axios.get('https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails')
        .then( (response) =>{
            // iterating each data entry using for loop
            for(let i of response.data){
                if((i.money == obj.money) && (i.product == obj.product)){
                    axios.delete(`https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails/${i._id}`)
                    .then( () => alert(`${obj.product} has been deleted at ${new Date()}`))
                    .catch( (err) => console.error(err));
                };
            }
        })
        .catch( err => console.error(err));

        // deleting the tag
        ul.removeChild(e.target.parentElement);
    }
}
let totalCost = 0;
window.addEventListener("DOMContentLoaded", (totalCost) => {
    // creating a GET request
    axios.get('https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails')
    .then( (response) => {
        // for loop for each object
        for(let i of response.data){
                totalCost += i.money;

            // Creating li tag
            let li = document.createElement('li');
            let data = document.createTextNode(i.product+' - '+'Rs. '+i.money);
            li.className = "list-group-item";
            li.appendChild(data);

            // creating edit button
            let edit = document.createElement('button');
            let editData = document.createTextNode('Edit');
            edit.className = "btn btn-outline-success float-end";
            edit.style="margin-right:3px";
            edit.appendChild(editData);

            // creating delete button
            let del = document.createElement('button');
            let deleteData = document.createTextNode('X');
            del.className = "btn btn-outline-danger float-end";
            del.style = "margin-left:3px";
            del.appendChild(deleteData);

            // appending delete to li 
            li.appendChild(del);
            li.appendChild(edit);

            // appending to ul tag
            ul.appendChild(li);

            // delete button functionality
            del.onclick = (e) => {
                
                // click delete
                let productName = i.product;
                axios.delete(`https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails/${i._id}`)
                .then( () => alert(`${productName} has been deleted at ${new Date()}`))
                .catch( (err) => console.error(err));                    
                
                ul.removeChild(e.target.parentElement);
            }


            // editing button functionality
            edit.onclick = (e) => {

                // getting data to the login
                let money = document.getElementById('money');
                let product = document.getElementById('product');

                product.value = i.product;
                money.value = i.money;

                // deleting data from CRUDCRUD
                axios.delete(`https://crudcrud.com/api/36f5469494f8424799c895c27143f679/ProductDetails/${i._id}`)
                .then( () => alert(`${product.value} has been deleted at ${new Date()}`))
                .catch( (err) => console.error(err));                    
            
                ul.removeChild(e.target.parentElement);
            }
        }
    })
    .catch((err) => console.error(err))

        let msg = document.getElementById('input');
        msg.textContent = `The total cost of the products are : Rs. ${totalCost}`;
})