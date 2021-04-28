import { Star } from "@material-ui/icons";
import React from "react";

function Reviews() {
  return (
    
      <div className="reviews">
        <div className="review__head">
          <p className="list__itemRating">
            4.4
            <Star className="list__icon" />
          </p>
          <hr></hr>
          <p>Very Nice Product</p>
        </div>
        <br></br>
        <p>
          Its a good laptop with Rzyen 3, its food for students for their basic
          works like working with Ms Office. Do not play game bcoz it got no
          graphics, graphics is inbuilt which is from AMD. Overall a good build
          quality from lenovo.
        </p>
        <br></br>
        <div className="review__footer">Demo User</div>
      </div>
    
  );
}

export default Reviews;
