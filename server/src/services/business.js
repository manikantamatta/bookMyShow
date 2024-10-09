const Business = require('../models/business');
async function add(businessData){
    try{
        const business = await Business.create(businessData);
        return {message: "Business Created Successfully"};
    } catch(error){
        throw new Error("Error creating business");
    }
}

async function getAccess(id){
    try{
        const access = await Business.findById(id,{access:1});
        return access;
    } catch(error){
        throw new Error("Error fetching access");
    }
}

async function reapplyAccess(id){
    try{
        const access = await Business.findByIdAndUpdate({_id:id},{accessRequired:true},{new:true});
        return access;
    }
    catch(error){
        throw new Error("Error reapplying for access");
    }   
}
async function updateAccess(id,access){
    try{
        const status = await Business.findByIdAndUpdate({_id:id},{access:access,accessRequired:false},{new:true});
        return status;
    }
    catch(error){
        throw new Error("Error updating access");
    }
}

async function getAll(page,limit){
    try{
        const businesses = await Business.find({accessRequired:true},{_id:1,name:1,username:1,access:1}).skip((page-1)*limit).limit(limit);
        return businesses;
    } catch(error){
        throw new Error("Error fetching businesses");
    }
}

async function getById(id){
    try{
        const business = await Business.findById(id,{__v:0,password:0,createdAt:0,updatedAt:0});
        return business;
    } catch(error){
        throw new Error("Error fetching business");
    }
}

async function update(id,businessData){
    try{
        const updateData = {
            Movitems: businessData.Movitems,
            Cinitems: businessData.Cinitems, 
            Eveitems: businessData.Eveitems  
        };
        const business = await Business.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        return business;
    }
    catch(error){
        throw new Error("Error updating business");
    }
}

async function checkPermission(id,entity){
    try{
        const business = await Business.findById(id);
        for (const element of business.access) {
            if (element === entity) {
                return true;
            }
        }
        return false;
    } catch(error){
        throw new Error("Error checking permission");
    } 
}

async function getAccessItems(id,entity){
    try{
        const business = await Business.findById(id,{Movitems:1,Cinitems:1,Eveitems:1});
        let items = [];
        if(entity === "MOV"){
            items = business.Movitems;
        } else if(entity === "CIN"){
            items = business.Cinitems;
        } else if(entity === "EVE"){
            items = business.Eveitems;

        }   
        return items;
    } catch(error){
        throw new Error("Error fetching access items");
    }
}
module.exports={add,getAccess,reapplyAccess,updateAccess,getAll,getById,update,
    checkPermission,getAccessItems
};