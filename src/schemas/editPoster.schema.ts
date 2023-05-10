import createPostSchema from "./createPoster.schema";

const editPosterSchema = createPostSchema.transform((data) => {
  if (data.publish_option == "y") {
    data.is_published = true;
  } else if (data.publish_option == "n") {
    data.is_published = false;
  }
  return data;
});

export default editPosterSchema;
