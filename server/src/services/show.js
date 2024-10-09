
const Show = require('../models/show');
ObjectId = require('mongodb').ObjectId;

async function getAvailableShowsByFormat(id, format, location,language) {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 
      const results = await Show.aggregate([
        {
          $match: {
            movie_id: new ObjectId(id),
            format: format,
            city: location,
            language: language,
            show_date: { $gte: currentDate }  
          }
        },
        {
          $group: {
            _id: { date: "$show_date", cinema_id: "$cinema_id" },
            shows: {
              $push: {
                _id: "$_id",
                start_time: "$start_time",
                seat_info: "$seat_info"
              }
            }
          }
        },
        {
          $lookup: {
            from: "cinemas",
            localField: "_id.cinema_id",
            foreignField: "_id",
            as: "cinemaDetails"
          }
        },
        {
          $unwind: "$cinemaDetails"
        },
        {
          $group: {
            _id: "$_id.date",
            cinemas: {
              $push: {
                cinema_id: "$cinemaDetails._id",
                cinema_name: "$cinemaDetails.name",
                location: "$cinemaDetails.location",
                food_service: "$cinemaDetails.food_service",
                shows: "$shows"
              }
            }
          }
        },
        {
          $sort: { "_id": 1 }
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            cinemas: 1
          }
        }
      ]);
  
      return results;
    } catch (error) {
      throw new Error("Error fetching available shows");
    }
  }

  async function getById(id) {  
   try{
    const show= await Show.findOne({_id:id});
    return show;
   } catch(error){
    throw new Error("Error fetching show by id");
   }
  }
  
  async function updateSeat(showId,seat_info){
    try{
      const result=await Show.findOneAndUpdate({_id:showId},{$set:{seat_info:seat_info}},{new:true});
      return result;
    }catch(error){
      throw new Error("Error updating show seat info");
    }
  } 
  


async function getSlots(id, date) {
  try {
    const formattedDate = new Date(date);
      const shows = await Show.aggregate([
        {
            $match: {
                cinema_id: new ObjectId(id),
                show_date: { $eq: formattedDate }
            }
        },
        {
            $group: {
                _id: "$screen",
                shows: {
                    $push: {
                        start_time: "$start_time",
                        end_time: "$end_time"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                screen: "$_id",
                shows: 1
            }
        }
    ]);
      return shows;
  } catch (error) {
      console.error("Error fetching slots:", error);
      throw new Error("Error fetching slots");
  }
}

async function add(showData){
  try{
    const show= new Show(showData);
    const result=await show.save();
    return result;
  } catch(error){
    throw new Error("Error adding show");
  }
}


module.exports={
    getAvailableShowsByFormat,getById,updateSeat,getSlots,add
}