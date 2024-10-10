import userModel from "../models/userModel.js"

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    // Find the user by ID
    let userData = await userModel.findById(req.body.userId);
    
    // Check if user exists
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Access the cart data from the user document
    let cartData = await userData.cartData; // Initialize if it doesn't exist
    
    // Check if the item exists in the cart 
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1; // Add new item with quantity 1
    } else {
      cartData[req.body.itemId] += 1; // Increment the item quantity
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // Respond with success
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};


//remove items from cart

const removeFromCart = async (req , res) => {
try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true , message:"Removed From Cart"})
} catch (error) {
    console.log("error");
    res.json({success:false , message:"error"})
}
}

// fetch user cart data
const getCart = async (req , res ) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true , cartData})
    } catch (error) {
        console.log("error");
        res.json({success:false, message:"Error"});
    }
}

export {addToCart , removeFromCart, getCart}