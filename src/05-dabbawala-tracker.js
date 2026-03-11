/**
 * 🚂 Dabbawala Delivery Tracker - Closures
 *
 * Mumbai ke famous dabbawala system ka tracker bana! Yahan closure ka
 * use hoga — ek function ke andar private state rakhna hai jo bahar se
 * directly access nahi ho sakta. Sirf returned methods se access hoga.
 *
 * Function: createDabbawala(name, area)
 *
 * Returns an object with these methods (sab ek hi private state share karte hain):
 *
 *   - addDelivery(from, to)
 *     Adds a new delivery. Returns auto-incremented id (starting from 1).
 *     Each delivery: { id, from, to, status: "pending" }
 *     Agar from ya to empty/missing, return -1
 *
 *   - completeDelivery(id)
 *     Marks delivery as "completed". Returns true if found and was pending.
 *     Returns false if not found or already completed.
 *
 *   - getActiveDeliveries()
 *     Returns array of deliveries with status "pending" (copies, not references)
 *
 *   - getStats()
 *     Returns: { name, area, total, completed, pending, successRate }
 *     successRate = completed/total as percentage string "85.00%" (toFixed(2) + "%")
 *     Agar total is 0, successRate = "0.00%"
 *
 *   - reset()
 *     Clears all deliveries, resets id counter to 0. Returns true.
 *
 * IMPORTANT: Private state (deliveries array, nextId counter) should NOT
 *   be accessible as properties on the returned object.
 *   Two instances created with createDabbawala should be completely independent.
 *
 * Hint: Use closure to keep variables private. The returned object's methods
 *   form a closure over those variables.
 *
 * @param {string} name - Dabbawala's name
 * @param {string} area - Delivery area
 * @returns {object} Object with delivery management methods
 *
 * @example
 *   const ram = createDabbawala("Ram", "Dadar");
 *   ram.addDelivery("Andheri", "Churchgate"); // => 1
 *   ram.addDelivery("Bandra", "CST");         // => 2
 *   ram.completeDelivery(1);                   // => true
 *   ram.getStats();
 *   // => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }
 */
export function createDabbawala(name, area) {

  let currentId = 1
  let arrayOfDelivereis = []

  const addDelivery = (from, to) => {

    if(from === null || from === undefined || from.trim() === "") return -1
    if(to === null || to === undefined|| to.trim() === "") return -1

    const eachDelivery = {
      id: currentId,
      from,
      to,
      status: "pending"
    }
   arrayOfDelivereis.push(eachDelivery)

    currentId +=1
   return eachDelivery.id
  }

  const completeDelivery = (id) => {
   
    const foundDabba = arrayOfDelivereis.find((dabba) => dabba.id === id)

    if(foundDabba === undefined || foundDabba === null ) {
      return false
    }

    if(foundDabba.status === "completed") return false

    foundDabba.status = "completed"
    
  return true
    
  }

  const getActiveDeliveries = () =>{
    const pendingDabbas = arrayOfDelivereis.filter((dabba) => dabba.status === "pending")

    return pendingDabbas.map((dabba) =>{ 
      return {...dabba}
    })
  }

  const getStats = () => {
   const total = arrayOfDelivereis.length
   const completed = arrayOfDelivereis.filter((d) => d.status === "completed").length
   const pending = arrayOfDelivereis.filter((d) => d.status === "pending").length

   let successRateToString  = "0.00%";
   if(total > 0){
     const successRate = (completed / total) * 100
     successRateToString = `${successRate.toFixed(2)}%`

   }

   return {
    name: name, 
    area: area,
    total: total,
    completed: completed,
    pending: pending,
    successRate: successRateToString
   }

  }

  const reset = () =>{

    arrayOfDelivereis = []
    currentId = 1

    return true
  }

  return {
    addDelivery: addDelivery,
    completeDelivery: completeDelivery,
    getActiveDeliveries: getActiveDeliveries,
    getStats: getStats,
    reset: reset
  }
}
