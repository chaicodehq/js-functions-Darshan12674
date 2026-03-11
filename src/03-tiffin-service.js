/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {

  if(!name || name.trim() === "") return null
 
  const dailyRate ={
    veg: 80,
    nonveg: 120,
    jain: 90
  }
  
  if(!dailyRate[mealType]) return null

  const totalCost = dailyRate[mealType] * days

  return{
    name: name,
    mealType: mealType,
    days: days,
    dailyRate: dailyRate[mealType],
    totalCost: totalCost
  }

}

export function combinePlans(...plans) {
  if(plans.length === 0) return null

  const totalCustomers = plans.length

  const totalRevenue = plans.reduce((sum, plan)=>{
     return sum + plan.totalCost
  }, 0)

  const mealBreakdown = plans.reduce((breakdown, plan)=>{
    const type = plan.mealType

    if(breakdown[type]){
       breakdown[type] += 1
    }else{
      breakdown[type] = 1
    }
    return breakdown
  }, {})

  return{
     totalCustomers,
    totalRevenue,
     mealBreakdown
  }
  }

export function applyAddons(plan, ...addons) {
  if(plan === null) return null

  const extraCost = addons.reduce((addon, item) => addon + item.price, 0)

  const addonNames = addons.map((addon) => addon.name)
 
  const dailyRate = plan.dailyRate + extraCost;
  const newTotalCost = dailyRate * plan.days

  return{
    ...plan,
    dailyRate: dailyRate,
    totalCost: newTotalCost,
    addonNames: addonNames
  }
}
