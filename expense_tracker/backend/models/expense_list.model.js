const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const listSchema =new Schema(
    {
       
        username:{type: String, ref: 'User',required:true},
        grocery:{type:Number,default:0},
        medicine:{type:Number,default:0},
        electricity:{type:Number,default:0},
        monthly_subscriptions:{type:Number,default:0},
        rents:{type:Number,default:0},
        fresh_produce:{type:Number,default:0},
        stationaries:{type:Number,default:0},
        toiletries:{type:Number,default:0},
        bakery:{type:Number,default:0},
        start_date: {type: Date,required:true},
        end_date: {type: Date,required:true},
        misc: {type:Number,default:0},
        monthly_budget: {type:Number,default:0,required:true}
    },
    {
        timestamps:true,
        
    }
);


const Expense_list = mongoose.model('Expense_list',listSchema);
 module.exports=Expense_list;