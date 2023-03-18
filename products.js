let cost = 0;
btn = document.getElementById('btn');

// storing the data in the localStorage
btn.addEventListener('click',getData);
let ul = document.getElementById('products');

async function getData() {

    let id;
    let money = document.getElementById('money');
    let product = document.getElementById('product');
    let addMoney = document.getElementById('add-money');
    addMoney.textContent = `The total cost of the product list is Rs. ${cost}`;

    let obj = {
        money : money.value,
        product : product.value
    }

    try {
        // using axios to push data to CrudCrud
        let resp = await axios.post('https://crudcrud.com/api/e79981630d1a4a918a45d9092d7cbed3/ProductDetails',obj);
        id = resp.data._id;
        console.log("Posting data : ",resp);
        cost += parseInt(resp.data.money);
        addMoney.textContent = `The total cost of the product list is Rs. ${cost}`;
    }

    catch(err) {
        document.body.innerHTML = "<h2 style='color:red; text-align:center'>Something went wrong</h2>";
        console.error(err);
    }

    // Creating li tag
    let li = document.createElement('li');
    let data = document.createTextNode(obj.product + ' - '+'Rs. '+obj.money);
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
    edit.onclick = async (e) =>  {

        money.value = obj.money;
        product.value = obj.product;

        try {
            // using axios to push data to CrudCrud
            await axios.delete(`https://crudcrud.com/api/e79981630d1a4a918a45d9092d7cbed3/ProductDetails/${id}`);
            cost -= parseInt(obj.money);
            addMoney.textContent = `The total cost of the product list is Rs. ${cost}`;
        }
        catch(err) {
            document.body.innerHTML = "<h2 style='color:red; text-align:center'>Something went wrong</h2>";
            console.error(err);
        }
        ul.removeChild(e.target.parentElement);
    }

    // deleting li tag
    del.onclick = async (e) => {

        try {
            // using axios to push data to CrudCrud
            await axios.delete(`https://crudcrud.com/api/e79981630d1a4a918a45d9092d7cbed3/ProductDetails/${id}`);
            cost -= parseInt(obj.money);
            addMoney.textContent = `The total cost of the product list is Rs. ${cost}`;
        }
        catch(err){
            document.body.innerHTML = "<h2 style='color:red; text-align:center'>Something went wrong</h2>";
            console.error(err);
        }

        // deleting the tag
        ul.removeChild(e.target.parentElement);
    }
}

window.addEventListener("DOMContentLoaded", async () => {

    resetCost();
    let resp;

    // creating a GET request
    try {
        resp = await axios.get('https://crudcrud.com/api/e79981630d1a4a918a45d9092d7cbed3/ProductDetails');
        console.log(resp);
    }
    catch(err) {
        document.body.innerHTML = "<h2 style='color:red; text-align:center'>Something went wrong</h2>";
        console.error(err);
    }

    // for loop for each object
    for (let i of resp.data){

        // add money
        cost += parseInt(i.money);
 
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
        del.onclick = async (e) => {

            // click delete
            let productName = i.product;
            try {
                // using axios to push data to CrudCrud
                await axios.delete(`https://crudcrud.com/api/e79981630d1a4a918a45d9092d7cbed3/ProductDetails/${i._id}`);
                cost -= parseInt(i.money);
                addMoney.textContent = `The total cost of the product list is Rs. ${cost}`;
            }
            catch(err) {
                document.body.innerHTML = "<h2 style='color:red; text-align:center'>Something went wrong</h2>";
                console.error(err);
            }

            ul.removeChild(e.target.parentElement);
        }

        // editing button functionality
        edit.onclick = async (e) => {

            // getting data to the login
            let money = document.getElementById('money');
            let product = document.getElementById('product');

            product.value = i.product;
            money.value = i.money;

            // deleting data from CRUDCRUD
            try {
                // using axios to push data to CrudCrud
                await axios.delete(`https://crudcrud.com/api/e79981630d1a4a918a45d9092d7cbed3/ProductDetails/${i._id}`);
                cost -= parseInt(i.money);
                addMoney.textContent = `The total cost of the product list is Rs. ${cost}`;
            }
            catch(err) {
                document.body.innerHTML = "<h2 style='color:red; text-align:center'>Something went wrong</h2>";
                console.error(err);
            }

            ul.removeChild(e.target.parentElement);
        }
    }

    addMoney = document.getElementById('add-money');
    addMoney.textContent = `The total cost of the product list is Rs. ${cost}`;
})

function resetCost() {
    cost = 0;
}