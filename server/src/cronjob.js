const cron = require('node-cron');
const { getAndClearRatingsBatch,updateEntityRatings,getAndClearInterestedBatch,updateInterestedCount} = require('./services/rating');
const { getTopBookedCached } = require('./services/trending');

// Duration of cron job set to 10 mins
cron.schedule('*/1 * * * *', async () => {
  try {
    const batch = getAndClearRatingsBatch();
    if (Object.keys(batch).length > 0) {
      await updateEntityRatings(batch);
      console.log('Ratings batch processed successfully.');
    }
  } catch (error) {
    console.error('Error processing ratings batch:', error);
  }
});

cron.schedule('*/1 * * * *', async () => {
  try{
    const batch= getAndClearInterestedBatch();  
    if(Object.keys(batch).length>0){
      await updateInterestedCount(batch);
      console.log('Interested batch processed successfully.');
    }
  } catch(error){
    console.error('Error processing interested batch:', error);
  }
});

// Duration of cron job set to 24 hours
cron.schedule('0 0 * * *', async () => {
  try {
    const message = await getTopBookedCached();
    console.log('Top Booked data fetched successfully');
  } catch (error) {
    console.error('Error fetching top booked data:', error);
  }
});


