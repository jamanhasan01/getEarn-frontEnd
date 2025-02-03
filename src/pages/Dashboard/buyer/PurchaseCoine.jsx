import { useState } from "react"
import PurchaseCoinModel from "../../../modal/PurchaseCoinModel"


const PurchaseCoine = () => {
  const [showmodel, setshowmodel] = useState(false)
  const [planCard, setplanCard] = useState({})


  
  let handlePurchaseCoin=(plan)=>{
    

    setplanCard(plan) 
      setshowmodel(true)
            
   
  
  }

  let purchaseCoinCard=[
    {
      coine:100,
      price:10,
    },
    {
      coine:500,
      price:50,
    },
    {
      coine:1000,
      price:100,
    },
  ]
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 text-center">
        {purchaseCoinCard.map((plan,i)=>(
          <div className="bg-white text-black p-3" key={i}>
            <h3>{plan.coine}</h3>
            <h3>{plan.price}</h3>
            <button onClick={()=>{handlePurchaseCoin(plan)}} className="button">Purchase</button>
          </div>
        ))}
      </div>
      <PurchaseCoinModel showModel={showmodel}  setshowmodel={setshowmodel} planCard={planCard}></PurchaseCoinModel>
      {/* <button className='bottom' onClick={()=>setshowmodel(true)}>show</button> */}
    </div>
  )
}

export default PurchaseCoine