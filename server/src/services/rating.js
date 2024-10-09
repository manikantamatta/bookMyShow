const ratingsBatch = {}; 
const interestedBatch ={};
const Movie = require('../models/movie'); 
const Rating = require('../models/rating'); 
const Event = require('../models/event'); 
const utils=require('../utils/utils');
/**
 * Add a rating to the batch.
 * @param {string} entity - The type of entity being rated (MOV, EVE, PLY, SPO, ACT).
 * @param {string} entityId - The ID of the entity.
 * @param {number} rating - The rating given by the user.
 */
function addRatingToBatch(entity, entityId, rating) {
  const key =entityId;
  if (!ratingsBatch[key]) {
    ratingsBatch[key] = {
      entity: entity,
      totalRating: 0,
      ratingCount: 0,
    };
  }
  ratingsBatch[key].totalRating += rating;
  ratingsBatch[key].ratingCount += 1;
  console.log(ratingsBatch);
}
/**
 * 
 * @param {string} entity- The type of entity being rated (MOV, EVE).
 * @param {string} entityId - The ID of the entity.
 * @returns {string} Returns a string indicating the status of the operation.
 */
function addInterestedToBatch(entity, entityId){
  try{
    const key=`${entity}-${entityId}`;
    if(!interestedBatch[key]){
    interestedBatch[key]={
      entity:entity,
      entityId:entityId,
      interestedCount:0
    };
    }
    interestedBatch[key].interestedCount+=1;
    console.log(interestedBatch);
    return "Successfull Added to the batch";
  } catch (error) {
  console.error("Error adding interested:", error);
  return "Error adding to the batch";
  }
}

/**
 * 
 * @param {*} rating Adds the rating  to the ratings Batch
 * @returns {boolean} Returns true if the rating is added successfully, false otherwise.  
 */
async function addIndividualRating(rating) {
    try{
        const newRating = new Rating(rating);
        await newRating.save();
        return true;
    } catch (error) {
        console.error("Error adding rating:", error);
        return false;
    }

}
/**
 * Get and clear the current batch of ratings.
 * @returns {object} The current batch of ratings.
 */
function getAndClearRatingsBatch() {
  const batch = { ...ratingsBatch };
  for (const key in ratingsBatch) {
    delete ratingsBatch[key];
  }
  return batch;
}

function getAndClearInterestedBatch(){
  const batch = { ...interestedBatch };
  for (const key in interestedBatch) {
    delete interestedBatch[key];
  }
  return batch;
}

async function updateInterestedCount(interestedBatch){
  for(const key in interestedBatch){
    const {entity,entityId,interestedCount}=interestedBatch[key];
    model=utils.getModelName(entity);
    const currentEntity=await model.findById(entityId);

    if(!currentEntity){
      console.error(`Entity with ID ${entityId} not found.`);
      throw new Error(`Entity with ID ${entityId} not found.`);
    }

    if(entity==="MOV"){
    const newCount=currentEntity.likes+interestedCount;
    await model.findByIdAndUpdate(entityId,{
      $set:{
        likes:newCount
      },
    });
  } else{
    const newCount=currentEntity.interested+interestedCount;
    await model.findByIdAndUpdate(entityId,{
      $set:{
        interested:newCount
      },
    });
  }
  }
}

   

/**
 * Update ratings in the database for different entities.
 * @param {object} ratingsBatch - The batch of ratings to update.
 */
async function updateEntityRatings(ratingsBatch) {
    for (const key in ratingsBatch) {
      const { totalRating, ratingCount,entity} = ratingsBatch[key];

      model=utils.getModelName(entity);
  
     // Fetch the current entity from the database
     const currentEntity = await model.findById(key);
     if (!currentEntity) {
         console.error(`Entity with ID ${key} not found.`);
         continue;
     }
     // Calculate new average rating
     const currentRatingCount = currentEntity.ratedby|| 0;
     const currentTotalRating = currentEntity.rating*currentRatingCount || 0;
     const newTotalRating = currentTotalRating + totalRating;
     const newRatingCount = currentRatingCount + ratingCount;
     const newAverageRating = newTotalRating / newRatingCount;

     // Update the entity with the new average rating and reviews
     await model.findByIdAndUpdate(key, {
         $set: { 
             rating: newAverageRating,
             ratedby: newRatingCount
         },
     });
 }
}

async function getRatingByEntityId(entityId,page,limit){
    try{
        const totalRatingsCount = await Rating.countDocuments({ entityId: entityId });
        const ratings = await Rating.find({entityId:entityId},{username:1,rating:1,review:1,_id:0,createdAt:1})
        .sort({createdAt:-1})
        .skip((page-1)*limit)
        .limit(limit);
        return {ratings,totalRatingsCount};
    } catch (error) {
        console.error("Error fetching rating:", error);
        return [];
    }
}

async function getRatingForEntityByUser(entityId,userId){
    try{
        const rating = await Rating.findOne({ entityId: entityId, userId: userId },{rating:1,review:1,_id:0});
        if(rating)return rating;
        return {rating:-1,review:""};
    } catch (error) {
        console.error("Error fetching rating:", error);
        return null;
    }
}
module.exports = {
    addRatingToBatch,
  getAndClearRatingsBatch,
  addIndividualRating,
  updateEntityRatings,
  getRatingByEntityId,
  getRatingForEntityByUser,
  addInterestedToBatch,
  updateInterestedCount,
  getAndClearInterestedBatch
};
