import { z } from "zod";
import createPostSchema from "./createPoster.schema";

const editPosterSchema = createPostSchema.transform((data) => {
  if (data.publish_option == "y") {
    data.is_published = true;
  }
  return data;
});

export default editPosterSchema;
