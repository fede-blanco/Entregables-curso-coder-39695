import { ticketManager } from "../managers/TicketManager.js";
import Ticket from "../models/Ticket.js";
import { ticketsRepository } from "../repositories/tickets.repository.js";
import { cartsService } from "./carts.service.js";
import { productsService } from "./products.service.js";


class TicketsService {

  async addTicket(cartId, userEmail){
    try {
        const cart = await cartsService.getCartById(cartId)
        let amount = 0;
        let productsIds = []
        cart.products.forEach(async (p) => {
            console.log(p);
            if (p.quantity <= p.product.stock) {
              let finalStock = p.product.stock - p.quantity

              let totalPrice = p.quantity * p.product.price
              amount = amount + totalPrice;
              console.log("userEmail -->", userEmail);
              console.log("finalStock -->", finalStock);

              let updatedProduct = await productsService.updateProduct(p.product._id, {stock: finalStock})

              let updatedCart = await cartsService.deleteFullProductFromCart(cartId,p.product._id)

              // console.log(updatedProduct);
            } else {
              const productId = p.product._id
              productsIds.push(productId)
            }
        });

        // console.log("productsIds -->", productsIds);

        if (amount > 0) {
          // console.log("Amount -->", amount);
          const ticket = new Ticket(amount, userEmail)
          // // console.log("ticket -->", ticket);
          const addedTicket = await ticketsRepository.addTicket(ticket)
          // console.log("ticket -->", addedTicket);
          console.log(addedTicket);
          return productsIds;
        } else {
          return productsIds;
        }
    
    } catch (error) {
      throw new Error(`Error en addTicket -- tickets.service.js ---> ${error}`)
    }
  }

  async getTicketByEmail(email){
    try {
        const ticketFound = await ticketsRepository.getTicketByEmail(email);
        // const ticketFound = await ticketManager.getTicketByEmail(email);
        return ticketFound;
    } catch (error) {
        throw new Error(`Error en getTicketByEmail -- tickets.service.js ---> ${error}`)
    }
  }

  async getTickets(){
    try {
      const tickets = await ticketsRepository.getTickets()
      // const tickets = await ticketManager.getTickets()
      return tickets;
    } catch (error) {
      throw new Error (`Error en getTickets -- tickets.service.js ---> ${error}`)
    }
  }

  async deleteTicketById(ticketId){
    try {
      return await ticketsRepository.deleteTicketById(ticketId)
      // return await ticketManager.deleteTicketById(ticketId)
    } catch (error) {
      throw new Error(`Error en deleteTickerByEmail -- tickets.service.js ---> ${error}`)
    }
  }

}

export const ticketsService = new TicketsService()