import pkg from "../../models/reviewRequest.js";
const { ReviewRequest: reviewRequest } = pkg;

class ReviewRequestRepository {
  async create(payload) {
    console.log("##########");
    console.log(payload);
    const activityCount = await reviewRequest.findAll();
    console.log("Rahul");
    return activityCount;
  }

  /*async updateByWhereClause(whereClause, updatePayload, options = {}) {
    // Do some validation

    const post = await Activity.update(updatePayload, {
      where: {
        ...whereClause,
      },
      ...options,
    });

    return post;
  }

  async delete(payload, options = {}) {
    // Do some validations
    const activity = await Activity.destroy({
      where: payload,
      individualHooks: true,
      ...options,
    });

    return activity;
  }*/
}

export default ReviewRequestRepository;
