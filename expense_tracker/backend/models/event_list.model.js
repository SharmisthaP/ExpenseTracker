const mongoose=require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        item:{type: String, required:true},
        cost:{type: Number,required:true}
    }
);
const Event = new Schema(
    {
        
        event_date:{type: Date,required:true },
        event_name:{type: String,required:true},
        event_items:[Item]
    }
);
const eventListSchema = new Schema(
    {
        username:{type: String, ref: 'User',required:true},
        start_date: {type: Date,required:true},
        end_date: {type: Date,required:true},
        events:[Event]
    },
    {
        timestamps:true,
    }
);
const EventList = mongoose.model('EventList',eventListSchema);
module.exports=EventList;