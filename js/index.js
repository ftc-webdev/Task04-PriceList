'use strict'

document.addEventListener("DOMContentLoaded", () => {

    let products = []
    let Product = (name, price) => {
        let product = {
            name,
            price
        }
        products.push(product)
        return product
    }
    let Order = () => {
        return {
            orderLines: [],
            total: 0,
            add (orderLine) {
                this.orderLines.push(orderLine)
                this.total += orderLine.total
                let orderTotalDiv = document.getElementById("order-total")
                orderTotalDiv.innerText = this.total
            },
            // a html function to generate the form

        }
    }
    // this is the single order in the system
    let order = Order()

    let OrderLine = (product, qty) => {
        // need to capture the ordeLine from the dom
        // and also add the click handler
        let orderLine = {
            product,
            qty,
            total: product.price * qty  // total for this line
            // a generate html function
            // <span class="product-name">${product.name}</span>
        
        }
        order.add(orderLine)
        // update the dom
        return orderLine
    }

    Product("margherita", 10.00)
    Product("hawaiian", 12.00)
    Product("meat lovers", 15.00)

    let productListHtml = ""
    let counter = 0
    products.forEach((product)=> {
        productListHtml += `
            <div class="order-line" id="${counter++}">    
                <span class="product-name">${product.name}</span>
                <span class="product-price">${product.price}</span>
                <input class="product-qty" value="0"/>
                <span class="product-total">0</span>
            </div>
        `   

    })

    // generate the form
    let html = `
        <form action="#">

            ${productListHtml}
            <input type="submit" value="Submit">
            <input type="cancel" value="Cancel">
            <div id="order-total-section">
                <span>Order Total</span><span id="order-total">0</span>
            </div>
        </form>
    
    `

    document.getElementById("order-form").innerHTML = html

    let qtyFields = document.getElementsByClassName("product-qty")
    for(let qtyField of qtyFields) {
        qtyField.addEventListener("change", (ev) => {
            let qtyField = ev.target
            let qty = +qtyField.value
            let orderLineEl = qtyField.parentElement
            let id = orderLineEl.id
            let product = products[id]
            console.log({ product })
            let orderLine = OrderLine(product, qty)
            let lineTotal = orderLineEl.getElementsByClassName("product-total")[0]
            // lineTotal should ponly be a single element
            lineTotal.innerText = orderLine.total

        })
    }















})