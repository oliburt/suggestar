import React from "react";
import { Feed } from "semantic-ui-react";

const ReviewShow = () => {
  return (
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          You added <a>Jenny Hess</a> to your <a>coworker</a> group.
        </Feed.Summary>
        <Feed.Date content="1 day ago" />
      </Feed.Content>
    </Feed.Event>
  );
};

export default ReviewShow;
